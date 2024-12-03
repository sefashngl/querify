import fs from "fs";
import path from "path";
import pg from "pg";
import { promises as rl } from "node:readline";
import { schemaQuery } from "./static/schema.query";
const readLine = rl.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const entry = async () => {
  const host = await readLine.question("Enter host: (localhost)") || "localhost";
  const port = await readLine.question("Enter port: (5432)") || "5432";
  const database = await readLine.question("Enter database: (surgedb)") || "surgedb";
  const user = await readLine.question("Enter user: (surgeuser)") || "surgeuser";
  const password = await readLine.question("Enter password: (surgepassword)") || "surgepassword";
  const databaseSchema = await readLine.question("Enter database schema: (public)") || "public";
  const outputPath = await readLine.question("Enter output path: (generated-types.ts)") || "./generated-types.ts";
  try {
    const client = new pg.Client({
      host,
      port: parseInt(port),
      user,
      password,
      database,
    });
    await client.connect();
    const res = await client.query(
      schemaQuery({
        tableSchema: databaseSchema,
        excludeTables: ["_prisma_migrations"],
      })
    );
    generateTypes(res.rows);
  } catch (error) {
    console.error("Error connecting to database");
    console.error(error);
    process.exit(1);
  }
};

const generateTypes = async (data: {
  tableName: string;
  columns: {
    name: string;
    type: string;
    nullable: boolean;
  }[];
}[]) => {
  const tableDefinitions = data
    .map((table: any) => {
      const columns = table.columns
        .map((col: any) => {
          let tsType = col.type.toLowerCase();
          switch (tsType) {
            case "number":
              tsType = "number";
              break;
            case "string":
              tsType = "string";
              break;
            case "boolean":
              tsType = "boolean";
              break;
            case "date":
              tsType = "Date";
              break;
            case "any":
              tsType = "any";
              break;
            default:
              tsType = "any";
          }
          const nullable = col.nullable ? "?" : "";
          return `    ${col.name}${nullable}: ${tsType};`;
        })
        .join("\n");

      return `  ${table.tableName}: {\n${columns}\n  }`;
    })
    .join(";\n");

  const types = `export interface DB {\n${tableDefinitions}\n}

export type Tables = keyof DB;
export type Columns<T extends Tables> = keyof DB[T];
`;
  const outputPath = path.resolve(__dirname, "generated-types.ts");
  fs.writeFileSync(outputPath, types, "utf8");

  console.log(`Types generated, path: ${outputPath}`);
  process.exit();
};

entry();
