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
    // 위치 정보 및 음식점 검색 로직 (이전 코드와 유사)
    // 결과를 buttons로 변환하여 출력
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
}

function showInfoScreen(restaurant) {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('infoScreen').classList.remove('hidden');

    const infoDiv = document.getElementById('info');
    infoDiv.innerHTML = `<h2>${restaurant.name} (${restaurant.rating} 점)</h2>
                         <p>대표 메뉴: ${restaurant.menu.join(', ')}</p>
                         <img src="${restaurant.image}" alt="${restaurant.name}" style="width:100%; height:auto;">`;

    // 맵 표시하기
    const infoMap = new kakao.maps.Map(document.getElementById('infoMap'), {
        center: new kakao.maps.LatLng(restaurant.latitude, restaurant.longitude),
        level: 4
    });
}
