/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * Leaflet 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "Leaflet"
};
var exampleConfig = {

    "viz": {
        name: "可视化",
        name_en: "Visualization",
        content: {
            "heat": {
                name: "热力图",
                name_en: "Heat map",
                content: [{
                    name: "微博点数据",
                    name_en: "random points",
                    thumbnail: "l_heat.png",
                    fileName: "heatmap"
                }]
            },
            "animate": {
                name: "动画",
                name_en: "Animation",
                content: [{
                    name: "闪烁点",
                    name_en: "flashing points",
                    thumbnail: "l_pulse.gif",
                    fileName: "12_pulse"
                }]
            },
            "cluster": {
                name: "聚合",
                name_en: "Cluster",
                content: [{
                    name: "点聚合",
                    name_en: "marker cluster",
                    thumbnail: "marker_clustering.png",
                    fileName: "marker_clustering"
                },{
                    name: "点聚合-自定义样式",
                    name_en: "marker cluster",
                    thumbnail: "marker_clustering_custom.png",
                    fileName: "marker_clustering_custom"
                },{
                    name: "点聚合-点随机移动",
                    name_en: "marker cluster",
                    thumbnail: "marker_clustering_dragging.png",
                    fileName: "marker_clustering_dragging"
                },{
                    name: "点聚合-大数据量",
                    name_en: "marker cluster",
                    thumbnail: "marker_clustering_big.png",
                    fileName: "marker_clustering_big"
                }]
            },
  
            "ECharts": {
                name: "ECharts",
                name_en: "ECharts",
                content: [
                    {
                        name: "全国空气质量图",
                        name_en: "scatter",
                        thumbnail: "l_echartsEffectScatter.png",
                        fileName: "echartsEffectScatter"
                    }, {
                        name: "迁徙图",
                        name_en: "migration",
                        thumbnail: "l_echartsGeoLines.gif",
                        fileName: "echartsGeoLines"
                    }, {
                        name: "热力图",
                        name_en: "heat map",
                        thumbnail: "l_echartsHeatmap.png",
                        fileName: "echartsHeatmap"
                    }, {
                        name: "线路图",
                        name_en: "line",
                        thumbnail: "l_echartsLinesBus.png",
                        fileName: "echartsLinesBus"
                    }, {
                        name: "线特效",
                        name_en: "line effect",
                        thumbnail: "l_echartsLinesEffect.gif",
                        fileName: "echartsLinesEffect"
                    }, {
                        name: "折线图",
                        name_en: "line chart",
                        thumbnail: "l_echartsLineMarker.png",
                        fileName: "echartsLineMarker"
                    }, {
                        name: "柱状图",
                        name_en: "bar chart",
                        thumbnail: "l_echartsBar.png",
                        fileName: "echartsBar"
                    }, {
                        name: "散点图",
                        name_en: "scatter chart",
                        thumbnail: "l_echartsScatter.png",
                        fileName: "echartsScatter"
                    }, {
                        name: "饼图",
                        name_en: "pie chart",
                        thumbnail: "l_echartsPie.png",
                        fileName: "echartsPie"
                    }, {
                        name: "世界飞机航线图",
                        name_en: "Airplane route map",
                        thumbnail: "l_echartsLinesAirline.png",
                        fileName: "echartsLinesAirline"
                    }, {
                        name: "微博签到图",
                        name_en: "weibo scatter",
                        thumbnail: "l_echartsScatterWeibo.png",
                        fileName: "echartsScatterWeibo"
                    }, {
                        name: "方形图",
                        name_en: "binning on Map",
                        thumbnail: "l_echartsCellMap.png",
                        fileName: "echartsCellMap"
                    }, {
                        name: "2008到2017年地震概况统计",
                        name_en: "2008 to 2017 years of earthquake statistics",
                        version: "9.1.0",
                        thumbnail: "l_echartsEarthquake.png",
                        fileName: "echartsEarthquake"
                    }, {
                        name: "2018年2月北京房价",
                        name_en: "Beijing house prices of Lianjia(2018.2)",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartsLianjiaGridLayer.png",
                        fileName: "echartsGridMapLayer"
                    }, {
                        name: "北京道路网络图（130万点数据绘制）",
                        name_en: "Use lines to draw 1.3 millions Beijing streets",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartsLinesMillionsBeijingRoads.png",
                        fileName: "echarts_linesDrawMillionsBeijingRoadsNetwork"
                    }, {
                        name: "纽约出租车上车点分布图（140万点数据绘制）",
                        name_en: "Use scatter to draw 1.4 millions New York Taxi Points",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartScatterMillionsNewYorkTaxi.png",
                        fileName: "echarts_scatterDrawMillionsNewYorkTaxiPoints"
                    }, {
                        name: "全国铁路网络图（400万点数据绘制）",
                        name_en: "Use lines to draw 4 millions Chinese railways",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartsLinesMillionsRailway.png",
                        fileName: "echarts_linesDrawMillionsRailwaysNetwork"
                    }, {
                        name: "全国水系图（1400万点数据绘制）",
                        name_en: "Use lines to draw 14 millions Chinese water system",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartsLinesMillionsWaterSystem.png",
                        fileName: "echarts_linesDrawMillionsWaterSystem"
                    }, {
                        name: "全国道路网络图（2500万点数据绘制）",
                        name_en: "Use lines to draw 25 millions Chinese roads",
                        version: "9.1.0",
                        localIgnore: true,
                        thumbnail: "l_echartsLinesMillionsRoads.png",
                        fileName: "echarts_linesDrawMillionsRoadsNetwork_50WFeatures"
                    }, {
                        name: "车辆监控模拟",
                        name_en: "Car Animation",
                        version: "9.1.0",
                        thumbnail: "l_echartsAnimatorCar.png",
                        fileName: "echartsAnimatorCar"
                    }
                ]

            },
            "MapV": {
                name: "MapV",
                name_en: "MapV",
                content: [{
                    name: "蜂巢图",
                    name_en: "honeycomb",
                    thumbnail: "l_mapVLayer_honeycomb.png",
                    fileName: "mapVLayerHoneycomb"
                }, {
                    name: "纽约出租车上车点",
                    name_en: "NY taxi car point",
                    thumbnail: "l_mapVLayer_point.png",
                    fileName: "mapVLayerPoint"
                }, {
                    name: "通勤图",
                    name_en: "OD",
                    thumbnail: "l_mapvLayer_csvCar.png",
                    fileName: "mapVLayerCSVCar"
                }, {
                    name: "强边界图",
                    name_en: "force edge bundling",
                    thumbnail: "l_mapvLayer_forceEdgeBunding.gif",
                    fileName: "mapVLayerForceEdgeBunding"
                }, {
                    name: "迁徙时序图",
                    name_en: "migration",
                    thumbnail: "l_mapvLayer_qianxitime.gif",
                    fileName: "mapVLayerQianxiTime"
                }, {
                    name: "迁徙图",
                    name_en: "migration",
                    thumbnail: "l_mapvLayer_qianxi.gif",
                    fileName: "mapVLayerQianxi"
                }, {
                    name: "动态轨迹",
                    name_en: "dynamic trajectory",
                    thumbnail: "l_mapvLayer_polylineTime.gif",
                    fileName: "mapVLayerPolylineTime"
                }, {
                    name: "简单线",
                    name_en: "simple line",
                    thumbnail: "l_mapvLayer_polyline.png",
                    fileName: "mapVLayerPolylineSimple"
                }, {
                    name: "强度线",
                    name_en: "line density",
                    thumbnail: "l_mapvLayer_polylineIntensity.png",
                    fileName: "mapVLayerPolylineIntensity"
                }, {
                    name: "面",
                    name_en: "simple polygon",
                    thumbnail: "l_mapvLayer_polygon.png",
                    fileName: "mapVLayerPolygon"
                }, {
                    name: "北京乡镇分布",
                    name_en: "village of beijing",
                    thumbnail: "l_mapvLayer_polygonBuildings.png",
                    fileName: "mapVLayerPolygonBuildings"
                }, {
                    name: "2018年2月北京房价",
                    name_en: "Beijing house prices(2018.2)",
                    version: "9.1.0",
                    localIgnore: true,
                    thumbnail: "l_mapvLianjia.png",
                    fileName: "mapvLianjiaData"
                }]
            },
            "D3": {
                name: "D3",
                name_en: "D3",
                content: [{
                    name: "单值专题图",
                    name_en: "unique thematic layer",
                    thumbnail: "l_d3UniqueThemeLayer.png",
                    fileName: "d3UniqueThemeLayer"
                }, {
                    name: "分段专题图",
                    name_en: "range thematic layer",
                    thumbnail: "l_d3RangeThemeLayer.png",
                    fileName: "d3RangeThemeLayer"
                }, {
                    name: "蜂巢图",
                    name_en: "honeycomb layer",
                    thumbnail: "l_d3HexbinLayer.png",
                    fileName: "d3HexbinLayer"
                }]
            },
            "extrusion": {
                name: "OSMBuildings",
                name_en: "OSMBuildings",
                content: [{
                    name: "建筑立体效果",
                    name_en: "OSMBuildings",
                    thumbnail: "l_osmbuildings.png",
                    fileName: "osmbuildings"
                }]
            },
            "tileVectorLayer": {
                name: "矢量瓦片",
                name_en: "Vector tile layer",
                content: [
                    {
                        name: "默认风格",
                        name_en: "normal style",
                        thumbnail: "l_tileVectorLayer_normal.png",
                        fileName: "vectorTileLayerNormal"
                    }, {
                        name: "月夜风格",
                        name_en: "night style",
                        thumbnail: "l_tileVectorLayer_night.png",
                        fileName: "vectorTileLayerNight"
                    }, {
                        name: "强边界风格",
                        name_en: "boundray style",
                        thumbnail: "l_tileVectorLayer_boundray.png",
                        fileName: "vectorTileLayerBoundary"
                    }, {
                        name: "深夜蓝黑风格",
                        name_en: "dark-blue style",
                        thumbnail: "l_tileVectorLayer_darkBlue.png",
                        fileName: "vectorTileLayerDarkBlue"
                    }, {
                        name: "HelloKitty风格",
                        name_en: "hellokitty style",
                        thumbnail: "l_tileVectorLayer_helloKitty.png",
                        fileName: "vectorTileLayerHelloKitty"
                    }, {
                        name: "淡雅绿风格",
                        name_en: "natural style",
                        thumbnail: "l_tileVectorLayer_natural.png",
                        fileName: "vectorTileLayerNatural"
                    }, {
                        name: "默认风格(MVT)",
                        name_en: "normal(MVT)",
                        thumbnail: "l_tileVectorLayer_normal.png",
                        fileName: "vectorTileLayerMVT"

                    }, {
                        name: "默认风格(MVT 4326)",
                        name_en: "normal(MVT 4326)",
                        thumbnail: "l_tileVectorLayer_mvt4326.png",
                        fileName: "vectorTileLayerMVT_4326"

                    }
                ]
            },
            "themeLayer": {
                name: "客户端专题图",
                name_en: "Client thematic layer",
                content: [{
                    name: "分段设色专题图",
                    name_en: "unique",
                    thumbnail: "l_rangeThemeLayer.png",
                    fileName: "rangeThemeLayer"
                }, {
                    name: "等级符号专题图",
                    name_en: "rank symbol",
                    thumbnail: "l_rankSymbolThemeLayer.png",
                    fileName: "rankSymbolThemeLayer"
                },  {
                    name: "图表专题图",
                    name_en: "statistical chart",
                    thumbnail: "l_graphThemeLayer.png",
                    fileName: "echart2"
                }]
            }
        }
    },
    "dynamicPlot": {
        name: "动态标绘",
        name_en: "DynamicPlot",
        content: {
            "plot": {
                name: "标绘",
                name_en: "Plot",
                content: [{
                    name: "标绘基本",
                    name_en: "dynamic plot",
                    version: "9.1.0",
                    thumbnail: "draw_basic.png",
                    fileName: "draw_basic"
                },
                {
                    name: "自定义工具条",
                    name_en: "custom toolbar",
                    version: "9.1.0",
                    thumbnail: "draw_custombar.png",
                    fileName: "draw_custombar"
                },
                {
                    name: "编辑handler",
                    name_en: "draw handler",
                    version: "9.1.0",
                    thumbnail: "draw_handler.png",
                    fileName: "draw_handler"
                }]
            }
        }
    },
    "clientSpatialAnalyst": {
        name: "客户端分析",
        name_en: "Client spatial analysis",
        content: {
            "Turf": {
                name: "Turf",
                content: [{
                    name: "插值分析",
                    name_en: "interpolation analysis",
                    thumbnail: "l_interpolationAnalysis.png",
                    fileName: "turf_interpolationAnalysis"
                }, {
                    name: "分类分析",
                    name_en: "classification analysis",
                    thumbnail: "l_classificationAnalysis.png",
                    fileName: "turf_classificationAnalysis"
                }, {
                    name: "格网分析",
                    name_en: "grid analysis",
                    thumbnail: "l_gridAnalysis.png",
                    fileName: "turf_gridAnalysis"
                }, {
                    name: "测量计算",
                    name_en: "measurement",
                    thumbnail: "l_turf_measurement.png",
                    fileName: "turf_measurement"
                }, {
                    name: "面合并",
                    name_en: "union",
                    thumbnail: "l_turf_union.png",
                    fileName: "turf_union"
                }]
            }
        }
    },
    "control": {
        name: "控件",
        name_en: "Control",
        content: {
            "draw": {
                name: "点线面绘制",
                name_en: "Draw",
                content: [{
                    name: "绘制与修改",
                    name_en: "draw and modify",
                    thumbnail: "l_drawAndModify.png",
                    fileName: "draw_basic"
                }]
            },
            "leafletOfficialControl": {
                name: "基础控件",
                name_en: "Base control",
                content: [{
                    name: "缩放控件",
                    name_en: "zoom control",
                    thumbnail: "l_controler_zoom.png",
                    fileName: "controler_zoom"
                }, {
                    name: "比例尺控件",
                    name_en: "scaleline control",
                    thumbnail: "l_controler_scaleline.png",
                    fileName: "controler_scaleline"
                }, {
                    name: "版权控件",
                    name_en: "attribution control",
                    thumbnail: "l_controler_attribution.png",
                    fileName: "controler_attribution"
                }, {
                    name: "图层切换",
                    name_en: "layer switch control",
                    thumbnail: "l_controler_layerswitcher.png",
                    fileName: "controler_layerswitcher"
                }, {
                    name: "自定义图标",
                    name_en: "markers with custom icons",
                    thumbnail: "l_controler_markersWithCustomIcons.png",
                    fileName: "controler_markersWithCustomIcons"
                }, {
                    name: "卷帘",
                    name_en: "roller blinds",
                    thumbnail: "l_controler_layerswitch.png",
                    fileName: "controler_layerswitch"
                }, {
                    name: "鹰眼图",
                    name_en: "overview map control",
                    thumbnail: "l_controler_overviewMap.png",
                    fileName: "controler_overviewMap"
                }]
            }
        }
    },
    "OGC": {
        name: "OGC",
        name_en: "OGC",
        content: {
            "WMTS": {
                name: "WMTS",
                name_en: "WMTS",
                content: [{
                    name: "WMTS图层",
                    name_en: "WMTS layer",
                    thumbnail: "l_WMTSLayer.png",
                    fileName: "WMTSLayer"
                }]
            },
            "WMS": {
                name: "WMS",
                name_en: "WMS",
                content: [{
                    name: "WMS图层",
                    name_en: "WMS layer",
                    thumbnail: "l_WMSLayer.png",
                    fileName: "WMSLayer"
                }]
            }
        }
    },
    "arcgis": {
        name: "arcgis",
        name_en: "arcgis",
        content: {
            "MapServer": {
                name: "MapServer",
                name_en: "MapServer",
                content: [{
                    name: "基本",
                    name_en: "basic",
                    thumbnail: "l_WMTSLayer.png",
                    fileName: "WMTSLayer"
                }]
            }
        }
    },
    "mapping": {
        name: "互联网地图",
        name_en: "Third party map",
        localIgnore: true,
        content: {
            "Tianditu": {
                name: "天地图",
                name_en: "Tianditu",
                content: [{
                    name: "天地图-墨卡托",
                    name_en: "tianditu-mercator",
                    thumbnail: "l_tiandituLayer_mercator.png",
                    fileName: "basemap-tdt"
                }]
            },
        }
    }

};

