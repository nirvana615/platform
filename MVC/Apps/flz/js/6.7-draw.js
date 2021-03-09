
var handler;
var scene = viewer.scene;
var canvas = scene.canvas;
var isPoint = false;                        //坐标量测
var isLength = false;                     //长度量测
var isHeight = false;                       //高度量测
var isAraa = false;                         //面积量测
var isAzimuth = false;                      //方位角量测
var isRedo = false;                         //继续绘制
var isPointLabel = false;                   //点标注
var isPolylineLabel = false;                //线标注
var isPolygonLabel = false;                 //面标注
var isOccurrence = false;                   //产状
var isTraceLength = false;                  //迹线
var points = [];                            //临时点集
var pointPic = document.getElementById("p1").src;
var pointLabelCount = 0;
var curId = "0";
var linepoints = [];
var linepointcount = 0;
var polylineId = 0;
var lineId = "0";
var areapoints = [];
var areapointcount = 0;
var polygonId = 0;
var areaId = "0";
var takeoffpoint = null;
var landingpoint = null;
var waypoints = [];
var newwaypoints = [];
var projectinfos = [];
var curproject = "";
var curpointclound = "";
var tileset = null;
var isModelLine = true;                        //是否贴模型

//绘制widget
function LoadDrawLayer() {


    var drawlayerindex = layer.open({
        type: 1
        , title: ['绘制', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['500px', '500px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: ''
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
        }
    });






}
//显示/隐藏功能面板
var isOpenMenu = false;
function openMenu() {
    isOpenMenu = !isOpenMenu;

    if (isOpenMenu) {
        document.getElementById("menu").style.visibility = "visible";
        document.getElementById("openmenu").style.right = "247px";
        document.getElementById("openmenu").src = "../../../Resources/img/icon/right.png";
        document.getElementById("openmenu").title = "收起功能面板";
    }
    else {
        document.getElementById("menu").style.visibility = "hidden";
        document.getElementById("openmenu").style.right = "20px";
        document.getElementById("openmenu").src = "../../../Resources/img/icon/left.png";
        document.getElementById("openmenu").title = "展开功能面板";
    }
}
//显示/隐藏鹰眼视图
var isOpenOverview = false;
function openOverview() {
    isOpenOverview = !isOpenOverview;

    if (isOpenOverview) {
        document.getElementById("overview").style.visibility = "visible";
        document.getElementById("openoverview").style.bottom = "260px";
        document.getElementById("openoverview").style.right = "260px";
        document.getElementById("openoverview").src = "image/icon/narrow.png";
        document.getElementById("openoverview").title = "隐藏鹰眼视图";
        //document.getElementById("openoverview").style.backgroundColor = "rgba(255,255,255,0.5)";
    }
    else {
        document.getElementById("overview").style.visibility = "hidden";
        document.getElementById("openoverview").style.bottom = "0px";
        document.getElementById("openoverview").style.right = "0px";
        document.getElementById("openoverview").src = "image/icon/expand.png";
        document.getElementById("openoverview").title = "显示鹰眼视图";
    }
}

//清除
function Clear() {
    ClearAction();
    ClearTemp();
}

//清除动作
function ClearAction() {
    if (handler != undefined) {
        handler.destroy();
    }
}

//清除临时图形
function ClearTemp() {
    var count = 0;
    console.log(viewer.entities);
    while (count < 0) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name)&&((viewer.entities._entities._array[i]._name.indexOf("temppoint") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("temppolygon") > -1)


                || (viewer.entities._entities._array[i]._name.indexOf("ptMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptlMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("plMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pllMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pyMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("pylMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("alMeasue") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("ptOccurrence") > -1)
                || (viewer.entities._entities._array[i]._name.indexOf("positonPoint") > -1))


            ) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }

    //if (viewer.scene.primitives._primitives.length>2)
    //{
    //    for (var i = 2; i < viewer.scene.primitives._primitives.length; i++) {
    //        viewer.scene.primitives.remove(viewer.scene.primitives._primitives[i]);
    //    }
    //}

    points = [];
}
//坐标量测
function pointMeasure() {
    ClearTemp();

    isPoint = true;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isTraceLength = false;

    if (isPoint) {
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclick) {
            if (isPoint) {
                var pickedOject = scene.pick(leftclick.position);
                if (pickedOject != undefined) {
                    var position = scene.pickPosition(leftclick.position);
                    if (position != undefined) {
                        var cartesian3 = Cesium.Cartographic.fromCartesian(position);                        //笛卡尔XYZ
                        var longitude = Cesium.Math.toDegrees(cartesian3.longitude);                         //经度
                        var latitude = Cesium.Math.toDegrees(cartesian3.latitude);                           //纬度
                        var height = cartesian3.height;                                                      //高度

                        if (height > 0) {

                            if (Cesium.defined(position)) {

                                //var drowinfoAddlayerindex = null;                           //画点新增，弹出框
                                DrowHuaHua("point", position);
                              

                                ClearTemp();

                                viewer.entities.add({
                                    name: "temppoint" + NewGuid(),//点
                                    position: position,
                                    billboard: {
                                        image: '../../Resources/img/survey/marker.png',
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        width: 24,
                                        height: 24,
                                    }
                                });

                                

                                //测试用
                                console.log(longitude + "," + latitude + "," + height);
                                console.log(position.x + "," + position.y + "," + position.z);
                                console.log(viewer.camera.position.x + "," + viewer.camera.position.y + "," + viewer.camera.position.z);


                                viewer.entities.add({
                                    name: "ptlMeasue" + NewGuid(),
                                    position: Cesium.Cartesian3.fromDegrees(longitude, latitude, height),
                                    label: {
                                        text: '坐标(' + longitude.toFixed(8) + ',' + latitude.toFixed(8) + ',' + height.toFixed(2) + ')',
                                        showBackground: true,
                                        backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                        font: '24px Times New Roman',
                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                    }
                                });

                                //针对移动设备
                                if (isMobile.any()) {
                                    if (handler != undefined) {
                                        handler.destroy();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
};
//生成随机数
function NewGuid() {
    return ((((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + "-" + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
        + (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1));
}

//长度量测
function lengthMeasure() {
    ClearTemp();

    isPoint = false;
    isLength = true;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isTraceLength = false;

    if (isLength) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        var cartesian3 = new Cesium.Cartesian3(position.x, position.y, position.z);
                        points.push(cartesian3);

                        viewer.entities.add({
                            name: "ptMeasue" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 2,
                                color: Cesium.Color.YELLOW
                            }
                        });

                        if (points.length > 1) {
                            var point = points[points.length - 2];
                            if (isModelLine) {
                                //绘制贴模型线
                                //polylineOnModel("plMeasue" + NewGuid(), [point, position], 0.05, 10, Cesium.Color.AQUAMARINE);

                                viewer.entities.add({
                                    name: "plMeasue" + NewGuid(),
                                    polyline: {
                                        positions: [point, position],
                                        width: 5,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: Cesium.Color.YELLOW,
                                        show: true,
                                        clampToGround: true,
                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                    }
                                });
                            }
                            else {
                                //绘制空中直接连线
                                viewer.entities.add({
                                    name: "plMeasue" + NewGuid(),
                                    polyline: {
                                        positions: [point, position],
                                        width: 5,
                                        material: Cesium.Color.YELLOW,
                                    }
                                });
                            }
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);


        if (isMobile.any()) {//双指
            handler.setInputAction(function (pinch) {
                if (points.length > 1) {
                    var sum = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var point1 = points[i];
                        var point2 = points[i + 1];

                        var distance = Cesium.Cartesian3.distance(point1, point2)
                        if (distance == NaN) {
                            sum = 0;
                            break;
                        }
                        else {
                            sum += distance;
                        }
                    }

                    viewer.entities.add({
                        name: "pllMeasue" + NewGuid(),
                        position: points[points.length - 1],
                        label: {
                            text: '长度：' + sum.toFixed(2) + '米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    if (handler != undefined) {
                        handler.destroy();
                    }

                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {//右击
            handler.setInputAction(function (rightclik) {
                if (points.length > 1) {
                    var sum = 0;
                    for (var i = 0; i < points.length - 1; i++) {
                        var point1 = points[i];
                        var point2 = points[i + 1];

                        var distance = Cesium.Cartesian3.distance(point1, point2)
                        if (distance == NaN) {
                            sum = 0;
                            break;
                        }
                        else {
                            sum += distance;
                        }
                    }

                    viewer.entities.add({
                        name: "pllMeasue" + NewGuid(),
                        position: points[points.length - 1],
                        label: {
                            text: '长度：' + sum.toFixed(2) + '米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};
//高度量测
function heightMeasure() {
    ClearTemp();

    isPoint = false;
    isLength = false;
    isHeight = true;
    isAraa = false;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isTraceLength = false;

    if (isHeight) {
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var xyz = scene.pickPosition(leftclik.position);
                if (xyz != undefined) {
                    var rblh = Cesium.Cartographic.fromCartesian(xyz);

                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    position: xyz,
                    //    point: {
                    //        pixelSize: 10,
                    //        color: Cesium.Color.YELLOW
                    //    }
                    //});
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuid(),
                        position: xyz,
                        billboard: {
                            image: 'image/survey/marker.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            width: 16,
                            height: 16,
                        }
                    });
                    points.push(xyz);

                    if (points.length == 2) {
                        var point = points[0];

                        viewer.entities.add({
                            name: "plMeasue" + NewGuid(),
                            polyline: {
                                positions: [point, xyz],
                                width: 5,
                                material: new Cesium.PolylineDashMaterialProperty({
                                    color: Cesium.Color.WHITE
                                }),
                            }
                        });

                        var rblh1 = Cesium.Cartographic.fromCartesian(point);
                        if (rblh1.height > rblh.height) {
                            var b = rblh.latitude * 180 / Math.PI;
                            var l = rblh.longitude * 180 / Math.PI;
                            var h = rblh.height;

                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                    width: 5,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.WHITE
                                    }),
                                }
                            });
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh1.height)],
                                    width: 5,
                                    material: Cesium.Color.YELLOW,
                                }
                            });

                            viewer.entities.add({
                                name: "pllMeasue" + NewGuid(),
                                //position: Cesium.Cartesian3.fromDegrees(l, b, (rblh1.height + h) / 2),
                                position: Cesium.Cartesian3.fromDegrees(l, b, rblh1.height),
                                label: {
                                    text: '高度：' + (rblh1.height - h).toFixed(2) + '米',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '24px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });

                            isRedo = true;
                        }
                        else if (rblh1.height < rblh.height) {
                            var b = rblh1.latitude * 180 / Math.PI;
                            var l = rblh1.longitude * 180 / Math.PI;
                            var h = rblh1.height;

                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                    width: 5,
                                    material: Cesium.Color.YELLOW,
                                }
                            });
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [xyz, Cesium.Cartesian3.fromDegrees(l, b, rblh.height)],
                                    width: 5,
                                    material: new Cesium.PolylineDashMaterialProperty({
                                        color: Cesium.Color.WHITE
                                    }),
                                }
                            });

                            viewer.entities.add({
                                name: "pllMeasue" + NewGuid(),
                                //position: Cesium.Cartesian3.fromDegrees(l, b, (rblh.height + h) / 2),
                                position: Cesium.Cartesian3.fromDegrees(l, b, rblh.height),
                                label: {
                                    text: '高度：' + (rblh.height - h).toFixed(2) + '米',
                                    showBackground: true,
                                    backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                    font: '24px Times New Roman',
                                    horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                    verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                    pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                }
                            });

                            isRedo = true;
                        }
                        else {

                        }

                        //针对移动设备
                        if (isMobile.any()) {
                            if (handler != undefined) {
                                handler.destroy();
                            }
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
};
//面积测量
/*
面积计算包括表面积、投影面积计算
投影面积计算过程：
（1）获取空间直角坐标XYZ
（2）转换为大地坐标BLH
（3）转换为平面直角坐标xy
（4）计算面积
*/
function areaMeasure() {
    //本面积计算方法为：将所有点转换为大地坐标BLH，然后将H赋值为最大H，再转换为空间直角坐标XYZ，取XY计算面积
    ClearTemp();

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = true;
    isAzimuth = false;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isTraceLength = false;

    if (isAraa) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
            }

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    var cartesian = Cesium.Cartographic.fromCartesian(position);

                    if (Cesium.defined(position)) {
                        viewer.entities.add({
                            name: "ptMeasue" + NewGuid(),
                            position: position,
                            point: {
                                pixelSize: 5,
                                color: Cesium.Color.WHITE
                            }
                        });
                        points.push(position);
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                if (points.length > 2) {
                    var cartesian3s = [];
                    var newcartesian3s = [];
                    var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                    var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                    var bSum = 0;
                    var lSum = 0;
                    for (var i = 0; i < points.length; i++) {
                        var cartesian3 = points[i];
                        cartesian3s.push(cartesian3);
                        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                        var blh = new Cesium.Cartesian3(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, rblh.height);
                        newcartesian3s.push(blh);
                        bSum += rblh.latitude * 180 / Math.PI;
                        lSum += rblh.longitude * 180 / Math.PI;
                        if (rblh.height < minHeight) {
                            minHeight = rblh.height;
                        }
                        if (rblh.height > maxHeight) {
                            maxHeight = rblh.height;
                        }
                    }

                    //viewer.entities.add({
                    //    polygon: {
                    //        hierarchy: points,
                    //        extrudedHeight: maxHeight,
                    //        perPositionHeight: true,
                    //        material: Cesium.Color.ORANGE.withAlpha(0.8),
                    //        outline: false,
                    //        outlineColor: Cesium.Color.BLACK,
                    //        closeTop: true,
                    //    }
                    //});

                    viewer.entities.add({
                        name: "pyMeasue" + NewGuid(),
                        polygon: {
                            hierarchy: {
                                positions: points
                            },
                            material: Cesium.Color.YELLOW.withAlpha(0.5),
                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                        }
                    });

                    //计算面积
                    var cartesian2s = [];
                    for (var i = 0; i < newcartesian3s.length; i++) {
                        var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[i].y, newcartesian3s[i].x, maxHeight);
                        var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
                        cartesian2s.push(cartesian2);
                    }
                    cartesian2s.push(cartesian2s[0]);
                    var area = 0;
                    for (var i = 0; i < cartesian2s.length - 1; i++) {
                        area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
                    }
                    area = Math.abs(area);

                    //计算重心
                    viewer.entities.add({
                        name: "pylMeasue" + NewGuid(),
                        position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                        label: {
                            text: '面积：' + area.toFixed(2) + '平方米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -10),
                        }
                    });

                    if (handler != undefined) {
                        handler.destroy();
                    }

                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                if (points.length > 2) {
                    var cartesian3s = [];
                    var newcartesian3s = [];
                    var maxHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                    var minHeight = Cesium.Cartographic.fromCartesian(points[0]).height;
                    var bSum = 0;
                    var lSum = 0;
                    for (var i = 0; i < points.length; i++) {
                        var cartesian3 = points[i];
                        cartesian3s.push(cartesian3);
                        var rblh = Cesium.Cartographic.fromCartesian(points[i]);
                        var blh = new Cesium.Cartesian3(rblh.latitude * 180 / Math.PI, rblh.longitude * 180 / Math.PI, rblh.height);
                        newcartesian3s.push(blh);
                        bSum += rblh.latitude * 180 / Math.PI;
                        lSum += rblh.longitude * 180 / Math.PI;
                        if (rblh.height < minHeight) {
                            minHeight = rblh.height;
                        }
                        if (rblh.height > maxHeight) {
                            maxHeight = rblh.height;
                        }
                    }

                    viewer.entities.add({
                        name: "pyMeasue" + NewGuid(),
                        polygon: {
                            hierarchy: {
                                positions: points
                            },
                            material: Cesium.Color.YELLOW.withAlpha(0.5),
                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                        }
                    });

                    //计算面积
                    var cartesian2s = [];
                    for (var i = 0; i < newcartesian3s.length; i++) {
                        var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[i].y, newcartesian3s[i].x, maxHeight);
                        var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
                        cartesian2s.push(cartesian2);
                    }
                    cartesian2s.push(cartesian2s[0]);
                    var area = 0;
                    for (var i = 0; i < cartesian2s.length - 1; i++) {
                        area += (cartesian2s[i].x - cartesian2s[0].x) * (cartesian2s[i + 1].y - cartesian2s[0].y) - (cartesian2s[i].y - cartesian2s[0].y) * (cartesian2s[i + 1].x - cartesian2s[0].x);
                    }
                    area = Math.abs(area);

                    //计算重心
                    viewer.entities.add({
                        name: "pylMeasue" + NewGuid(),
                        position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                        label: {
                            text: '面积：' + area.toFixed(2) + '平方米',
                            showBackground: true,
                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    isRedo = true;
                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }
    }
};


var wPosition = [];

//方位角量测
function azimuthMeasure() {
    ClearTemp();

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = true;
    isRedo = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = false;
    isOccurrence = false;
    isTraceLength = false;

    if (isAzimuth) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(scene.canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            if (isRedo) {
                ClearTemp();
                isRedo = false;
                wPosition = [];
            }

            wPosition.push(new Cesium.Cartesian2(leftclik.position.x, leftclik.position.y));

            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var xyz = scene.pickPosition(leftclik.position);
                if (xyz != undefined) {
                    var rblh = Cesium.Cartographic.fromCartesian(xyz);

                    //viewer.entities.add({
                    //    name: "ptMeasue" + NewGuid(),
                    //    position: xyz,
                    //    point: {
                    //        pixelSize: 8,
                    //        color: Cesium.Color.YELLOW
                    //    }
                    //});
                    viewer.entities.add({
                        name: "ptMeasue" + NewGuid(),
                        position: xyz,
                        billboard: {
                            image: 'image/survey/marker.png',
                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                            width: 24,
                            height: 24,
                        }
                    });
                    points.push(xyz);

                    if (points.length == 2) {
                        var point = points[0];
                        if (false) {
                            //绘制贴模型线
                            //polylineOnModel("plMeasue" + NewGuid(), [point, xyz], 0.5, 5, Cesium.Color.WHITE);

                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: [point, xyz],
                                    width: 5,
                                    arcType: Cesium.ArcType.RHUMB,
                                    material: Cesium.Color.YELLOW,
                                    show: true,
                                    clampToGround: true,
                                    classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                }
                            });
                        }
                        else {
                            //viewer.entities.add({
                            //    name: "plMeasue" + NewGuid(),
                            //    polyline: {
                            //        positions: [point, xyz],
                            //        width: 5,
                            //        material: Cesium.Color.YELLOW,
                            //    }
                            //});

                            var start = wPosition[0];
                            var end = wPosition[1];

                            var count = Math.ceil(Cesium.Cartesian2.distance(start, end) / 1);
                            var cartesians = [];
                            cartesians.push(scene.pickPosition(start));


                            for (var i = 0; i < count; ++i) {
                                var offset = i / (count - 1);
                                //cartesians[i] = Cesium.Cartesian2.lerp(start, end, offset, new Cesium.Cartesian2());
                                cartesians.push(scene.pickPosition(Cesium.Cartesian2.lerp(start, end, offset, new Cesium.Cartesian2())));
                            }

                            cartesians.push(scene.pickPosition(end));
                            viewer.entities.add({
                                name: "plMeasue" + NewGuid(),
                                polyline: {
                                    positions: cartesians,
                                    width: 10,
                                    material: Cesium.Color.YELLOW,
                                }
                            });




                        }

                        var rblh1 = Cesium.Cartographic.fromCartesian(point);//第一个点
                        var rblh2 = Cesium.Cartographic.fromCartesian(xyz);//第二个点

                        //计算方位角
                        var r = Math.atan((rblh2.longitude * 180 / Math.PI - rblh1.longitude * 180 / Math.PI) * Math.cos(rblh2.latitude) / (rblh2.latitude * 180 / Math.PI - rblh1.latitude * 180 / Math.PI)) * 180 / Math.PI;

                        //判断
                        if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                            r += 180;
                        }
                        else if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude == rblh2.longitude)) {
                            r = 180;
                        }
                        else if ((rblh1.latitude > rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                            r += 180;
                        }
                        else if ((rblh1.latitude == rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                            r = 270;
                        }
                        else if ((rblh1.latitude == rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                            r = 90;
                        }
                        else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude > rblh2.longitude)) {
                            r += 360;
                        }
                        else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude == rblh2.longitude)) {
                            r = 0;
                        }
                        else if ((rblh1.latitude < rblh2.latitude) && (rblh1.longitude < rblh2.longitude)) {
                            //r
                        }
                        else {
                            //error:不存在两点经纬度均相同的情况
                        }

                        viewer.entities.add({
                            name: "alMeasue" + NewGuid(),
                            position: Cesium.Cartesian3.fromElements((point.x + xyz.x) / 2, (point.y + xyz.y) / 2, (point.z + xyz.z) / 2),
                            label: {
                                text: '方位角：' + r.toFixed(2) + '度',
                                showBackground: true,
                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                font: '24px Times New Roman',
                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                            }
                        });

                        isRedo = true;
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
    }
}



//测试标注
function testLabel() {
    var scene = viewer.scene;
    var canvas = scene.canvas;
    var pinBuilder = new Cesium.PinBuilder();

    var groceryPin = Cesium.when(pinBuilder.fromUrl('App/Cesium1.54/Assets/Textures/maki/basketball.png', Cesium.Color.GREEN, 48), function (canvas) {
        var entity = viewer.entities.add({
            name: 'Amway Center',
            position: Cesium.Cartesian3.fromDegrees(107.1390014, 28.9414251, 1856.38),
            billboard: {
                image: canvas.toDataURL(),
                verticalOrigin: Cesium.VerticalOrigin.BOTTOM
            },
            show: false,
            description:
                '<img width="50%" style="float:left; margin: 0 1em 1em 0;" src="Resources/AmwayCenterCourt.jpg"/>\n' +
                '<p>The <b>Amway Center</b> is a sports and entertainment venue in Orlando, Florida, located in the Downtown area. It is part of Downtown Orlando Master Plan 3: a plan that also involves improvements to the Citrus Bowl and a new performing arts center. The arena is home to the <a href="http://www.nba.com/magic/" target="_blank">Orlando Magic</a> of the NBA, the <a href="www.orlandopredators.com/" target="_blank">Orlando Predators</a> of the Arena Football League, the <a href="www.orlandosolarbearshockey.com/" target="_blank">Orlando Solar Bears</a> of the ECHL, and hosted the 2012 NBA All-Star Game, plus the 2015 ECHL All-Star Game.</p>\n' +
                '<p>Source: <a href="https://en.wikipedia.org/wiki/Amway_Center" target="_blank">Wikipedia</a>.</p>'
        });

        entity.show = true;
    });
}

//获取点标注样式
function getPointStyle(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var pointstyle = document.elementFromPoint(e.clientX, e.clientY);
    if ((pointstyle.id == "p1") || (pointstyle.id == "p2") || (pointstyle.id == "p3") || (pointstyle.id == "p4") || (pointstyle.id == "p5")
        || (pointstyle.id == "p6") || (pointstyle.id == "p7") || (pointstyle.id == "p8") || (pointstyle.id == "p9") || (pointstyle.id == "p10")
        || (pointstyle.id == "p11") || (pointstyle.id == "p12") || (pointstyle.id == "p13") || (pointstyle.id == "p14") || (pointstyle.id == "p15")) {

        pointPic = pointstyle.src;

        var pointPicture = document.getElementById("pointpic");
        var childs = pointPicture.childNodes;
        var count = 0;
        while (childs.length > 0) {
            for (var i = 0; i < childs.length; i++) {
                if (childs[i].id != undefined) {
                    //childs[i].style.border = "";
                    childs[i].style.background = "";
                }
            }
            count++;
            if (count > 50) {
                break;
            }
        }

        //pointstyle.style.border = "1px solid #DA2527";
        pointstyle.style.background = "#004689";
    }
}
//添加点标注
function addPointLabel() {
    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isPointLabel = true;
    isPolylineLabel = false;
    isPolygonLabel = false;

    if (isPointLabel) {
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclick) {
            if (isPointLabel) {
                var pickedOject = scene.pick(leftclick.position);
                if (pickedOject != undefined) {
                    var position = scene.pickPosition(leftclick.position);
                    if (position != undefined) {
                        var cartesian3 = Cesium.Cartographic.fromCartesian(position);
                        var height = cartesian3.height;

                        if (height > 0) {
                            if (Cesium.defined(position)) {
                                pointLabelCount++;

                                viewer.entities.add({
                                    name: 'point' + pointLabelCount,
                                    position: position,
                                    billboard: {
                                        image: pointPic,
                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                        width: 30,
                                        height: 30,
                                    }
                                });

                                viewer.entities.add({
                                    name: 'pointlabel' + pointLabelCount,
                                    position: position,
                                    label: {
                                        text: 'pointlabel' + pointLabelCount,
                                        font: '24px Times New Roman',
                                        horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                        verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                        pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                    }
                                });

                                var pointLabels = document.getElementById("pointLabel");
                                var image = '<img id="img' + pointLabelCount + '" src="' + pointPic + '" width="24" height="24" style="vertical-align: middle" />';
                                var text = '<input id="txt' + pointLabelCount + '" value="' + 'pointlabel' + pointLabelCount + '" type="text" style="background-color: rgba(255,255,255,0);border:0px;width: 150px;vertical-align: middle;text-overflow:ellipsis" />';
                                var remove = '<img id="rem' + pointLabelCount + '" src="../../Resources/img/survey/remove.png" width="20" height="20" style="vertical-align: middle" />'
                                var br = '<br id="br' + pointLabelCount + '" />';
                                pointLabels.innerHTML += image + text + remove + br;
                                pointLabels.className = "divborder";

                                //针对移动设备
                                if (isMobile.any()) {
                                    if (handler != undefined) {
                                        handler.destroy();
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        //右击
        handler.setInputAction(function (rightclik) {
            if (handler != undefined) {
                handler.destroy();
            }

        }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
    }
}
//删除点标注
function deletePointLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0]; //var e = event || window.event;
    var pointLabel = document.elementFromPoint(e.clientX, e.clientY);
    var curID = pointLabel.id.toString();
    if (curID.indexOf("rem") > -1) {
        var pointL = document.getElementById("pointLabel");
        var childs = pointL.childNodes;

        var count = 0;

        while (count < 10) {
            for (var i = 0; i < childs.length; i++) {
                if ((childs[i].id == curID) || (childs[i].id == curID.replace("rem", "img")) || (childs[i].id == curID.replace("rem", "txt")) || (childs[i].id == curID.replace("rem", "br"))) {
                    pointL.removeChild(childs[i]);
                }
            }

            count++;
        }

        count = 0;
        while (count < 50) {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if ((viewer.entities._entities._array[i]._name == "point" + curID.replace("rem", "")) || (viewer.entities._entities._array[i]._name == "pointlabel" + curID.replace("rem", ""))) {
                    viewer.entities.remove(viewer.entities._entities._array[i]);
                }
            }
            count++
        }

    }
    else if (curID.indexOf("txt") > -1) {
        curId = curID.replace("txt", "");

        if (curId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("point" + curId) > -1) {
                    viewer.zoomTo(viewer.entities._entities._array[i]);
                }
            }
        }

    }
    else { }

    if (document.getElementById("pointLabel").innerHTML == "") {
        document.getElementById("pointLabel").className = "";
    }
}
//修改点标注
function modiftyPointLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        if (curId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("pointlabel" + curId) > -1) {
                    var oldvalue = viewer.entities._entities._array[i]._label._text._value;
                    viewer.entities._entities._array[i]._label._text._value = document.getElementById("txt" + curId).value;
                    document.getElementById("pointLabel").innerHTML = document.getElementById("pointLabel").innerHTML.replace(oldvalue, document.getElementById("txt" + curId).value);
                }
            }
        }
    }

}
//删除全部点标注
function deleteAllPointLabel() {
    var pointL = document.getElementById("pointLabel");
    var childs = pointL.childNodes;
    var count = 0;
    while (childs.length > 0) {
        for (var i = 0; i < childs.length; i++) {
            pointL.removeChild(childs[i]);
        }
        count++;
        if (count > 50) {
            break;
        }
    }

    count = 0;
    while (count < 50) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name.indexOf("point") > -1) || (viewer.entities._entities._array[i]._name.indexOf("pointlabel") > -1)) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }

    pointLabelCount = 0;
    document.getElementById("pointLabel").className = "";
}

//获取线标注样式
function getLineStyle(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var linestyle = document.elementFromPoint(e.clientX, e.clientY);
    if ((linestyle.id == "l1") || (linestyle.id == "l2") || (linestyle.id == "l3") || (linestyle.id == "l4")) {
        document.getElementById("l0").src = linestyle.src;
    }
}
//添加线标注
function addLineLabel() {

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isPointLabel = false;
    isPolylineLabel = true;
    isPolygonLabel = false;

    linepoints = [];
    linepointcount = 0;

    if (isPolylineLabel) {
        if (handler != undefined) {
            handler.destroy();
        }
        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        linepoints.push(position);
                        linepointcount++;

                        viewer.entities.add({
                            name: "linepoint" + linepointcount,
                            position: position,
                            point: {
                                pixelSize: 1,
                                color: Cesium.Color.YELLOW
                            }
                        });

                        var line0 = document.getElementById('l0').src;
                        var material = Cesium.Color.fromCssColorString(document.getElementById("linecolor").value);
                        if ((line0.indexOf("l2.png") > -1) || (line0.indexOf("l4.png") > -1)) {
                            material = new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.fromCssColorString(document.getElementById("linecolor").value) });
                        }

                        if (linepoints.length > 1) {
                            var point = linepoints[linepoints.length - 2];
                            if (isModelLine) {
                                //绘制贴模型线
                                //polylineOnModel("linesegment" + linepointcount, [point, position], 0.5, document.getElementById("linewidth").value, material);

                                viewer.entities.add({
                                    name: "linesegment" + linepointcount,
                                    polyline: {
                                        positions: [point, position],
                                        width: document.getElementById("linewidth").value,
                                        arcType: Cesium.ArcType.RHUMB,
                                        material: material,
                                        show: true,
                                        clampToGround: true,
                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                    }
                                });
                            }
                            else {
                                material
                                viewer.entities.add({
                                    name: "linesegment" + linepointcount,
                                    polyline: {
                                        positions: [point, position],
                                        width: document.getElementById("linewidth").value,
                                        material: material
                                    }
                                });
                            }
                        }
                    }

                }
            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                if (linepoints.length > 1) {
                    var line = [];
                    for (var i = 0; i < linepoints.length; i++) {
                        line.push(linepoints[i]);
                    }

                    polylineId++;

                    var line0 = document.getElementById('l0').src;
                    var material = Cesium.Color.fromCssColorString(document.getElementById("linecolor").value);
                    if (line0.indexOf("l2.png") > -1) {
                        material = new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.fromCssColorString(document.getElementById("linecolor").value) });
                    }
                    else if (line0.indexOf("l3.png") > -1) {
                        material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(document.getElementById("linecolor").value));
                    }
                    else { }

                    if (isModelLine) {
                        //绘制贴模型线
                        viewer.entities.add({
                            name: "polyline" + polylineId,
                            polyline: {
                                positions: line,
                                width: document.getElementById("linewidth").value,
                                arcType: Cesium.ArcType.RHUMB,
                                material: material,
                                show: true,
                                clampToGround: true,
                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                            }
                        });
                    }
                    else {

                        viewer.entities.add({
                            name: "polyline" + polylineId,
                            polyline: {
                                positions: line,
                                width: document.getElementById("linewidth").value,
                                material: material
                            }
                        });
                    }

                    viewer.entities.add({
                        name: "polylinelabel" + polylineId,
                        position: linepoints[linepoints.length - 1],
                        label: {
                            text: "polylinelabel" + polylineId,
                            font: '20px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -32),
                        }
                    });

                    var count = 0;
                    while (count < 100) {
                        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                            if ((viewer.entities._entities._array[i]._name.indexOf("linepoint") > -1) || (viewer.entities._entities._array[i]._name.indexOf("linesegment") > -1)) {
                                viewer.entities.remove(viewer.entities._entities._array[i]);
                            }
                        }

                        count++
                    }

                    var lineLabels = document.getElementById("lineLabel");
                    var lI = '<img id="li' + polylineId + '" src="' + document.getElementById("l0").src + '" width="24" height="24" style="vertical-align: middle" />';
                    var lT = '<input id="lt' + polylineId + '" value="' + 'polylinelabel' + polylineId + '" type="text" style="background-color: rgba(255,255,255,0);border:0px;width: 150px;vertical-align: middle;text-overflow:ellipsis" />';
                    var lR = '<img id="lr' + polylineId + '" src="image/survey/remove.png" width="20" height="20" style="vertical-align: middle" />'
                    var lBr = '<br id="lbr' + polylineId + '" />';
                    lineLabels.innerHTML += lI + lT + lR + lBr;
                    lineLabels.className = "divborder";

                    linepoints = [];
                    linepointcount = 0;

                    //针对移动设备
                    if (isMobile.any()) {
                        if (handler != undefined) {
                            handler.destroy();
                        }
                    }
                }
                else {

                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                if (linepoints.length > 1) {
                    var line = [];
                    for (var i = 0; i < linepoints.length; i++) {
                        line.push(linepoints[i]);
                    }

                    polylineId++;

                    var line0 = document.getElementById('l0').src;
                    var material = Cesium.Color.fromCssColorString(document.getElementById("linecolor").value);
                    if (line0.indexOf("l2.png") > -1) {
                        material = new Cesium.PolylineDashMaterialProperty({ color: Cesium.Color.fromCssColorString(document.getElementById("linecolor").value) });
                    }
                    else if (line0.indexOf("l3.png") > -1) {
                        material = new Cesium.PolylineArrowMaterialProperty(Cesium.Color.fromCssColorString(document.getElementById("linecolor").value));
                    }
                    else { }

                    if (isModelLine) {
                        //绘制贴模型线
                        //polylineOnModel("polyline" + polylineId, line, 0.5, document.getElementById("linewidth").value, material);

                        viewer.entities.add({
                            name: "polyline" + polylineId,
                            polyline: {
                                positions: line,
                                width: document.getElementById("linewidth").value,
                                arcType: Cesium.ArcType.RHUMB,
                                material: material,
                                show: true,
                                clampToGround: true,
                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                            }
                        });
                    }
                    else {
                        viewer.entities.add({
                            name: "polyline" + polylineId,
                            polyline: {
                                positions: line,
                                width: document.getElementById("linewidth").value,
                                material: material
                            }
                        });
                    }

                    viewer.entities.add({
                        name: "polylinelabel" + polylineId,
                        position: linepoints[linepoints.length - 1],
                        label: {
                            text: "polylinelabel" + polylineId,
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    var count = 0;
                    while (count < 100) {
                        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                            if ((viewer.entities._entities._array[i]._name.indexOf("linepoint") > -1) || (viewer.entities._entities._array[i]._name.indexOf("linesegment") > -1)) {
                                viewer.entities.remove(viewer.entities._entities._array[i]);
                            }
                        }

                        count++
                    }

                    var lineLabels = document.getElementById("lineLabel");
                    var lI = '<img id="li' + polylineId + '" src="' + document.getElementById("l0").src + '" width="24" height="24" style="vertical-align: middle" />';
                    var lT = '<input id="lt' + polylineId + '" value="' + 'polylinelabel' + polylineId + '" type="text" style="background-color: rgba(255,255,255,0);border:0px;width: 150px;vertical-align: middle;text-overflow:ellipsis" />';
                    var lR = '<img id="lr' + polylineId + '" src="image/survey/remove.png" width="20" height="20" style="vertical-align: middle" />'
                    var lBr = '<br id="lbr' + polylineId + '" />';
                    lineLabels.innerHTML += lI + lT + lR + lBr;
                    lineLabels.className = "divborder";

                    linepoints = [];
                    linepointcount = 0;
                }
                else {

                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);

        }

        //中键
        handler.setInputAction(function (middleclik) {
            if (handler != undefined) {
                handler.destroy();
            }

        }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
    }

}
//删除线标注
function deleteLineLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var lineLabel = document.elementFromPoint(e.clientX, e.clientY);
    var curID = lineLabel.id.toString();
    if (curID.indexOf("lr") > -1) {
        var lineL = document.getElementById("lineLabel");
        var childs = lineL.childNodes;

        var count = 0;

        while (count < 10) {
            for (var i = 0; i < childs.length; i++) {
                if ((childs[i].id == curID) || (childs[i].id == curID.replace("lr", "li")) || (childs[i].id == curID.replace("lr", "lt")) || (childs[i].id == curID.replace("lr", "lbr"))) {
                    lineL.removeChild(childs[i]);
                }
            }

            count++;
        }

        count = 0;
        while (count < 50) {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if ((viewer.entities._entities._array[i]._name == "polyline" + curID.replace("lr", "")) || (viewer.entities._entities._array[i]._name == "polylinelabel" + curID.replace("lr", ""))) {
                    viewer.entities.remove(viewer.entities._entities._array[i]);
                }
            }
            count++
        }

    }
    else if (curID.indexOf("lt") > -1) {
        lineId = curID.replace("lt", "");

        if (lineId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("polyline" + lineId) > -1) {
                    viewer.zoomTo(viewer.entities._entities._array[i]);
                }
            }
        }

    }
    else { }

    if (document.getElementById("lineLabel").innerHTML == "") {
        document.getElementById("lineLabel").className = "";

    }

}
//修改线标注
function modiftyLineLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        if (lineId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("polylinelabel" + lineId) > -1) {
                    var oldvalue = viewer.entities._entities._array[i]._label._text._value;
                    viewer.entities._entities._array[i]._label._text._value = document.getElementById("lt" + lineId).value;
                    document.getElementById("lineLabel").innerHTML = document.getElementById("lineLabel").innerHTML.replace(oldvalue, document.getElementById("lt" + lineId).value);
                }
            }
        }
    }
}
//删除全部线标注
function deleteAllLineLabel() {
    var polylineL = document.getElementById("lineLabel");
    var childs = polylineL.childNodes;
    var count = 0;
    while (childs.length > 0) {
        for (var i = 0; i < childs.length; i++) {
            polylineL.removeChild(childs[i]);
        }
        count++;
        if (count > 50) {
            break;
        }
    }

    count = 0;
    while (count < 50) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if ((viewer.entities._entities._array[i]._name.indexOf("polyline") > -1) || (viewer.entities._entities._array[i]._name.indexOf("polylineLabel") > -1)) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }
        count++
    }

    polylineId = 0;
    document.getElementById("lineLabel").className = "";
}

