import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";
const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(express.json());

var posts = []

app.get('/', (req, res) => {
  res.render('index.ejs', { data: posts });
})

app.post('/', (req, res) => {
  posts.push({ title: req.body.title, content: req.body.content});
  res.render('index.ejs', { data: posts });
});

app.get('/edit-post', (req, res) => {
  res.render('edit-post.ejs', { data: posts[req.query.oldPostID], id: req.query.oldPostID });
});

app.post('/edit-post', (req, res) => {
  const input = { title: req.body.newTitle, content: req.body.newContent }
  posts[req.body.oldPostID] = input;
  res.render('index.ejs', { data: posts });
})

app.post('/delete', (req, res) => {
  posts.splice(req.body.oldPostID, 1)
  res.render('index.ejs', { data: posts });
})

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