/**
 *key值：为exampleConfig配置的key值或者fileName值
 *      （为中间节点时是key值，叶结点是fileName值）
 *value值：fontawesome字体icon名
 *不分层
 */
var sideBarIconConfig = {
    "iServer": "fa-server",
    "iPortal": "fa-desktop",
    "Online": "fa-cloud",
    "iManager": "fa-group",
    "Elasticsearch": "fa-tasks",
    "plot": "fa-edit",
    "dynamicPlot": "fa-pencil",
    "control": "fa-sliders",
    "widgets": "fa-window-restore",
    "clientSpatialAnalyst": "fa-object-group",
    "viz": "fa-map",
    "OGC": "fa-globe",
    "mapping": "fa-send"
};

/**
 *key值：为exampleConfig配置的key值
 *value值：fontawesome字体icon名
 *与sideBarIconConfig的区别：sideBarIconConfig包括侧边栏所有层级目录的图标，exampleIconConfig仅包括一级标题的图标
 */
var exampleIconConfig = {
    "iServer": "fa-server",
    "iPortal": "fa-desktop",
    "Online": "fa-cloud",
    "iManager": "fa-group",
    "Elasticsearch": "fa-tasks",
    "plot": "fa-edit",
    "dynamicPlot": "fa-pencil",
    "control": "fa-sliders",
    "widgets": "fa-window-restore",
    "clientSpatialAnalyst": "fa-object-group",
    "viz": "fa-map",
    "OGC": "fa-globe",
    "mapping": "fa-send"
};
window.leafletExampleConfig = exampleConfig;