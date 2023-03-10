import { DataSource } from 'typeorm'

export const MysqlDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'react',
  password: 'react',
  database: 'react-bbs',
  entities: ['entities/**/*.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['db/subscribers/**/*.ts'],
})

MysqlDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!')
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err)
  })
