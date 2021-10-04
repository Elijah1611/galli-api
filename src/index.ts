import { createConnection } from 'typeorm';
import Server from './server'

const port = process.env.PORT || 7000

const server = new Server();

const initDb = async () => await createConnection()

initDb()
.then(() => server.run(port))
.catch(error => console.log(error))