//添加面标注
function addAreaLabel() {

    isPoint = false;
    isLength = false;
    isHeight = false;
    isAraa = false;
    isAzimuth = false;
    isPointLabel = false;
    isPolylineLabel = false;
    isPolygonLabel = true;

    areapoints = [];
    areapointcount = 0;

    if (isPolygonLabel) {
        if (handler != undefined) {
            handler.destroy();
        }

        handler = new Cesium.ScreenSpaceEventHandler(canvas);

        //左击
        handler.setInputAction(function (leftclik) {
            var pickedOject = scene.pick(leftclik.position);
            if (pickedOject != undefined) {
                var position = scene.pickPosition(leftclik.position);
                if (position != undefined) {
                    if (Cesium.defined(position)) {
                        areapoints.push(position);
                        areapointcount++;

                        viewer.entities.add({
                            name: "areapoint" + areapointcount,
                            position: position,
                            point: {
                                pixelSize: 1,
                                color: Cesium.Color.YELLOW
                            }
                        });

                        if (areapoints.length > 1) {
                            var point = areapoints[areapoints.length - 2];
                            viewer.entities.add({
                                name: "areasegment" + areapointcount,
                                polyline: {
                                    positions: [point, position],
                                    width: 1,
                                    material: Cesium.Color.fromCssColorString(document.getElementById("areacolor").value)
                                }
                            });
                        }

                    }

                }

            }

        }, Cesium.ScreenSpaceEventType.LEFT_CLICK);

        if (isMobile.any()) {
            //双指
            handler.setInputAction(function (pinch) {
                if (areapoints.length > 2) {

                    polygonId++;

                    viewer.entities.add({
                        name: "polygon" + polygonId,
                        polygon: {
                            hierarchy: {
                                positions: areapoints
                            },
                            material: Cesium.Color.fromCssColorString(document.getElementById("areacolor").value).withAlpha(document.getElementById("areatransparency").value),
                        }
                    });

                    var maxHeight = Cesium.Cartographic.fromCartesian(areapoints[0]).height;
                    var bSum = 0;
                    var lSum = 0;

                    for (var i = 0; i < areapoints.length; i++) {
                        var rblh = Cesium.Cartographic.fromCartesian(areapoints[i]);
                        bSum += rblh.latitude * 180 / Math.PI;
                        lSum += rblh.longitude * 180 / Math.PI;
                        if (rblh.height > maxHeight) {
                            maxHeight = rblh.height;
                        }
                    }

                    viewer.entities.add({
                        name: "polygonlabel" + polygonId,
                        position: Cesium.Cartesian3.fromDegrees(lSum / areapoints.length, bSum / areapoints.length, maxHeight + 1),
                        label: {
                            text: "polygonlabel" + polygonId,
                            font: '30px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    var count = 0;
                    while (count < 10) {
                        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                            if ((viewer.entities._entities._array[i]._name.indexOf("areapoint") > -1) || (viewer.entities._entities._array[i]._name.indexOf("areasegment") > -1)) {
                                viewer.entities.remove(viewer.entities._entities._array[i]);
                            }
                        }

                        count++
                    }

                    var areaLabels = document.getElementById("areaLabel");
                    var aA = '<canvas id="aa' + polygonId + '" style="background-color:' + document.getElementById("areacolor").value + ';opacity:' + document.getElementById("areatransparency").value + '; width: 20px; height: 20px;vertical-align: middle"></canvas>';
                    var aT = '<input id="at' + polygonId + '" value="' + 'polygonlabel' + polygonId + '" type="text" style="background-color: rgba(255,255,255,0);border:0px;width: 150px;vertical-align: middle;text-overflow:ellipsis" />';
                    var aR = '<img id="ar' + polygonId + '" src="image/survey/remove.png" width="20" height="20" style="vertical-align: middle" />'
                    var aBr = '<br id="abr' + polygonId + '" />';
                    areaLabels.innerHTML += aA + aT + aR + aBr;

                    areapoints = [];
                    areapointcount = 0;

                    //针对移动设备
                    if (isMobile.any()) {
                        if (handler != undefined) {
                            handler.destroy();
                        }
                    }
                }
                else {

                }

            }, Cesium.ScreenSpaceEventType.PINCH_START);
        }
        else {
            //右击
            handler.setInputAction(function (rightclik) {
                if (areapoints.length > 2) {

                    polygonId++;

                    viewer.entities.add({
                        name: "polygon" + polygonId,
                        polygon: {
                            hierarchy: {
                                positions: areapoints
                            },
                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                            material: Cesium.Color.fromCssColorString(document.getElementById("areacolor").value).withAlpha(document.getElementById("areatransparency").value),
                        }
                    });

                    var maxHeight = Cesium.Cartographic.fromCartesian(areapoints[0]).height;
                    var bSum = 0;
                    var lSum = 0;

                    for (var i = 0; i < areapoints.length; i++) {
                        var rblh = Cesium.Cartographic.fromCartesian(areapoints[i]);
                        bSum += rblh.latitude * 180 / Math.PI;
                        lSum += rblh.longitude * 180 / Math.PI;
                        if (rblh.height > maxHeight) {
                            maxHeight = rblh.height;
                        }
                    }

                    viewer.entities.add({
                        name: "polygonlabel" + polygonId,
                        position: Cesium.Cartesian3.fromDegrees(lSum / areapoints.length, bSum / areapoints.length, maxHeight + 1),
                        label: {
                            text: "polygonlabel" + polygonId,
                            font: '24px Times New Roman',
                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                        }
                    });

                    var count = 0;
                    while (count < 10) {
                        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                            if ((viewer.entities._entities._array[i]._name.indexOf("areapoint") > -1) || (viewer.entities._entities._array[i]._name.indexOf("areasegment") > -1)) {
                                viewer.entities.remove(viewer.entities._entities._array[i]);
                            }
                        }

                        count++
                    }

                    var areaLabels = document.getElementById("areaLabel");
                    var aA = '<canvas id="aa' + polygonId + '" style="background-color:' + document.getElementById("areacolor").value + ';opacity:' + document.getElementById("areatransparency").value + '; width: 20px; height: 20px;vertical-align: middle"></canvas>';
                    var aT = '<input id="at' + polygonId + '" value="' + 'polygonlabel' + polygonId + '" type="text" style="background-color: rgba(255,255,255,0);border:0px;width: 150px;vertical-align: middle;text-overflow:ellipsis" />';
                    var aR = '<img id="ar' + polygonId + '" src="image/survey/remove.png" width="20" height="20" style="vertical-align: middle" />'
                    var aBr = '<br id="abr' + polygonId + '" />';
                    areaLabels.innerHTML += aA + aT + aR + aBr;
                    areaLabels.className = "divborder";

                    areapoints = [];
                    areapointcount = 0;
                }
                else {

                }

            }, Cesium.ScreenSpaceEventType.RIGHT_CLICK);
        }

        //中键
        handler.setInputAction(function (middleclik) {
            if (handler != undefined) {
                handler.destroy();
            }

        }, Cesium.ScreenSpaceEventType.MIDDLE_CLICK);
    }
}
//删除面标注
function deleteAreaLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var areaLabel = document.elementFromPoint(e.clientX, e.clientY);
    var curID = areaLabel.id.toString();
    if (curID.indexOf("ar") > -1) {
        var areaL = document.getElementById("areaLabel");
        var childs = areaL.childNodes;

        var count = 0;

        while (count < 10) {
            for (var i = 0; i < childs.length; i++) {
                if ((childs[i].id == curID) || (childs[i].id == curID.replace("ar", "aa")) || (childs[i].id == curID.replace("ar", "at")) || (childs[i].id == curID.replace("ar", "abr"))) {
                    areaL.removeChild(childs[i]);
                }
            }

            count++;
        }

        count = 0;
        while (count < 50) {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if ((viewer.entities._entities._array[i]._name == "polygon" + curID.replace("ar", "")) || (viewer.entities._entities._array[i]._name == "polygonlabel" + curID.replace("ar", ""))) {
                    viewer.entities.remove(viewer.entities._entities._array[i]);
                }
            }
            count++
        }

    }
    else if (curID.indexOf("at") > -1) {
        areaId = curID.replace("at", "");

        if (areaId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("polygonlabel" + areaId) > -1) {
                    viewer.zoomTo(viewer.entities._entities._array[i]);
                }
            }
        }

    }
    else { }

    if (document.getElementById("areaLabel").innerHTML == "") {
        document.getElementById("areaLabel").className = "";
    }
}
//修改面标注
function modiftyAreaLabel(event) {
    var e = event || window.event || arguments.callee.caller.arguments[0];
    if (e && e.keyCode == 13) {
        if (areaId != "0") {
            for (var i = 0; i < viewer.entities._entities._array.length; i++) {
                if (viewer.entities._entities._array[i]._name.indexOf("polygonlabel" + areaId) > -1) {
                    var oldvalue = viewer.entities._entities._array[i]._label._text._value;
                    viewer.entities._entities._array[i]._label._text._value = document.getElementById("at" + areaId).value;
                    document.getElementById("areaLabel").innerHTML = document.getElementById("areaLabel").innerHTML.replace(oldvalue, document.getElementById("at" + areaId).value);
                }
            }
        }
    }
}

