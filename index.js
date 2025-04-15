import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

var posts = {}

app.get('/', (req, res) => {
  res.render('index.ejs', { data: posts });
})

app.post('/', (req, res) => {
  console.log(req.body);
  posts[req.body.title] = req.body.content;
  res.render('index.ejs', { data: posts });
});

app.get('/bio', (req, res) => {
  res.render('bio.ejs');
})

app.get('/works', (req, res) => {
  res.render('works.ejs');
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})
