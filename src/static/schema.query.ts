export const schemaQuery = (args: {
  tableSchema: string;
  excludeTables?: string[];
}) => {
  const { tableSchema = "public", excludeTables = [] } = args;
  return `SELECT 
    table_name AS "tableName",
    jsonb_agg(
        jsonb_build_object(
            'name', column_name,
            'type', CASE data_type
                WHEN 'integer' THEN 'number'
                WHEN 'bigint' THEN 'number'
                WHEN 'smallint' THEN 'number'
                WHEN 'decimal' THEN 'number'
                WHEN 'numeric' THEN 'number'
                WHEN 'real' THEN 'number'
                WHEN 'double precision' THEN 'number'
                WHEN 'money' THEN 'number'
                WHEN 'serial' THEN 'number'
                WHEN 'bigserial' THEN 'number'
                WHEN 'smallserial' THEN 'number'
                WHEN 'boolean' THEN 'boolean'
                WHEN 'bit' THEN 'boolean'
                WHEN 'bit varying' THEN 'boolean'
                WHEN 'character varying' THEN 'string'
                WHEN 'character' THEN 'string' 
                WHEN 'text' THEN 'string'
                WHEN 'citext' THEN 'string'
                WHEN 'name' THEN 'string'
                WHEN 'uuid' THEN 'string'
                WHEN 'bytea' THEN 'Buffer'
                WHEN 'json' THEN 'any'
                WHEN 'jsonb' THEN 'any'
                WHEN 'xml' THEN 'string'
                WHEN 'point' THEN 'any'
                WHEN 'line' THEN 'any'
                WHEN 'lseg' THEN 'any'
                WHEN 'box' THEN 'any'
                WHEN 'path' THEN 'any'
                WHEN 'polygon' THEN 'any'
                WHEN 'circle' THEN 'any'
                WHEN 'cidr' THEN 'string'
                WHEN 'inet' THEN 'string'
                WHEN 'macaddr' THEN 'string'
                WHEN 'macaddr8' THEN 'string'
                WHEN 'timestamp without time zone' THEN 'Date'
                WHEN 'timestamp with time zone' THEN 'Date'
                WHEN 'date' THEN 'Date'
                WHEN 'time without time zone' THEN 'string'
                WHEN 'time with time zone' THEN 'string'
                WHEN 'interval' THEN 'string'
                WHEN 'array' THEN 'any[]'
                ELSE 'any'
            END,
            'nullable', is_nullable = 'YES'
        )
    ) AS columns
FROM 
    information_schema.columns
WHERE 
    table_schema = '${tableSchema}'
    AND table_name NOT IN (${excludeTables
      .map((table) => `'${table}'`)
      .join(",")})
GROUP BY 
    table_name
ORDER BY 
    table_name;`;
};
