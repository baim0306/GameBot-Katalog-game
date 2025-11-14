const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const fetch = require('node-fetch'); // 🛑 BARIS BARU: Menggunakan node-fetch eksplisit
dotenv.config(); 

const app = express();

// Gunakan jalur absolut untuk Static Files
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// Gunakan jalur absolut untuk Views (EJS templates)
app.set('views', path.join(__dirname, 'views'));

const ApiKey = process.env.RAWG_API_KEY;

app.get('/', (req, res) => {
    res.render('index', { currentQuery: req.query });
});

// fetch rawg
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
        const response = await fetch(apiUrl); // Sekarang menggunakan fetch yang di-require
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
        const response = await fetch(`https://api.rawg.io/api/games/${id}?key=${ApiKey}`); // Sekarang menggunakan fetch yang di-require
        const game = await response.json();

        res.render('game', { title: game.name, game, currentQuery: req.query });
    } catch (err) {
        console.error('Error fetching game', err)
        res.status(500).send('Failed to fetch game details');
    }
});

// 🛑 BARIS BARU: Middleware untuk menangani 404
app.use((req, res) => {
    res.status(404).send('404: Route tidak ditemukan di server Express.');
});

// Wajib untuk Vercel: Mengekspor objek aplikasi
module.exports = app;