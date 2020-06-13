const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000;

const http = require('http');
const server = http.Server(app);


app.set('view engine', 'ejs')


app.use(express.static('public'))



app.get('/', (req, res) => {
	res.render('index')
})



server.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`));



const io = require("socket.io")(server)



io.on('connection', (socket) => {
	console.log('New user connected')

	
	socket.username = "Anonymous"

    
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
