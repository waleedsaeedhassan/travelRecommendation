let recommendations = {
    countries: [],
    temples: [],
    beaches: []
};

async function fetchRecommendations() {
    try {
        const response = await fetch('travel_recommendation_api.json');
        const data = await response.json();

        recommendations.countries = data.countries;
        recommendations.temples = data.temples;
        recommendations.beaches = data.beaches;

        console.log('Recommendations Data:', recommendations);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function searchRecommendations() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '';

    let filteredRecommendations = [];

    if (searchInput.includes("temp")) {
        filteredRecommendations = recommendations.temples;
    }
    else if (searchInput.includes("bea")) {
        filteredRecommendations = recommendations.beaches;
    }
    else {
        recommendations.countries.forEach(country => {
            country.cities.forEach(city => {
                if (city.name.toLowerCase().includes(searchInput) || city.description.toLowerCase().includes(searchInput)) {
                    filteredRecommendations.push({
                        name: city.name,
                        imageUrl: city.imageUrl,
                        description: city.description
                    });
                }
            });
        });
    }

    if (filteredRecommendations.length > 0) {
        filteredRecommendations.forEach(place => {
            const resultDiv = document.createElement('div');
            resultDiv.classList.add('result');

            resultDiv.innerHTML = `
                <h3>${place.name}</h3>
                <img src="${place.imageUrl}" alt="${place.name}" />
                <p>${place.description}</p>
            `;

            resultsContainer.appendChild(resultDiv);
        });
    } else {
        resultsContainer.innerHTML = '<p>No recommendations found.</p>';
    }
}

function clearResults() {
    document.getElementById('search').value = '';
    document.getElementById('results').innerHTML = '';
}
