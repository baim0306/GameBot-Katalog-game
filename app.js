import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

app.use(express.static('public'));

app.set('view engine', 'ejs');

const ApiKey = process.env.RAWG_API_KEY;
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.render('index', { currentQuery: req.query });
});

// fetch rawg
app.listen(PORT, () => console.log(`server is runnning on http://localhost:${PORT}`));


app.get('/api/games', async(req, res) => {
    const { page = 1, search = '', ordering = '', genre = ''} = req.query;

    let apiUrl = `https://api.rawg.io/api/games?key=${ApiKey}&page=${page}`;

    if (search) {
        apiUrl += `&search=${encodeURIComponent(search)}`;
    }

    if (ordering) {
        apiUrl += `&ordering=${ordering}`;
    }

    if (genre){
        apiUrl += `&genres=${genre.toLowerCase()}`;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch(err) {
        console.error('Error fetching game list:', err)
        res.status(500).json({error : 'failed to fetch games'});
    }
});

// fetch detail game

app.get('/game/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${ApiKey}`);
        const game = await response.json();

        res.render('game', { title: game.name, game, currentQuery: req.query });
    } catch (err) {
        console.error('Error fetching game', err)
        res.status(500).send('Failed to fetch game details');
    }
});
