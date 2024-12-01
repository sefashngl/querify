import { Tables } from "../generated-types";
import { Column } from "./column";
import { SQLOperator } from "./common";

export type WhereCondition<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables>
> = [Column<MT, MA, JT>, SQLOperator, any];

export type WhereGroup<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables>
> = WhereCondition<MT, MA, JT> | WhereCondition<MT, MA, JT>[];
