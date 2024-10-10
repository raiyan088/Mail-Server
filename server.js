const SMTPServer = require('smtp-server').SMTPServer
const express = require('express')

const app = express()

app.use(express.json())

const server = new SMTPServer({
    allowInsecureAuth: true,
    authOptional: true,

    onConnect(session, connection) {
        console.log('onConnect:', session.id)
        connection()
    },
    onMailFrom(adress, session, connection) {
        console.log('onMailFrom:', adress.address, session.id)
        connection()
    },
    onRcptTo(adress, session, connection) {
        console.log('onRcptTo:', adress.address, session.id)
        connection()
    },
    onData(stream, session, connection) {
        stream.on('data', (data) => {
            console.log('onData:', data.toString())
        })

        stream.on('end', connection)
    }
})

app.listen(process.env.PORT || 3000, ()=> {
    console.log('Listening on port 3000...')
})

server.listen(25, () => {
    console.log('Server Runing Port 25...')
})

app.get('/', async (req, res) => {
    res.end('Success')
})