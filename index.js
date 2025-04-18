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

var posts = [
  {
    title: "Lorem ipsum dolor sit amet",
    content: "Consectetur adipiscing elit. Vivamus at velit cursus, viverra lacus vel, aliquam magna. Nunc ullamcorper dapibus elementum. Suspendisse consectetur euismod pellentesque. Aenean suscipit iaculis mauris, in iaculis neque laoreet at. Cras quam tellus, cursus sit amet magna a, rutrum vulputate ante. Praesent venenatis eros in metus ullamcorper posuere. Donec imperdiet sagittis sodales. Mauris vel vulputate enim, in posuere odio. Morbi porttitor elementum erat in cursus. Sed arcu velit, ultricies at convallis et, vehicula at lectus. Mauris vestibulum quam eget arcu consequat, id rutrum ante aliquam. Sed posuere sodales leo, eu blandit ex rhoncus id. Fusce ac enim fringilla, facilisis nibh dictum, tincidunt sem.",
    description: "Morbi porttitor elementum erat in cursus. Sed arcu velit, ultricies at convallis et, vehicula at lectus. Mauris vestibulum quam eget arcu consequat, id rutrum ante aliquam. Sed posuere sodales leo, eu blandit ex rhoncus id. Fusce ac enim fringilla, facilisis nibh dictum, tincidunt sem."
  },
  {
    title: "Pellentesque sollicitudin nunc ac lectus commodo",
    content: "Id dignissim urna fermentum. Aenean ac nisl eget lacus suscipit condimentum. Vivamus enim dolor, malesuada a nibh eget, laoreet mollis eros. Etiam facilisis lectus sodales dignissim egestas. Quisque vitae volutpat lorem. Nullam scelerisque augue vitae nibh porta imperdiet. Ut ac nisl ut dui laoreet vestibulum quis eu tellus. Suspendisse malesuada lacinia luctus. Fusce rhoncus velit in turpis eleifend condimentum. Aenean id finibus libero, eget ultrices lectus. Quisque congue lacinia ullamcorper. Quisque dignissim velit sem, nec imperdiet felis placerat vel. Vivamus condimentum bibendum eleifend. Mauris dapibus pharetra urna eu lacinia.",
    description: "Aenean ac nisl eget lacus suscipit condimentum. Vivamus enim dolor, malesuada a nibh eget, laoreet mollis eros."
  },
  {
    title: "Vivamus pharetra interdum libero eget tempus.",
    content: "In velit ex, malesuada eu odio id, scelerisque pretium diam. Phasellus elementum dolor quam. Nunc purus massa, dapibus nec ipsum ornare, ullamcorper pellentesque mauris. Cras hendrerit purus vel porttitor eleifend. Sed commodo lacus eget tellus commodo congue. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vivamus commodo, nibh iaculis congue interdum, dolor orci facilisis tortor, quis venenatis nisi sem nec nulla. Cras hendrerit nisl sed nisi sollicitudin, non maximus leo ornare. Ut eu convallis nunc, at posuere mauris. Proin iaculis quam a quam elementum varius. Cras pharetra sollicitudin purus, id maximus ipsum scelerisque posuere. Morbi nunc elit, accumsan at varius sed, cursus non odio. Morbi a lacinia dui, et pretium augue.",
    description: "Nunc purus massa, dapibus nec ipsum ornare, ullamcorper pellentesque mauris."
  }
]

app.get('/', (req, res) => {
  res.render('index.ejs', { data: posts });
})

app.post('/', (req, res) => {
  posts.push({ title: req.body.title, content: req.body.content, description: req.body.description });
  res.render('index.ejs', { data: posts });
});

app.get('/edit-post', (req, res) => {
  res.render('edit-post.ejs', { data: posts[req.query.oldPostID], id: req.query.oldPostID });
});

app.post('/edit-post', (req, res) => {
  const input = { title: req.body.newTitle, content: req.body.newContent, description: req.body.newDescription }
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
