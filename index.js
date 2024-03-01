import express from 'express'
import cors from 'cors'
import path from 'path'
import http from 'http'
import { Server } from 'socket.io'
import axios from 'axios'
const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static(path.join(`${process.cwd()}`, "build")))

const server = http.createServer(app)
const io = new Server(server, {
    cors: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE']
})
var ActiveList = []
const port = 8080
const global_routes = [
    '/'
]

io.on('connect', (socket) => {
    try {
        socket.on('login', (data) => {
            console.log(`${data.Name} is connected at socket ${socket.id}..`)
            socket.broadcast.emit('new_login', 'New_login')
            ActiveList.push({
                id: socket.id,
                ...data
            })
        })
        socket.on('disconnect', () => {
            console.log(`Socket disconnected : ${socket.id}`)
            socket.broadcast.emit('new_login', 'New_login')
            ActiveList = ActiveList.filter(item => item.id !== socket.id)
        })
        socket.on('to', (message, room) => {
            if (room === '') res.send({})
            else socket.to(room).emit('recieve', message)
        })
    } catch (e) {
        console.error(e)
    }
})

server.listen(port, async () => {
    try {
        console.log(`Server is listening at port ${port} !`)
    } catch (e) {
        console.error(e)
    }
})

app.get(global_routes, (req, res) => {
    res.sendFile(path.join(`${process.cwd()}`, 'build', 'index.html'))
})

app.post('/login', async (req, res) => {
    try {
        const { user_name, password } = req.body
        const url = "https://ap-south-1.aws.data.mongodb-api.com/app/application-1-uuoyo/endpoint/login"
        const response = await axios.post(url, { user_name, password })
        res.send(response.data)

    } catch (e) {
        console.error(e)
        res.status(500).send({ msg: "Server Error !" })
    }
})

app.post('/friendlist', (req, res) => {
    const { friends } = req.body
    console.log(friends, ActiveList)
    res.send(ActiveList)
})