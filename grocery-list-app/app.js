const express = require('express');
const app = express();
const path = require('path');

// In-memory storage for the grocery list
let groceryList = [];

// Set up EJS and static files
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

// Home Route - display all items in the grocery list
app.get('/', (req, res) => {
    res.render('index', { groceryList });
});

// Add a new grocery item to the list
app.post('/add', (req, res) => {
    const item = req.body.item;
    if (item) {
        groceryList.push(item);  // Add the new item to the list
    }
    res.redirect('/');
});

// Delete a grocery item from the list
app.post('/delete', (req, res) => {
    const index = req.body.index;
    if (index !== undefined) {
        groceryList.splice(index, 1);  // Remove the item at the given index
    }
    res.redirect('/');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
