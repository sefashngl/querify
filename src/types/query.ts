import { Tables } from "../generated-types";
import { SelectColumnWithAlias } from "./column";

export interface SelectState<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables> = {},
  Cols extends readonly SelectColumnWithAlias<MT, MA, JT>[] = readonly []
> {
  selectedColumns: Cols;
  whereConditions: string[];
  orderBy: string;
  groupBy: string;
  joins: string[];
  limit?: number;
  offset?: number;
}