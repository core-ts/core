# onecore

> The shared foundation for the Core TS ecosystem.

`onecore` provides the common contracts, metadata model, and reusable application-layer base classes used throughout the Core TS ecosystem.

It is designed to let infrastructure libraries and applications share the same abstractions without coupling application code to a specific database, messaging system, validation implementation, cache, or framework.

## Installation

```bash
npm install onecore
```

## What is onecore?

Large applications commonly depend on many infrastructure libraries:

* Cache
* Logging
* Health Check
* Validation
* Database
  * DB
  * Transaction
  * Statement
  * Repository
* Service
* Message Queue
* Import / Export
* HTTP clients
* Localization

Without a shared foundation, each library tends to define its own interfaces and metadata.

`onecore` provides a common set of contracts so that these libraries can work together through a consistent API.

```text
                         Application
                              │
                         Use Cases
                              │
                    ┌─────────┴─────────┐
                    │      onecore      │
                    │                   │
                    │    Interfaces     │
                    │    Attribute      │
                    │    Transaction    │
                    │    Repository     │
                    │    Use Cases      │
                    └─────────┬─────────┘
                              │
        ┌──────────┬──────────┼──────────┬──────────┐
        │          │          │          │          │
    Database   Validation   Cache    Messaging   Logging
```

The implementation packages depend on these contracts, while application code can depend on the contracts rather than concrete infrastructure implementations.

```text
Application
    │
    ▼
UseCase / Service
    │
    ▼
Repository
    │
    ▼
Executor
    │
    ├── DB
    └── Transaction
```

## Features

* Shared TypeScript interfaces for the Core TS ecosystem
  * Unified `Attribute` metadata model
  * `ErrorMessage` for data validation
  * Generic `Filter` and `SearchResult` models
* Database executor and transaction abstractions
  * Type-safe database parameter abstraction
  * Repository abstractions for CRUD and search
* Reusable CRUD and Search use-case classes

* Interfaces with no runtime representation after TypeScript compilation
  * No framework dependency
  * Suitable for both backend and frontend projects
  * Tree-shakeable runtime code
## Unified metadata

The central concept in `onecore` is `Attribute`.

```ts
export interface Attribute {
  name?: string
  field?: string
  column?: string
  type?: DataType
  format?: FormatType
  required?: boolean

  key?: boolean
  unique?: boolean

  enum?: string[] | number[]

  noinsert?: boolean
  noupdate?: boolean
  nopatch?: boolean

  version?: boolean
  createdAt?: boolean
  updatedAt?: boolean

  length?: number
  min?: number | Date | string
  max?: number | Date | string
  gt?: number | Date | string
  lt?: number | Date | string

  precision?: number
  scale?: number
}
```

Unlike persistence-specific or validation-specific metadata, `Attribute` is the canonical metadata model shared across the entire ecosystem.

`Attribute` is intended to be shared by multiple parts of an application instead of maintaining separate metadata definitions for every subsystem.

For example, the same metadata can describe:

* Database mapping
* Validation
* Search
* Formatting
* Import
* Export
* Serialization

Individual libraries consume only the properties relevant to them.

```
                  Attribute
                      │
      ┌───────────────┼────────────────┐
      │               │                │
  Validation      Database       Import/Export
      │               │                │
validation-core   sql-core       import-service
                 postgres-kit      export-kit
                 mysql2-core
                 oracle-core
                 mssql-core
                 cassandra-core
                 mongodb-kit
```

Each library consumes only the properties that it understands.

For example:

Validation libraries use

* required
* format
* gt
* lt
* resource
* noValidate

Database libraries use

* noInsert
* noUpdate
* version
* createdAt
* updatedAt
* length
* type

The same metadata definition can therefore be used for

* Validation
* Database mapping
* CSV Import
* CSV Export
* Search
* Formatting
* Localization

without duplication.

## Data types

`onecore` defines a common `DataType` model:

```ts
export type DataType =
  | 'ObjectId'
  | 'date'
  | 'datetime'
  | 'time'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'string'
  | 'text'
  | 'object'
  | 'array'
  | 'binary'
  | 'primitives'
  | 'booleans'
  | 'numbers'
  | 'integers'
  | 'strings'
  | 'dates'
  | 'datetimes'
  | 'times'
```

Scalar and collection types can therefore share the same metadata system.

Formatting is represented separately:

```ts
export type FormatType =
  | 'currency'
  | 'percentage'
  | 'email'
  | 'url'
  | 'phone'
  | 'fax'
  | 'ipv4'
  | 'ipv6'
```

## Database abstraction

`onecore` provides a small database-independent execution contract.

```ts
export interface Executor {
  driver: string
  param(i: number): string
  query<T>(sql: string, args?: any[], m?: StringMap, bools?: Attribute[]): Promise<T[]>
  execute(sql: string, args?: any[]): Promise<number>
  executeBatch(statements: Statement[], requireFirstAffected?: boolean): Promise<number>
}
```

A database implementation is responsible for adapting this interface to its native driver.

### Parameter abstraction

Different databases use different parameter syntaxes.

For example:

```text
PostgreSQL   $1 $2 $3
MySQL        ? ? ?
Oracle       :1 :2 :3
SQL Server   @p1 @p2 @p3
```

`Executor.param()` allows higher-level SQL-building code to generate database-specific parameters without depending on a particular driver.

### Statements

A batch operation is represented by:

```ts
export interface Statement {
  query: string
  params?: any[]
}
```

This keeps batch execution independent of the underlying database implementation.

## Transactions

