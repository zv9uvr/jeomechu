window.onload = function() {
    // 지도의 중심좌표와 초기화 설정
    const container = document.getElementById('map'); // 'map' id 확인
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 좌표 예시
        level: 3
    };

    const map = new kakao.maps.Map(container, options);
};


function showRestaurantScreen(category) {
    currentCategory = category;
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
    setLocation(); // Default to current location when showing restaurants
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
}
