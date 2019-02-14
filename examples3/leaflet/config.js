/* Copyright© 2000 - 2018 SuperMap Software Co.Ltd. All rights reserved.*/
/**
 * Leaflet 示例配置文件：包含示例的分类、名称、缩略图、文件路径
 */
var identification = {
    name: "Leaflet"
};
var exampleConfig = {


    "Elasticsearch": {
        name: "Elasticsearch",
        name_en: "Elasticsearch",
        localIgnore: true,
        content: {
            "es_viz": {
                name: "可视化",
                name_en: "Visualization",
                content: [{
                    name: "热力/格网图",
                    name_en: "heat/grid map",
                    thumbnail: "l_ESHeatMap.gif",
                    fileName: "ESHeatMap"
                }, {
                    name: "航班监控",
                    name_en: "flight monitor",
                    thumbnail: "l_PlanesMonitor.gif",
                    fileName: "PlanesMonitor"
                }]
            }
        }
    },
    "viz": {
        name: "可视化",
        name_en: "Visualization",
        content: {
            "heat": {
                name: "热力图",
                name_en: "Heat map",
                content: [{
                    name: "随机点",
                    name_en: "random points",
                    thumbnail: "l_heat.png",
                    fileName: "12_heatMap"
                }, {
                    name: "纽约出租车上车点",
                    name_en: "NY taxi car point",
                    thumbnail: "l_heatmap_nyc.png",
                    fileName: "12_heatMap_NY"
                }, {
                    name: "随机点(Classic)",
                    name_en: "random points (Classic)",
                    version: "9.1.0",
                    thumbnail: "l_heatMapLayer.png",
                    fileName: "heatMapLayer"
                }, {
                    name: "2000年到2015年地震热力图(Classic)",
                    name_en: "Earthquake heat map (2000-2015)",
                    version: "9.1.0",
                    thumbnail: "l_earthquakeHeatMap.png",
                    fileName: "earthquakeHeatMap"
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
                    thumbnail: "l_markerCluster.png",
                    fileName: "12_markerCluster"
                }]
            },
            "graphicLayer": {
                name: "高效率点图层",
                name_en: "High efficiency point layer",
                content: [
                    {
                        name: "纽约出租车18万点",
                        name_en: "points of 180K NY taxis",
                        thumbnail: "l_graphicLayer.png",
                        fileName: "12_graphicLayer"
                    }, {
                        name: "随机点-三叶草",
                        name_en: "random points(clover)",
                        thumbnail: "l_graphicLayerClover.png",
                        fileName: "12_graphicLayerClover"
                    }, {
                        name: "纽约18万出租车-符号绘制",
                        name_en: "picture drawing of 180K NY taxis",
                        thumbnail: "l_graphicLayerImage.png",
                        fileName: "12_graphicLayerImage"
                    }, {
                        name: "纽约145万出租车-webgl",
                        name_en: "picture drawing of 1.45 million NY taxis",
                        version: "9.1.0",
                        thumbnail: "l_graphicLayer_webgl.png",
                        fileName: "12_graphiclayer_webgl"
                    }
                ]
            },
            // "D3Theme": {
            //     name: "D3-单值专题图",
            //     content: null
            // },
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
                    name: "单值专题图",
                    name_en: "unique",
                    thumbnail: "l_uniqueThemeLayer.png",
                    fileName: "uniqueThemeLayer"
                }, {
                    name: "分段专题图",
                    name_en: "range",
                    thumbnail: "l_rangeThemeLayer.png",
                    fileName: "rangeThemeLayer"
                }, {
                    name: "等级符号专题图",
                    name_en: "rank symbol",
                    thumbnail: "l_rankSymbolThemeLayer.png",
                    fileName: "rankSymbolThemeLayer"
                }, {
                    name: "标签专题图",
                    name_en: "label ",
                    thumbnail: "l_labelThemeLayer.png",
                    fileName: "labelThemeLayer"
                }, {
                    name: "图表专题图",
                    name_en: "statistical chart",
                    thumbnail: "l_graphThemeLayer.png",
                    fileName: "graphThemeLayer"
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
                    name: "动态标绘",
                    name_en: "dynamic plot",
                    version: "9.1.0",
                    thumbnail: "plot_dynamicPlot.png",
                    fileName: "plot_dynamicPlot"
                }, {
                    name: "鼠标标绘",
                    name_en: "plot symbol",
                    version: "9.1.0",
                    thumbnail: "plot_plotSymbol.png",
                    fileName: "plot_plotSymbol"
                }, {
                    name: "编程标绘",
                    name_en: "draw",
                    version: "9.1.0",
                    thumbnail: "plot_drawGeoGraphicObject.png",
                    fileName: "plot_drawGeoGraphicObject"
                }, {
                    name: "属性修改",
                    name_en: "modify symbol style",
                    version: "9.1.0",
                    thumbnail: "plot_modifySymbolStyle.png",
                    fileName: "plot_modifySymbolStyle"
                }, {
                    name: "缺省属性",
                    name_en: "default symbol style",
                    version: "9.1.0",
                    thumbnail: "plot_defaultStyle.png",
                    fileName: "plot_defaultStyle"
                }, {
                    name: "自定义属性",
                    name_en: "extend symbol properties",
                    version: "9.1.0",
                    thumbnail: "plot_symbolExtendProperty.png",
                    fileName: "plot_symbolExtendProperty"
                }, {
                    name: "图层操作",
                    name_en: "layer operations",
                    version: "9.1.0",
                    thumbnail: "plot_operatePlottingLayer.png",
                    fileName: "plot_operatePlottingLayer"
                }, {
                    name: "图层编辑",
                    name_en: "layer editing",
                    version: "9.1.0",
                    thumbnail: "plot_editPlottingLayer.png",
                    fileName: "plot_editPlottingLayer"
                }, {
                    name: "标号库加载",
                    name_en: "load symbol library",
                    version: "9.1.0",
                    thumbnail: "plot_loadSymbolLib.png",
                    fileName: "plot_loadSymbolLib"
                }, {
                    name: "查询标号",
                    name_en: "query symbol",
                    version: "9.1.0",
                    thumbnail: "plot_querySymbolLib.png",
                    fileName: "plot_querySymbolLib"
                }, {
                    name: "编辑器",
                    name_en: "symbol editor",
                    version: "9.1.0",
                    thumbnail: "plot_symbolEditor.png",
                    fileName: "plot_symbolEditor"
                }]
            },
            "trendMap": {
                name: "态势图",
                name_en: "Trend plot",
                content: [{
                    name: "保存和加载",
                    name_en: "save and load",
                    version: "9.1.0",
                    thumbnail: "plot_saveload.png",
                    fileName: "plot_saveload"
                }, {
                    name: "态势图叠加",
                    name_en: "add plot symbol file",
                    version: "9.1.0",
                    thumbnail: "plot_addfile.png",
                    fileName: "plot_addfile"
                }, {
                    name: "态势图上传下载",
                    name_en: "plot symbol file upload and download",
                    version: "9.1.0",
                    thumbnail: "plot_filetransfer.png",
                    fileName: "plot_filetransfer"
                }]
            },
            "other": {
                name: "其他",
                name_en: "Others",
                content: [{
                    name: "几何查询",
                    name_en: "symbol geometry query",
                    version: "9.1.0",
                    thumbnail: "plot_symbolGeometricQuery.png",
                    fileName: "plot_symbolGeometricQuery"
                }, {
                    name: "态势推演",
                    name_en: "situation deduction",
                    version: "9.1.0",
                    thumbnail: "plot_plotGOAnimation.gif",
                    fileName: "plot_plotGOAnimation"
                }, {
                    name: "复杂对象",
                    name_en: "draw graphics",
                    version: "9.1.0",
                    thumbnail: "plot_drawGraphics.png",
                    fileName: "plot_drawGraphics"
                }, {
                    name: "航线",
                    name_en: "draw route",
                    version: "9.1.0",
                    thumbnail: "plot_drawRoute.png",
                    fileName: "plot_drawRoute"
                }, {
                    name: "高性能图层",
                    name_en: "graphic layer",
                    version: "9.1.0",
                    thumbnail: "plot_graphicLayer.png",
                    fileName: "plot_graphicLayer"
                }, {
                    name: "避让区域",
                    name_en: "symbol avoid",
                    version: "9.1.0",
                    thumbnail: "plot_symbolAvoid.png",
                    fileName: "plot_symbolAvoid"
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
                    fileName: "drawAndModify"
                }, {
                    name: "捕捉与修改",
                    name_en: "snap and modify",
                    thumbnail: "l_snapAndModify.png",
                    fileName: "snapAndModify"
                }]
            },
            "changeTileVersion": {
                name: "缓存切换",
                name_en: "Tile version switch",
                content: [{
                    name: "多版本缓存切换控件",
                    name_en: "tile version switch control",
                    thumbnail: "l_changeTileVersion.png",
                    fileName: "changeTileVersion"
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