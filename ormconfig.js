const { createConnection } = require('typeorm')

module.exports = [{
    name:"default",
    type: "postgres" ,
    host: "localhost",
    port: 5432,
    username: process.env.username || 'postgres',
    password: process.env.password || null,
    database: "galli-dev",
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
    name:"testing",
    type: "postgres" ,
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