import { Column } from "../types/column";

import { AggregateFunction } from "../types/aggregation";
import { SelectColumnWithAlias } from "../types/column";
import { Tables } from "../generated-types";
import sqlFormatter from "@sqltools/formatter";

export const formatValue = (value: any): string => {
  if (typeof value === "string") {
    return `'${value.replace(/'/g, "''")}'`;
  }
  if (Array.isArray(value)) {
    return `(${value.map((v) => formatValue(v)).join(", ")})`;
  }
  if (value === null) {
    return "NULL";
  }
  if (typeof value === "object") {
    return `'${JSON.stringify(value)}'`;
  }
  return String(value);
};

export const formatColumn = <T extends Tables, TA extends string, JT extends {}>(
  col: SelectColumnWithAlias<T, TA, JT>
): string => {
  if (!Array.isArray(col)) {
    return `"${String(col)}"`;
  }

  if (col.length === 2) {
    const [column, alias] = col;
    return `${column} AS "${alias}"`;
  }
  if (col[0] === "RAW") {
    const [_, sql, values, alias] = col as ["RAW", string, any[], string];
    let parameterizedSql = sql;
    values.forEach((value) => {
      parameterizedSql = parameterizedSql.replace("?", formatValue(value));
    });
    return `(${parameterizedSql}) AS "${alias}"`;
  }
  const [func, column, alias] = col as [
    AggregateFunction,
    Column<T, TA, {}>,
    string
  ];
  return `${func}(${column}) AS "${alias}"`;
};

export const formatSQLQuery = (query: string): string => {
  return sqlFormatter.format(query);
};
