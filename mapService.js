let map;
let markers = [];
let currentCategory;

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
            resultDiv.innerHTML = ''; // 기존 내용을 초기화

            data.slice(0, 5).forEach(place => {
                const placeLocation = new kakao.maps.LatLng(place.y, place.x);
                markers.push(new kakao.maps.Marker({ position: placeLocation, map }));

                const button = document.createElement('button');
                button.className = 'restaurant-button';
                button.textContent = place.place_name;
                button.onclick = () => showRestaurantInfo(place.place_name); // 이벤트 핸들러 추가

                resultDiv.appendChild(button); // 버튼을 results div에 추가
            });
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
}

function setLocation() {
    const locationInput = document.getElementById('locationInput').value;
    getCoordinates(locationInput || '현재 위치', currentCategory);
}
