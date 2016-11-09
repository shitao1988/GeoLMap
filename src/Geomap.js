'use strict';
L.GeoMap = L.Map.extend({
    options: {
        basetileLayer: [],
        featureLayer: {},
        legendControl: {},
        GeoCoder: false,
    },
    initialize: function(element,  options) {
        var customoptions = options;
        options = L.setOptions(this, options);
        L.Map.prototype.initialize.call(this, element, L.extend({}, L.Map.prototype.options, options));
        if (customoptions && customoptions.crs) {} else {
            options.crs = L.GeoTDTCRS;
        }


        if (options.basetileLayer.length > 0) {
            for (var i = 0; i < options.basetileLayer.length; i++) {
                this.addLayer(options.basetileLayer[i]);
            }
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
/* L.Map.include({
         addHash: function(){
             this._hash = L.hash(this);
             return this;
         },
 
         removeHash: function(){
             this._hash.remove();
             return this;
         }
     });*/