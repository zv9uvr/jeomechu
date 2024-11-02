window.onload = function() {
    setLocation(); // 페이지 로드 시 기본 위치 설정
};

let markers = [];
let currentCategory;
let map; // 전역 변수로 map 선언

function showRestaurantScreen(category) {
    currentCategory = category; // 선택한 카테고리 저장
    document.getElementById('menuScreen').classList.add('hidden'); // 메뉴 화면 숨기기
    document.getElementById('restaurantScreen').classList.remove('hidden'); // 음식점 화면 보이기
    setLocation(); // 현재 위치에 기반하여 음식점 검색
}

function setLocation() {
    const locationInput = document.getElementById('locationInput').value.trim();
    getCoordinates(locationInput || '성남시', currentCategory);
}

function getCoordinates(address, category) {
    if (typeof kakao !== 'undefined') {
        new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                displayMap(new kakao.maps.LatLng(result[0].y, result[0].x), category);
            } else {
                document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
            }
        });
    } else {
        console.error("kakao 객체가 정의되지 않았습니다.");
    }
}

function displayMap(location, category) {
    if (!map) {
        map = new kakao.maps.Map(document.getElementById('map'), { center: location, level: 4 });
    } else {
        map.setCenter(location);
    }
    searchPlaces(location, category);
}

function searchPlaces(location, category) {
    new kakao.maps.services.Places().keywordSearch(category, (data, status) => {
        const resultDiv = document.getElementById('results');
        clearMarkers(); // 이전 마커 제거

        if (status === kakao.maps.services.Status.OK) {
            resultDiv.innerHTML = data.slice(0, 5).map(place => {
                const placeLocation = new kakao.maps.LatLng(place.y, place.x);
                markers.push(new kakao.maps.Marker({ position: placeLocation, map }));

                return `<button class="restaurant-button" onclick="showRestaurantInfo('${place.place_name}')">${place.place_name}</button>`;
            }).join('');
        } else {
            resultDiv.innerHTML = '장소를 찾을 수 없습니다.';
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

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
    document.getElementById('infoScreen').classList.add('hidden'); // 정보 화면도 숨김
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
}
ㅍ
