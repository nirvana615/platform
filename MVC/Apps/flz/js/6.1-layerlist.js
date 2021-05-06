var layers = [];//图层列表数据
var windowInfoList = [];//测区数据
var modleInfoList = [];//模型数据

//图层列表widget
function LoadLayerListLayer(id) {
    if (id == null) {
        layer.msg("请先选择当前项目！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
    }
    else {
        if (projectlayerlistlayerindex == null) {
            projectlayerlistlayerindex = layer.open({
                type: 1
                , title: ['图层列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
                , area: ['250px', '600px']
                , shade: 0
                , offset: ['80px', '0px']
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content: '<div id="prjlayerlist"></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    //置顶
                    layer.setTop(layero);
                }
                , end: function () {
                    projectlayerlistlayerindex = null;
                    //删除图层数据

                }
            });

            //请求图层列表
            $.ajax({
                url: servicesurl + "/api/FlzLayer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {
                    if (data == "") {
                        layer.msg("无项目图层信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        var layerlist = JSON.parse(data);
                        console.log(layerlist);
                        layers = [];//图层列表数据

                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            var projectlayer = new Object;
                            projectlayer.title = layerlist.ProjectLayer.Title;

                            var projectlayerchild = [];
                            if (layerlist.ProjectLayer.CenterPoint != null&&false) {//用1个false注释
                                var prjcenter = new Object;
                                prjcenter.title = layerlist.ProjectLayer.CenterPoint.Title;
                                prjcenter.label = layerlist.ProjectLayer.CenterPoint.Label;
                                prjcenter.bl = layerlist.ProjectLayer.CenterPoint.BL;
                                prjcenter.id = "PROJECTCENTER_" + id;
                                prjcenter.type = "PROJECTCENTER";
                                var entity = viewer.entities.getById(prjcenter.id);
                                if (entity != undefined) {
                                    prjcenter.checked = true;
                                    projectlayer.spread = true;
                                }
                                else {
                                    prjcenter.checked = false;
                                }
                                prjcenter.showCheckbox = true;//显示复选框
                                projectlayerchild.push(prjcenter);
                            }
                            
                            if (layerlist.ProjectLayer.SurModels != null && false) {//用1个false注释
                                var prjsurmodel = new Object;
                                prjsurmodel.title = layerlist.ProjectLayer.SurModels.Title;
                                var prjsurmodelchild = [];
                                modleInfoList = layerlist.ProjectLayer.SurModels.SurModelList;//把模型的值存起来
                                for (var i in layerlist.ProjectLayer.SurModels.SurModelList) {
                                    var surmodel = new Object;
                                    surmodel.title = layerlist.ProjectLayer.SurModels.SurModelList[i].MXSJ;
                                    surmodel.id = "PROJECTSUMODEL_" + layerlist.ProjectLayer.SurModels.SurModelList[i].Id;
                                    surmodel.type = "PROJECTSUMODEL";
                                    surmodel.path = layerlist.ProjectLayer.SurModels.SurModelList[i].MXLJ;
                                    surmodel.checked = false;
                                    surmodel.showCheckbox = true;//显示复选框
                                    prjsurmodelchild.push(surmodel);
                                }

                                prjsurmodel.children = prjsurmodelchild;
                                projectlayerchild.push(prjsurmodel);
                            }
                            // 优势结构面
                            if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzDataList != null) {
                                windowInfoList = layerlist.FlzDataLayer.FlzWindowInfoList;
                                var dominantStructuralPlane = new Object;
                                dominantStructuralPlane.title = "优势结构面";
                                dominantStructuralPlane.type = "DOMSTRPLA";
                                dominantStructuralPlane.id = "DOMSTRPLA_" + id;
                                dominantStructuralPlane.checked = false;
                                dominantStructuralPlane.showCheckbox = true;//显示复选框
                                var dominantStructuralPlanechild = [];
                                if (layerlist.FlzDataLayer.FlzDataList != null) {
                                    for (var j in layerlist.FlzDataLayer.FlzDataList) {//已经是项目id相同的查回来的。根据类型来显示
                                        if ("4" == layerlist.FlzDataLayer.FlzDataList[j].type) {//优势结构面类型存4

                                            var pointListtem = JSON.parse(layerlist.FlzDataLayer.FlzDataList[j].postion);
                                            layerlist.FlzDataLayer.FlzDataList[j].postion = pointListtem;
                                            var flzline = new Object;
                                            var xSum = 0;//求一个平均点，用于定位
                                            var ySum = 0;
                                            var zSum = 0;
                                            for (var m = 0; m < pointListtem.length; m++) {
                                                xSum = xSum + parseFloat(pointListtem[m].x);
                                                ySum = ySum + parseFloat(pointListtem[m].y);
                                                zSum = zSum + parseFloat(pointListtem[m].z);
                                            }
                                            flzline.Centerx = xSum / pointListtem.length;
                                            flzline.Centery = ySum / pointListtem.length;
                                            flzline.Centerz = zSum / pointListtem.length;
                                            flzline.title = layerlist.FlzDataLayer.FlzDataList[j].name;
                                            flzline.id = "YOUSHIMIAN_" + layerlist.FlzDataLayer.FlzDataList[j].id;
                                            flzline.type = "YOUSHIMIAN";
                                            flzline.remarks = layerlist.FlzDataLayer.FlzDataList[j].remarks;
                                            flzline.datas = layerlist.FlzDataLayer.FlzDataList[j];
                                            flzline.pointList = pointListtem;
                                            flzline.checked = false;
                                            flzline.showCheckbox = true;//显示复选框
                                            dominantStructuralPlanechild.push(flzline);
                                        }
                                    }
                                }
                                dominantStructuralPlane.children = dominantStructuralPlanechild;
                                projectlayerchild.push(dominantStructuralPlane);

                                
                            }
                            //测区
                            if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzWindowInfoList != null) {
                                windowInfoList = layerlist.FlzDataLayer.FlzWindowInfoList;
                                for (var i in layerlist.FlzDataLayer.FlzWindowInfoList) {
                                    var flzWindowLayer = new Object;
                                    var tempflzWindowPoitslist = JSON.parse(layerlist.FlzDataLayer.FlzWindowInfoList[i].points);
                                    layerlist.FlzDataLayer.FlzWindowInfoList[i].points = tempflzWindowPoitslist;//赋值回去
                                    console.log(layerlist.FlzDataLayer.FlzWindowInfoList[i]);
                                    var xSum = 0;//求一个平均点，用于定位
                                    var ySum = 0;
                                    var zSum = 0;
                                    for (var m = 0; m < tempflzWindowPoitslist.length; m++) {
                                        xSum = xSum + parseFloat(tempflzWindowPoitslist[m].x);
                                        ySum = ySum + parseFloat(tempflzWindowPoitslist[m].y);
                                        zSum = zSum + parseFloat(tempflzWindowPoitslist[m].z);
                                    }
                                    flzWindowLayer.title = layerlist.FlzDataLayer.FlzWindowInfoList[i].name;
                                    flzWindowLayer.Centerx = xSum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.Centery = ySum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.Centerz = zSum / tempflzWindowPoitslist.length;
                                    flzWindowLayer.type = "FLZWINDOW";
                                    flzWindowLayer.id = "FLZWINDOW_" + layerlist.FlzDataLayer.FlzWindowInfoList[i].id;
                                    flzWindowLayer.datas = layerlist.FlzDataLayer.FlzWindowInfoList[i];
                                    flzWindowLayer.pointList = tempflzWindowPoitslist;//直接放进来
                                    flzWindowLayer.checked = false;
                                    flzWindowLayer.showCheckbox = true;//显示复选框
                                    var flzWindowLayerchild = [];
                                    if (layerlist.FlzDataLayer.FlzDataList != null) {
                                        for (var j in layerlist.FlzDataLayer.FlzDataList) {
                                            if (layerlist.FlzDataLayer.FlzWindowInfoList[i].id == layerlist.FlzDataLayer.FlzDataList[j].windowId) {//侧窗id相等的数据

                                                var pointListtem = JSON.parse(layerlist.FlzDataLayer.FlzDataList[j].postion);
                                                layerlist.FlzDataLayer.FlzDataList[j].postion = pointListtem;
                                                var flzline = new Object;
                                                var xSum = 0;//求一个平均点，用于定位
                                                var ySum = 0;
                                                var zSum = 0;
                                                for (var m = 0; m < pointListtem.length; m++) {
                                                    xSum = xSum + parseFloat(pointListtem[m].x);
                                                    ySum = ySum + parseFloat(pointListtem[m].y);
                                                    zSum = zSum + parseFloat(pointListtem[m].z);
                                                }
                                                flzline.Centerx = xSum / pointListtem.length;
                                                flzline.Centery = ySum / pointListtem.length;
                                                flzline.Centerz = zSum / pointListtem.length;
                                                flzline.title = layerlist.FlzDataLayer.FlzDataList[j].name;
                                                flzline.id = "FLZJIELI_" + layerlist.FlzDataLayer.FlzDataList[j].id;
                                                flzline.type = "FLZJIELI";
                                                flzline.remarks = layerlist.FlzDataLayer.FlzDataList[j].remarks;
                                                flzline.datas = layerlist.FlzDataLayer.FlzDataList[j];
                                                flzline.pointList = pointListtem;
                                                flzline.checked = false;
                                                flzline.showCheckbox = true;//显示复选框
                                                flzWindowLayerchild.push(flzline);
                                            }
                                        }
                                    }
                                    flzWindowLayer.children = flzWindowLayerchild;
                                    projectlayerchild.push(flzWindowLayer);

                                }
                            }
                        }

                        projectlayer.children = projectlayerchild;
                        layers.push(projectlayer);
                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {

                            if (layerlist.ProjectLayer.SurModels != null) {
                                var prjsurmodel = new Object;
                                prjsurmodel.title = layerlist.ProjectLayer.SurModels.Title;
                                var prjsurmodelchild = [];
                                modleInfoList = layerlist.ProjectLayer.SurModels.SurModelList;//把模型的值存起来
                                for (var i in layerlist.ProjectLayer.SurModels.SurModelList) {
                                    var surmodel = new Object;
                                    surmodel.title = layerlist.ProjectLayer.SurModels.SurModelList[i].MXSJ;
                                    surmodel.id = "PROJECTSUMODEL_" + layerlist.ProjectLayer.SurModels.SurModelList[i].Id;
                                    surmodel.type = "PROJECTSUMODEL";
                                    surmodel.path = layerlist.ProjectLayer.SurModels.SurModelList[i].MXLJ;
                                    surmodel.checked = false;
                                    surmodel.showCheckbox = true;//显示复选框
                                    prjsurmodelchild.push(surmodel);
                                }

                                prjsurmodel.children = prjsurmodelchild;
                                layers.push(prjsurmodel);
                            }
                        }
                        if (layerlist.ProjectLayer != null) {
                            if (layerlist.ProjectLayer.CenterPoint != null) {
                                var prjcenter = new Object;
                                prjcenter.title = layerlist.ProjectLayer.CenterPoint.Title;
                                prjcenter.label = layerlist.ProjectLayer.CenterPoint.Label;
                                prjcenter.bl = layerlist.ProjectLayer.CenterPoint.BL;
                                prjcenter.id = "PROJECTCENTER_" + id;
                                prjcenter.type = "PROJECTCENTER";
                                var entity = viewer.entities.getById(prjcenter.id);
                                if (entity != undefined) {
                                    prjcenter.checked = true;
                                    projectlayer.spread = true;
                                }
                                else {
                                    prjcenter.checked = false;
                                }
                                prjcenter.showCheckbox = true;//显示复选框
                                layers.push(prjcenter);
                            }
                        }
                        //斜坡体
                        if (layerlist.ProjectLayer != null && layerlist.ProjectLayer.KJFW != null ) {
                            var bianjie = new Object;
                            var bianjie = new Object;
                            bianjie.title = "边界范围";
                            bianjie.type = "BIANJIE";
                            bianjie.id = "BIANJIE" + id;
                            bianjie.pointList = JSON.parse(layerlist.ProjectLayer.KJFW.GeoJSON);
                            var entity = viewer.entities.getById(bianjie.id);
                            if (entity != undefined) {
                                bianjie.checked = true;
                                bianjie.spread = true;
                            }
                            else {
                                bianjie.checked = false;
                            }
                            bianjie.showCheckbox = true;//显示复选框
                            layers.push(bianjie);
                        }
                        
                        //斜坡体
                        if (layerlist.ProjectLayer != null && false) {
                            var bianjie = new Object;
                            bianjie.title = "边界范围";
                            bianjie.type = "BIANJIE";
                            bianjie.id = "BIANJIE" + id;
                            bianjie.pointList = GeoJSON;
                            bianjie.showCheckbox = true;//显示复选框

                            var entity = viewer.entities.getById(xiepoti.id);
                            if (entity != undefined) {
                                xiepoti.checked = true;
                                xiepoti.spread = true;
                            }
                            else {
                                xiepoti.checked = false;
                            }
                            xiepoti.showCheckbox = true;//显示复选框
                            layers.push(xiepoti);
                        }

                
                        //监测图层（监测点、监测剖面）
                        if (layerlist.FlzDataLayer != null && layerlist.FlzDataLayer.FlzDataList!=null&&false) {
                            var flzDataLayer = new Object;
                            flzDataLayer.title = layerlist.FlzDataLayer.Title;
                            var flzDataLayerchild = [];
                            var pointList = [];
                            var lineList = [];
                            var noodlesList = [];
                            for (var i = 0; i < layerlist.FlzDataLayer.FlzDataList.length;i++) {
                                if ("1" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    pointList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                } else if ("2" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    lineList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                } else if ("3" == layerlist.FlzDataLayer.FlzDataList[i].type) {
                                    noodlesList.push(layerlist.FlzDataLayer.FlzDataList[i]);
                                }
                            }
                            //点
                            if (pointList != null && pointList.length > 0 ) {
                                var flzpointlayer = new Object;
                                flzpointlayer.title = "点数据";
                                flzpointlayer.type = "FLZPOINT";
                                flzpointlayer.checked = false;
                                flzpointlayer.showCheckbox = true;//显示复选框
                                var flzpointlayerchild = [];
                                for (var i = 0; i < pointList.length; i++) {
                                    var postionList = pointList[i].postion.split("@");
                                    var Center = new Object
                                    Center.ls = postionList[0];
                                    Center.bs = postionList[1];
                                    Center.hs = postionList[2];

                                    var flzpoint = new Object;
                                    flzpoint.title = pointList[i].name;
                                    flzpoint.id = "FLZPOINT_" + pointList[i].id;
                                    flzpoint.type = "FLZPOINT";
                                    flzpoint.remarks = pointList[i].remarks;
                                    flzpoint.pointId = pointList[i].id;
                                    flzpoint.lbh = Center;
                                    flzpoint.checked = false;
                                    flzpoint.showCheckbox = true;//显示复选框
                                    flzpointlayerchild.push(flzpoint);

                                }
                                flzpointlayer.children = flzpointlayerchild;
                                flzDataLayerchild.push(flzpointlayer);
                                
                            }
                            //线
                            if (lineList != null && lineList.length>0) {
                                var flzlinelayer = new Object;
                                flzlinelayer.title = "线数据";
                                flzlinelayer.type = "FLZLINE";
                                flzlinelayer.checked = false;
                                flzlinelayer.showCheckbox = true;//显示复选框
                                var flzlinelayerchild = [];
                                for (var i = 0; i < lineList.length; i++) {
                                    console.log(lineList[i].postion);
                                    console.log("109.91010735385844@31.06363325708343@140.82495654361867".split("@")[0]);
                                    var pointListtem = lineList[i].postion.split("&");
                                    var lineListtemp = [];
                                    for (var j = 0; j < pointListtem.length;j++) {
                                        var postionList = pointListtem[j].split("@");
                                        var Center = new Object
                                        Center.ls = postionList[0];
                                        Center.bs = postionList[1];
                                        Center.hs = postionList[2];
                                        lineListtemp.push(Center);
                                    }
                                    

                                    var flzline = new Object;
                                    flzline.title = lineList[i].name;
                                    flzline.id = "FLZLINE_" + lineList[i].id;
                                    flzline.type = "FLZLINE";
                                    flzline.remarks = lineList[i].remarks;
                                    flzline.lineId = lineList[i].id;
                                    flzline.pointList = lineListtemp;
                                    flzline.checked = false;
                                    flzline.showCheckbox = true;//显示复选框
                                    flzlinelayerchild.push(flzline);

                                }
                                flzlinelayer.children = flzlinelayerchild;
                                flzDataLayerchild.push(flzlinelayer);

                            }
                            //面
                            if (noodlesList != null && noodlesList.length > 0) {
                                var flznoodleslayer = new Object;
                                flznoodleslayer.title = "面数据";
                                flznoodleslayer.type = "FLZAREA";
                                flznoodleslayer.checked = false;
                                flznoodleslayer.showCheckbox = true;//显示复选框
                                var flznoodleslayerchild = [];
                                for (var i = 0; i < noodlesList.length; i++) {
                                    var pointListtem = noodlesList[i].postion.split("&");
                                    var noodlesListtemp = [];
                                    for (var j = 0; j < pointListtem.length; j++) {
                                        var postionList = pointListtem[j].split("@");
                                        var Center = new Object
                                        Center.ls = postionList[0];
                                        Center.bs = postionList[1];
                                        Center.hs = postionList[2];
                                        noodlesListtemp.push(Center);
                                    }


                                    var flznoodles = new Object;
                                    flznoodles.title = noodlesList[i].name;
                                    flznoodles.id = "FLZAREA_" + noodlesList[i].id;
                                    flznoodles.type = "FLZAREA";
                                    flznoodles.remarks = noodlesList[i].remarks;
                                    flznoodles.noodlesId = noodlesList[i].id;
                                    flznoodles.pointList = noodlesListtemp;
                                    flznoodles.checked = false;
                                    flznoodles.showCheckbox = true;//显示复选框
                                    flznoodleslayerchild.push(flznoodles);

                                }
                                flznoodleslayer.children = flznoodleslayerchild;
                                flzDataLayerchild.push(flznoodleslayer);

                            }

                            flzDataLayer.children = flzDataLayerchild;
                            layers.push(flzDataLayer);
                            console.log(layers);
                        }
                        

                        //TODO MORE LAYER

                        console.log(layers);
                        if (projectlayerlistlayerindex != null) {
                            tree.render({
                                elem: '#prjlayerlist'
                                , id: 'prjlayerlistid'
                                , edit: ['add', 'update', 'del']
                                , showCheckbox: true
                                , customCheckbox: true
                                , showLine: false
                                , data: layers
                                , accordion: false
                                , click: function (obj) {
                                    //点击事件
                                    //如果选中就缩放到目标
                                    //如果未选中就不做任何处理
                                    var data = obj.data;
                                    console.log(data);
                                    if (data.checked) {
                                        if (data.children != undefined) {
                                            if (data.type == "FLZWINDOW") {
                                                //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                console.log(data);
                                                viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(data.datas.level))), Cesium.Math.toRadians(data.datas.vertical), 40));

                                            } else {
                                                var entities = [];
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id)
                                                    if (entity != undefined) {
                                                        entities.push(entity);
                                                    }
                                                }

                                                if (entities.length > 0) {
                                                    viewer.zoomTo(entities, new Cesium.HeadingPitchRange(Cesium.Math.toRadians(300), Cesium.Math.toRadians(-120), 50));
                                                }
                                            }
                                            
                                        }
                                        else {
                                            console.log(data);
                                            //  viewer.flyTo(viewer.entities.getById(data.id), { duration: 1, offset: new Cesium.HeadingPitchRange(Cesium.Math.toRadians(0), Cesium.Math.toRadians(-90), 50) });
                                            // viewer.zoomTo(viewer.entities.getById(data.id));//
                                            if (data.type == "FLZJIELI") {// || data.type == "YOUSHIMIAN"
                                                //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                console.log(data);//测窗的
                                                for (var i in layers[0].children) {
                                                    for (var j in layers[0].children[i].children) {
                                                        if (data.id == layers[0].children[i].children[j].id) {
                                                            console.log(layers[0].children[i]);
                                                            viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(-(parseFloat(layers[0].children[i].datas.level))), Cesium.Math.toRadians(layers[0].children[i].datas.vertical), 40));
                                                            break;
                                                        }
                                                    }
                                                }
                                                
                                                
                                            } else if (data.type == "YOUSHIMIAN") {// || data.type == "YOUSHIMIAN"
                                                //viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"));
                                                console.log(data);
                                                viewer.zoomTo(viewer.entities.getById(data.id + "_LABEL"), new Cesium.HeadingPitchRange(Cesium.Math.toRadians(data.datas.inclination - 180), Cesium.Math.toRadians(data.datas.dipAngle-90), 40));
                                            }else {
                                                viewer.zoomTo(viewer.entities.getById(data.id))
                                            }
                                           
                                        }
                                    }

                                }
                                , oncheck: function (obj) {
                                    //根据选中状态在地图中添加元素
                                    var checked = obj.checked;
                                    var data = obj.data;

                                    //TODO解决模型多选


                                    if (checked) {
                                        if (data.children != undefined) {
                                            //多选
                                            if (data.type == "FLZPOINT") {
                                                //全选监测点
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        //当无此元素添加
                                                        viewer.entities.add({
                                                            id: data.children[i].id,
                                                            position: new Cesium.Cartesian3.fromDegrees(data.children[i].lbh.ls, data.children[i].lbh.bs, data.children[i].lbh.hs),
                                                            billboard: {
                                                                image: '../../Resources/img/map/marker.png',
                                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                width: 24,
                                                                height: 24,
                                                            }
                                                        });
                                                    }

                                                    var entitylabel = viewer.entities.getById(data.children[i].id + "_LABEL");
                                                    if (entitylabel == undefined) {
                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: new Cesium.Cartesian3.fromDegrees(data.children[i].lbh.ls, data.children[i].lbh.bs, data.children[i].lbh.hs),
                                                            label: {
                                                                text: data.children[i].title,
                                                                font: '16px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                            }
                                                        });
                                                    }

                                                    data.children[i].checked = true;
                                                }
                                            }
                                            else if (data.type == "FLZLINE") {
                                                //全选线
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        var line = [];
                                                        var sum = 0;
                                                        for (var j in data.children[i].pointList) {
                                                            line.push(new Cesium.Cartesian3.fromDegrees(data.children[i].pointList[j].ls, data.children[i].pointList[j].bs, data.children[i].pointList[j].hs));
                                                        }
                                                        for (var x = 0; x < line.length - 1; x++) {
                                                            var point1 = line[x];
                                                            var point2 = line[x + 1];

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
                                                            id: data.children[i].id,
                                                            polyline: {
                                                                positions: line,
                                                                width: 5,
                                                                arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.YELLOW,
                                                                show: true,
                                                                clampToGround: true,
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            }
                                                        });

                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: new Cesium.Cartesian3.fromDegrees(data.children[i].pointList[data.children[i].pointList.length - 1].ls, data.children[i].pointList[data.children[i].pointList.length - 1].bs, data.children[i].pointList[data.children[i].pointList.length - 1].hs),
                                                            label: {
                                                                text: data.children[i].title + '-长度：' + sum.toFixed(2) + '米',
                                                                font: '20px Times New Roman',
                                                                material: Cesium.Color.YELLOW,
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                            }
                                                        });

                                                    }

                                                    data.children[i].checked = true;
                                                }
                                            } else if (data.type == "FLZWINDOW") {
                                                //全选侧窗
                                                console.log(data);
                                                var entityFater = viewer.entities.getById(data.id);
                                                var sum = 0;
                                              
                                                if (entityFater == undefined) {
                                                    var points = data.pointList;
                                                    points.push(points[0]);
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polyline: {
                                                            positions: points,
                                                            width: 1,
                                                            arcType: Cesium.ArcType.RHUMB,
                                                            material: Cesium.Color.RED,
                                                            show: true,
                                                            clampToGround: true,
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                        },
                                                    });
                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                        point: {
                                                            pixelSize: 1,
                                                            color: Cesium.Color.BLUE
                                                        }
                                                    });

                                                }
                                                for (var i in data.children) {
                                                    
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        viewer.entities.add({
                                                            id: data.children[i].id,
                                                            polygon: {
                                                                hierarchy: {
                                                                    positions: data.children[i].pointList
                                                                },
                                                                material: Cesium.Color.BLUE.withAlpha(0.3),
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                            }
                                                        });
                                                        console.log(data.children[i]);
                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                            point: {
                                                                pixelSize: 1,
                                                                color: Cesium.Color.BLUE
                                                            }
                                                        });
                                                    }

                                                    data.children[i].checked = true;
                                                }
                                                data.checked = true;
                                            } else if (data.type == "FLZAREA") {
                                                

                                                console.log(data);
                                                //点击的线
                                                //全选监测剖面
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        var cartesian3s = [];
                                                        var newcartesian3s = [];
                                                        var maxHeight = data.children[i].pointList[0].hs;
                                                        var minHeight = data.children[i].pointList[0].hs;
                                                        var bSum = 0;
                                                        var lSum = 0;
                                                        for (var x = 0; x < points.length; x++) {
                                                            var cartesian3 = points[x];
                                                            cartesian3s.push(cartesian3);
                                                            var rblh = Cesium.Cartographic.fromCartesian(points[x]);
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
                                                            id: data.children[i].id,
                                                            polygon: {
                                                                hierarchy: {
                                                                    positions: points
                                                                },
                                                                material: Cesium.Color.YELLOW.withAlpha(0.3),
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                            }
                                                        });

                                                        //计算面积
                                                        var cartesian2s = [];
                                                        for (var m = 0; m < newcartesian3s.length; m++) {
                                                            var cartesian3 = Cesium.Cartesian3.fromDegrees(newcartesian3s[m].y, newcartesian3s[m].x, maxHeight);
                                                            var cartesian2 = new Cesium.Cartesian2(cartesian3.x, cartesian3.y);
                                                            cartesian2s.push(cartesian2);
                                                        }
                                                        cartesian2s.push(cartesian2s[0]);
                                                        var area = 0;
                                                        for (var m = 0; m < cartesian2s.length - 1; m++) {
                                                            area += (cartesian2s[m].x - cartesian2s[0].x) * (cartesian2s[m + 1].y - cartesian2s[0].y) - (cartesian2s[m].y - cartesian2s[0].y) * (cartesian2s[m + 1].x - cartesian2s[0].x);
                                                        }
                                                        area = Math.abs(area);

                                                        //计算重心
                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                                                            label: {
                                                                text: data.children[i].title + '面积：' + area.toFixed(2) + '平方米',
                                                                showBackground: true,
                                                                backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                                font: '24px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                                            }
                                                        });


                                                    }

                                                    data.children[i].checked = true;
                                                }
                                            } else if (data.type == "DOMSTRPLA") {//优势结构面


                                                console.log(data);
                                                //点击的线
                                                //全选优势结构面
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        
                                                        viewer.entities.add({
                                                            id: data.children[i].id,
                                                            polygon: {
                                                                hierarchy: {
                                                                    positions: data.children[i].pointList
                                                                },
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                                material: Cesium.Color.ORANGE.withAlpha(0.3),
                                                            }
                                                        });
                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: new Cesium.Cartesian3(data.children[i].Centerx, data.children[i].Centery, data.children[i].Centerz),
                                                            point: {
                                                                pixelSize: 1,
                                                                color: Cesium.Color.ORANGE
                                                            }
                                                        });
                                                    }
                                                    data.children[i].checked = true;
                                                }
                                            }


                                            data.checked = true;
                                        }
                                        else {
                                            //单选
                                            if (data.type == "PROJECTCENTER") {
                                                //项目位置
                                                console.log(curtileset);
                                                console.log(data);
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                                        billboard: {
                                                            image: '../../Resources/img/map/marker.png',
                                                            verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                            width: 24,
                                                            height: 24,
                                                        }
                                                    });
                                                }

                                                var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B),
                                                        label: {
                                                            text: data.label,
                                                            font: '24px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            heightReference: Cesium.HeightReference.CLAMP_TO_GROUND,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                        }
                                                    });
                                                }

                                                data.checked = true;
                                            }
                                            else if (data.type == "PROJECTSUMODEL") {
                                                modleInfo = data;
                                                //项目模型
                                                LoadModel(data);
                                                //data.checked = true;
                                            }
                                            else if (data.type == "FLZJIELI") {
                                                //节理
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polygon: {
                                                            hierarchy: {
                                                                positions: data.pointList
                                                            },
                                                            material: Cesium.Color.BLUE.withAlpha(0.3),
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                        }
                                                    });
                                                   
                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                        point: {
                                                            pixelSize: 1,
                                                            color: Cesium.Color.BLUE.withAlpha(0.3)
                                                        }
                                                    });
                                                }
                                                data.checked = true;
                                                //看看把父亲也选中
                                                for (var i in layers[0].children) {
                                                    for (var j in layers[0].children[i].children) {
                                                        if (data.id == layers[0].children[i].children[j].id) {
                                                            var entityFater = viewer.entities.getById(layers[0].children[i].id);
                                                            if (entityFater == undefined) {
                                                                var points = layers[0].children[i].pointList;
                                                               
                                                                points.push(points[0]);
                                                                viewer.entities.add({
                                                                    id: layers[0].children[i].id,
                                                                    polyline: {
                                                                        positions: points,
                                                                        width: 1,
                                                                        arcType: Cesium.ArcType.RHUMB,
                                                                        material: Cesium.Color.RED,
                                                                        show: true,
                                                                        clampToGround: true,
                                                                        classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                                    },
                                                                });
                                                                viewer.entities.add({
                                                                    id: layers[0].children[i].id + "_LABEL",
                                                                    position: new Cesium.Cartesian3(layers[0].children[i].Centerx, layers[0].children[i].Centery, layers[0].children[i].Centerz),
                                                                    point: {
                                                                        pixelSize: 1,
                                                                        color: Cesium.Color.BLUE
                                                                    }
                                                                });
                                                                layers[0].children[i].checked = true;
                                                            }


                                                            break;
                                                        }
                                                    }
                                                }
                                            } else if (data.type == "YOUSHIMIAN") {
                                                //优势结构面
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    var points = data.pointList;
                                                    var sum = 0;
                                                    
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polygon: {
                                                            hierarchy: {
                                                                positions: points
                                                            },
                                                            material: Cesium.Color.ORANGE.withAlpha(0.5),
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE,
                                                        }
                                                    });

                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3(data.Centerx, data.Centery, data.Centerz),
                                                        point: {
                                                            pixelSize: 1,
                                                            color: Cesium.Color.ORANGE
                                                        }
                                                    });
                                                }
                                                data.checked = true;
                                                //看看把父亲也选中
                                            }
                                            else if (data.type == "BIANJIE") {
                                                //消落带边界
                                                console.log(data);
                                                var entityFater = viewer.entities.getById(data.id);
                                                var sum = 0;

                                                if (entityFater == undefined) {
                                                    var points = data.pointList;
                                                    points.push(points[0]);
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polyline: {
                                                            positions: points,
                                                            width: 3,
                                                            arcType: Cesium.ArcType.RHUMB,
                                                            material: Cesium.Color.YELLOW,
                                                            show: true,
                                                            clampToGround: true,
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                        },
                                                    });
                                                    

                                                }
                                                data.checked = true;
                                            }
                                            else if (data.type == "FLZPOINT") {
                                                //监测点
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    //当无此元素添加
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        position: new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
                                                        billboard: {
                                                        image: '../../Resources/img/map/marker.png',
                                                        verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                        width: 24,
                                                        height: 24,
                                                    }
                                                    });
                                                }

                                                var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3.fromDegrees(data.lbh.ls, data.lbh.bs, data.lbh.hs),
                                                           label: {
                                                            text: data.title,
                                                            font: '16px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -36),
                                                        }
                                                    });
                                                }

                                                data.checked = true;
                                            }
                                            else if (data.type == "FLZLINE") {
                                                //点击的线
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    var line = [];
                                                    var sum = 0;
                                                    for (var j in data.pointList) {
                                                        line.push(new Cesium.Cartesian3.fromDegrees(data.pointList[j].ls, data.pointList[j].bs, data.pointList[j].hs));
                                                    }
                                                    for (var i = 0; i < line.length - 1; i++) {
                                                        var point1 = line[i];
                                                        var point2 = line[i+1];

                                                        var distance = Cesium.Cartesian3.distance(point1, point2)
                                                        if (distance == NaN) {
                                                            sum = 0;
                                                            break;
                                                        }
                                                        else {
                                                            sum += distance;
                                                        }
                                                    }
                                                    console.log(viewer.entities);
                                                    console.log(sum);
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polyline: {
                                                            positions: line,
                                                            width: 5,
                                                            arcType: Cesium.ArcType.RHUMB,
                                                            material: Cesium.Color.YELLOW,
                                                            show: true,
                                                            clampToGround: true,
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                        }
                                                    });

                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3.fromDegrees(data.pointList[data.pointList.length - 1].ls, data.pointList[data.pointList.length - 1].bs, data.pointList[data.pointList.length - 1].hs),
                                                        label: {
                                                            text: data.title + '-长度：' + sum.toFixed(2) + '米',
                                                            font: '20px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                        }
                                                    });
                                                    console.log(viewer);

                                                }

                                                data.checked = true;
                                            } else if (data.type == "FLZAREA") {
                                                
                                                console.log(data);
                                                //点击的线
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    var points = [];
                                                    var sum = 0;
                                                    for (var j in data.pointList) {
                                                        points.push(new Cesium.Cartesian3.fromDegrees(data.pointList[j].ls, data.pointList[j].bs, data.pointList[j].hs));
                                                    }



                                                    var cartesian3s = [];
                                                    var newcartesian3s = [];
                                                    var maxHeight = data.pointList[0].hs;
                                                    var minHeight = data.pointList[0].hs;
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
                                                        id: data.id,
                                                        polygon: {
                                                            hierarchy: {
                                                                positions: points
                                                            },
                                                            material: Cesium.Color.YELLOW.withAlpha(0.3),
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
                                                        id: data.id + "_LABEL",
                                                        position: Cesium.Cartesian3.fromDegrees(lSum / points.length, bSum / points.length, maxHeight + 1),
                                                        label: {
                                                            text: data.title + '面积：' + area.toFixed(2) + '平方米',
                                                            showBackground: true,
                                                            backgroundColor: new Cesium.Color(0.165, 0.165, 0.165, 0.5),
                                                            font: '24px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -10),
                                                        }
                                                    });
                                                  

                                                }

                                                data.checked = true;
                                            }
                                        }

                                    }
                                    else {
                                        if (data.children != undefined) {
                                            for (var i in data.children) {
                                                viewer.entities.removeById(data.children[i].id);
                                                viewer.entities.removeById(data.children[i].id + "_LABEL");
                                                data.children[i].checked = false;
                                            }
                                            if (data.type == "FLZWINDOW") {//特殊情况测传
                                                viewer.entities.removeById(data.id);
                                                viewer.entities.removeById(data.id + "_LABEL");
                                            }
                                            data.checked = false;
                                        }
                                        else {
                                            if (data.type == "PROJECTSUMODEL" || data.type == "DISASTERSURMODEL") {
                                                viewer.scene.primitives.remove(curtileset);
                                                curtileset = null;
                                                modleInfo = null;
                                            }
                                            else {
                                                viewer.entities.removeById(data.id);
                                                viewer.entities.removeById(data.id + "_LABEL");
                                            }

                                            data.checked = false;
                                        }

                                    }

                                }
                               
                                , operate: function (obj) {
                                    var type = obj.type; //得到操作类型：add、edit、del
                                    var data = obj.data; //得到当前节点的数据
                                    var elem = obj.elem; //得到当前节点元素

                                    var id = data.id;
                                    var name = data.title;
                                    console.log(obj);
                                    if (type === 'add') { //增加节点，查看
                                        DrwInfo(obj, "view");
                                        return;
                                    } else if (type === 'update') { //修改节点
                                        DrwInfo(obj, "update");
                                    } else if (type === 'del') { //删除节点
                                        if (data.type == "FLZWINDOW") {//删除测窗
                                            $.ajax({
                                                url: servicesurl + "/api/FlzWindowInfo/DeleteFlzWindow", type: "delete", data: { "id": obj.data.id.split("_")[1], "cookie": document.cookie },
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });


                                                    viewer.entities.removeById(obj.data.id);
                                                    viewer.entities.removeById(obj.data.id + "_LABEL");
                                                    for (var i in layers[0].children) {
                                                        if (obj.data.id == layers[0].children[i].id) {
                                                            layers[0].children.splice(i, 1);
                                                            break;
                                                        }

                                                    }
                                                    tree.reload('prjlayerlistid', { data: layers });
                                                    for (var m in windowInfoList) {
                                                        if (("FLZWINDOW_" + windowInfoList[m].id) == obj.data.id) {
                                                            windowInfoList.splice(m, 1);
                                                        }
                                                    }


                                                }, datatype: "json"
                                            });
                                        } else if (data.type == "BIANJIE") {//删除边界范围
                                            var temp = {};
                                            temp.id = currentprojectid;
                                            temp.cookie = document.cookie;
                                            temp.flzRange = null;
                                            var loadinglayerindex = layer.load(0, { shade: false, zIndex: layer.zIndex, success: function (loadlayero) { layer.setTop(loadlayero); } });

                                            $.ajax({
                                                url: servicesurl + "/api/FLZ/UpdateProject", type: "put", data: temp,
                                                success: function (result) {
                                                    layer.close(loadinglayerindex);
                                                    if (result == "更新成功！") {
                                                        layer.msg("删除成功", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                        //关闭
                                                        //刷新项目列表
                                                        //GetUserProjects();
                                                        //var flzWindowLayer = new Object;
                                                        //flzWindowLayer.title = "边界范围";
                                                        //flzWindowLayer.type = "BIANJIE";
                                                        //flzWindowLayer.id = "BIANJIE" + currentprojectid;
                                                        //flzWindowLayer.pointList = points;
                                                        //flzWindowLayer.checked = true;
                                                        //flzWindowLayer.showCheckbox = true;//显示复选框
                                                        //flzWindowLayer.children = [];
                                                        //layers.push(flzWindowLayer);
                                                        //console.log(layers);
                                                        //tree.reload('prjlayerlistid', { data: layers });
                                                        //if (handler != undefined) {
                                                        //    handler.destroy();
                                                        //}
                                                        //isRedo = true;
                                                        //ClearTemp();
                                                       // tree.reload('prjlayerlistid', { data: layers });
                                                        for (var i in layers ) {
                                                            if (layers[i].type == "BIANJIE") {
                                                                layers.splice(i, 1);
                                                                break;
                                                            }
                                                        }
                                                        console.log(layers);
                                                        viewer.entities.removeById(data.id);
                                                        tree.reload('prjlayerlistid', { data: layers });
                                                    } else {
                                                        layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    }
                                                }, datatype: "json"
                                            });
                                        } else {
                                            $.ajax({
                                                url: servicesurl + "/api/FlzData/DeleteFlzPoint", type: "delete", data: { "id": obj.data.id.split("_")[1], "cookie": document.cookie },
                                                success: function (result) {
                                                    layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                                    viewer.entities.removeById(obj.data.id);
                                                    viewer.entities.removeById(obj.data.id + "_LABEL");
                                                    console.log(layers);
                                                    if (data.type == "FLZJIELI" || data.type == "YOUSHIMIAN") {
                                                        for (var i in layers[0].children) {
                                                            for (var j in layers[0].children[i].children) {
                                                                if (obj.data.id == layers[0].children[i].children[j].id) {
                                                                    layers[0].children[i].children.splice(j, 1);

                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }  else{//点数据
                                                        for (var i in layers[1].children) {
                                                            for (var j in layers[1].children[i].children) {
                                                                if (obj.data.id == layers[1].children[i].children[j].id) {
                                                                    layers[1].children[i].children.splice(j,1);
                                                                    break;
                                                                }
                                                            }
                                                        }
                                                    }
                                                    
                                                    console.log(layers);
                                                    tree.reload('prjlayerlistid', { data: layers });
                                                }, datatype: "json"
                                            });
                                        }
                                        

                                    };
                                }
                            });

                        }

                    }

                }, datatype: "json"
            });

        }

    }

}