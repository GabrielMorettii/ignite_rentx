console.log('process.env.DATABASE_URL :>>', process.env.DATABASE_URL)

module.exports = {
  "type": "postgres",
  "url": process.env.DATABASE_URL,
  "migrations": [`./${process.env.MIGRATION_ENV}/shared/infra/typeorm/migrations/*.js`],
  "entities": [`./${process.env.MIGRATION_ENV}/modules/**/infra/typeorm/entities/*.js`],
  "cli": {
    "migrationsDir": `./src/shared/infra/typeorm/migrations`
  }
}