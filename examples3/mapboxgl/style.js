var tdtbase = {
    "version": 8,
    "sprite": "http://127.0.0.1:5500/sprites/sprite",
    "glyphs": "http://127.0.0.1:5500/glyphs/{fontstack}/{range}.pbf",
    "sources": {
        "deck": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        },
        "geostar1": {
            "type": "raster",
            "tiles": ["http://t2.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        },
        "geostar2": {
            "type": "raster",
            "tiles": ["http://t1.tianditu.com/cva_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        }
    },
    "layers": [
        {
            "id": "1",
            "type": "raster",
            "source": "geostar1",
            "raster-opacity": 1
        },
         {
            "id": "2",
            "type": "raster",
            "source": "geostar2",
            "raster-opacity": 1
        },]
}

var tdtbase2 = {
    "version": 8,
    "sprite": "http://127.0.0.1:5500/sprites/sprite",
    "glyphs": "http://127.0.0.1:5500/glyphs/{fontstack}/{range}.pbf",
    "sources": {
        "deck": {
            "type": "geojson",
            "data": {
                "type": "FeatureCollection",
                "features": []
            }
        },
        "geostar1": {
            "type": "raster",
            "tiles": ["http://t2.tianditu.com/vec_w/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=w&format=tiles&height=256&width=256&tilematrixSet=w&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        },
        "geostar2": {
            "type": "raster",
            "tiles": ["http://t1.tianditu.com/cva_w/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=w&format=tiles&height=256&width=256&tilematrixSet=w&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        }
    },
    "layers": [
        {
            "id": "1",
            "type": "raster",
            "source": "geostar1",
            "raster-opacity": 1
        },
         {
            "id": "2",
            "type": "raster",
            "source": "geostar2",
            "raster-opacity": 1
        },]
}


var simple = {
    "version": 8,
    "sprite": "http://127.0.0.1:5500/sprites/sprite",
    "glyphs": "http://127.0.0.1:5500/glyphs/{fontstack}/{range}.pbf",
    "sources": {
        "geostar1": {
            "type": "raster",
            //"tiles": ["http://localhost/WebClient2/ProxyHandler.ashx?URL=http://t2.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],

            "tiles": ["http://t2.tianditu.com/vec_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=vec&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        },
        "geostar2": {
            "type": "raster",
            //"tiles": ["http://localhost/WebClient2/ProxyHandler.ashx?URL=http://t1.tianditu.com/cva_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],

            "tiles": ["http://t1.tianditu.com/cva_c/wmts?service=WMTS&request=GetTile&version=1.0.0&layer=cva&style=default&tk=56e2ef8967b3a0dbb746b7a40b7faa94&tileMatrixSet=c&format=tiles&height=256&width=256&tilematrixSet=c&attribution=%E5%A4%A9%E5%9C%B0%E5%9B%BE&tilematrix={z}&tilerow={y}&tilecol={x}"],
            "tileSize": 256
        },
        "openmaptiles": {
            "type": "vector",
            "scheme": "geoserver",
            "minzoom": 10,
            "tiles": ["http://localhost:8088/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geostar:wuxi&STYLE=&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"]

        },
        "citybuilding": {
            "type": "vector",
            "scheme": "geoserver",
            "minzoom": 10,
            "tiles": ["http://localhost:8088/geoserver/gwc/service/wmts?REQUEST=GetTile&SERVICE=WMTS&VERSION=1.0.0&LAYER=geostar:buildings&STYLE=&TILEMATRIX=EPSG:4326:{z}&TILEMATRIXSET=EPSG:4326&FORMAT=application/x-protobuf;type=mapbox-vector&TILECOL={x}&TILEROW={y}"]

        }
    },
    "layers": [

        {
            'id': '3d-buildings',
            'source': 'citybuilding',
            'source-layer': 'buildings',
            'type': 'fill-extrusion',
            'minzoom': 15,
            'paint': {
                'fill-extrusion-color': '#aaa',

                // use an 'interpolate' expression to add a smooth transition effect to the
                // buildings as the user zooms in
                'fill-extrusion-height': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "FWCS"]
                ],
                'fill-extrusion-base': [
                    "interpolate", ["linear"], ["zoom"],
                    15, 0,
                    15.05, ["get", "DXFWCS"]
                ],
                'fill-extrusion-opacity': .3
            }
        },

        {
            "id": "waterways_tunnel",
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "river",
                    "stream",
                    "canal"
                ]
            ],
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "waterways",
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                },
                "line-dasharray": [
                    2,
                    4
                ]
            },
            "minzoom": 14
        },
        {
            "id": "waterways-other",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "source": "openmaptiles",
            "source-layer": "waterways",
            "filter": [
                "!in",
                "type",
                "canal",
                "river",
                "stream"
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                }
            }
        },
        {
            "id": "waterways-stream-canal",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "source": "openmaptiles",
            "source-layer": "waterways",
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "canal",
                    "stream"
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.3,
                    "stops": [
                        [
                            13,
                            0.5
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        },
        {
            "id": "waterways-river",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849382550.77"
            },
            "source": "openmaptiles",
            "source-layer": "waterways",
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "river"
                ]
            ],
            "layout": {
                "line-cap": "round"
            },
            "paint": {
                "line-color": "#a0c8f0",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            10,
                            0.8
                        ],
                        [
                            20,
                            6
                        ]
                    ]
                }
            }
        }, {
            "id": "tunnel-trunk-primary-casing",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "primary",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-motorway-casing",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",

                [
                    "==",
                    "type",
                    "motorway"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#e9ac77",
                "line-dasharray": [
                    0.5,
                    0.25
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            5,
                            0.4
                        ],
                        [
                            6,
                            0.6
                        ],
                        [
                            7,
                            1.5
                        ],
                        [
                            20,
                            22
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-path",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",
                [
                    "==",
                    "$type",
                    "LineString"
                ],
                [
                    "all",
                    [
                        "==",
                        "type",
                        "path"
                    ]
                ]
            ],
            "paint": {
                "line-color": "#cba",
                "line-dasharray": [
                    1.5,
                    0.75
                ],
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15,
                            1.2
                        ],
                        [
                            20,
                            4
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-service-track",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "service",
                    "track"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            15.5,
                            0
                        ],
                        [
                            16,
                            2
                        ],
                        [
                            20,
                            7.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-minor",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",
                [
                    "==",
                    "type",
                    "minor_road"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff",
                "line-opacity": 1,
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            13.5,
                            0
                        ],
                        [
                            14,
                            2.5
                        ],
                        [
                            20,
                            11.5
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-secondary-tertiary",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",

                [
                    "in",
                    "type",
                    "secondary",
                    "tertiary"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            10
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-trunk-primary",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",

                [
                    "in",
                    "type",
                    "primary",
                    "trunk"
                ]
            ],
            "layout": {
                "line-join": "round"
            },
            "paint": {
                "line-color": "#fff4c6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-motorway",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",

                [
                    "==",
                    "type",
                    "motorway"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "#ffdaa6",
                "line-width": {
                    "base": 1.2,
                    "stops": [
                        [
                            6.5,
                            0
                        ],
                        [
                            7,
                            0.5
                        ],
                        [
                            20,
                            18
                        ]
                    ]
                }
            }
        },
        {
            "id": "tunnel-railway",
            "type": "line",
            "metadata": {
                "mapbox:group": "1444849354174.1904"
            },
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",

                [
                    "==",
                    "type",
                    "rail"
                ]
            ],
            "paint": {
                "line-color": "#bbb",
                "line-width": {
                    "base": 1.4,
                    "stops": [
                        [
                            14,
                            0.4
                        ],
                        [
                            15,
                            0.75
                        ],
                        [
                            20,
                            2
                        ]
                    ]
                },
                "line-dasharray": [
                    2,
                    2
                ]
            }
        },
        {
            "id": "ferry",
            "type": "line",
            "source": "openmaptiles",
            "source-layer": "roads",
            "filter": [
                "all",
                [
                    "in",
                    "type",
                    "ferry"
                ]
            ],
            "layout": {
                "line-join": "round",
                "visibility": "visible"
            },
            "paint": {
                "line-color": "rgba(108, 159, 182, 1)",
                "line-width": 1.1,
                "line-dasharray": [
                    2,
                    2
                ]
            }
        }, {
            "id": "landuse-residential",
            "type": "fill",
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "==",
                "type",
                "residential"
            ],
            "paint": {
                "fill-color": {
                    "base": 1,
                    "stops": [
                        [
                            12,
                            "hsla(30, 19%, 90%, 0.4)"
                        ],
                        [
                            16,
                            "hsla(30, 19%, 90%, 0.2)"
                        ]
                    ]
                }
            }
        }, {
            "id": "landuse-commercial",
            "type": "fill",
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "all", [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "type",
                    "commercial"
                ]
            ],
            "paint": {
                "fill-color": "hsla(0, 60%, 87%, 0.23)"
            }
        }, {
            "id": "landuse-industrial",
            "type": "fill",
            "metadata": {
                "mapbox:group": "1444849388993.3071"
            },
            "source": "openmaptiles",
            "source-layer": "landuse",
            "filter": [
                "all", [
                    "==",
                    "$type",
                    "Polygon"
                ],
                [
                    "==",
                    "type",
                    "industrial"
                ]
            ],
            "paint": {
                "fill-color": "hsla(49, 100%, 88%, 0.34)"
            }
        }, {
            "id": "highway-name-major",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "roads",
            "minzoom": 12.2,
            "filter": [
                "in",
                "type",
                "primary",
                "secondary",
                "tertiary",
                "trunk"
            ],
            "layout": {
                "text-size": {
                    "base": 1,
                    "stops": [
                        [
                            13,
                            12
                        ],
                        [
                            14,
                            13
                        ]
                    ]
                },
                "text-font": [
                    "NotoCJK"
                ],
                "text-field": "{name}",
                "symbol-placement": "line",
                "text-rotation-alignment": "viewport"
            },
            "paint": {
                "text-halo-blur": 0.5,
                "text-color": "#765",
                "text-halo-width": 1
            }
        },
        {
            "id": "poi-level-3",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "points",
            "minzoom": 16,
            "filter": [
                "all",

            ],
            "layout": {
                "text-padding": 2,
                "text-font": [
                    "NotoCJK"
                ],
                "text-anchor": "top",
                "icon-image": "{type}_11",
                "text-field": "{name}",
                "text-offset": [
                    0,
                    0.6
                ],
                "text-size": 12,
                "text-max-width": 9
            },
            "paint": {
                "text-halo-blur": 0.5,
                "text-color": "#666",
                "text-halo-width": 1,
                "text-halo-color": "#ffffff"
            }
        },
        {
            "id": "poi-level-2",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "points",
            "minzoom": 15,
            "filter": [
                "all"
            ],
            "layout": {
                "text-padding": 2,
                "text-font": [
                    "NotoCJK"
                ],
                "text-anchor": "top",
                "icon-image": "{type}_11",
                "text-field": "{name}",
                "text-offset": [
                    0,
                    0.6
                ],
                "text-size": 12,
                "text-max-width": 9
            },
            "paint": {
                "text-halo-blur": 0.5,
                "text-color": "#666",
                "text-halo-width": 1,
                "text-halo-color": "#ffffff"
            }
        },
        {
            "id": "poi-level-1",
            "type": "symbol",
            "source": "openmaptiles",
            "source-layer": "points",
            "minzoom": 14,
            "filter": [
                "all",
            ],
            "layout": {
                "text-padding": 2,
                "text-font": [
                    "NotoCJK"
                ],
                "text-anchor": "top",
                "icon-image": "{type}_11",
                "text-field": "{name}",
                "text-offset": [
                    0,
                    0.6
                ],
                "text-size": 12,
                "text-max-width": 9
            },
            "paint": {
                "text-halo-blur": 0.5,
                "text-color": "#666",
                "text-halo-width": 1,
                "text-halo-color": "#ffffff"
            }
        }]
}