Transactions extend the same executor abstraction:

```ts
export interface Transaction extends Executor {
  commit(): Promise<void>
  rollback(): Promise<void>
}
```

A database provides transactions through:

```ts
export interface DB extends Executor {
  beginTransaction(): Promise<Transaction>
}
```

This allows repository code to use either the normal database executor or a transaction without knowing the underlying connection type.

For example:

```ts
const tx = await db.beginTransaction()

try {
  await userRepository.create(user, tx)
  await accountRepository.create(account, tx)

  await tx.commit()
} catch (err) {
  await tx.rollback()
  throw err
}
```

The transaction abstraction is particularly useful when several repositories participate in the same operation.

## Repository abstraction

`onecore` defines generic repository contracts for CRUD and search operations.

### CRUDRepository

```ts
export interface CRUDRepository<T, ID> {
  load(id: ID, tx?: Transaction): Promise<T | null>
  create(obj: T, tx?: Transaction): Promise<number>
  update(obj: T, tx?: Transaction): Promise<number>
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>
  delete(id: ID, tx?: Transaction): Promise<number>
}
```

The optional `Transaction` parameter allows the same repository method to participate in a larger transaction.

Normal operation:

```ts
await repository.create(user)
```

Transactional operation:

```ts
await repository.create(user, tx)
```

### SearchRepository

```ts
export interface SearchRepository<T, F extends Filter> {
  search(
    filter: F,
    limit: number,
    offset?: number | string,
    fields?: string[],
    tx?: Transaction
  ): Promise<SearchResult<T>>
}
```

The generic filter model is:

```ts
export interface Filter {
  page?: number
  limit: number
  fields?: string[]
  sort?: string
  q?: string
}
```

Search results are represented as:

```ts
export interface SearchResult<T> {
  list: T[]
  total?: number
  next?: string
}
```

This allows implementations to support result counts as well as cursor-style pagination.

## Repository

CRUD and search repositories can be combined:

```ts
export interface Repository<T, ID, F extends Filter>
  extends CRUDRepository<T, ID>, SearchRepository<T, F> {
}
```

An application can therefore define:

```ts
interface UserFilter extends Filter {
  active?: boolean
  role?: string
}

type UserRepository = Repository<User, string, UserFilter>
```

## Reusable use cases

`onecore` includes reusable application-layer classes so applications do not have to repeatedly write trivial forwarding logic.

### SearchUseCase

```ts
export class SearchUseCase<T, F extends Filter> {
  constructor(
    protected repository: SearchRepository<T, F>
  ) {}

  search(filter: F, limit: number, page?: number | string,
        fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(filter, limit, page, fields)
  }
}
```

### CRUDUseCase

```ts
export class CRUDUseCase<T, ID> {
  constructor(protected repository: CRUDRepository<T, ID>) {}

  load(id: ID): Promise<T | null> {
    return this.repository.load(id)
  }
  create(obj: T): Promise<number> {
    return this.repository.create(obj)
  }
  update(obj: T): Promise<number> {
    return this.repository.update(obj)
  }
  patch(obj: Partial<T>): Promise<number> {
    return this.repository.patch(obj)
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id)
  }
}
```

### UseCase

For applications that need both CRUD and search operations:

```ts
export class UseCase<T, ID, F extends Filter> {
  constructor(protected repository: Repository<T, ID, F>) {}

  search(filter: F, limit: number, page?: number | string,
        fields?: string[]): Promise<SearchResult<T>> {
    return this.repository.search(filter, limit, page, fields)
  }

  load(id: ID): Promise<T | null> {
    return this.repository.load(id)
  }
  create(obj: T): Promise<number> {
    return this.repository.create(obj)
  }
  update(obj: T): Promise<number> {
    return this.repository.update(obj)
  }
  patch(obj: Partial<T>): Promise<number> {
    return this.repository.patch(obj)
  }
  delete(id: ID): Promise<number> {
    return this.repository.delete(id)
  }
}
```

Applications can extend these classes when the default repository-to-use-case behavior is sufficient, and override methods when additional business logic is required.

## Services and results

Service contracts can be defined independently from the repository layer:

```ts
export interface SearchService<T, F extends Filter> {
  search(
    filter: F,
    limit: number,
    page?: number | string,
    fields?: string[]
  ): Promise<SearchResult<T>>
}
```

CRUD services expose application-facing operations:

```ts
export interface CRUDService<T, ID> {
  load(id: ID): Promise<T | null>
  create(obj: T): Promise<Result<T>>
  update(obj: T): Promise<Result<T>>
  patch(obj: Partial<T>): Promise<Result<T>>
  delete(id: ID): Promise<number>
}
```

Validation or application errors can be represented by:

```ts
export interface ErrorMessage {
  field: string
  code: string
  param?: string | number | Date
  message?: string
}
```

with:

```ts
export type Result<T> = number | T | ErrorMessage[]
```

This allows an application layer to return structured field-level errors without coupling the service interface to a particular validation library.

## Ecosystem

`onecore` is intended to be the common foundation for the Core TS packages.

Examples include:

```text
Database
├── sql-core
├── postgres-kit
├── mysql2-core
├── oracle-core
├── mssql-core
├── cassandra-core 
└── mongodb-kit

Validation
└── validation-core

Messaging
├── message-processing
├── nats-plus
├── redis-messaging
├── rabbitmq-transport
├── activemq
├── kafka-plus
└── ibmmq-plus

Cache
├── cache-plus
└── redis-plus

Other
├── import-service
├── export-kit
├── logger-core
├── health-service
├── locale-service
└── web-clients
```

