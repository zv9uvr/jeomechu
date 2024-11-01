function findRestaurants(category) {
    const locationInput = document.getElementById('locationInput').value.trim();
    toggleScreen();
    locationInput ? getCoordinates(locationInput, category) : getCurrentLocation(category);
}

function toggleScreen() {
    document.getElementById('menuScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
}

function getCurrentLocation(category) {
    navigator.geolocation.getCurrentPosition(
        pos => displayMap(new kakao.maps.LatLng(pos.coords.latitude, pos.coords.longitude), category),
        () => document.getElementById('results').innerHTML = '위치를 가져올 수 없습니다.',
        { enableHighAccuracy: true, timeout: 3000, maximumAge: 0 }
    );
}
