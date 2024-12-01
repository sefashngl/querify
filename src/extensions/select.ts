import type { Column, SelectColumn } from "../types/column";
import type { Tables } from "../generated-types";
import type { SelectColumnWithAlias } from "../types/column";
import type { JoinType, SQLOperator } from "../types/common";
import type { SelectState } from "../types/query";
import type { WhereCondition, WhereGroup } from "../types/where";
import type { InferQueryType } from "../types/infer-query-type";
import { AggregateFunction } from "../types/aggregation";
import { formatColumn, formatSQLQuery, formatValue } from "../utils/formatters";

const from = <
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables> = {},
  Cols extends readonly SelectColumnWithAlias<MT, MA, JT>[] = readonly []
>(
  table: MT,
  tableAlias: MA,
  state: SelectState<MT, MA, JT, Cols> = {
    selectedColumns: [] as any,
    whereConditions: [],
    orderBy: "",
    groupBy: "",
    joins: [],
  }
) => {
  const createJoin = (joinType: JoinType) => {
    return <NewJoinTable extends Tables, NewJoinAlias extends string>(
      joinTable: NewJoinTable,
      joinAlias: NewJoinAlias,
      leftColumn: Column<MT, MA, JT>,
      operator: SQLOperator,
      rightColumn: Column<NewJoinTable, NewJoinAlias, JT>
    ) => {
      state.joins.push(
        `${joinType} ${joinTable} AS ${joinAlias} ON ${leftColumn} ${operator} ${rightColumn}`
      );
      return from<MT, MA, JT & Record<NewJoinAlias, NewJoinTable>>(
        table,
        tableAlias,
        state as any
      );
    };
  };

  const join = createJoin("JOIN");
  const leftJoin = createJoin("LEFT JOIN");
  const innerJoin = createJoin("INNER JOIN");
  const rightJoin = createJoin("RIGHT JOIN");

  const select = <
    Col extends SelectColumn<MT, MA, JT>,
    Alias extends string,
    NewCols extends readonly (
      | Col
      | [Col, Alias]
      | [AggregateFunction, Column<MT, MA, JT>, string]
      | ["RAW", string, any[], string]
    )[]
  >(
    columns: NewCols & readonly SelectColumnWithAlias<MT, MA, JT>[]
  ) => {
    const newState: SelectState<MT, MA, JT, NewCols> = {
      ...state,
      selectedColumns: columns,
    };

    return from<MT, MA, JT, NewCols>(
      table,
      tableAlias,
      newState
    ) as unknown as Omit<
      ReturnType<typeof from<MT, MA, JT, NewCols>>,
      "select"
    >;
  };

  const formatCondition = (condition: WhereCondition<MT, MA, JT>): string => {
    const [column, operator, value] = condition;
    return `${column} ${operator} ${formatValue(value)}`;
  };

  const where = (groups: WhereGroup<MT, MA, JT>[]) => {
    const whereClause = groups
      .map((group) => {
        if (Array.isArray(group) && Array.isArray(group[0])) {
          const conditions = group.map(formatCondition).join(" OR ");
          return `(${conditions})`;
        } else {
          return formatCondition(group as WhereCondition<MT, MA, JT>);
        }
      })
      .join(" AND ");

    state.whereConditions.push(whereClause);
    return from<MT, MA, JT, Cols>(table, tableAlias, state);
  };

  const orderBy = (
    column: Column<MT, MA, JT>,
    direction: "ASC" | "DESC" = "ASC"
  ) => {
    state.orderBy = `ORDER BY ${column} ${direction}`;
    return from<MT, MA, JT, Cols>(table, tableAlias, state);
  };

  const groupBy = (
    columns: Column<MT, MA, JT>[],
    options?: { nullsLast?: boolean }
  ) => {
    const nullsLastClause = options?.nullsLast ? " NULLS LAST" : "";
    state.groupBy = `GROUP BY ${columns.join(", ")}${nullsLastClause}`;
    return from<MT, MA, JT, Cols>(table, tableAlias, state);
  };

  const limit = (value: number) => {
    if (value < 0) throw new Error("Limit must be non-negative");
    state.limit = value;
    return from<MT, MA, JT, Cols>(table, tableAlias, state);
  };

  const offset = (value: number) => {
    if (value < 0) throw new Error("Offset must be non-negative");
    state.offset = value;
    return from<MT, MA, JT, Cols>(table, tableAlias, state);
  };

  const build = (): [string, InferQueryType<MT, MA, JT, Cols>] => {
    const sqlQuery = `SELECT ${
      state.selectedColumns.length > 0
        ? state.selectedColumns.map(formatColumn).join(", ")
        : `${tableAlias}.*`
    } FROM ${table} AS ${tableAlias}${
      state.joins.length > 0 ? ` ${state.joins.join(" ")}` : ""
    }${
      state.whereConditions.length > 0
        ? ` WHERE ${state.whereConditions.join(" AND ")}`
        : ""
    }${state.groupBy ? ` ${state.groupBy}` : ""}${
      state.orderBy ? ` ${state.orderBy}` : ""
    }${state.limit !== undefined ? ` LIMIT ${state.limit}` : ""}${
      state.offset !== undefined ? ` OFFSET ${state.offset}` : ""
    };`;

    const type = {} as InferQueryType<MT, MA, JT, Cols>;
    return [formatSQLQuery(sqlQuery), type];
  };

  return {
    join,
    leftJoin,
    innerJoin,
    rightJoin,
    select,
    where,
    groupBy,
    orderBy,
    limit,
    offset,
    build,
  };
};

export default from;
