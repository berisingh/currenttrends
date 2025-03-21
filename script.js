const API_KEY = 'a84e8df5-63e4-4baa-be19-0b68f37f0124';
const URL = `https://cricketdata.org/v2/top-headlines?country=us&apiKey=${API_KEY}`;

async function fetchNews() {
    try {
        let response = await fetch(URL);
        let data = await response.json();
        displayNews(data.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
    }
}

function displayNews(articles) {
    const newsContainer = document.getElementById("news-container");
    newsContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage || !article.title || !article.url) return;

        const newsItem = document.createElement("div");
        newsItem.className = "news-item";
        newsItem.innerHTML = `
            <img src="${article.urlToImage}" alt="News Image">
            <h3>${article.title}</h3>
            <p>${article.description || "No description available."}</p>
            <a href="${article.url}" target="_blank">Read More</a>
        `;
        newsContainer.appendChild(newsItem);
    });
}

function searchNews() {
    const query = document.getElementById("search").value;
    const searchURL = `https://newsapi.org/v2/everything?q=${query}&apiKey=${API_KEY}`;

    fetch(searchURL)
        .then(response => response.json())
        .then(data => displayNews(data.articles))
        .catch(error => console.error("Error fetching search results:", error));
}

fetchNews();
