var map = L.map('mapid').setView([-12.1247789,-77.0342339], 16);

L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoidmFkZXIwNSIsImEiOiJja2Nzb2ZybXYwazRrMnlwN3M3d3ZmNW51In0.YOWBVtgfIBNR6kIBcarxzA', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);

//L.marker([-12.1247789,-77.0342339]).addTo(map);
//L.marker([-12.1242487,-77.0344748]).addTo(map);
//L.marker([-12.1242487,-77.0344728]).addTo(map);

$.ajax({
    dataType: "json",
    url: "api/bicicletas",
    success: function(result){
        console.log(result);
        result.bicicletas.forEach(function(bici){
            L.marker(bici.ubicacion, {title:bici.id}).addTo(map)
        })
    }
})