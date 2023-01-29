const express = require('express');
const app = express();
const PORT = 4000;

const http = require('http').Server(app);
const cors = require('cors');

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3001"
    }
});

let wssSocket;
// const activeIds = [];
const activeIds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

socketIO.on('connection', (socket) => {
    wssSocket = socket;
    console.log(`⚡: ${socket.id} user just connected!`);
    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
    
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
    });

    // socket.on('cardpayment', (data) => {
    //     console.log('cardpaymentdata', data);

    //     socket.emit('sortoutpayment', { amount: 200 })
    // });

    socket.on('saveid', data => activeIds.push(data.id));
});

app.use(cors());

app.use(express.json());

app.get('/api/', (req, res) => {
  res.json({
    message: 'Hello world',
  });
});

app.get(`/listofterminals/`, (req, res) => {
    res.send(activeIds);
});

app.post(`/terminalpayment/`, (req, res) => {
    const paymentObj = req.body;
    console.log(paymentObj);

    // wssSocket.emit('showchargemodal', { amount: '1'});
    wssSocket.emit('showchargemodal/5', { amount: 100 });
});

app.listen('5000', () => {
    console.log('server listening on port 5000');
})

http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});