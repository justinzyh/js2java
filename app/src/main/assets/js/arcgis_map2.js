/**
 * @Author zhangjian
 * @Time   2016/12/21
 * @desc
 */
var map;
require([
    "dojo/dom",
    "dojo/on",
    "esri/Color",
    "dojo/keys",
    "dojo/parser",
    "esri/config",
    "esri/InfoTemplate",
    "esri/sniff",
    "dojo/aspect",
    "esri/map",
    "esri/graphic",
    "esri/SpatialReference",
    "dijit/registry",
    "dijit/layout/BorderContainer",
    "dijit/form/VerticalSlider",
    "dijit/layout/ContentPane",

    "esri/dijit/BasemapGallery",
    "esri/dijit/OverviewMap",
    "esri/geometry/Extent",
    "esri/layers/TileInfo",
    "esri/layers/WebTiledLayer",
    "esri/layers/WMTSLayer",
    "esri/layers/WMTSLayerInfo",
    "esri/layers/GraphicsLayer",
    "esri/layers/ArcGISDynamicMapServiceLayer",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ImageParameters",
    "esri/request",
    "esri/symbols/SimpleMarkerSymbol",
    "esri/symbols/PictureMarkerSymbol",
    "esri/geometry/Point",
    "esri/SnappingManager",
    "esri/dijit/Measurement",
    "esri/layers/FeatureLayer",
    "esri/renderers/SimpleRenderer",
    "esri/tasks/GeometryService",
    "esri/symbols/SimpleLineSymbol",
    "esri/symbols/SimpleFillSymbol",

    "esri/dijit/Scalebar",
    "dijit/TitlePane",
    "dijit/form/CheckBox",
    "dojo/domReady!"

], function (dom, on, Color, keys, parser, esriConfig, InfoTemplate, has,
             aspect,
             Map, Graphic, SpatialReference, registry,
             BorderContainer, VerticalSlider,
             ContentPane,
             BasemapGallery, OverviewMap,
             Extent, TileInfo,
             WebTiledLayer, WMTSLayer, WMTSLayerInfo,
             GraphicsLayer, ArcGISDynamicMapServiceLayer,
             ArcGISTiledMapServiceLayer,
             ImageParameters,
             esriRequest,
             SimpleMarkerSymbol, PictureMarkerSymbol,
             Point, SnappingManager,
             Measurement, FeatureLayer,
             SimpleRenderer, GeometryService,
             SimpleLineSymbol, SimpleFillSymbol) {

    parser.parse();
    esriConfig.defaults.io.proxyUrl = "/proxy/";
    esriConfig.defaults.io.alwaysUseProxy = false;

    // esriConfig.defaults.geometryService = new GeometryService("https://utility.arcgisonline.com/ArcGIS/rest/services/Geometry/GeometryServer");

    //变量区
    var changxing_point = {lng: 119.904440, lat: 31.030730};

    var test_symbol_point_list = [
        {lng: 118.904440, lat: 31.030730}, {lng: 117.904440, lat: 31.030730},
        {lng: 118.804440, lat: 31.030730}, {lng: 117.904440, lat: 31.030730},
        {lng: 118.704440, lat: 31.030730}, {lng: 117.904440, lat: 31.030730},
        {lng: 118.604440, lat: 31.030730}];

    var nanjing_point_list = [
        {
            wtcd: 22316,
            wtmc: "长江观音景区",
            wtms: "长江观音景区对面岸线占用",
            lng: 118.7883538567580,
            lat: 32.1343166596707,
            d: "2017/1/9",
            status_no: 0,
            status: "发现"
        },
        {
            wtcd: 22317,
            wtmc: "酒店占用",
            wtms: "占用蓝线区域",
            lng: 118.7821385318810,
            lat: 32.1283991878450,
            d: "2017/1/9",
            status_no: 1,
            status: "登记"
        },
        {
            wtcd: 22318,
            wtmc: "新燕路违建",
            wtms: "新燕路违建",
            lng: 118.8178172299930,
            lat: 32.1484437756450,
            d: "2017/1/9",
            status_no: 2,
            status: "正在处理"
        },
        {
            wtcd: 22328,
            wtmc: "违章拆除",
            wtms: "违章拆除",
            lng: 118.8396832895740,
            lat: 32.1500771334147,
            d: "2017/1/9",
            status_no: 3,
            status: "处理完成"
        }
    ];

    //wtmc：问题代码； wtmc：问题名称；  wtms: 问题描述；status_no, status


    var init_zoom = 13;

    var mapType = {
        //基本图
        "BASEMAP": "http://\${subDomain}.tianditu.com/DataServer?T=vec_c&X=\${col}&Y=\${row}&L=\${level}",
        //坐标图
        "CROODSMAP": "http://\${subDomain}.tianditu.com/DataServer?T=cva_c&X=\${col}&Y=\${row}&L=\${level}",
        //台风线
        "TAIFENGXIAN": "http://61.153.53.226:6080/arcgis/rest/services/XZQH/MapServer/2",
        //行政区域图
        "XINGZHENGQUYU": "http://61.153.53.226:6080/arcgis/rest/services/XZQH/MapServer",
        //流域分区
        "LIUYUFENBU": "http://192.168.2.9:6080/arcgis/rest/services/CXFQ/MapServer",
        //警戒线
        "JINGJIEXIAN": "http://61.153.53.226:6080/arcgis/rest/services/TF_JJX/MapServer",
        //测站
        "CEZHAN": "http://61.153.53.226:6080/arcgis/rest/services/CX_JCZD/FeatureServer/0",
        //计算分区
        "JISUANFENQU": "http://61.153.53.226:6080/arcgis/rest/services/JSFQ/MapServer",
        //水库
        "SHUIKU": "http://61.153.53.226:6080/arcgis/rest/services/CX_SK/FeatureServer/0",
        //河流
        "HELIU": "http://61.153.53.226:6080/arcgis/rest/services/CX_HL/MapServer",
        //沿海区域
        "YANHEIQUYU": "http://61.153.53.226:6080/arcgis/rest/services/XZQH/MapServer",
    };


    var tiandituBaseLayer;
    var tiandituImageLayer = new TDTTiledImageryLayer();
    var annolayer = new TDTTiledAnnoLayer();

    // map = new Map("map");
    map = new Map("map", {
        //     center: [changxing_point.lng, changxing_point.lng],
        //     zoom: 17,
        logo: false
    });

    //透明度滑动条
    var vertSlider = new VerticalSlider({
        minimum: 0,
        maximum: 1,
        pageIncrement: 0.1,
        value: 0.5,
        intermediateChanges: true,
        style: "height: 500px;"
    }, "vertSlider");

    /**
     * 初始化
     */
    var init = function () {
        // addNanJingBaseMap();

        var tileInfo = new esri.layers.TileInfo(tileInfoObj);
        // //基本图
        var baseMapUrl = mapType.BASEMAP;
        var baseMapOption = {
            logo: true,
            copyright: "Powered By 天地图",
            id: "tiandidu_map",
            subDomains: ["t0", "t1", "t2"],
            tileInfo: tileInfo,
            opacity: 1
        };
        tiandituBaseLayer = new WebTiledLayer(baseMapUrl, baseMapOption);

        addWebTiledLayer(baseMapUrl, baseMapOption, 0);

        //天地图地图
        map.addLayer(tiandituBaseLayer, 0);

        //天地图影像图
        map.addLayer(tiandituImageLayer, 1);
        //
        //天地图注记图
        map.addLayer(annolayer, 2);

        //确定中心点坐标
        map.centerAndZoom(new esri.geometry.Point(changxing_point.lng, changxing_point.lat), init_zoom);

        //单一增加标识(废弃)
        addSymbolToGraphicLayer();

        // var testGraphicLayer = new GraphicsLayer({opacity: 1});
        //多点添加标识
        // addSymbols([changxing_point], testGraphicLayer);
        // addSymbols(test_symbol_point_list, testGraphicLayer);

        //全局概要图
        // overviewMap();

        //注册事件
        registerEvent();

        addMeasureTools();

        chat_gif();
    }();

    function chat_gif() {
        var target_point = {
            lng: 118.7821385318810,
            lat: 32.1383991878450,
        };
        //创建一个图层
        var graphicLayer = new GraphicsLayer({opacity: 1, id: "fucker"});
        map.addLayer(graphicLayer);
        //坐标点
        var pt = new Point(target_point.lng, target_point.lat, map.spatialReference);
        var sms = new PictureMarkerSymbol("/resources/img/flash_mobile.gif", 18, 25);
        // var sms = new SimpleMarkerSymbol().setStyle(
        //     SimpleMarkerSymbol.Circle).setColor(
        //     new Color([238, 69, 0, 1]));
        //变量
        var attr = {"Xcoord": target_point.lng, "Ycoord": target_point.lat, "Plant": "Mesa Mint"};
        //创建模版
        var infoTemplate = new esri.InfoTemplate("互动交流", "<a href='/interact/showInteract2'>互动交流</a>");
        //pt - 坐标点  sms-标识物 attr-infoTemplate展示信息  infoTemplate-点击弹出框
        var singleGraphic = new Graphic(pt, sms, attr, infoTemplate);
        graphicLayer.add(singleGraphic);
    }

    /**
     * 添加南京地形图(临时)
     */
    function addNanJingBaseMap() {
        const agoServiceURL = "http://192.168.2.108:6080/arcgis/rest/services/NJYGYXT/MapServer";
        const agoLayer = new ArcGISTiledMapServiceLayer(agoServiceURL,
            {displayLevels: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14]});
        map.addLayer(agoLayer, 0);

        var url3 = "http://192.168.2.108:6080/arcgis/rest/services/NJHDGL_HD/MapServer";
        addDynamicServiceLayer(url3, {opacity: 1});

        //自定义FeatureLayer的弹出式窗口排版

        var feature_url = "http://192.168.2.108:6080/arcgis/rest/services/NJHDGL_ZYDW/FeatureServer/0";
        var info_template = new InfoTemplate("占用单位", "<tr><b>占用证编号: </b><td>${ZYBH}</td></tr><br /><tr><b>占用单位: </b><td>${ZYDWMC}</td></tr><br /><tr><b>占用项目: </b><td>${ZYXMMC}</td></tr><br /><tr><b>占用证状态: </b><td>${TYPE}</td></tr>");
        var feature_layer = new FeatureLayer(feature_url, {
            infoTemplate: info_template,
            mode: FeatureLayer.MODE_ONDEMAND,
            // outFields: ["*"]
            outFields: ["ZYBH", "ZYDWMC", "ZYXMMC", "TYPE"]
        });

        map.addLayer(feature_layer);

        addSymbols_nanjing();


    }

    /**
     * 添加南京标识
     */
    function addSymbols_nanjing() {
        var testGraphicLayer = new GraphicsLayer({opacity: 1});
        //多点添加标识
        var options = {
            symbol_point_list: nanjing_point_list,
            infoTemplate: new esri.InfoTemplate("违法违章事件", "事件：${name}<br />状态：${status}<br />日期：${date}<br />经度：${Xcoord}<br />纬度：${Ycoord}"),

        };
        addSymbols(testGraphicLayer, options);
    }

    /**
     * 添加测量工具
     */

    function addMeasureTools() {
        var measurement = new Measurement({
            map: map
        }, dom.byId("measurementDiv"));
        measurement.startup();
    }

    /**
     * 添加地图切片服务
     */
    function addWMTSLayer() {

    }

    /**
     * 添加瓦片图
     * @param webTiledLayerUrl 瓦片图url
     * @param option 配置项
     * @param zindex 图层位置
     */
    function addWebTiledLayer(webTiledLayerUrl, option, zindex) {
        if (null == webTiledLayerUrl || webTiledLayerUrl == 'undefined') {
            throw "invalid webTiledLayerUrl";
        }
        if (null == option || option == 'undefined') {
            throw "invalid option of addWebTiledLay";
        }
        if (null == zindex || zindex == 'undefined') {
            zindex = 0;
        }

        map.addLayer(new WebTiledLayer(webTiledLayerUrl, option), zindex);
    }


    /**
     * 单个DynamicServiceLayer添加
     *
     * @param dynamicServiceLayerUrl url
     * @param option 配置项
     */
    function addDynamicServiceLayer(dynamicServiceLayerUrl, option) {

        var imageParamters;
        if (null == dynamicServiceLayerUrl || dynamicServiceLayerUrl == 'undefined') {
            throw "invalid dynamicServiceLayerUrl";
        }
        if (null == option || option == 'undefined') {
            throw "invalid option of addDynamicServiceLayer";
        }
        if (option.opacity == null || option.opacity == 'undefined') {
            option.opacity = 1;
        }

        if (option.imageParameters == null || option.imageParameters == 'undefined') {
            imageParamters = new ImageParameters();
            imageParamters.format = 'jpeg';
            option.imageParameters = imageParamters;

        }

        var dynamicServiceLayer = new ArcGISDynamicMapServiceLayer(dynamicServiceLayerUrl, option);
        map.addLayer(dynamicServiceLayer);
    }

    /**
     * 在图层上加标识点（废弃）
     */
    function addSymbolToGraphicLayer() {
        //创建一个图层
        var graphicLayer = new GraphicsLayer({opacity: 1});
        map.addLayer(graphicLayer);
        //坐标点
        var pt = new Point(changxing_point.lng, changxing_point.lat, map.spatialReference);
        // var sms = new PictureMarkerSymbol("http://api.tianditu.com/img/map/markerA.png", 18, 25);
        var sms = new SimpleMarkerSymbol().setStyle(
            SimpleMarkerSymbol.Circle).setColor(
            new Color([238, 69, 0, 1]));
        //变量
        var attr = {"Xcoord": changxing_point.lng, "Ycoord": changxing_point.lat, "Plant": "Mesa Mint"};
        //创建模版
        var infoTemplate = new esri.InfoTemplate("标题", "地址:${Xcoord},${Ycoord}");
        var singleGraphic = new Graphic(pt, sms, attr, infoTemplate);

        graphicLayer.add(singleGraphic);
    }

    /**
     * 添加多个点坐标
     * 公共方法请勿修改
     * @param symbol_graphic_layer
     * @param options
     */
    function addSymbols(symbol_graphic_layer, options) {

        //check symbol_graphic_layer
        // assert(typeof symbol_graphic_layer == 'object');
        if (symbol_graphic_layer == null || symbol_graphic_layer == 'undefined') {
            symbol_graphic_layer = new GraphicsLayer({opacity: 1});
        }

        if (!symbol_graphic_layer instanceof GraphicsLayer) {
            throw "invalid type of symbol_graphic_layer(should be esri/layers/GraphicsLayer)"
        }

        //check symbol_point_list
        assert(typeof options.symbol_point_list === 'object');
        //null is a type of object in javascript
        if (options.symbol_point_list == null || !options.symbol_point_list instanceof Array) {
            throw "invalid type of symbol_point_list"
        }
        if (options.symbol_point_list.length == 0) {
            throw "an empty symbol_point_list";
        }

        var z_index = 0;
        if (options.z_index != null && options.z_index == 'undefined') {
            z_index = options.z_index;
        }

        // var graphicLayer = new GraphicsLayer({opacity: 1, id: "symbolGraphicLayers"});
        for (var single_point in options.symbol_point_list) {
            // console.log(symbol_point_list[single_point].lng+","+symbol_point_list[single_point].lat)
            //坐标点
            var pt;
            //标识
            var sms;
            //属性
            var attr;
            //弹出窗口信息
            var infoTemplate;


            pt = options.pt || new Point(options.symbol_point_list[single_point].lng,
                    options.symbol_point_list[single_point].lat,
                    map.spatialReference);

            if (options.sms == 'undefined') {
                sms = options.sms || new PictureMarkerSymbol("img/markerA-red.png", 19, 27);
            } else {
                switch (options.symbol_point_list[single_point].status_no) {
                    case 0:
                        sms = new PictureMarkerSymbol("img/markerA-red.png", 19, 27);
                        break;
                    case 1:
                        sms = new PictureMarkerSymbol("img/markerA-yellow.png", 19, 27);
                        break;
                    case 2:
                        sms = new PictureMarkerSymbol("img/markerA-blue.png", 19, 27);
                        break;
                    case 3:
                        sms = new PictureMarkerSymbol("img/markerA-green.png", 19, 27);
                        break;
                    default:
                        throw "invalid status_no of point";
                        break;
                }


                attr = options.attr || {
                        "Xcoord": options.symbol_point_list[single_point].lng,
                        "Ycoord": options.symbol_point_list[single_point].lat,
                        "name": options.symbol_point_list[single_point].wtmc,
                        "date": options.symbol_point_list[single_point].d,
                        "status": options.symbol_point_list[single_point].status
                    };
                infoTemplate = options.infoTemplate || new esri.InfoTemplate("标题", "地址:${Xcoord},${Ycoord}");

                //单个点坐标对象
                var singleGraphic = new Graphic(pt, sms, attr, infoTemplate);

                //添加到graphic图层
                symbol_graphic_layer.add(singleGraphic);

                //graphic对象添加到map
                map.addLayer(symbol_graphic_layer, z_index);
            }

        }
    }


    /**
     * 概要浏览图
     */
    function overviewMap() {
        var overviewMapDijit = new OverviewMap({
            attachTo: "bottom-left",
            map: map,
            visible: true,
            opacity: 0.5
        });
        overviewMapDijit.startup();
    }

    /**
     * 添加basemapGallery
     */
    function basemapGallery() {
        var basemapGallery = new BasemapGallery({
            showArcGISBasemaps: false,
            map: map
        }, "basemapGallery");
        basemapGallery.startup();
    }


    /**
     * 事件注册方法
     */
    function registerEvent() {
        //Event Delegation In Dojo
        //@see https://dojotoolkit.org/reference-guide/1.10/dojo/on.html

        on(document, "#btn-nanjing:click", function () {
            var nanjing_point = {lng: 118.793678, lat: 32.063485};
            map.centerAndZoom(new esri.geometry.Point(nanjing_point.lng, nanjing_point.lat), 8);
            addSymbols([nanjing_point]);
        });
        on(document, "#btn-shanghai:click", function () {
            var shanghai_point = {lng: 121.464042, lat: 31.232644};
            map.centerAndZoom(new esri.geometry.Point(shanghai_point.lng, shanghai_point.lat), 8);
            addSymbols([shanghai_point]);
        });
        on(document, "#btn-zhejiang:click", function () {
            var zhejiang_point = {lng: 120.153064, lat: 30.258637};
            map.centerAndZoom(new esri.geometry.Point(zhejiang_point.lng, zhejiang_point.lat), 8);
            addSymbols([zhejiang_point]);
        });


        var _layers = function () {
            //台风线
            on(document, "#btn-taifengxian:click", function () {

                var option = {
                    "id": "taifengxian_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.TAIFENGXIAN, option);
            });

            //行政区域图
            on(document, "#btn-xingzhengquyu:click", function () {
                var option = {
                    "id": "xingzhengquyu_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.XINGZHENGQUYU, option);
            });

            //流域分布
            on(document, "#btn-liuyufenbu:click", function () {
                var option = {
                    "id": "shuiyufenbu_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.LIUYUFENBU, option);
            });

            //警戒线
            on(document, "#btn-jingjiexian:click", function () {
                var option = {
                    "id": "jingjiexian_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.JINGJIEXIAN, option);
            });

            //测站
            on(document, "#btn-cezhan:click", function () {
                var option = {
                    "id": "cezhan_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.CEZHAN, option);
            });

            //计算分区
            on(document, "#btn-jisuanfenqu:click", function () {
                var option = {
                    "id": "jisuanfenqu_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.JISUANFENQU, option);
            });

            //水库
            on(document, "#btn-shuiku:click", function () {
                var option = {
                    "id": "shuiku_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.SHUIKU, option);
            });

            //河流
            on(document, "#btn-heliu:click", function () {
                var option = {
                    "id": "heliu_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.HELIU, option);
            });

            //沿海区域
            on(document, "#btn-yanhaiquyu:click", function () {
                var option = {
                    "id": "yanhaiquyu_layer",
                    "opacity": 1
                };
                addDynamicServiceLayer(mapType.YANHEIQUYU, option);
            });
        }();


        // //dojo鼠标注册事件
        // dojo.connect(map, "onMouseMove", showCoordinates);
        // //鼠标按下后，拖动地图显示坐标的事件
        // dojo.connect(map, "onMouseDrag", showCoordinates);


        //矢量图
        dojo.connect(dojo.byId("vec"), "click", function (event) {
            dojo.style(dojo.byId("vec"), {
                "font-weight": "bold"
            });
            // debugger;
            if (!tiandituBaseLayer.visible) {
                tiandituBaseLayer.setVisibility(true);
                tiandituBaseLayer.setOpacity(1);
            }
            tiandituImageLayer.setVisibility(false);
            registry.byId("vertSlider").set("disabled", true);
        });


        //影像图
        dojo.connect(dojo.byId("img"), "click", function (event) {
            dojo.style(dojo.byId("img"), {
                "font-weight": "bold"
            });
            if (!tiandituImageLayer.visible) {
                tiandituImageLayer.setVisibility(true);
            }

            tiandituImageLayer.setOpacity(1);
            tiandituBaseLayer.setVisibility(false);
            registry.byId("vertSlider").set("disabled", true);
            // console.log("tiandituBaseLayer:"+tiandituBaseLayer.visible);
        });

        //叠加图
        dojo.connect(dojo.byId("vec_img"), "click", function (event) {
            dojo.style(dojo.byId("img"), {
                "font-weight": "bold"
            });
            tiandituBaseLayer.setVisibility(true);
            tiandituImageLayer.setVisibility(true);
            tiandituImageLayer.setOpacity(vertSlider.get("value"));
            registry.byId("vertSlider").set("disabled", false);
        });

        //滑动条注册事件
        // registry.byId("vertSlider").set("disabled", true);
        // aspect.after(vertSlider, "onChange", function () {
        //     tiandituImageLayer.setOpacity(vertSlider.get("value"));
        // }, true);
    }

    /**
     * 显示坐标方法
     * @param evt
     */
    function showCoordinates(evt) {
        var mp = evt.mapPoint;
        dojo.byId("info").innerHTML = "lng:" + mp.x + ",lat:" + mp.y;
        return mp;
    }


    /**
     * Assert
     * @param condition
     * @param message
     */
    function assert(condition, message) {
        if (!condition) {
            throw message || "Assertion failed";
        }
    }

    function testFuckEvent() {
        alert("fuck");
    }


    /*****************通过后台取数据来获得***********************/
    //从后台获取中心点，json格式为：{"x":166.409,"y":39.899,"zoom",9}
    /*var center = esriRequest({
     url: "../showPoints.do?method=getFirstCenter",
     handleAs: "json"
     });
     center.then(setFirstCenterFromBack, error);*/
    /**
     *从后台获取初始的中心点
     */
    /*function setFirstCenterFromBack(resp){
     setFirstCenter(resp.x,resp.y,resp.zoom);
     }

     function error(err) {
     console.log("something failed: ", err);
     }*/
    /***********************************************************************/
});

