import { Columns, Tables } from "../generated-types";
import { AggregateColumn, AggregateFunction } from "./aggregation";

export type Column<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables> = {}
> =
  | `${MA}.${Columns<MT> & string}`
  | `${keyof JT & string}.${Columns<JT[keyof JT & string]> & string}`;

export type SelectColumn<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables> = {}
> =
  | `${MA}.${Columns<MT> & string}`
  | `${MA}.*`
  | `${keyof JT & string}.${Columns<JT[keyof JT & string]> & string}`;

export type SelectColumnWithAlias<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables>
> =
  | SelectColumn<MT, MA, JT>
  | [SelectColumn<MT, MA, JT>, string]
  | [AggregateFunction, Column<MT, MA, JT>, string]
  | ["RAW", string, any[], string];
