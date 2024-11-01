let map;
let markers = [];
let currentCategory;
let previousRecommendations = [];

function showRestaurantScreen(category) {
    currentCategory = category;
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
    findRestaurants(category);
}

function findRestaurants(category) {
    const locationInput = document.getElementById('locationInput').value;
    getCoordinates(locationInput || "현재 위치", category);
}

function getCoordinates(address, category) {
    new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            displayMap(new kakao.maps.LatLng(result[0].y, result[0].x), category);
        } else {
            document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
        }
    });
}

function displayMap(location, category) {
    if (!map) {
        map = new kakao.maps.Map(document.getElementById('map'), { center: location, level: 4 });
    } else {
        map.setCenter(location);
        clearMarkers();
    }
    markers.push(new kakao.maps.Marker({ position: location, map }));
    searchPlaces(location, category);
}

function searchPlaces(location, category) {
    new kakao.maps.services.Places().keywordSearch(category, (data, status) => {
        const resultDiv = document.getElementById('results');
        if (status === kakao.maps.services.Status.OK) {
            resultDiv.innerHTML = '<strong>추천 음식점:</strong><br>' + data.slice(0, 5).map(place => {
                const placeLocation = new kakao.maps.LatLng(place.y, place.x);
                markers.push(new kakao.maps.Marker({ position: placeLocation, map }));

                return `<button class="restaurant-button" onclick="showRestaurantInfo('${place.place_name}')">${place.place_name}</button>`;
            }).join('');
        } else {
            resultDiv.innerHTML = '결과를 찾을 수 없습니다.';
        }
    }, { location, radius: 1000, category_group_code: 'FD6' });
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

function showRestaurantInfo(placeName) {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('infoScreen').classList.remove('hidden');
    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `<h2>${placeName}</h2><p>여기에 음식점에 대한 설명이 들어갑니다.</p>`;
    // 추가적인 정보를 여기에 작성할 수 있습니다.
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function goToFirstScreen() {
    document.getElementById('infoScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function goToSecondScreen() {
    document.getElementById('infoScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
}

function setLocation() {
    const locationInput = document.getElementById('locationInput').value;
    // 입력된 위치를 처리하는 로직 추가
}
