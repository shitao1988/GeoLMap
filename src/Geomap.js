'use strict';
L.GeoMap = L.Map.extend({
    options: {
        basetileLayer: null,
        featureLayer: {},
        legendControl: {},
        GeoCoder: false,
    },
    initialize: function(element, options) {

        if (options.projection&&options.projection == "EPSG:4326") {
            let res = [];
            for (var i = 0; i < 8; i++) {
                res[i] = 0.0015228550437313788 / Math.pow(2, i);
            }
            res[8]=7.1383830174908385e-006;
            res[9]=4.7589220116605593e-006;
            options.crs  = new L.Proj.CRS(
                'EPSG:4326',
                "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
                    origin: [119, 32],
                    resolutions: res
                });
        }else if (options.projection&&options.projection == "EPSG:2437") {
            let res = [];
            for (var i = 0; i < 12; i++) {
                res[i] = 169.33367200067735 / Math.pow(2, i);
            }
            options.crs  = new L.Proj.CRS(
                'EPSG:2437',
                "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
                    origin: [0,91000],
                    resolutions: res
                });
                
        }else{
            let res = [];
            for (var i = 0; i < 21; i++) {
                res[i] = 1.40625 / Math.pow(2, i);
            }
            options.crs  = new L.Proj.CRS(
                'EPSG:4326',
                "+proj=longlat +ellps=WGS84 +datum=WGS84 +no_defs", {
                    origin: [-180.0, 90],
                    resolutions: res
                });
           
        }


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
            if (options.projection&&options.projection == "EPSG:4326") {
                this.addLayer(new L.GeoWMTSLayer("http://www.wxmap.com.cn/serviceaccess/wmts/wxMapGZ84", {
                    "type": "geotdtwmts",
                    "name": "无锡矢量",
                    "visibility": true,
                    "minZoom":0,
                    "maxZoom":10,
                    "title": "天地图",
                    "autoload": false,
                    "group": "矢量地图",
                    "layer": "0",
                    "style": "default",
                    "format": "image/png"
                }));
            }else if (options.projection&&options.projection == "EPSG:2437") {
                this.addLayer(new L.GeoWMTSLayer("http://172.10.0.30:8080/ogcservice/wmts/WXMAPHB2018", {
                    "type": "geotdtwmts",
                    "name": "无锡54",
                    "visibility": false,
                    "minZoom":0,
                    "maxZoom":10,
                    "title": "天地图",
                    "autoload": false,
                    "group": "无锡54",
                    "layer": "0",
                    "style": "default",
                    "format": "image/png"
                }));
                    
            }else{
                this.addLayer(new L.GeoTDTLayer.Vector());
                this.addLayer(new L.GeoTDTLayer.VectorAnno());
            }
    
           
        }
        if (!options.center) {
            if (options.projection&&options.projection == "EPSG:2437") {
                options.center = [46966.38049276099, 81931.46219625768];
                    
            }else{
                options.center = [31.585402714344134, 120.247218280816];
            }
            
        };
        if (!options.zoom) {
            if (options.projection&&options.projection == "EPSG:2437") {
                options.zoom = 3;
                    
            }else{
                options.zoom = 13;
            }
            
        };

        // if(options.ResMenu){
        //     var sidebar = L.control.sidebar();
        //     this.addControl(sidebar);
        // }

       
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
    },
    renderResourceControl(){
        
    }
});
L.geomap = function(element, options) {
    return new L.GeoMap(element, options);
};