let currentIndex = 0;

function moveLeft() {
    const track = document.querySelector('.carousel-track');
    const totalItems = track.children.length;
    const itemWidth = track.children[0].offsetWidth;

    currentIndex = (currentIndex > 0) ? currentIndex - 1 : totalItems - 1;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}

function moveRight() {
    const track = document.querySelector('.carousel-track');
    const totalItems = track.children.length;
    const itemWidth = track.children[0].offsetWidth;

    currentIndex = (currentIndex < totalItems - 1) ? currentIndex + 1 : 0;
    track.style.transform = `translateX(-${currentIndex * itemWidth}px)`;
}