// Variables
const apiKey = '454766eeca3ec1a56f35554fcdfe4e6e';
let lat = '';
let long = '';

const cityNameRef = document.getElementById('city-name');

// Hardcoded lat-long of cities
let cities = {
    jeddah: {lat: '21.543333', long: '39.172779'},
    qassim: {lat: '26.3466544', long: '40.8595717'},
    makkah: {lat: '21.3891', long: '39.8579'},
    dammam: {lat: '43.973454', long: '50.140400'},
    hail: {lat: '27.523647', long: '41.696632'},
    yanbu: {lat: '24.186848', long: '38.026428'},
    riyadh: {lat: '24.774265', long: '46.738586'},
    jazan: {lat: '16.909683', long: '42.567902'},
    madinah: {lat: '24.5247', long: '39.5692'},
    dhahran: {lat: '26.236355', long: '50.032600'},
}

// Functions
const fetchData = (city, cityName) => {
    if (cities[city]) {
        lat = cities[city]?.lat;
        long = cities[city]?.long;
        const endpoint = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}`;
        fetch(endpoint).then(
            value => {
                value.text().then( text => {
                    displayData(JSON.parse(text), cityName);
                });
            }
        );
    } else {
        console.error('City not in data');
    }
}

// Function to display data in html template
const displayData = (data, _cityName) => {
    const cityName = _cityName;
    const description = data?.weather[0]?.description;
    const temp = data?.main?.temp;
    const pressure = data?.main?.pressure;
    const humidity = data?.main?.humidity;
    const windSpeed = data?.wind?.speed;

    cityNameRef.innerHTML = `CITY NAME: <span style="color: #53d8fb">${cityName}</span>`;

    const detailsList = document.getElementsByClassName('data-description');
    detailsList[0].innerHTML = description;
    detailsList[1].innerHTML = temp;
    detailsList[2].innerHTML = pressure;
    detailsList[3].innerHTML = humidity;
    detailsList[4].innerHTML = windSpeed;
}


// Event Listeners for list items or buttons
const citiesList = document.getElementById('cities-list');
citiesList.childNodes.forEach(
    city => {
        city.addEventListener('click', evt => {
            const city = evt.target?.innerHTML.toLowerCase();
            if (city.length > 0) {
                fetchData(city, city.charAt(0).toUpperCase() + city.slice(1));
            } else {
                console.error('No city Value')
            }
        })
    }
)
