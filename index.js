import express from 'express';
import bodyParser from 'body-parser';
import methodOverride from "method-override";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

//  ------------------ MIDDLEWARE --------------------
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/css', express.static(__dirname + '/node_modules/bootstrap/dist/css'));
app.use(methodOverride("_method"));
app.use(express.static('public'));
app.use(express.json());

//  ------------------ ROUTES --------------------
app.get('/', (req, res) => {
  res.render('index.ejs', { data: posts });
})

app.post('/', (req, res) => {
  posts.push({ title: req.body.title, content: req.body.content, description: req.body.description });
  res.render('index.ejs', { data: posts });
});

app.get('/posts/edit', (req, res) => {
  res.render('posts/edit.ejs', { data: posts[req.query.oldPostID], id: req.query.oldPostID });
});

app.post('/posts/edit', (req, res) => {
  const input = { title: req.body.newTitle, content: req.body.newContent, description: req.body.newDescription }
  posts[req.body.oldPostID] = input;
  res.render('index.ejs', { data: posts });
})

app.get('/posts/show', (req, res) => {
  res.render('posts/show.ejs', { data: posts[req.query.oldPostID], id: req.query.oldPostID });
})

app.post('/delete', (req, res) => {
  posts.splice(req.body.oldPostID, 1)
  res.render('index.ejs', { data: posts });
})

app.get('/bio', (req, res) => {
  res.render('bio.ejs', { data: bio });
})

app.get('/works', (req, res) => {
  res.render('works.ejs', { data: works });
})

