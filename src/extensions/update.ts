import { Tables, DB } from "../generated-types";
import { Column, SelectColumn, SelectColumnWithAlias } from "../types/column";
import { InferQueryType } from "../types/infer-query-type";
import { WhereGroup, WhereCondition } from "../types/where";
import { AggregateFunction } from "../types/aggregation";
import { formatColumn, formatSQLQuery, formatValue } from "../utils/formatters";

type UpdateValues<T extends Tables> = Partial<DB[T]>;

interface UpdateState<
  T extends Tables,
  TA extends string,
  Cols extends readonly SelectColumnWithAlias<T, TA, {}>[] = readonly []
> {
  values: UpdateValues<T>;
  whereConditions: string[];
  returning: Cols;
}

type BuilderWithReturning<
  T extends Tables,
  TA extends string,
  Cols extends readonly SelectColumnWithAlias<T, TA, {}>[]
> = {
  build: () => [string, InferQueryType<T, TA, {}, Cols>];
  set: (data: UpdateValues<T>) => BuilderWithReturning<T, TA, Cols>;
  where: (groups: WhereGroup<T, TA, {}>[]) => BuilderWithReturning<T, TA, Cols>;
  returning: <
    Col extends SelectColumn<T, TA, {}>,
    Alias extends string,
    NewCols extends readonly (
      | Col
      | [Col, Alias]
      | [AggregateFunction, Column<T, TA, {}>, string]
      | ["RAW", string, any[], string]
    )[]
  >(
    columns: NewCols & readonly SelectColumnWithAlias<T, TA, {}>[]
  ) => BuilderWithReturning<T, TA, NewCols>;
};

const update = <
  T extends Tables,
  TA extends string,
  Cols extends readonly SelectColumnWithAlias<T, TA, {}>[] = readonly []
>(
  table: T,
  tableAlias: TA
) => {
  const state: UpdateState<T, TA> = {
    values: {},
    whereConditions: [],
    returning: [],
  };

  const formatCondition = (condition: WhereCondition<T, TA, {}>): string => {
    const [column, operator, value] = condition;
    return `${tableAlias}."${column}" ${operator} ${formatValue(value)}`;
  };

  const where = (groups: WhereGroup<T, TA, {}>[]) => {
    const whereClause = groups
      .map((group) => {
        if (Array.isArray(group) && Array.isArray(group[0])) {
          const conditions = group.map(formatCondition).join(" OR ");
          return `(${conditions})`;
        } else {
          return formatCondition(group as WhereCondition<T, TA, {}>);
        }
      })
      .join(" AND ");

    state.whereConditions.push(whereClause);
    return builder as BuilderWithReturning<T, TA, Cols>;
  };

  const set = (data: UpdateValues<T>) => {
    state.values = data;
    return builder;
  };

  const returning = <
    Col extends SelectColumn<T, TA, {}>,
    Alias extends string,
    NewCols extends readonly (
      | Col
      | [Col, Alias]
      | [AggregateFunction, Column<T, TA, {}>, string]
      | ["RAW", string, any[], string]
    )[]
  >(
    columns: NewCols & readonly SelectColumnWithAlias<T, TA, {}>[]
  ) => {
    state.returning = columns as any;
    return builder as BuilderWithReturning<T, TA, NewCols>;
  };

  const build = () => {
    if (Object.keys(state.values).length === 0) {
      throw new Error("No values provided for update");
    }

    const setClause = Object.entries(state.values)
      .map(([col, val]) => `${tableAlias}."${col}" = ${formatValue(val)}`)
      .join(", ");

    const whereClause = state.whereConditions.length
      ? ` WHERE ${state.whereConditions.join(" AND ")}`
      : "";

    const returningClause = state.returning.length
      ? ` RETURNING ${state.returning
          .map((col: string) => {
            const columnWithoutAlias = col.replace(`${tableAlias}.`, "");
            return `${tableAlias}."${columnWithoutAlias}"`;
          })
          .join(", ")}`
      : "";

    const query = `UPDATE ${table} SET ${setClause}${whereClause}${returningClause};`;

    return [
      formatSQLQuery(query),
      {} as InferQueryType<T, TA, {}, typeof state.returning>,
    ] as const;
  };

  const builder = {
    set,
    where,
    returning,
    build,
  };

  return builder;
};

export default update;
