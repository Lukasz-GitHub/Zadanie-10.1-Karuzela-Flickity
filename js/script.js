var elem = document.querySelector('.main-carousel');
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    pageDots: false
});

var buttonReset = document.querySelector('.button-reset');
var button = buttonReset.querySelector('.button');
button = fizzyUIUtils.makeArray(button);

buttonReset.addEventListener('click', function (event) {
    if (!matchesSelector(event.target, '.button')) {
        return;
    }
    var index = button.indexOf(event.target);
    flkty.select(index);
});

var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});