# Querify - TypeSafe SQL Query Builder

A strongly-typed SQL query builder for TypeScript that provides compile-time type checking and SQL injection protection.

## Features

- 🔒 Type-safe SQL query generation
- 💉 Built-in SQL injection protection 
- 🔄 Fluent builder API
- 🎯 Full TypeScript support with type inference
- 📦 Zero dependencies

## Installation

```bash
npm install querify
```

## Usage

### SELECT Queries
```typescript
const [query, result] = from('users', 'u')
  .select([
    'u.id', 
    'u.name',
    ['u.created_at', 'createdAt']
  ])
  .leftJoin('posts', 'p', 'u.id', '=', 'p.user_id')
  .where([['u.age', '>', 18]])
  .orderBy('u.created_at', 'DESC')
  .build();
```

### INSERT Queries
```typescript
const [query, result] = insert('users')
  .values({
    name: 'John Doe',
    email: 'john@example.com'
  })
  .returning(['id'])
  .build();
```

### UPDATE Queries
```typescript
const [query, result] = update('users', 'u')
  .set({
    status: 'active',
    updated_at: new Date()
  })
  .where([['u.id', '=', userId]])
  .returning(['id', 'status'])
  .build();
```

## Advanced Features

### Complex Joins
```typescript
const [query, result] = from('users', 'u')
  .leftJoin('posts', 'p', 'u.id', '=', 'p.user_id')
  .innerJoin('comments', 'c', 'p.id', '=', 'c.post_id')
  .select([
    'u.id',
    'u.name', 
    ['COUNT(p.id)', 'postCount'],
    ['COUNT(c.id)', 'commentCount']
  ])
  .groupBy(['u.id', 'u.name'])
  .build();
```

### OR Conditions
```typescript
const [query, result] = from('users', 'u')
  .where([
    [
      ['u.email', '=', email],
      ['u.username', '=', username]
    ]
  ])
  .build();
```

### Bulk Insert
```typescript
const [query, result] = insert('users')
  .values([
    { name: 'John', email: 'john@example.com' },
    { name: 'Jane', email: 'jane@example.com' }
  ])
  .returning(['id'])
  .build();
```

## Type Safety

The library provides compile-time type checking for:

- Table and column names
- Join conditions
- WHERE clause values
- RETURNING clause columns
- Query result types

Example type errors:
```typescript
// Error: Column 'invalid' does not exist on table 'users'
from('users', 'u').where([['u.invalid', '=', true]])

// Error: Type 'string' is not assignable to type 'number'
update('users', 'u').set({ age: 'not a number' })

// Error: Column 'invalid' is not a valid return column
insert('users').returning(['invalid'])
```

## SQL Injection Protection

All values are automatically escaped and sanitized:

```typescript
// Safe: Values are automatically escaped
from('users', 'u')
  .where([['u.email', '=', "'; DROP TABLE users; --"]])
```

## API Reference

### Select Builder
Reference:
```typescript:src/extensions/select.ts
startLine: 11
endLine: 162
```

### Insert Builder  
Reference:
```typescript:src/extensions/insert.ts
startLine: 21
endLine: 75
```

### Update Builder
Reference:
```typescript:src/extensions/update.ts
startLine: 42
endLine: 136
```

## License

MIT