console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL)

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL || "postgres://docker:docker@localhost:5432/rentx",
  "migrations": [
    "dist/shared/infra/typeorm/migrations/*.js"
  ],
  "entities": [
    "dist/modules/**/infra/typeorm/entities/*.js"
  ],
  "cli": {
    "migrationsDir": "src/shared/infra/typeorm/migrations/"
  },
  "ssl": process.env.DATABASE_URL ? true : false
}