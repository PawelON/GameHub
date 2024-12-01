var images = document.querySelectorAll('.zoom-image');

images.forEach(function(image) {
    image.addEventListener('click', function() {
        if (this.classList.contains('zoomed-in')) {
            this.classList.remove('zoomed-in');
        } else {
            this.classList.add('zoomed-in');
        }
    });
});