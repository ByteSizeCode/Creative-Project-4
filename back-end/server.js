const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/museum', {
  useNewUrlParser: true
});

// Create a scheme for posts
const itemSchema = new mongoose.Schema({
  date: String,
  content: String,
    likeCount: Number,
    dislikeCount: Number,
});

// Create a model for posts
const Item = mongoose.model('Item', itemSchema);

// Create a new post
app.post('/api/items', async (req, res) => {
  const item = new Item({
    date: req.body.date,
    content: req.body.content,
      likeCount: req.body.likeCount,
      dislikeCount: req.body.dislikeCount
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all posts
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});


app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {

    const item = await Item.findOne({
      _id: req.params.id
    })
    item.date = req.body.date
    item.content = req.body.content
    item.likeCount = req.body.likeCount
    item.dislikeCount = req.body.dislikeCount
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3000, () => console.log('Server listening on port 3000!'));
