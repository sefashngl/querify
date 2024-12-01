import { Tables, DB } from "../generated-types";
import { formatColumn, formatSQLQuery, formatValue } from "../utils/formatters";

type InsertValues<T extends Tables> = Partial<DB[T]>;

interface InsertState<T extends Tables, R extends keyof DB[T] = never> {
  values: InsertValues<T>[];
  returning: R[];
}

type BuilderWithReturning<T extends Tables, K extends keyof DB[T]> = {
  build: () => [string, Pick<DB[T], K>];
  values: (
    data: InsertValues<T> | InsertValues<T>[]
  ) => BuilderWithReturning<T, K>;
  returning: <NewK extends keyof DB[T]>(
    columns: NewK[]
  ) => BuilderWithReturning<T, NewK>;
};

const insert = <T extends Tables>(table: T) => {
  const state: InsertState<T> = {
    values: [],
    returning: [],
  };

  const values = (data: InsertValues<T> | InsertValues<T>[]) => {
    state.values = Array.isArray(data) ? data : [data];
    return builder;
  };

  const returning = <R extends keyof DB[T]>(columns: R[]) => {
    state.returning = columns as any;
    return builder as BuilderWithReturning<T, R>;
  };

  const build = () => {
    if (state.values.length === 0) {
      throw new Error("No values provided for insert");
    }

    const columns = Object.keys(state.values[0]);
    const valueStrings = state.values.map(
      (row) =>
        `(${columns
          .map((col) => formatValue(row[col as keyof typeof row]))
          .join(", ")})`
    );

    const returningClause = state.returning.length
      ? ` RETURNING ${state.returning
          .map((col) => formatColumn(col))
          .join(", ")}`
      : "";

    const query = `INSERT INTO ${table} (${columns.join(
      ", "
    )}) VALUES ${valueStrings.join(", ")}${returningClause};`;

    return [
      formatSQLQuery(query),
      state.returning.length
        ? ({} as Pick<DB[T], (typeof state.returning)[number]>)
        : {},
    ] as const;
  };

  const builder = {
    values,
    returning,
    build,
  };

  return builder;
};

export default insert;
