import { Tables } from "../generated-types";
import { Column } from "./column";

export type AggregateFunction = 
  | "SUM"
  | "AVG"
  | "COUNT"
  | "MAX"
  | "MIN"
  | "ARRAY_AGG"
  | "STRING_AGG"
  | "JSON_AGG"
  | "JSON_OBJECT_AGG"
  | "INITCAP";

export type AggregateReturnType<F extends AggregateFunction, T> = 
  F extends "COUNT" ? number :
  F extends "SUM" ? number :
  F extends "AVG" ? number :
  F extends "MAX" ? T :
  F extends "MIN" ? T :
  F extends "ARRAY_AGG" ? T[] :
  F extends "STRING_AGG" ? string :
  F extends "JSON_AGG" ? T[] :
  F extends "JSON_OBJECT_AGG" ? Record<string, T> :
  never;

export type AggregateColumn<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables> = {}
> = [AggregateFunction, Column<MT, MA, JT>, string];
