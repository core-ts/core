# onecore

> The shared foundation for the Core TS ecosystem.

`onecore` provides the common contracts, metadata model, and reusable application-layer base classes used throughout the Core TS ecosystem.

It allows libraries such as **sql-core**, **mysql2-core**, **postgres-kit**, **mongodb-kit**, **validation-core**, **cache-plus**, **redis-plus**, **message-processing**, **nats-plus**, **redis-messaging**, **rabbitmq-transport**, **logger-core**, and **health-service** to work together through a unified API.

## Features

* Common interfaces for enterprise applications
* Unified metadata model (`Attribute`)
* Reusable CRUD and Search use-case base classes
* Zero-cost abstractions through TypeScript interfaces
* Tree-shakeable architecture
* Works in both backend and frontend applications
* No framework dependency
* Fully written in TypeScript

---

# Installation

```bash
npm install onecore
```

---

# Why onecore?

Enterprise applications often use many infrastructure libraries.

For example:

* Database
* Validation
* Cache
* Message Queue
* Logging
* Health Check
* Import/Export

Without a shared foundation, every library exposes its own interfaces and metadata.

```text
Repository      (sql)
Validator       (validation)
Producer        (mq)
Logger          (logger)
Cache           (cache)
```

`onecore` provides a single common language for the entire ecosystem.

```ts
import {
    Repository,
    Validator,
    Producer,
    CachePort,
    Logger,
    HealthChecker
} from "onecore";
```

Applications only depend on **onecore**, while implementation libraries implement these contracts.

---

# Ecosystem

```
                                 Applications
        ┌───────────────────────────────────────────────────────────────┐
        │                                                               │
        │  React Apps • REST APIs • Microservices • Workers • CLI       │
        │                                                               │
        └───────────────────────────────────────────────────────────────┘
                                      ▲
                                      │
                           Reusable Use Cases (Optional)
                     CRUD • Search • View • Generic Services
                                      ▲
                                      │
    ┌─────────────────────────────────────────────────────────────────────────────────┐
    │                                onecore                                          │
    │                                                                                 │
    │  • Common Interfaces                                                            │
    │  • Unified Attribute Metadata                                                   │
    │  • Locale & Currency                                                            │
    │  • Shared Models                                                                │
    │  • Reusable Service Layer                                                       │
    └─────────────────────────────────────────────────────────────────────────────────┘
         ▲                  ▲                  ▲                  ▲                 ▲
         │                  │                  │                  │                 │
         │                  │                  │                  │                 │
┌────────────────┐ ┌────────────────┐ ┌──────────────────┐ ┌────────────────┐ ┌────────────────┐
│    Database    │ │   Validation   │ │   Messaging      │ │ Import / Export│ │     Cache      │
├────────────────┤ ├────────────────┤ ├──────────────────┤ ├────────────────┤ ├────────────────┤
│ sql-core       │ │validation-core │ │message-processing│ │import-service  │ │ cache-plus     │
│ mysql2-core    │ │                │ │nats-plus         │ │export-kit      │ │ redis-plus     │
│ postgres-kit   │ │                │ │redis-messaging   │ │                │ │                │
│ oracle-core    │ │                │ │rabbitmq-transport│ │                │ │                │
│ mssql-core     │ │                │ │activemq          │ │                │ │                │
│ mongodb-kit    │ │                │ │ibmmq-plus        │ │                │ │                │
└────────────────┘ └────────────────┘ └──────────────────┘ └────────────────┘ └────────────────┘

```

All libraries share the same interfaces defined by `onecore`.

---

# Zero-Cost Abstractions

One of the goals of `onecore` is to provide a common API **without adding runtime overhead**.

## Interfaces

Interfaces disappear after TypeScript compilation.

```ts
import { Repository, Validator } from "onecore";
```

The generated JavaScript contains no implementation from `onecore`.

## Base Classes

If an application extends one of the reusable CRUD or Search use-case classes, only those classes are included in the final bundle.

Modern bundlers such as Webpack, Rollup, Vite, and esbuild tree-shake unused code automatically.

This allows frontend and backend projects to share the same package while keeping bundles minimal.

---

# Unified Metadata

The most important type in `onecore` is `Attribute`.

Unlike persistence-specific or validation-specific metadata, `Attribute` is the canonical metadata model shared across the entire ecosystem.

```
                  Attribute
                      │
      ┌───────────────┼────────────────┐
      │               │                │
 Validation       Database        Import/Export
      │               │                │
validation-core   sql-core        import-service
                 mysql2-core        export-kit
                 postgres-kit
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

---

# Shared Interfaces

`onecore` defines the common contracts used by the ecosystem.

## Database

* Repository
* GenericRepository
* SearchRepository
* Transaction
* Statement
* QueryBuilder

Implemented by

* sql-core
* mysql2-core
* postgres-kit
* mongodb-kit

---

## Validation

* Validator<T>

Implemented by

* validation-core

---

## Cache

* CachePort

Implemented by

* cache-plus
* redis-plus

---

## Message Queue

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

## Logging

* Logger

Implemented by

* logger-core

---

## Health Check

* HealthChecker

Implemented by

* health-service

---

## HTTP

* HttpRequest
* HttpOptionsService

Implemented by

* web-clients

---

## Localization

* Locale
* Currency

Implemented by

* locale-service

---

# Reusable Use Cases

`onecore` also provides reusable application-layer base classes.

Examples include

* CRUD services
* Search services
* View services

Applications can extend these classes instead of implementing common CRUD logic repeatedly.

Projects that do not use these classes pay no runtime cost.

---

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
