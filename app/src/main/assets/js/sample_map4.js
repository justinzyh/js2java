/**
 * Created by ZhangJian on 2017/1/13.
 */
let map;
require([
    "esri/map",
    "esri/layers/ArcGISTiledMapServiceLayer",
    "esri/layers/ImageServiceParameters",
], function (Map, ArcGISTiledMapServiceLayer) {
    map = new Map("map", {
        center: [116.416917, 39.916706],
        zoom: 7
    });

    let arcgisTiledBaseMap = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer");
    let ref = new ArcGISTiledMapServiceLayer("https://services.arcgisonline.com/ArcGIS/rest/services/Reference/World_Reference_Overlay/MapServer");
    // let tiled = new ArcGISTiledMapServiceLayer("https://mapserv.utah.gov/arcgis/rest/services/BaseMaps/Terrain/MapServer")

    map.addLayer(arcgisTiledBaseMap);
    map.addLayer(ref);
    // map.addLayer(tiled);

});