These packages can share the same contracts and metadata model while remaining independently implemented.


## Shared Interfaces

`onecore` defines the common contracts used by the ecosystem.

### Database
* Statement
* DB
* Transaction
* SearchRepository
* CRUDRepository
* Repository

Implemented by

* sql-core
* mysql2-core
* oracle-core
* mssql-core
* postgres-kit
* cassandra-core
* mongodb-kit

### Validation

* Validator<T>

Implemented by

* validation-core

### Cache

* CachePort

Implemented by

* cache-plus
* redis-plus

### Message Queue

* Producer
* Consumer
* Publisher
* Subscriber

Implemented by

* message-processing
* redis-messaging
* nats-plus
* rabbitmq-transport
* activemq
* kafka-plus
* ibmmq-plus

### Logging

* Logger

Implemented by

* logger-core

### Health Check

* HealthChecker

Implemented by

* health-service

### HTTP

* HttpRequest
* HttpOptionsService

Implemented by

* web-clients

### Localization

* Locale
* Currency

Implemented by

* locale-service

## Zero-cost abstractions

One of the design goals of `onecore` is to provide shared APIs without imposing framework-level runtime overhead.

TypeScript interfaces such as:

```ts
Repository
Transaction
Executor
Validator
```

do not exist in the generated JavaScript.

Reusable classes such as `UseCase` are only included when they are actually imported and used, allowing modern bundlers to tree-shake unused code.

This makes the package suitable for both backend and frontend projects.

## Backend Support

Infrastructure services often depend only on interfaces.

Examples include

* Shared metadata
* Database transactions
* Repository contracts
* Application use cases
* Message Queue services
* Import services / Export services
* Infrastructure interfaces: Logging, Cache, Validation...

Since these projects do not use application-layer base classes, the generated JavaScript contains virtually no runtime code from `onecore`.

## Frontend Support

`onecore` works in frontend applications.

React applications commonly use

* Attribute
* Locale
* Currency
* Validator interfaces

without importing any backend service classes.

For example:

```ts
import type {
  Attribute,
  Filter,
  SearchResult
} from 'onecore'
```

This allows a frontend and backend to share the same domain metadata and contracts.

The final JavaScript bundle remains minimal because interfaces are removed during compilation and unused code is tree-shaken.

## Design principles

### One common contract

Infrastructure implementations should depend on common interfaces instead of forcing applications to depend on implementation details.

### Metadata reuse

Define metadata once and reuse it across database mapping, validation, search, serialization, import/export, and formatting.

### Database independence

Application and repository contracts should not expose a PostgreSQL client, MySQL connection, Oracle connection, or other driver-specific resource.

### Explicit transactions

Transactions are passed explicitly to repository operations when multiple operations must participate in the same atomic unit of work.

### Minimal runtime

Keep shared contracts in TypeScript interfaces and keep runtime implementations small and reusable.


## Sample Projects

The following sample applications demonstrate different ways of using `onecore`.

### CRUD Applications

