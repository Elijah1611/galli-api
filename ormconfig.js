const { createConnection } = require('typeorm')

module.exports = [
  {
    name: "default",
    type: process.env.DB_TYPE || "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT) || 5432,
    username: process.env.DB_USERNAME || 'postgres',
    password: process.env.DB_PASSWORD || null,
    database: process.env.DATABASE || "galli-dev",
    synchronize: false,
    logging: true,
    seeds: ["./src/data/seed/seeds/**/*.ts"],
    factories: ["./src/data/seed/factories/**/*.ts"],
    entities: ["./src/entity/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  },
  {
    name: "testing",
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: process.env.username || 'postgres',
    password: process.env.password || null,
    database: "galli-test",
    synchronize: false,
    logging: false,
    seeds: ["./src/data/seed/seeds/**/*.ts"],
    factories: ["./src/data/seed/factories/**/*.ts"],
    entities: ["./src/entity/*.ts"],
    migrations: ["src/migration/**/*.ts"],
    subscribers: ["src/subscriber/**/*.ts"],
    cli: {
      entitiesDir: "src/entity",
      migrationsDir: "src/migration",
      subscribersDir: "src/subscriber"
    }
  }
]