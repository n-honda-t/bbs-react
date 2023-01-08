import { DataSource } from 'typeorm'

export const PsqlDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'password',
  database: 'react_bbs',
  entities: ['entities/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['db/subscribers/**/*.ts'],
})

PsqlDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
