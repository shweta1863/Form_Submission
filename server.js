const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/submit', (req, res) => {
    const { name, email } = req.body;
    // Handle form submission
    console.log(`Received form data: Name - ${name}, Email - ${email}`);
    res.send('Form submitted successfully!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Server-side Validation //
const { body, validationResult } = require('express-validator');

// Add validation middleware
app.post('/submit', [
    body('name').notEmpty().withMessage('Name is required.'),
    body('email').isEmail().withMessage('Invalid email address.'),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email } = req.body;
    console.log(`Received form data: Name - ${name}, Email - ${email}`);
    res.send('Form submitted successfully!');
});

