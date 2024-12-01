import { querify } from "./querify";

const dbService = {
  query: <T>(query: string): { rows: T[]; rowCount: number } => {
    return { rows: [], rowCount: 0 };
  },
};

const [selectQuery, selectQueryType] = querify
  .from("bookings", "b")
  .innerJoin("drivers", "d", "b.id", "=", "d.id")
  .select([
    "b.id",
    ["d.city", "driverCity"],
    ["AVG", "d.score", "avg_score"],
    ["RAW", "concat(d.name, ?, d.surname)", [" "], "fullName"],
  ])
  .where([
    ["b.id", "=", 1],
    [
      ["d.city", "ILIKE", "%istanbul%"],
      ["d.city", "ILIKE", "%ankara%"],
    ],
  ])
  .limit(10)
  .offset(0)
  .build();
const selectResult = dbService.query<typeof selectQueryType>(selectQuery);
const booking = selectResult.rows[0] || {};
booking.driverCity;
// booking.rasgele;
console.log(selectQuery);
console.log("--------------------------------");

const [insertQuery, insertQueryType] = querify
  .insert("bookings")
  .values([
    {
      id: 1,
      type: 2,
    },
    {
      id: 1,
      type: 2,
    },
    {
      id: 1,
      type: 2,
    },
    {
      id: 1,
      type: 2,
    },
  ])
  .returning(["id", "type", "created_date"])
  .build();
const result = dbService.query<typeof insertQueryType>(insertQuery);
const insertedBooking = result.rows[0] || {};
insertedBooking.created_date;
// insertedBooking.rasgele;
console.log(insertQuery);
console.log("--------------------------------");

const [updateQuery, updateQueryType] = querify
  .update("bookings", "b")
  .set({
    type: 3,
  })
  .where([["b.id", "=", 1]])
  .returning(["b.id", "b.type", "b.created_date"])
  .build();

const updateResult = dbService.query<typeof updateQueryType>(updateQuery);
const updatedBooking = updateResult.rows[0] || {};
updatedBooking.id;
// updatedBooking.rasgele;
console.log(updateQuery);
console.log("--------------------------------");
