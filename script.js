let currentCategory; // 전역 변수로 현재 카테고리 저장
let map; // 전역 변수로 지도 저장
let markers = []; // 마커 저장

window.onload = function() {
    const container = document.getElementById('map'); // 'map' id 확인
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 좌표 예시
        level: 3
    };

    map = new kakao.maps.Map(container, options); // 지도 초기화
};

function showRestaurantScreen(category) {
    currentCategory = category; // 선택한 카테고리 저장
    document.getElementById('menuScreen').classList.add('hidden'); // 메뉴 화면 숨기기
    document.getElementById('restaurantScreen').classList.remove('hidden'); // 음식점 화면 보이기
    setLocation(); // 현재 위치에 기반하여 음식점 검색
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function setLocation() {
    const locationInput = document.getElementById('locationInput').value.trim();

    if (locationInput) {
        // 사용자가 위치를 입력했을 경우
        getCoordinates(locationInput);
    } else {
        // 사용자가 위치를 입력하지 않았을 경우 현재 위치로 검색
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const lat = position.coords.latitude;
                const lng = position.coords.longitude;
                const location = new kakao.maps.LatLng(lat, lng);
                displayMap(location);
            }, () => {
                alert("현재 위치를 찾을 수 없습니다.");
            });
        } else {
            alert("이 브라우저는 Geolocation을 지원하지 않습니다.");
        }
    }
}

function getCoordinates(address) {
    if (typeof kakao !== 'undefined') {
        new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                const location = new kakao.maps.LatLng(result[0].y, result[0].x);
                displayMap(location);
            } else {
                alert("해당 지역을 찾을 수 없습니다.");
            }
        });
    } else {
        console.error("kakao 객체가 정의되지 않았습니다.");
    }
}

function displayMap(location) {
    map.setCenter(location);
    searchPlaces(location);
}

function searchPlaces(location) {
    const categoryGroupCode = 'FD6'; // 음식점 카테고리 코드
    const lat = location.getLat();
    const lng = location.getLng();

    fetch(`https://dapi.kakao.com/v2/local/search/keyword.json?category_group_code=${categoryGroupCode}&x=${lng}&y=${lat}&radius=1000&page=1&size=15`, {
        method: 'GET',
        headers: {
            'Authorization': 'KakaoAK YOUR_API_KEY' // 'YOUR_API_KEY'에 본인의 API 키를 입력
        }
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        displayResults(data); // 결과 표시 함수 호출
    })
    .catch(error => {
        console.error('There has been a problem with your fetch operation:', error);
    });
}

function displayResults(data) {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; // 이전 결과 초기화
    clearMarkers(); // 이전 마커 제거

    data.documents.forEach(restaurant => {
        const placeLocation = new kakao.maps.LatLng(restaurant.y, restaurant.x);
        markers.push(new kakao.maps.Marker({ position: placeLocation, map }));

        const button = document.createElement('button');
        button.className = 'restaurant-button';
        button.innerText = restaurant.place_name;
        button.onclick = () => showRestaurantInfo(restaurant.place_name);
        resultsContainer.appendChild(button);
    });
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
