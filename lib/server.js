const Hapi = require('@hapi/hapi')
const routes = require('./routes')

async function startServer() {
    const server = Hapi.server({
        port: 8080,
        host: 'localhost',
        routes: {
            cors: {
                origin: ['http://notesapp-v1.dicodingacademy.com']
            }
        }
    })

    server.route(routes)

    await server.start()
    // eslint-disable-next-line no-console
    console.log(`Server running on ${server.info.uri}`)
}

module.exports = startServer