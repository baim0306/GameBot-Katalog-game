const title = document.querySelector('.title');
const cardsWrap = document.querySelector('.cards');
const sideBar = document.querySelector('.sidebar');
const navBtn = document.querySelector('.nav-btn');
const searchInput = document.querySelector('.search-input');
const genresBtn = document.querySelector('.genresBtn');
const genresUl = document.querySelector('.genresUl');
const releasedBtn = document.querySelector('.releasedBtn');
const releasedUl = document.querySelector('.releasedUl');

async function fetchandRenderGames() {
  const { search = '', genre = '', ordering = '', } = currentQueryParams;

  if (genre) title.textContent = genre;
  else if (ordering === '-rating') title.textContent = 'Top Rated';
  else if (ordering === '-released') title.textContent = 'Latest Released';
  else if (ordering === 'released') title.textContent = 'Oldest Released';
  else if (search) title.textContent = `Search: ${search}`;
  else title.textContent = 'HOME';

  cardsWrap.innerHTML = loading();

  let apiUrl = `/api/games?`;

  if (search) apiUrl += `&search=${encodeURIComponent(search)}`;
  if (genre) apiUrl += `&genre=${encodeURIComponent(genre)}`;
  if (ordering) apiUrl += `&ordering=${ordering}`;

  try {
    const response = await fetch(apiUrl);
    const data = await response.json();

    cardsWrap.innerHTML = '';
    if (data.results.length === 0){
      cardsWrap.innerHTML = '<p class="text-white text-xl">Game tidak ditemukan.</p>';
      return;
    }

    renderGames(data.results);
  } catch (err) {
    console.error('Error fetching game data: ', err);
    cardsWrap.innerHTML = '<p class="text-red-500 text-xl">Gagal memuat data game.</p>';
  }
}

fetchandRenderGames();

// nav-btn

navBtn.addEventListener('click', function () {
sideBar.classList.toggle('-translate-x-[100%]');
});

function closeNav(){
    sideBar.classList.add('-translate-x-[100%]');
}

// sidebar script

genresBtn.addEventListener('click', function() {
  genresUl.classList.toggle('max-h-[384px]');
  genresUl.classList.toggle('xl:max-h-96');
});
releasedBtn.addEventListener('click', function() {
  releasedUl.classList.toggle('max-h-16');
});

// filter game by genre
const genreItems = document.querySelectorAll('.genresGame');
  genreItems.forEach(item => {
    item.addEventListener('click', () =>{
    const genre = item.dataset.genre;
    closeNav();
    window.location.href = `/?genre=${genre}`;

  });
});

// // sort by released date & top rated
const releasedItems = releasedUl.querySelectorAll('li');
  releasedItems.forEach(item => {
    item.addEventListener('click', () => {
    const ordering = item.textContent.trim().toLocaleLowerCase() === 'latest' ? '-released' : 'released';
    closeNav();
    window.location.href = `/?ordering=${ordering}`;
  });
});

const topRatedItem = document.querySelector('.topRated');
topRatedItem.addEventListener('click', function() {
  closeNav();
  window.location.href = `/?ordering=-rating`;
});

// // search 
searchInput.addEventListener('keydown', (e) => {
  if ( e.key === 'Enter') {
  const query = searchInput.value.toLowerCase().trim();
  if (query.length > 0) {
    window.location.href = `/?search=${encodeURIComponent(query)}`;
  }
  }
});

// reset button by GameBot
const gameBot = document.querySelector('.gameBot');
gameBot.addEventListener('click', () => {
  closeNav();
  window.location.href = `/`;
});


// function ect
// rendering games
function renderGames(games) {
  const cardsWrap = document.querySelector('.cards');

  cardsWrap.innerHTML = '';
  games.forEach(game => {
      const genres = game.genres.map(g => g.name).join(', ');
      const card = gameCard(game, genres);

    card.addEventListener('click', () => window.location.href = `game/${game.id}`);

      cardsWrap.appendChild(card);
    });
}

// game card function
function gameCard(game, genres) {
  const card = document.createElement('div');
      card.className = "card relative bg-transparent flex flex-col aspect-[1/1] shadow-lg shadow-black/50 rounded-lg overflow-hidden border-2 border-white cursor-pointer w-full h-full group";
      card.dataset.id = game.id;
      card.innerHTML = `
                <div class="w-full h-[60%] overflow-hidden relative">
                  <div class="w-full h-full bg-[url('${game.background_image}')] bg-cover bg-center relative after:content-[''] after:absolute after:w-full after:h-full after:top-0 after:left-0 after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-slate-950"></div>
                  <p class="text-base text-white bg-gray-800/50 p-2 rounded-full absolute bottom-4 right-4 font-semibold">⭐${game.rating} / ${game.ratings_count} reviews</p>
                </div>
                <div class="p-4 flex flex-col">
                    <ul class="leading-relaxed">
                        <li class="text-xl text-white font-stack font-semibold mb-2 md:text-lg xl:text-xl">${game.name}</li>
                        <li class="text-sm text-slate-300 mb-5">genre : ${genres}</li>
                    </ul>
                </div>
                <p class="text-slate-300 text-xs absolute bottom-2 right-2">${game.released}</p>
                <div class="detail-btn hidden group-hover:flex absolute top-0 left-0 w-full h-full bg-slate-800/50 backdrop-blur-sm cursor-pointer z-[10] transition duration-300 ease-in-out justify-center items-center text-white text-xl font-stack">Detail</div>`;
      return card;
}

function loading() {
  const loading = `<div class="loader"></div>
                    <style>
                    .loader {
                      border: 6px solid #f3f3f3; /* warna background */
                      border-top: 6px solid #3498db; /* warna spinner */
                      border-radius: 50%;
                      width: 100px;
                      height: 100px;
                      animation: spin 1s linear infinite;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    }

                    @keyframes spin {
                      0% { transform: rotate(0deg); }
                      100% { transform: rotate(360deg); }
                    }
                    </style>
                    `;
return loading;
}