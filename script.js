let markers = [];
let currentCategory;
let map; // 전역 변수로 map 선언

window.onload = function() {
    // 지도의 중심좌표와 초기화 설정
    const container = document.getElementById('map'); // 'map' id 확인
    const options = {
        center: new kakao.maps.LatLng(37.5665, 126.9780), // 서울 좌표 예시
        level: 3
    };

    map = new kakao.maps.Map(container, options); // 전역 변수로 map 초기화
};

function showRestaurantScreen(category) {
    currentCategory = category; // 선택한 카테고리 저장
    document.getElementById('menuScreen').classList.add('hidden'); // 메뉴 화면 숨기기
    document.getElementById('restaurantScreen').classList.remove('hidden'); // 음식점 화면 보이기
    setLocation(); // 현재 위치에 기반하여 음식점 검색
}

function setLocation() {
    const locationInput = document.getElementById('locationInput').value.trim();
    getCoordinates(locationInput || '성남시', currentCategory); // 기본값 설정
}

function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function getNewRecommendations() {
    // 이전 추천과 겹치지 않는 새로운 음식점 추천 로직
    // 새로운 음식을 추천하는 로직 구현
}
