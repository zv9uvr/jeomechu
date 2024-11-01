let markers = [];
let currentCategory;

// 주소를 사용하여 좌표를 가져오는 함수
function getCoordinates(address, category) {
new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
if (status === kakao.maps.services.Status.OK) {
displayMap(new kakao.maps.LatLng(result[0].y, result[0].x), category);
} else {
            document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
            document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다. 정확한 주소를 입력하세요.';
}
});
}

// 주어진 좌표에 지도를 표시하는 함수
function displayMap(location, category) {
if (!map) {
map = new kakao.maps.Map(document.getElementById('map'), { center: location, level: 4 });
@@ -23,14 +25,15 @@ function displayMap(location, category) {
searchPlaces(location, category);
}

// 특정 카테고리의 장소를 검색하고 결과를 표시하는 함수
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
@@ -39,19 +42,29 @@ function searchPlaces(location, category) {
}, { location, radius: 1000, category_group_code: 'FD6' });
}

// 모든 마커를 제거하는 함수
function clearMarkers() {
markers.forEach(marker => marker.setMap(null));
markers = [];
}

// 음식점 정보 표시 함수 (버튼 클릭 시 호출)
function showRestaurantInfo(placeName) {
document.getElementById('restaurantScreen').classList.add('hidden');
document.getElementById('infoScreen').classList.remove('hidden');
const infoDiv = document.getElementById('info');
infoDiv.innerHTML = `<h2>${placeName}</h2><p>여기에 음식점에 대한 설명이 들어갑니다.</p>`;
}

// 위치 설정 함수
function setLocation() {
    const locationInput = document.getElementById('locationInput').value;
    getCoordinates(locationInput || '현재 위치', currentCategory);
    const locationInput = document.getElementById('locationInput').value.trim();
    // 입력된 위치가 없으면 '현재 위치'로 설정
    getCoordinates(locationInput || '부산광역시', currentCategory); // 기본값을 부산광역시로 설정
}

// 뒤로가기 버튼 기능
function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}
