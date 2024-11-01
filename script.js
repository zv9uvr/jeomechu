let map;
let markers = [];
let currentCategory;
let previousRecommendations = [];

// 메뉴 화면에서 음식점 화면으로 전환
function showRestaurantScreen(category) {
    currentCategory = category;
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
    findRestaurants(category);
}

// 음식점 검색 및 결과 표시
function findRestaurants(category) {
    const locationInput = document.getElementById('locationInput').value || '현재 위치'; // 사용자의 입력 또는 현재 위치
    getCoordinates(locationInput, category);
}

// 주소를 사용하여 좌표를 가져오는 함수
function getCoordinates(address, category) {
    new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
        if (status === kakao.maps.services.Status.OK) {
            displayMap(new kakao.maps.LatLng(result[0].y, result[0].x), category);
        } else {
            document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
        }
    });
}

// 주어진 좌표에 지도를 표시하는 함수
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

// 특정 카테고리의 장소를 검색하고 결과를 표시하는 함수
function searchPlaces(location, category) {
    new kakao.maps.services.Places().keywordSearch(category, (data, status) => {
        const resultDiv = document.getElementById('results');
        if (status === kakao.maps.services.Status.OK) {
            // 검색 결과를 마커와 함께 표시
            resultDiv.innerHTML = '<strong>추천 음식점:</strong><br>' + data.slice(0, 5).map(place => {
                const placeLocation = new kakao.maps.LatLng(place.y, place.x);
                markers.push(new kakao.maps.Marker({ position: placeLocation, map }));

                return `<button class="restaurant-button" onclick="showRestaurantInfo('${place.place_name}', '${place.place_url}')">${place.place_name}</button>`;
            }).join('');
        } else {
            resultDiv.innerHTML = '결과를 찾을 수 없습니다.';
        }
    }, { location, radius: 1000, category_group_code: 'FD6' });
}

// 모든 마커를 제거하는 함수
function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}

// 음식점 정보 표시 함수 (버튼 클릭 시 호출)
function showRestaurantInfo(placeName, placeUrl) {
    // 세 번째 화면으로 이동하고 음식점 정보를 표시하는 로직
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('infoScreen').classList.remove('hidden');
    const infoDiv = document.getElementById('info');
    
    // 가게 이름과 설명을 여기에 추가할 수 있습니다.
    infoDiv.innerHTML = `<h2>${placeName}</h2>
                         <p>여기에 음식점에 대한 설명이 들어갑니다.</p>
                         <p><a href="${placeUrl}" target="_blank">자세히 보기</a></p>`;
}

// 뒤로가기 버튼 기능
function goBack() {
    document.getElementById('infoScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
}

// 새로운 음식점 추천 함수
function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
    const locationInput = document.getElementById('locationInput').value || '현재 위치'; // 사용자의 입력 또는 현재 위치
    getCoordinates(locationInput, currentCategory);
}

// 위치 설정 함수
function setLocation() {
    const locationInput = document.getElementById('locationInput').value;
    if (locationInput) {
        getCoordinates(locationInput, currentCategory);
    } else {
        alert("위치를 입력해주세요.");
    }
}
