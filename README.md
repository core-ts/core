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

* Database
* Validation
* Cache
* Message Queue
* Logging
* Health Check
* HTTP clients
* Import / Export
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
                    │  Interfaces       │
                    │  Attribute        │
                    │  Repository       │
                    │  Transaction      │
                    │  Use Cases        │
                    └─────────┬─────────┘
                              │
        ┌──────────┬──────────┼──────────┬──────────┐
        │          │          │          │          │
    Database   Validation   Cache    Messaging   Logging
```

The implementation packages depend on these contracts, while application code can depend on the contracts rather than concrete infrastructure implementations.

## Features

* Shared TypeScript interfaces for the Core TS ecosystem
* Unified `Attribute` metadata model
* Database executor and transaction abstractions
* Repository abstractions for CRUD and search
* Reusable CRUD and Search use-case classes
* Generic filtering and search result models
* Type-safe database parameter abstraction
* No framework dependency
* Interfaces with no runtime representation after TypeScript compilation
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
 Validation       Database        Import/Export
      │               │                │
validation-core   sql-core        import-service
                 mysql2-core        export-kit
                 mssql-core
                 oracle-core
                 postgres-kit
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
  execute(sql: string, args?: any[]): Promise<number>
  executeBatch(statements: Statement[], requireFirstAffected?: boolean): Promise<number>
  query<T>(sql: string, args?: any[], m?: StringMap, bools?: Attribute[]): Promise<T[]>
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

### CRUD

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

### Search

```ts
export interface SearchRepository<T, F extends Filter> {
  search(
    s: F,
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

## Combined repositories

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

### Combined UseCase

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
export type Result<T> =
  | number
  | T
  | ErrorMessage[]
```

This allows an application layer to return structured field-level errors without coupling the service interface to a particular validation library.

## Ecosystem

`onecore` is intended to be the common foundation for the Core TS packages.

Examples include:

```text
Database
├── sql-core
├── mysql2-core
├── postgres-kit
├── oracle-core
├── mssql-core
└── mongodb-kit

Validation
└── validation-core

Messaging
├── message-processing
├── nats-plus
├── redis-messaging
├── rabbitmq-transport
├── activemq
└── ibmmq-plus

Cache
├── cache-plus
└── redis-plus

Other
├── logger-core
├── health-service
├── web-clients
├── locale-service
├── import-service
└── export-kit
```

These packages can share the same contracts and metadata model while remaining independently implemented.


## Shared Interfaces

`onecore` defines the common contracts used by the ecosystem.

### Database
* SearchRepository
* CRUDRepository
* Repository
* Transaction
* Statement
* QueryBuilder

Implemented by

* sql-core
* mysql2-core
* oracle-core
* mssql-core
* postgres-kit
* cassandra-core
* mongodb-kit

---

### Validation

* Validator<T>

Implemented by

* validation-core

---

### Cache

* CachePort

Implemented by

* cache-plus
* redis-plus

---

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
* ActiveMQ libraries

---

### Logging

* Logger

Implemented by

* logger-core

---

### Health Check

* HealthChecker

Implemented by

* health-service

---

### HTTP

* HttpRequest
* HttpOptionsService

Implemented by

* web-clients

---

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

## Backend and frontend

Backend applications can use `onecore` for:

* Repository contracts
* Database transactions
* Shared metadata
* Application use cases
* Infrastructure interfaces

Frontend applications can use shared models and metadata without needing to import backend implementations.

For example:

```ts
import type {
  Attribute,
  Filter,
  SearchResult
} from 'onecore'
```

This allows a frontend and backend to share the same domain metadata and contracts.

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

## License

MIT

# Frontend Support

`onecore` works in frontend applications.

React applications commonly use

* Attribute
* Locale
* Currency
* Validator interfaces

without importing any backend service classes.

The final JavaScript bundle remains minimal because interfaces are removed during compilation and unused code is tree-shaken.

---

# Backend Support

Infrastructure services often depend only on interfaces.

Examples include

* Message Queue services
* Import services
* Export services
* Background workers

Since these projects do not use application-layer base classes, the generated JavaScript contains virtually no runtime code from `onecore`.

---

# Sample Projects

The following sample applications demonstrate different ways of using `onecore`.

### CRUD Applications

* [**sql-modular-sample**](https://github.com/source-code-template/sql-modular-sample) — SQL modular microservice using MySQL
* [**sql-simple-modular-sample**](https://github.com/source-code-template/sql-simple-modular-sample) — SQL modular microservice using PosgreSQL
* [**mongo-simple-modular-sample**](https://github.com/source-code-template/mongo-simple-modular-sample) — MongoDB modular microservice

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

---

# Design Principles

* Interface-first architecture
* Dependency inversion
* Clean Architecture
* Hexagonal Architecture
* Tree-shakeable design
* Shared metadata model
* Framework independent
* Enterprise ready

---

# License

MIT
