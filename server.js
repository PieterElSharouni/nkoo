// server.js
const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));  // Serve static files from public directory
app.use(express.json());

app.post('/sendMessage', async (req, res) => {
    try {
        const { message } = req.body;
        const response = await axios.post(process.env.AZURE_CHATBOT_URL, {
            message: message
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.AZURE_API_KEY}`
            }
        });
        res.json(response.data);
    } catch (error) {
        console.error('Error communicating with Azure Chatbot:', error);
        res.status(500).send('Failed to send message');
    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});