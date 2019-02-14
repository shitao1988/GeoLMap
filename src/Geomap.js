'use strict';
L.GeoMap = L.Map.extend({
    options: {
        basetileLayer: null,
        featureLayer: {},
        legendControl: {},
        GeoCoder: false,
    },
    initialize: function(element, options) {

        var res = [];
        for (var i = 0; i < 21; i++) {
            res[i] = 1.40625 / Math.pow(2, i);
        }
        var crs = new L.Proj.CRS(
            'EPSG:4326',
            "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
                origin: [-180.0, 90],
                resolutions: res
            });


        var customoptions = options;
        options = L.setOptions(this, options);
        L.Map.prototype.initialize.call(this, element, L.extend({}, L.Map.prototype.options, options));
        if (customoptions && customoptions.crs) {} else {
            options.crs = crs;
        }
        if (options.basetileLayer instanceof Array && options.basetileLayer.length > 0) {
            for (var i = 0; i < options.basetileLayer.length; i++) {
                this.addLayer(options.basetileLayer[i]);
            }
        } else if (options.basetileLayer instanceof Array && options.basetileLayer.length == 0) {

        } else {
            this.addLayer(new L.GeoTDTLayer.Vector());
            this.addLayer(new L.GeoTDTLayer.VectorAnno());
        }
        if (!options.center) {
            options.center = [32, 118.7];
        };
        if (!options.zoom) {
            options.zoom = 13;
        };
        /*if (options.GeoCoder) {
            var geocoder = L.control.geocoder({
                zoomLevel: 16, 
                maxresults: 5, 
                workingClass: 'fa-spinner', 
                position: 'topleft'
            });
            this.addControl(geocoder);
        }*/
        this.setView(L.latLng(options.center), options.zoom, {
            reset: true
        });
    }
});
L.geomap = function(element, options) {
    return new L.GeoMap(element, options);
};