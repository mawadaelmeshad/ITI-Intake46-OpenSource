const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;


app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

let messages = [];
let nextId = 1;

let waitingClients = [];

const getNewMessages = (lastId) => {
    return messages.filter(msg => msg.id > lastId);
};

app.get('/short-poll', (req, res) => {
    const lastId = parseInt(req.query.lastId) || 0;
    const newMessages = getNewMessages(lastId);
    
    res.json(newMessages);
});


app.get('/long-poll', (req, res) => {
    const lastId = parseInt(req.query.lastId) || 0;
    const newMessages = getNewMessages(lastId);

    if (newMessages.length > 0) {
        res.json(newMessages);
    } else {
        waitingClients.push(res);
    }
});


app.post('/message', (req, res) => {
    const text = req.body.text;
    
    if (!text) {
        return res.status(400).json({ error: 'Text is required' });
    }

    const newMessage = {
        id: nextId++,
        text: text,
        timestamp: new Date()
    };
    
    messages.push(newMessage);
    
    res.status(201).json({ success: true, message: 'Message added' });

    while (waitingClients.length > 0) {
        const clientRes = waitingClients.pop(); 
        clientRes.json([newMessage]); 
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