* [sql-modular-sample](https://github.com/source-code-template/sql-modular-sample) — SQL modular microservice using MySQL
* [sql-simple-modular-sample](https://github.com/source-code-template/sql-simple-modular-sample) — SQL modular microservice using PosgreSQL
* [mongo-simple-modular-sample](https://github.com/source-code-template/mongo-simple-modular-sample) — MongoDB modular microservice

These projects extend the reusable CRUD and Search use-case classes.

### Import Data
- [import-sample](https://github.com/typescript-sample/import-sample): import a fix-length file to MySql.
- [import-csv-sample](https://github.com/typescript-sample/import-csv-sample): import a CSV file to MySql.

These projects depend only on interfaces and the shared `Attribute` metadata model.

### Export Data
- [postgres-export-sample](https://github.com/typescript-sample/postgres-export-sample): export data from Postgres to CSV.
- [mssql-export-sample](https://github.com/typescript-sample/mssql-export-sample): export data from MS SQL to CSV.
- [oracle-export-sample](https://github.com/typescript-sample/oracle-export-sample): export data from Oracle to CSV.
- [mysql-export-sample](https://github.com/typescript-sample/mysql-export-sample): export data from MySql to CSV.

These projects depend only on interfaces and the shared `Attribute` metadata model.

### Message Queue services
- [redis-messaging-sample](https://github.com/typescript-tutorial/redis-messaging-sample): An example to consume message from Redis.
- [rabbitmq-sample](https://github.com/typescript-tutorial/rabbitmq-sample): An example to consume message from rabbitmq.
- [activemq-sample](https://github.com/typescript-tutorial/activemq-sample): An example to consume message from activemq.
- [pubsub-sample](https://github.com/typescript-tutorial/pubsub-sample): An example to consume message from pubsub.
- [ibmmq-sample](https://github.com/typescript-tutorial/ibmmq-sample): An example to consume message from ibmmq.
- [kafka-sample](https://github.com/typescript-tutorial/kafka-sample): An example to consume message from kafka.
- [nats-sample](https://github.com/typescript-tutorial/nats-sample): An example to consume message from nats.
- [sqs-sample](https://github.com/typescript-tutorial/sqs-sample): An example to consume message from AWS sqs.

These projects depend only on interfaces and the shared `Attribute` metadata model.

## License

MIT


# TypeScript Repository & Service Abstraction

A lightweight TypeScript abstraction for building database-backed applications using repositories, services/use cases, transactions, and metadata-driven attributes.

The library separates database execution from persistence and application-facing operations while keeping the API generic across database implementations.

## Architecture

```text
┌──────────────────────────────┐
│       Service / UseCase      │
│ SearchUseCase                │
│ CRUDUseCase                  │
│ UseCase                      │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│         Repository           │
│ SearchRepository             │
│ CRUDRepository               │
│ Repository                   │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│       Database Layer         │
│ Executor                     │
│ Transaction                  │
│ DB                           │
└──────────────┬───────────────┘
               │
               ▼
        Database Driver
```

## Core Concepts

### Attribute metadata

`Attribute` describes how an application field should be mapped, validated, searched, formatted, or persisted.

```ts
const attributes: Attributes = {
  id: {
    field: 'id',
    column: 'user_id',
    type: 'ObjectId',
    key: true,
  },

  email: {
    field: 'email',
    column: 'email_address',
    type: 'string',
    format: 'email',
    required: true,
    unique: true,
  },

  age: {
    field: 'age',
    type: 'integer',
    min: 0,
    max: 150,
  },
};
```

Supported data types include:

```ts
type DataType =
  | 'ObjectId'
  | 'date'
  | 'datetime'
  | 'time'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'string'
  | 'text'
  | 'object'
  | 'array'
  | 'binary'
  | 'primitives'
  | 'booleans'
  | 'numbers'
  | 'integers'
  | 'strings'
  | 'dates'
  | 'datetimes'
  | 'times';
```

Supported formats include:

```ts
type FormatType =
  | 'currency'
  | 'percentage'
  | 'email'
  | 'url'
  | 'phone'
  | 'fax'
  | 'ipv4'
  | 'ipv6';
```

## Database Executor

`Executor` is the low-level database abstraction.

```ts
export interface Executor {
  driver: string;

  param(i: number): string;

  execute(
    sql: string,
    args?: any[]
  ): Promise<number>;

  executeBatch(
    statements: Statement[],
    firstSuccess?: boolean
  ): Promise<number>;

  query<T>(
    sql: string,
    args?: any[],
    m?: StringMap,
    bools?: Attribute[]
  ): Promise<T[]>;
}
```

The application can therefore depend on `Executor` rather than directly depending on a specific database driver.

### Statements

A batch statement is represented by:

```ts
export interface Statement {
  query: string;
  params?: any[];
}
```

Example:

```ts
const statements: Statement[] = [
  {
    query: 'UPDATE users SET active = ? WHERE id = ?',
    params: [true, 1],
  },
  {
    query: 'INSERT INTO audit_log(action) VALUES (?)',
    params: ['activate-user'],
  },
];

await executor.executeBatch(statements);
```

## Transactions

A transaction extends `Executor`:

```ts
export interface Transaction extends Executor {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
```

Transactions can be passed explicitly to repository operations.

```ts
const tx = await db.beginTransaction();

try {
  await userRepository.create(user, tx);
  await auditRepository.create(audit, tx);

  await tx.commit();
} catch (error) {
  await tx.rollback();
  throw error;
}
```

### Transaction ownership

The recommended ownership model is:

> The caller that creates the transaction owns the transaction and is responsible for committing or rolling it back.

A repository should not commit or roll back a transaction supplied by its caller.

## Repository Layer

### CRUD repository

```ts
export interface CRUDRepository<T, ID> {
  load(id: ID, tx?: Transaction): Promise<T | null>;
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
```

Typical usage:

```ts
const user = await repository.load(userId);

if (!user) {
  // not found
}

await repository.create(user);

await repository.update(user);

await repository.patch({
  id: user.id,
  name: 'Updated name',
});

await repository.delete(user.id);
```

The optional `Transaction` allows multiple repository operations to participate in the same transaction.

## Search Repository

Search is separated from CRUD:

```ts
export interface SearchRepository<T, F extends Filter> {
  search(
    s: F,
    limit: number,
    offset?: number | string,
    fields?: string[],
    tx?: Transaction
  ): Promise<SearchResult<T>>;
}
```

A typical filter contains:

```ts
export interface Filter {
  page?: number;
  limit: number;
  fields?: string[];
  sort?: string;
  q?: string;
}
```

Search results are represented by:

```ts
export interface SearchResult<T> {
  list: T[];
  total?: number;
  next?: string;
}
```

Example:

```ts
const result = await userRepository.search(
  {
    q: 'john',
    limit: 20,
    page: 1,
    sort: 'name',
  },
  20,
);

console.log(result.list);
console.log(result.total);
console.log(result.next);
```

## Combined Repository

For entities that support both CRUD and search:

```ts
export interface Repository<T, ID, F extends Filter>
  extends CRUDRepository<T, ID>,
    SearchRepository<T, F> {
}
```

Example:

```ts
interface UserFilter extends Filter {
  active?: boolean;
}

interface User {
  id: string;
  name: string;
  email: string;
  active: boolean;
}

class UserRepository
  implements Repository<User, string, UserFilter> {

  // implementation
}
```

## Service / Use Case Layer

The service layer exposes repository operations without exposing transactions or database details to the caller.

### CRUD service

```ts
export interface CRUDService<T, ID> {
  load(id: ID): Promise<T | null>;
  create(obj: T): Promise<Result<T>>;
  update(obj: T): Promise<Result<T>>;
  patch(obj: Partial<T>): Promise<Result<T>>;
  delete(id: ID): Promise<number>;
}
```

### Search service

```ts
export interface SearchService<T, F extends Filter> {
  search(
    s: F,
    limit: number,
    page?: number | string,
    fields?: string[]
  ): Promise<SearchResult<T>>;
}
```

### Combined service

```ts
export interface Service<T, ID, F extends Filter>
  extends CRUDService<T, ID>,
    SearchService<T, F> {
}
```

## Use Case Implementations

`SearchUseCase` delegates search operations:

```ts
const useCase = new SearchUseCase(userRepository);

const result = await useCase.search(
  {
    q: 'john',
    limit: 20,
  },
  20,
);
```

`CRUDUseCase` delegates CRUD operations:

```ts
const useCase = new CRUDUseCase(userRepository);

const user = await useCase.load(id);

await useCase.create(userData);
await useCase.update(userData);
await useCase.patch({ id, name: 'New name' });
await useCase.delete(id);
```

`UseCase` combines both APIs:

```ts
const useCase = new UseCase(userRepository);

const result = await useCase.search(
  {
    q: 'john',
    limit: 20,
  },
  20,
);

const user = await useCase.load(id);
```

These classes are intentionally thin. They provide an application-facing boundary where business rules can be added without coupling controllers or handlers directly to repositories.

## Error Model

Validation/application errors are represented by:

```ts
export interface ErrorMessage {
  field: string;
  code: string;
  param?: string | number | Date;
  message?: string;
}
```

The current result type is:

```ts
export type Result<T> =
  | number
  | T
  | ErrorMessage[];
```

For example, an implementation may return:

```ts
[
  {
    field: 'email',
    code: 'invalid',
    message: 'Invalid email address',
  },
]
```

For larger applications, a discriminated result type is recommended because it makes success and failure states easier to distinguish.

## Security Considerations

### Always parameterize values

Do not construct SQL by interpolating user-provided values.

Prefer:

```ts
await executor.execute(
  'UPDATE users SET name = ? WHERE id = ?',
  [name, id],
);
```

Avoid:

```ts
await executor.execute(
  `UPDATE users SET name = '${name}' WHERE id = '${id}'`,
);
```

### Validate SQL identifiers

Fields, columns, and sort expressions are different from ordinary values.

For example:

```ts
filter.sort
filter.fields
attribute.column
```

should not be inserted into SQL without validation or an allowlist.

Prefer mapping application-level names to trusted database columns:

```ts
const columns = {
  id: 'user_id',
  name: 'user_name',
  createdAt: 'created_at',
};
```

Never treat an arbitrary `sort` or `fields` value as trusted SQL.

## Design Guidelines

### Repository responsibilities

Repositories should focus on:

* persistence
* SQL generation/execution
* mapping database rows to application objects
* transaction participation

They should not normally contain HTTP concerns or presentation logic.

### Use case responsibilities

Use cases are the preferred location for:

* business rules
* orchestration across multiple repositories
* authorization decisions
* transaction coordination
* application-level validation

### Transaction coordination

For operations spanning multiple repositories:

```ts
const tx = await db.beginTransaction();

try {
  await repositoryA.update(a, tx);
  await repositoryB.create(b, tx);

  await tx.commit();
} catch (error) {
  await tx.rollback();
  throw error;
}
```

This keeps transaction lifecycle management outside individual repositories.

## Known API Considerations

The current API has several areas that should be kept in mind when extending the library.

### Filter and search pagination

`Filter` already contains:

```ts
page
limit
fields
```

while `SearchRepository.search()` also accepts:

```ts
limit
offset
fields
```

These represent overlapping concepts. A future API revision should establish a single source of truth for pagination and selected fields.

### Attribute responsibilities

`Attribute` currently combines:

* database mapping
* validation
* formatting
* search metadata
* CRUD restrictions
* serialization
* relationship metadata

This is convenient for a small framework but may become difficult to maintain as the number of features grows.

### Result type

```ts
number | T | ErrorMessage[]
```

is intentionally flexible but can be difficult for callers to discriminate safely. A future version may use discriminated result objects.

### Patch behavior

`patch()` uses `Partial<T>`. This is convenient, but it does not express rules such as:

* immutable fields
* required primary keys
* fields that cannot be patched
* fields that are read-only

Those rules currently need to be enforced through metadata or repository logic.

## Recommended Improvements

For future versions, consider:

1. Use `unknown[]` instead of `any[]` for SQL parameters.
2. Define explicit search pagination semantics.
3. Replace free-form `sort` strings with validated sort definitions.
4. Separate validation, persistence, search, and formatting metadata from `Attribute`.
5. Replace `Result<T>` with a discriminated result type.
6. Remove defensive checks for methods that are already required by TypeScript interfaces.
7. Clearly document transaction ownership.
8. Consider separate types for database entities, create inputs, update inputs, and patch inputs.
9. Export `StringMap` if it is intended to be part of the public API.
10. Use descriptive parameter/property names instead of ambiguous names such as `bools`, `true`, `false`, and `typeof`.

## Summary

This library provides a clean foundation for a TypeScript application using:

```text
Database
   ↓
Executor
   ↓
Transaction / Repository
   ↓
Use Case / Service
   ↓
Application
```

Its main strengths are its small API surface, generic repository interfaces, explicit transaction support, and separation between persistence and application layers.

The most important areas to control as the framework evolves are SQL identifier safety, search/pagination consistency, transaction ownership, the overloaded `Attribute` metadata model, and the `Result<T>` error contract.

MIT

# TypeScript Application Core

A set of TypeScript interfaces, types, and lightweight use-case implementations for building applications around repositories, databases, validation, caching, logging, and messaging.

The library is designed around **interfaces and dependency inversion**, allowing application code to depend on abstractions rather than concrete infrastructure implementations.

## Features

* Generic CRUD and search repositories
* Database executor and transaction abstractions
* Application service/use-case contracts
* Validation contracts and structured validation errors
* Cache port abstraction
* Structured logger abstraction
* Generic messaging and message-envelope types
* Shared schema and attribute metadata
* Strong generic typing for entities, IDs, filters, and messages

## Architecture

The main dependency flow is:

```text
Application
    │
    ▼
UseCase / Service
    │
    ▼
Repository
    │
    ▼
Executor
    │
    ├── DB
    └── Transaction
```

Infrastructure services are exposed through ports:

```text
Application
    ├── CachePort
    ├── Logger
    └── Messaging ports
```

This keeps business/application code independent from concrete database, cache, logging, and messaging implementations.

---

# Core Types

## Data types

`DataType` describes supported field types:

```ts
type DataType =
  | 'ObjectId'
  | 'date'
  | 'datetime'
  | 'time'
  | 'boolean'
  | 'number'
  | 'integer'
  | 'string'
  | 'text'
  | 'object'
  | 'array'
  | 'binary'
  | 'primitives'
  | 'booleans'
  | 'numbers'
  | 'integers'
  | 'strings'
  | 'dates'
  | 'datetimes'
  | 'times';
```

`FormatType` provides common semantic formats:

```ts
type FormatType =
  | 'currency'
  | 'percentage'
  | 'email'
  | 'url'
  | 'phone'
  | 'fax'
  | 'ipv4'
  | 'ipv6';
```

`Operator` defines supported query operations:

```ts
type Operator =
  | '='
  | 'like'
  | '!='
  | '<>'
  | '>'
  | '>='
  | '<'
  | '<=';
```

## Attribute metadata

`Attribute` describes a model field and can contain database, validation, search, formatting, and persistence metadata.

```ts
const attributes: Attributes = {
  email: {
    field: 'email',
    type: 'string',
    format: 'email',
    required: true,
    unique: true
  },

  age: {
    field: 'age',
    type: 'integer',
    min: 0
  }
};
```

Common attributes include:

| Property                  | Purpose                       |
| ------------------------- | ----------------------------- |
| `field`                   | Application field name        |
| `column`                  | Database column               |
| `type`                    | Field data type               |
| `format`                  | Semantic/display format       |
| `required`                | Required-field validation     |
| `operator`                | Default query operator        |
| `enum`                    | Allowed values                |
| `min` / `max`             | Range validation              |
| `gt` / `lt`               | Exclusive range validation    |
| `length`                  | Length constraint             |
| `precision` / `scale`     | Numeric precision             |
| `exp`                     | Regular-expression validation |
| `key`                     | Primary/key metadata          |
| `unique`                  | Uniqueness metadata           |
| `version`                 | Version field                 |
| `createdAt` / `updatedAt` | Audit timestamps              |
| `noinsert`                | Exclude from insert           |
| `noupdate`                | Exclude from update           |
| `nopatch`                 | Exclude from patch            |
| `ignored`                 | Ignore the field              |
| `jsonField`               | JSON field mapping            |
| `link`                    | Related-resource metadata     |
| `getString`               | Custom string conversion      |

---

# Filtering and Search

`Filter` represents a generic search filter:

```ts
interface Filter {
  page?: number;
  limit: number;
  fields?: string[];
  sort?: string;
  q?: string;
}
```

A search returns:

```ts
interface SearchResult<T> {
  list: T[];
  total?: number;
  next?: string;
}
```

Example:

```ts
interface UserFilter extends Filter {
  status?: string;
  role?: string;
}
```

Repositories can then provide strongly typed search:

```ts
interface UserRepository
  extends Repository<User, string, UserFilter> {}
```

---

# Database Abstractions

## Executor

`Executor` abstracts database operations:

```ts
interface Executor {
  driver: string;

  param(i: number): string;

  execute(
    sql: string,
    args?: any[]
  ): Promise<number>;

  executeBatch(
    statements: Statement[],
    firstSuccess?: boolean
  ): Promise<number>;

  query<T>(
    sql: string,
    args?: any[],
    m?: StringMap,
    bools?: Attribute[]
  ): Promise<T[]>;
}
```

A repository does not need to know which database driver is being used.

## Transaction

`Transaction` extends `Executor`:

```ts
interface Transaction extends Executor {
  commit(): Promise<void>;
  rollback(): Promise<void>;
}
```

Typical usage:

```ts
const tx = await db.beginTransaction();

try {
  await tx.execute(...);
  await tx.execute(...);

  await tx.commit();
} catch (error) {
  await tx.rollback();
  throw error;
}
```

Transaction state management remains the responsibility of the concrete implementation.

## DB

```ts
interface DB extends Executor {
  beginTransaction(): Promise<Transaction>;
}
```

A concrete database adapter can implement `DB` while repositories depend only on the interface.

---

# Repositories

The repository layer separates persistence operations from application logic.

## CRUD repository

```ts
interface CRUDRepository<T, ID> {
  load(id: ID, tx?: Transaction): Promise<T | null>;
  create(obj: T, tx?: Transaction): Promise<number>;
  update(obj: T, tx?: Transaction): Promise<number>;
  patch(obj: Partial<T>, tx?: Transaction): Promise<number>;
  delete(id: ID, tx?: Transaction): Promise<number>;
}
```

## Search repository

```ts
interface SearchRepository<T, F extends Filter> {
  search(
    s: F,
    limit: number,
    offset?: number | string,
    fields?: string[],
    tx?: Transaction
  ): Promise<SearchResult<T>>;
}
```

## Combined repository

```ts
interface Repository<T, ID, F extends Filter>
  extends CRUDRepository<T, ID>,
    SearchRepository<T, F> {}
```

This allows CRUD and search capabilities to be combined without forcing unrelated implementations into one interface.

---

# Use Cases and Services

The library provides thin application-layer implementations.

## SearchUseCase

```ts
class SearchUseCase<T, F extends Filter>
  implements SearchService<T, F> {

  constructor(
    protected repository: SearchRepository<T, F>
  ) {}

  search(
    filter: F,
    limit: number,
    page?: number | string,
    fields?: string[]
  ): Promise<SearchResult<T>> {
    return this.repository.search(
      filter,
      limit,
      page,
      fields
    );
  }
}
```

## CRUDUseCase

```ts
class CRUDUseCase<T, ID>
  implements CRUDService<T, ID> {

  constructor(
    protected repository: CRUDRepository<T, ID>
  ) {}

  load(id: ID) {
    return this.repository.load(id);
  }

  create(obj: T) {
    return this.repository.create(obj);
  }

  update(obj: T) {
    return this.repository.update(obj);
  }

  patch(obj: Partial<T>) {
    return this.repository.patch(obj);
  }

  delete(id: ID) {
    return this.repository.delete(id);
  }
}
```

## Combined UseCase

```ts
class UseCase<T, ID, F extends Filter>
  implements Service<T, ID, F> {

  constructor(
    protected repository: Repository<T, ID, F>
  ) {}

  // CRUD + search operations
}
```

These classes are intentionally thin. Business rules can be added at the use-case layer without coupling them to database implementations.

---

# Services

The service contracts provide an application-facing API:

```ts
interface SearchService<T, F extends Filter> {
  search(
    s: F,
    limit: number,
    page?: number | string,
    fields?: string[]
  ): Promise<SearchResult<T>>;
}

interface CRUDService<T, ID> {
  load(id: ID): Promise<T | null>;
  create(obj: T): Promise<Result<T>>;
  update(obj: T): Promise<Result<T>>;
  patch(obj: Partial<T>): Promise<Result<T>>;
  delete(id: ID): Promise<number>;
}
```

The combined service is:

```ts
interface Service<T, ID, F extends Filter>
  extends CRUDService<T, ID>,
    SearchService<T, F> {}
```

---

# Validation

Validation is abstracted behind:

```ts
interface Validator<T> {
  validate(
    model: T,
    resource?: StringMap,
    patch?: boolean
  ): Promise<ErrorMessage[]>;
}
```

Validation errors use:

```ts
interface ErrorMessage {
  field: string;
  code: string;
  param?: string | number | Date;
  message?: string;
}
```

Example:

```ts
[
  {
    field: 'email',
    code: 'format',
    message: 'Invalid email address'
  },
  {
    field: 'age',
    code: 'min',
    param: 18,
    message: 'Age must be at least 18'
  }
]
```

---

# Result Type

Service methods use:

```ts
type Result<T> =
  | number
  | T
  | ErrorMessage[];
```

This allows a service to represent an operation result, returned model, or validation errors.

Because this is a broad union, consumers should define clear runtime handling conventions. A discriminated result type is preferable for new APIs where backwards compatibility is not required.

---

# Caching

`CachePort<K, V>` provides a database-independent cache abstraction:

```ts
interface CachePort<K, V> {
  isEnabled?(): boolean;

  put(
    key: K,
    obj: V,
    expiresInSeconds?: number
  ): Promise<boolean>;

  expire(
    key: K,
    timeToLive: number
  ): Promise<boolean>;

  get(key: K): Promise<V>;

  getMany(keys: K[]): Promise<V[]>;

  containsKey(key: K): Promise<boolean>;

  remove(key: K): Promise<boolean>;

  clear(): Promise<boolean>;

  keys(): Promise<string[]>;

  count(): Promise<number>;

  size(): Promise<number>;
}
```

This allows implementations for Redis, in-memory caches, distributed caches, or other storage systems without changing application code.

---

# Logging

The logging layer consists of configuration types and a `Logger` interface.

## Logger

```ts
interface Logger {
  name: Name;
  level: number;
  map: LogMap;
  constants?: SimpleMap;

  trace(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  debug(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  info(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  warn(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  error(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  panic(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  fatal(
    msg: string,
    m?: SimpleMap,
    ctx?: any
  ): void;

  isLevelEnabled(level: number): boolean;
  isTraceEnabled(): boolean;
  isDebugEnabled(): boolean;
  isInfoEnabled(): boolean;
  isWarnEnabled(): boolean;
  isErrorEnabled(): boolean;
  isPanicEnabled(): boolean;
  isFatalEnabled(): boolean;
}
```

Logging configuration supports level names, field mappings, and constant metadata.

Example:

```ts
const config: LogConfig = {
  log: {
    level: 'info',
    map: {
      time: 'timestamp',
      level: 'level',
      msg: 'message'
    }
  }
};
```

---

# Messaging

The library provides generic producer and consumer contracts.

## Processing functions

```ts
type Process<T, R, M> =
  (
    data: T,
    attributes?: StringMap,
    msg?: M
  ) => Promise<R>;

type Handle<T, R, M> =
  (
    data: T,
    attributes?: StringMap,
    msg?: M
  ) => Promise<R>;
```

## Produce / write operations

```ts
type Produce<T, R> =
  (data: T) => Promise<R>;
```

Aliases are provided for common terminology:

```ts
type Write<T, R> = Produce<T, R>;
type Publish<T, R> = Produce<T, R>;
type Send<T, R> = Produce<T, R>;
type Put<T, R> = Produce<T, R>;
type Set<T, R> = Produce<T, R>;
```

## Consume operations

```ts
type Consume<T> =
  (
    handle: (
      data: T,
      header?: StringMap
    ) => Promise<number>
  ) => void;
```

Aliases include:

```ts
type Read<T> = Consume<T>;
type Subscribe<T> = Consume<T>;
type Receive<T> = Consume<T>;
type Get<T> = Consume<T>;
type Fetch<T> = Consume<T>;
```

---

# Message Envelope

`Message<T, ID, R>` represents a generic transport message:

```ts
interface Message<T, ID, R> {
  id?: ID;
  data?: T;
  attributes?: StringMap;
  timestamp?: Date;
  raw?: R;
}
```

This allows application code to work with a normalized message representation while retaining the original transport payload through `raw`.

---

# Producers

```ts
interface Producer<T, R, ID> {
  produce(
    to: string,
    data: T,
    attributes?: StringMap,
    id?: ID
  ): Promise<R>;
}
```

Equivalent concepts are provided for publishing and sending:

```ts
interface Publisher<T, R, ID> {
  publish(
    to: string,
    data: T,
    attributes?: StringMap,
    id?: ID
  ): Promise<R>;
}

interface Sender<T, R, ID> {
  send(
    to: string,
    data: T,
    attributes?: StringMap,
    id?: ID
  ): Promise<R>;
}
```

---

# Consumers

Several consumer styles are available:

```ts
interface SimpleConsumer<T, R> {
  consume(
    process: (
      data: T,
      attributes?: StringMap,
      raw?: R
    ) => Promise<number>
  ): void;
}

interface SimpleSubscriber<T, R> {
  subscribe(
    process: (
      data: T,
      attributes?: StringMap,
      raw?: R
    ) => Promise<number>
  ): void;
}
```

Message-envelope based consumers are also available:

```ts
interface MessageSubscriber<T, ID, R> {
  subscribe(
    process: (
      data: Message<T, ID, R>
    ) => Promise<number>
  ): void;
}
```

---

# Retry

Retry configuration is represented by:

```ts
interface RetryConfig {
  name: string;
  limit: number;
}
```

Concrete messaging implementations can use this configuration to determine retry policies.

---

# Design Principles

## Dependency inversion

Application code should depend on interfaces such as:

```text
Repository
CachePort
Validator
Logger
Producer
Consumer
```

rather than concrete infrastructure implementations.

## Generic programming

Most contracts are generic:

```text
T  = entity/message data
ID = entity/message identifier
F  = search-filter type
R  = raw/transport/result type
```

This allows the same abstractions to be reused across different domains.

## Separation of concerns

Persistence, validation, application logic, infrastructure, and messaging are deliberately represented as separate contracts.

---

# Important Implementation Considerations

## SQL safety

Dynamic SQL identifiers such as:

```text
field
column
sort
fields
```

must be validated against an allowlist before being included in SQL.

Query values should always be passed as parameters.

Do not build SQL by directly concatenating untrusted values.

## Transaction lifecycle

A failed `commit()` does not necessarily mean that a subsequent `rollback()` can safely or successfully complete the transaction. Concrete transaction implementations should explicitly manage transaction state and connection cleanup.

## Cache misses

Concrete `CachePort` implementations should define and document how `get()` behaves when a key does not exist.

## Message lifecycle

Messaging implementations should document:

* acknowledgment behavior
* retry behavior
* concurrency
* ordering guarantees
* error handling
* cancellation/shutdown
* backpressure

The interfaces themselves intentionally leave these transport-specific details open.

---

# Example Domain

A simple user repository can be modeled as:

```ts
interface User {
  id: string;
  name: string;
  email: string;
}

interface UserFilter extends Filter {
  role?: string;
  active?: boolean;
}

interface UserRepository
  extends Repository<User, string, UserFilter> {}
```

The application layer can then depend on:

```ts
class UserUseCase
  extends UseCase<User, string, UserFilter> {}
```

A concrete infrastructure adapter implements `UserRepository` using the database implementation behind `Executor`.

---

# Recommended Project Structure

A project using this library can be organized as:

```text
src/
├── domain/
│   └── user/
│       ├── user.ts
│       └── user-filter.ts
│
├── application/
│   └── user/
│       └── user-use-case.ts
│
├── repository/
│   └── user-repository.ts
│
├── infrastructure/
│   ├── database/
│   │   ├── executor.ts
│   │   └── transaction.ts
│   ├── cache/
│   ├── logging/
│   └── messaging/
│
└── validation/
    └── user-validator.ts
```

---

# Summary

This package provides a reusable set of TypeScript contracts for applications that follow a layered or ports-and-adapters architecture.

The central flow is:

```text
          ┌──────────────┐
          │  Controller  │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │   UseCase    │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │ Repository   │
          └──────┬───────┘
                 │
                 ▼
          ┌──────────────┐
          │  Executor    │
          └──────┬───────┘
                 │
                 ▼
             Database
```

Supporting infrastructure is exposed through independent ports:

```text
              Application
              /    |     \
             /     |      \
      Validator  Cache     Logger
                         \
                         Messaging
```

The interfaces are intentionally implementation-independent, making the package suitable as a shared foundation for multiple services, databases, cache systems, and messaging transports.


MIT