app.get('/contact', (req, res) => {
  res.render('contact.ejs');
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

// app.patch('/', (req, res) => {
//   console.log('hi');
//   console.log(req.body.oldTitle);
//   console.log(req.body.oldContent);
//   res.render('index.ejs', { data: posts });
// });

//  ------------------ SEEDS --------------------
var posts = [
  {
    title: "The Whispering Stones",
    content: `Elara had always felt an odd connection to the stones of her village, Atheria. They weren't just rocks; they hummed with a faint energy, a silent song. One day, exploring the overgrown ruins behind her home, she stumbled upon a hidden cave. Inside, the stones pulsed with a vibrant light, their whispers audible."Welcome, child," one resonated, its voice like ancient wind. "We are the Keepers of Memory."

    Elara, initially frightened, soon found herself captivated. The stones showed her visions – Atheria's past, stretching back centuries. She saw the village's founding, the joys and sorrows of its people, forgotten tales of bravery and betrayal. With each touch, a new story unfolded. One stone revealed the legend of a hidden spring, said to grant eternal life, but lost to time. Another whispered of a great betrayal, a feud that divided the village for generations, its roots now buried under layers of tradition.

    The stones warned her, too. "The balance is fragile," one rumbled. "The world of whispers and the world of flesh must remain separate. Too much knowledge can be a burden."

    Elara, however, was drawn deeper. She spent days in the cave, neglecting her chores, her friends. She learned of a looming darkness, a shadow that had touched Atheria before and threatened to return. The stones grew more urgent.

    "You are the Listener," they told her. "You must choose. Will you be a bridge, or a barrier?"

    Torn, Elara confided in her grandmother, the village elder, who listened with knowing eyes. "The stones speak truth," she confirmed. "But their knowledge is a river, not a cup. You cannot hold it all."

    Elara realized her mistake. She had been trying to possess the stones' power, not understand it. With her grandmother's guidance, she learned to listen with wisdom, to discern the important whispers from the echoes of time.

    She shared carefully chosen stories with the village, weaving them into their traditions, reminding them of their past and warning them of the encroaching darkness. She became a storyteller, a guardian of memory, not its master.

    The village, armed with this knowledge, prepared. When the shadow returned, they met it not with fear, but with the strength of their shared history, the wisdom of the whispering stones echoing in their hearts. Elara, the Listener, stood with them, a bridge between the past and the present, ensuring the whispers of the stones would never be forgotten."`,
    description: "A young woman who discovers hidden world beneath her sleepy village, a world where stones hold memories and whispers carry magic."
  },
  {
    title: "The Stone Carver's Daughter",
    content: `In a village nestled beside a mountain range of sentient stone, a young woman named Lyra is apprenticed to her father, a master stone carver. The stones communicate in whispers, guiding his hands as he shapes them into objects of power and beauty. Lyra, however, is deaf to the whispers. She can feel the stones' vibrations, sense their emotions, but cannot understand their language.

    Desperate to connect with her heritage and her father, Lyra seeks out a reclusive hermit who lives high in the mountains, said to possess the ability to translate the stones' whispers. The hermit agrees to help, but his methods are unconventional, involving ancient rituals and a dangerous journey into the heart of the mountain itself.

    Lyra's journey is one of self-discovery, as she confronts her own limitations and learns to appreciate the different ways in which the stones can be understood. She discovers that while she may not hear their words, she has a unique gift for interpreting their feelings and intentions, a gift that ultimately proves to be just as valuable.`,
    description: `In a village nestled beside a mountain range of sentient stone, a young woman named Lyra is apprenticed to her father, a master stone carver. The stones communicate in whispers, guiding his hands as he shapes them into objects of power and beauty. Lyra, however, is deaf to the whispers. She can feel the stones' vibrations, sense their emotions, but cannot understand their language.`
  },
  {
    title: "The Lost Song of the Ancients",
    content: `A scholar named Elias discovers an ancient map leading to a hidden island, rumored to be the resting place of the "Songstones" – artifacts said to contain the memories and knowledge of a long-lost civilization. Driven by a thirst for knowledge, Elias assembles a crew and sets sail, unaware of the dangers that await him.

    The island is shrouded in mist and mystery, its landscape constantly shifting and changing. The Songstones, when found, are not inert objects but resonate with a powerful, alluring music that can entrance and corrupt those who listen for too long.

    Elias and his crew are forced to confront not only the island's magical defenses but also their own desires and ambitions as the Songstones' music begins to unravel their deepest selves. The story explores the seductive nature of forbidden knowledge and the importance of respecting the boundaries between the known and the unknown.`,
    description: `A scholar named Elias discovers an ancient map leading to a hidden island, rumored to be the resting place of the "Songstones" – artifacts said to contain the memories and knowledge of a long-lost civilization. Driven by a thirst for knowledge, Elias assembles a crew and sets sail, unaware of the dangers that await him.`
  },
  {
    title: "The Stone Walker",
    content: `In a nomadic tribe that roams a vast desert of sentient stones, a young man named Kael is chosen to become a "Stone Walker" – one who can navigate the treacherous landscape by listening to the stones' whispers. However, Kael is plagued by doubt. He struggles to hear the stones clearly, their voices often conflicting and confusing.

    During his training, Kael discovers a hidden talent – he can not only hear the stones but also influence them, subtly altering their paths and shaping the desert itself. This power is both a gift and a curse, as he learns that the desert is a living entity with its own ancient consciousness, and his actions have far-reaching consequences.

    Kael's journey is a coming-of-age story that delves into themes of responsibility, destiny, and the interconnectedness of all things. He must learn to master his abilities and find his place within the complex web of relationships that bind his tribe, the desert, and the whispering stones.`,
    description: `In a nomadic tribe that roams a vast desert of sentient stones, a young man named Kael is chosen to become a "Stone Walker" – one who can navigate the treacherous landscape by listening to the stones' whispers.`
  }
]

var bio = [
    `Alora Henning is a rising star in the realms of speculative fiction and high fantasy. Born in the quiet coastal town of Atheria, she spent her childhood weaving intricate tales inspired by the crashing waves and ancient forests that surrounded her.`,
    `Henning's journey into writing began with a simple question posed by her grandmother: "What if the stars sang?" This sparked a lifelong fascination with the hidden possibilities within the ordinary world, a theme that permeates her work.`,
    `While her debut novel, The Whispering Stones, catapulted her into the literary spotlight, Henning is no stranger to the written word. Her short stories have graced the pages of numerous speculative fiction magazines, including "Realms of Enchantment" and "Tales of the Unseen." These shorter works, often praised for their lyrical prose and innovative concepts, have garnered her a dedicated following and several nominations for the prestigious Sunspear Award.`,
    `The Whispering Stones, published in 2022, tells the story of a young woman who discovers a hidden world beneath her sleepy village, a world where stones hold memories and whispers carry magic. The novel was lauded for its rich world-building, compelling characters, and its exploration of themes like memory, identity, and the enduring power of stories.`,
    `Henning's writing is characterized by its vivid imagery, complex characters, and a deep sense of wonder. She seamlessly blends elements of classic fantasy with modern sensibilities, creating stories that resonate with both longtime fans of the genre and new readers alike. Her works often explore the delicate balance between humanity and nature, the importance of embracing the unknown, and the enduring power of hope in the face of adversity`,
    `Currently, Henning resides in a secluded cottage nestled deep within the Redwood National Forest, where she continues to write and draw inspiration from the natural world. She is currently working on the second novel in The Whispering Stones trilogy, The Echoing Caves, which is expected to be released in 2024. When she is not writing, Alora enjoys hiking, practicing archery, and spending time with her two mischievous cats, Oberon and Titania.`
]

var works = [
  {
    title: `The Stone Carver's Daughter: Echoes of the Unspoken`,
    picture: "",
    excerpt: `Lyra traced the familiar patterns on the unyielding granite, her father's tools moving with a grace she couldn't replicate. The stone hummed beneath her touch, a symphony of vibrations, yet silent to her ears. In Atheria, the whispers of the stones were life, heritage, belonging. For Lyra, they were a void. But she would learn to listen in her own way, even if it meantJourneying into the Mountain's heart.`,
    link: '',
    publisher: `Ember Quill Publications`
  },
  {
    title: `The Lost Song of the Ancients: A Melody of Madness`,
    picture: "",
    excerpt: `The island rose from the mist, a labyrinth of shifting shores and treacherous beauty. Elias felt the pull of the Songstones, a haunting melody that promised enlightenment, promising power. But as his crew delved deeper, the music twisted, revealing not celestial wisdom, but the hidden darkness within their own souls. He should have heeded the warnings, some knowledge isn't worth the cost.`,
    link: "",
    publisher: `Arcane Pages LLC`
  },
  {
    title: `The Stone Walker: Shaping Destiny`,
    picture: "",
    excerpt: `Kael knelt in the desert, the sentient sands stretching before him like an endless ocean. He was a Stone Walker, meant to guide his tribe, but the whispers of the desert were a cacophony of voices, a тяжесть of responsibility. Then he discovered his true power - to not only hear the stones, but to shape them. With this power came a choice: control or harmony.`,
    link: "",
    publisher: `Ember Quill Publications`
  },
  {
    title: `Whispers of Atheria: Tales of the Sentient Stones`,
    picture: "",
    excerpt: `From the dawn of time, the stones have been the silent witnesses of our world. They remember what we forget, they feel what we ignore, their whispers are the echoes of eternity. Within these pages lie four tales of Atheria, of those who dared to listen, and those who were forever changed by the ancient voices.`,
    link: "",
    publisher: `Veridian Books`
  }
]
