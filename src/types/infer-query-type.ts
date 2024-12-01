import { DB } from "../generated-types";
import { Tables } from "../generated-types";
import { AggregateFunction, AggregateReturnType } from "./aggregation";
import { Column, SelectColumn, SelectColumnWithAlias } from "./column";

type IsWildcard<T, MA extends string> = T extends `${MA}.*` ? true : false;

type InferAggregateType<
  F extends AggregateFunction,
  Col extends string,
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables>
> = Col extends `${MA}.${infer ColName}`
  ? AggregateReturnType<F, DB[MT][ColName & keyof DB[MT]]>
  : Col extends `${infer JAlias}.${infer ColName}`
  ? JAlias extends keyof JT
    ? AggregateReturnType<F, DB[JT[JAlias]][ColName & keyof DB[JT[JAlias]]]>
    : never
  : never;

export type InferQueryType<
  MT extends Tables,
  MA extends string,
  JT extends Record<string, Tables>,
  Cols extends readonly SelectColumnWithAlias<MT, MA, JT>[]
> = true extends IsWildcard<Cols[number], MA>
  ? DB[MT] & {
      [K in Extract<
        Cols[number], 
        | [SelectColumn<MT, MA, JT>, string]
        | readonly [AggregateFunction, Column<MT, MA, JT>, string]
        | readonly ["RAW", string, any[], string]
      > as K extends readonly [AggregateFunction, any, infer Alias]
        ? Alias & string
        : K extends readonly ["RAW", any, any, infer Alias]
        ? Alias & string
        : K extends [infer Original, infer Alias]
        ? Alias & string
        : never]: K extends readonly [AggregateFunction, infer Column, any]
        ? InferAggregateType<K[0], Column & string, MT, MA, JT>
        : K extends readonly ["RAW", any, any, any]
        ? any
        : K extends [infer Original, any]
        ? Original extends `${MA}.${infer ColName}`
          ? DB[MT][ColName & keyof DB[MT]]
          : Original extends `${infer JAlias}.${infer ColName}`
          ? JAlias extends keyof JT
            ? DB[JT[JAlias]][ColName & keyof DB[JT[JAlias]]]
            : never
          : never
        : never;
    }
  : {
      [K in Cols[number] as K extends readonly [AggregateFunction, any, infer Alias]
        ? Alias & string
        : K extends readonly ["RAW", any, any, infer Alias]
        ? Alias & string
        : K extends [infer Original, infer Alias]
        ? Alias & string
        : K extends `${MA}.${infer ColName}`
        ? ColName
        : never]: K extends readonly [AggregateFunction, infer Column, any]
        ? InferAggregateType<K[0], Column & string, MT, MA, JT>
        : K extends readonly ["RAW", any, any, any]
        ? any
        : K extends [infer Original, any]
        ? Original extends `${MA}.${infer ColName}`
          ? DB[MT][ColName & keyof DB[MT]]
          : Original extends `${infer JAlias}.${infer ColName}`
          ? JAlias extends keyof JT
            ? DB[JT[JAlias]][ColName & keyof DB[JT[JAlias]]]
            : never
          : never
        : K extends `${MA}.${infer ColName}`
        ? DB[MT][ColName & keyof DB[MT]]
        : K extends `${infer JAlias}.${infer ColName}`
        ? JAlias extends keyof JT
          ? DB[JT[JAlias]][ColName & keyof DB[JT[JAlias]]]
          : never
        : never;
    };
