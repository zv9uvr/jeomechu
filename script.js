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
    currentCategory = category; // 선택한 카테고리 저장
    document.getElementById('menuScreen').classList.add('hidden'); // 메뉴 화면 숨기기
    document.getElementById('restaurantScreen').classList.remove('hidden'); // 음식점 화면 보이기
    setLocation(); // 현재 위치에 기반하여 음식점 검색
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
}
