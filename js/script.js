// Pętla z informacjami do szablonu Mustache
var map;
var templateList = document.getElementById('template-slide').innerHTML;
var elem = document.querySelector('.main-carousel');
Mustache.parse(templateList);

var generatedList = '';

for (var i = 0; i < slideData.length; i++) {
    generatedList += Mustache.render(templateList, slideData[i]);
}

elem.insertAdjacentHTML('beforeend', generatedList);
// Karuzela Flickity
var flkty = new Flickity(elem, {
    cellAlign: 'left',
    contain: true,
    pageDots: false
});
// Przycisk powrotu do pierwszego slajdu
var buttonReset = document.querySelector('.button-reset');
buttonReset.addEventListener('click', function (event) {
    flkty.select(0);
});

// Pasek postępu
var progressBar = document.querySelector('.progress-bar')
flkty.on('scroll', function (progress) {
    progress = Math.max(0, Math.min(1, progress));
    progressBar.style.width = progress * 100 + '%';
});

flkty.on('change', function (index) {
    map.setCenter(slideData[index].coords);
    map.setZoom(6);
});

// Mapa
window.initMap = function () {
    map = new google.maps.Map(
        document.getElementById('map'), {
            zoom: 2,
            center: slideData[0].coords
        }
    );

    for (var i = 0; i < slideData.length; i++) {
        var marker = new google.maps.Marker({
            position: slideData[i].coords,
            map: map
        });

        marker.addListener('click', function (i) {
            zoom: 12,
            flkty.select(i);
        }.bind(null, i));
    }
}
