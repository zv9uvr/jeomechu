window.onload = function() {
    // 초기 위치 설정
    setLocation(); // 페이지 로드 시 기본 위치 설정
};

let markers = [];
let currentCategory;
let map; // 전역 변수로 map 선언

function setLocation() {
    const locationInput = document.getElementById('locationInput').value.trim();
    // 기본값으로 '성남시' 사용
    getCoordinates(locationInput || '성남시', currentCategory); 
}

// 주소를 사용하여 좌표를 가져오는 함수
function getCoordinates(address, category) {
    // kakao 객체가 정의되었는지 확인
    if (typeof kakao !== 'undefined') {
        new kakao.maps.services.Geocoder().addressSearch(address, (result, status) => {
            if (status === kakao.maps.services.Status.OK) {
                displayMap(new kakao.maps.LatLng(result[0].y, result[0].x), category);
            } else {
                document.getElementById('results').innerHTML = '해당 지역을 찾을 수 없습니다.';
            }
        });
    } else {
        console.error("kakao 객체가 정의되지 않았습니다."); // 에러 메시지 출력
    }
}

// 주어진 좌표에 지도를 표시하는 함수
function displayMap(location, category) {
    if (!map) {
        map = new kakao.maps.Map(document.getElementById('map'), { center: location, level: 4 });
    } else {
        map.setCenter(location); // 맵이 이미 있는 경우, 위치를 업데이트
    }
    searchPlaces(location, category);
}

// 특정 카테고리의 장소를 검색하고 결과를 표시하는 함수
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

// 뒤로가기 버튼 기능
function goBack() {
    document.getElementById('restaurantScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}
