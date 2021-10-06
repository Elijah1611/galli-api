import DbConnection from './data/connection';
import Server from './server'

const port = process.env.PORT || 7000

const server = new Server();

const initDb = new DbConnection('default')

if (process.env.NODE_ENV == 'production') {
    initDb.create('production')
        .then(() => server.run(port))
        .catch(error => console.log(error))
} else {
    initDb.create()
        .then(() => server.run(port))
        .catch(error => console.log(error))
}