let map, markers = [];

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
            resultDiv.innerHTML = '<strong>추천 음식점:</strong><br>' + data.slice(0, 5).map(place => {
                markers.push(new kakao.maps.Marker({ position: new kakao.maps.LatLng(place.y, place.x), map }));
                return `<p>${place.place_name}</p>`;
            }).join('');
        } else {
            resultDiv.innerHTML = '결과를 찾을 수 없습니다.';
        }
    }, { location, radius: 1000, category_group_code: 'FD6' });
}

function clearMarkers() {
    markers.forEach(marker => marker.setMap(null));
    markers = [];
}
