import { querify } from "./querify";

const dbService = {
  query: (query: string) => null as any,
};

const [query, queryType] = querify
  .from("booking_status", "b")
  .innerJoin("drivers", "d", "b.id", "=", "d.id")
  .select([
    "b.id",
    ["AVG", "b.id", "avgId"],
  ])
  .limit(10)
  .offset(0)
  .build();
const queryResult: typeof queryType = dbService.query(query);
console.log(query);