//删除全部面标注
function deleteAllAreaLabel() {
    var polygonL = document.getElementById("areaLabel");
    var childs = polygonL.childNodes;
    var count = 0;
    while (childs.length > 0) {
        for (var i = 0; i < childs.length; i++) {
            polygonL.removeChild(childs[i]);
        }
        count++;
        if (count > 50) {
            break;
        }
    }

    count = 0;
    while (count < 50) {
        for (var i = 0; i < viewer.entities._entities._array.length; i++) {
            if (viewer.entities._entities._array[i]._name.indexOf("polygon") > -1) {
                viewer.entities.remove(viewer.entities._entities._array[i]);
            }
        }

        count++
    }

    polygonId = 0;
    document.getElementById("areaLabel").className = "";
}



//画点弹出框
function DrowHuaHua(flag, position) {

    if (flag == "point") {
        if (drowinfoAddlayerindex == null) {
            //var loading = layer.msg('正在删除', { icon: 16, shade: 0.3, time: 0 });
            drowinfoAddlayerindex = layer.open({
                type: 1
                , title: ['确认新增', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['300px', '300px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                //, content: '/Apps/flz/widget/addinfoPoint.html'
                , content: '<form class="layui-form" style="margin-top:5px;margin-right:25px;" lay-filter="addpointinfoform"><div class="layui-form-item" style="margin-top:15px;margin-right:5px;"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label">点名称</label><div class="layui-input-block"><input type="text" name="name" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" style="width:160px;"  /></div></div></div><div class="layui-col-md6" style="margin-top:15px;margin-right:5px;"><div class="grid-demo"><label class="layui-form-label">描述</label><div class="layui-input-block"><input type="text" name="remarks" lay-verify="required" autocomplete="off" placeholder="请输入"  class="layui-input" style="width:160px;"  /></div></div></div></div></div><div class="layui-form-item" style="margin-top:15px"><div style="position:absolute;right:15px;"><button type="reset" class="layui-btn layui-btn-primary" style="width:100px">重置</button><button type="submit" class="layui-btn" lay-submit="" lay-filter="addpointinfosubmit" style="width:100px">提交</button></div></div></form>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                    form.render();

                    form.on('submit(addpointinfosubmit)', function (data) {
                        

                        
                        data.field.cookie = document.cookie;
                        data.field.position = 'position';
                        data.field.projectId = currentprojectid;
                        data.field.type ="1";
                        console.log(servicesurl);
                        console.log(data);
                        console.log(position);
                        $.ajax({
                            url: servicesurl + "/api/FlzData/AddFlzPoint", type: "post", data: data.field,
                            success: function (result) {
                                if (isNaN(parseInt(result))) {
                                    //创建失败
                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                }
                                else {
                                    layer.msg("保存成功。", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                                    //关闭
                                    layer.close(drowinfoAddlayerindex);

                                    //刷新项目列表
                                   // GetUserProjects();
                                }
                            }, datatype: "json"
                        });

                        return false;
                    });
                }
                , end: function () {
                    drowinfoAddlayerindex = null;
                }
            });
        }

    }






}