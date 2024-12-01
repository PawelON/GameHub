const API_KEY = '8ebb822d82fd4acb899646d798c0097f';
const BASE_URL = 'https://api.rawg.io/api/games';

const topGameNames = ["Roblox", "Minecraft", "Fortnite Battle Royale", "Call of Duty: Black Ops 6", "Counter-Strike 2",
                      "The Sims 4", "League of Legends", "Valorant", "Grand Theft Auto V", "Rocket League"
];

async function fetchTopGames() {
    try {
        const topGames = [];
        for (let gameName of topGameNames) {
            const gameResponse = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=1&search=${gameName}`);
            const gameData = await gameResponse.json();
            if (gameData.results.length > 0) {
                topGames.push(gameData.results[0]);
            }
        }
        renderGames(topGames, 'topGames');
    } catch (error) {
        console.error('Error fetching top games:', error);
    }
}

function renderGames(games, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = "";
    games.forEach(game => {
        const gameDiv = document.createElement('div');
        gameDiv.classList.add('game');
        gameDiv.innerHTML = `
            <img src="${game.background_image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Released: ${game.released}</p>
            <p>Rating: ${game.rating}</p>
            <div class="rating-bar-container">
                <div class="rating-bar ${getRatingClass(game.rating)}" style="width: ${game.rating * 20}%"></div>
            </div>
        `;
        container.appendChild(gameDiv);
    });
}

function getRatingClass(rating) {
    if (rating >= 4) {
        return 'good';
    } else if (rating >= 2.5) {
        return 'average';
    } else {
        return 'poor';
    }
}

async function searchGame(query) {
    try {
        const response = await fetch(`${BASE_URL}?key=${API_KEY}&page_size=1&search=${query}`);
        const data = await response.json();
        if (data.results.length === 0) {
            document.getElementById("searchResult").innerHTML = "<p>No results found.</p>";
            return;
        }
        const game = data.results[0];
        renderSearchResult(game);
    } catch (error) {
        console.error('Error fetching search result:', error);
    }
}

function renderSearchResult(game) {
    const container = document.getElementById("searchResult");
    const topGamesTitle = document.getElementById("topGamesTitle");
    const topGamesContainer = document.getElementById("topGames");
    const searchResultTitle = document.getElementById("searchResultTitle");

    topGamesTitle.style.display = 'none';
    topGamesContainer.style.display = 'none';
    searchResultTitle.style.display = 'block';

    container.innerHTML = `
        <div class="single-game">
            <img src="${game.background_image}" alt="${game.name}">
            <h3>${game.name}</h3>
            <p>Released: ${game.released}</p>
            <p>Rating: ${game.rating}</p>
            <div class="rating-bar-container">
                <div class="rating-bar ${getRatingClass(game.rating)}" style="width: ${game.rating * 20}%"></div>
            </div>
        </div>
    `;
}

function resetToTopGames() {
    const topGamesTitle = document.getElementById("topGamesTitle");
    const topGamesContainer = document.getElementById("topGames");
    const searchResultTitle = document.getElementById("searchResultTitle");
    const searchResult = document.getElementById("searchResult");

    topGamesTitle.style.display = 'block';
    topGamesContainer.style.display = 'flex';
    searchResultTitle.style.display = 'none';
    searchResult.innerHTML = "";
}

const searchBar = document.getElementById("searchBar");
searchBar.addEventListener("input", (event) => {
    const query = event.target.value.trim();
    if (query) {
        searchGame(query);
    } else {
        resetToTopGames();
    }
});

fetchTopGames();