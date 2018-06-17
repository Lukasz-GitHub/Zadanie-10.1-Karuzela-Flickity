// Pętla z informacjami do szablonu Mustache
var templateList = document.getElementById('template-slide').innerHTML;
var elem = document.querySelector('.main-carousel');
Mustache.parse(templateList);

var generatedList = '';

for (var i = 0; i < slideData.length; i++) {
    console.log(slideData)
    generatedList += Mustache.render(templateList, slideData[i]);
}

elem.insertAdjacentHTML('beforeend', generatedList);
// Karuzela Flickity
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    pageDots: false
});
// Przycisk powrotu do pierwszego slajcu
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
// Pasek postępu
var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});
// Mapa
window.initMap = function () {
    var map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 4,
            center: slideData[0].coords
        });
    for (var i = 0; i < slideData.length; i++) {
        var marker = new google.maps.Marker({
            position: slideData[i].coords,
            map: map
        });
    }
}
