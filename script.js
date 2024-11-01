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

function goToFirstScreen() {
    document.getElementById('infoScreen').classList.add('hidden');
    document.getElementById('menuScreen').classList.remove('hidden');
}

function goToSecondScreen() {
    document.getElementById('infoScreen').classList.add('hidden');
    document.getElementById('restaurantScreen').classList.remove('hidden');
}

