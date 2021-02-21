var layers = [];//图层列表数据

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
                , area: ['350px', '500px']
                , shade: 0
                , offset: ['520px', '10px']
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
                url: servicesurl + "/api/Layer/GetLayerInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                success: function (data) {
                    if (data == "") {
                        layer.msg("无项目图层信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    }
                    else {
                        var layerlist = JSON.parse(data);
                        layers = [];//图层列表数据

                        //项目图层（项目位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            var projectlayer = new Object;
                            projectlayer.title = layerlist.ProjectLayer.Title;

                            var projectlayerchild = [];
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
                                projectlayerchild.push(prjcenter);
                            }
                            if (layerlist.ProjectLayer.KJFW != null) {
                                //TODO
                            }
                            if (layerlist.ProjectLayer.YXFW != null) {
                                //TODO
                            }
                            if (layerlist.ProjectLayer.SurModels != null) {
                                var prjsurmodel = new Object;
                                prjsurmodel.title = layerlist.ProjectLayer.SurModels.Title;
                                var prjsurmodelchild = [];
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

                            projectlayer.children = projectlayerchild;
                            layers.push(projectlayer);
                        }

                        //灾害体图层（灾害体位置、空间范围、影响范围、实景模型）
                        if (layerlist.ProjectLayer != null) {
                            var disasterlayer = new Object;
                            disasterlayer.title = layerlist.DisasterLayers.Title;
                            var disasterlayerchild = [];
                            for (var i in layerlist.DisasterLayers.DisasterLayerList) {
                                var disaster = new Object;
                                disaster.title = layerlist.DisasterLayers.DisasterLayerList[i].Title;
                                var disasterchild = [];
                                if (layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint != null) {
                                    var disastercenter = new Object;
                                    disastercenter.title = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Title;
                                    disastercenter.label = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Label;
                                    disastercenter.bl = layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.BL;
                                    disastercenter.id = "DISASTERCENTER_" + layerlist.DisasterLayers.DisasterLayerList[i].CenterPoint.Id;
                                    disastercenter.type = "DISASTERCENTER";
                                    disastercenter.checked = false;
                                    disastercenter.showCheckbox = true;//显示复选框
                                    disasterchild.push(disastercenter);
                                }
                                if (layerlist.DisasterLayers.DisasterLayerList[i].KJFW != null) {
                                    //TODO
                                }
                                if (layerlist.DisasterLayers.DisasterLayerList[i].YXFW != null) {
                                    //TODO
                                }
                                if (layerlist.DisasterLayers.DisasterLayerList[i].SurModels != null) {
                                    var disastersurmodel = new Object;
                                    disastersurmodel.title = layerlist.DisasterLayers.DisasterLayerList[i].SurModels.Title;
                                    var disastersurmodelchild = [];
                                    for (var j in layerlist.DisasterLayers.DisasterLayerList[i].SurModelList) {
                                        var surmodel = new Object;
                                        surmodel.title = layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].MXMC;
                                        surmodel.id = "DISASTERSURMODEL_" + layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].Id;
                                        surmodel.type = "DISASTERSURMODEL";
                                        surmodel.path = layerlist.DisasterLayers.DisasterLayerList[i].SurModelList[j].MXLJ;
                                        surmodel.checked = false;
                                        surmodel.showCheckbox = true;//显示复选框
                                        disastersurmodelchild.push(surmodel);
                                    }

                                    disastersurmodel.children = disastersurmodelchild;
                                    disasterchild.push(disastersurmodel)
                                }

                                disaster.children = disasterchild;
                                disasterlayerchild.push(disaster);
                            }

                            disasterlayer.children = disasterlayerchild;
                            layers.push(disasterlayer);
                        }

                        //监测图层（监测点、监测剖面）
                        if (layerlist.MonitorLayer != null) {
                            var monitorlayer = new Object;
                            monitorlayer.title = layerlist.MonitorLayer.Title;
                            var monitorlayerchild = [];
                            if (layerlist.MonitorLayer.MonitorPointLayers != null) {
                                var monitorpointlayer = new Object;
                                monitorpointlayer.title = layerlist.MonitorLayer.MonitorPointLayers.Title;
                                monitorpointlayer.type = "MONITORPOINT";
                                monitorpointlayer.checked = false;
                                monitorpointlayer.showCheckbox = true;//显示复选框
                                var monitorpointlayerchild = [];
                                for (var i in layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList) {
                                    var monitorpoint = new Object;
                                    monitorpoint.title = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCDBH;
                                    monitorpoint.id = "MONITORPOINT_" + layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].Id;
                                    monitorpoint.type = "MONITORPOINT";
                                    monitorpoint.jcff = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCFF;
                                    monitorpoint.jczlx = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].JCZLX;
                                    monitorpoint.xyz = layerlist.MonitorLayer.MonitorPointLayers.MonitorPointLayerList[i].Center;
                                    monitorpoint.checked = false;
                                    monitorpoint.showCheckbox = true;//显示复选框
                                    monitorpointlayerchild.push(monitorpoint);
                                }

                                monitorpointlayer.children = monitorpointlayerchild;
                                monitorlayerchild.push(monitorpointlayer);
                            }

                            if (layerlist.MonitorLayer.MonitorSectoinLayers != null) {
                                var monitorsectionlayer = new Object;
                                monitorsectionlayer.title = layerlist.MonitorLayer.MonitorSectoinLayers.Title;
                                monitorsectionlayer.type = "MONITORSECTION";
                                monitorsectionlayer.checked = false;
                                monitorsectionlayer.showCheckbox = true;
                                var monitorsectionlayerchild = [];
                                for (var i in layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList) {
                                    var monitorsection = new Object;
                                    monitorsection.title = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMBH;
                                    monitorsection.id = "MONITORSECTION_" + layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].Id;
                                    monitorsection.type = "MONITORSECTION";
                                    monitorsection.pmlx = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMLX;
                                    monitorsection.pmdj = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].PMDJ;
                                    monitorsection.line = layerlist.MonitorLayer.MonitorSectoinLayers.MonitorSectoinLayerList[i].Line;
                                    monitorsection.checked = false;
                                    monitorsection.showCheckbox = true;
                                    monitorsectionlayerchild.push(monitorsection);
                                }

                                monitorsectionlayer.children = monitorsectionlayerchild;
                                monitorlayerchild.push(monitorsectionlayer);
                            }

                            monitorlayer.children = monitorlayerchild;
                            layers.push(monitorlayer);
                        }

                        //TODO MORE LAYER

                        if (projectlayerlistlayerindex != null) {
                            tree.render({
                                elem: '#prjlayerlist'
                                , id: 'prjlayerlistid'
                                , showCheckbox: true
                                , customCheckbox: true
                                , showLine: false
                                , data: layers
                                , edit: false
                                , accordion: false
                                , click: function (obj) {
                                    //点击事件
                                    //如果选中就缩放到目标
                                    //如果未选中就不做任何处理
                                    var data = obj.data;
                                    if (data.checked) {
                                        if (data.children != undefined) {
                                            var entities = [];
                                            for (var i in data.children) {
                                                var entity = viewer.entities.getById(data.children[i].id)
                                                if (entity != undefined) {
                                                    entities.push(entity);
                                                }
                                            }

                                            if (entities.length > 0) {
                                                viewer.zoomTo(entities);
                                            }
                                        }
                                        else {
                                            viewer.zoomTo(viewer.entities.getById(data.id));
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
                                            if (data.type == "MONITORPOINT") {
                                                //全选监测点
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        //当无此元素添加
                                                        viewer.entities.add({
                                                            id: data.children[i].id,
                                                            position: new Cesium.Cartesian3(data.children[i].xyz.X, data.children[i].xyz.Y, data.children[i].xyz.Z),
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
                                                            position: new Cesium.Cartesian3(data.children[i].xyz.X, data.children[i].xyz.Y, data.children[i].xyz.Z),
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
                                            else if (data.type == "MONITORSECTION") {
                                                //全选监测剖面
                                                for (var i in data.children) {
                                                    var entity = viewer.entities.getById(data.children[i].id);
                                                    if (entity == undefined) {
                                                        var line = [];
                                                        var xsum = 0;
                                                        var ysum = 0;
                                                        var zsum = 0;
                                                        for (var j in data.children[i].line) {
                                                            line.push(new Cesium.Cartesian3(data.children[i].line[j].X, data.children[i].line[j].Y, data.children[i].line[j].Z));
                                                            xsum += data.children[i].line[j].X;
                                                            ysum += data.children[i].line[j].Y;
                                                            zsum += data.children[i].line[j].Z;
                                                        }

                                                        viewer.entities.add({
                                                            id: data.children[i].id,
                                                            polyline: {
                                                                positions: line,
                                                                width: 5,
                                                                arcType: Cesium.ArcType.RHUMB,
                                                                material: Cesium.Color.GREEN,
                                                                show: true,
                                                                clampToGround: true,
                                                                classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                            }
                                                        });

                                                        viewer.entities.add({
                                                            id: data.children[i].id + "_LABEL",
                                                            position: new Cesium.Cartesian3(xsum / line.length, ysum / line.length, zsum / line.length),
                                                            label: {
                                                                text: data.children[i].title,
                                                                font: '20px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
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
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    if (curtileset != null) {
                                                        viewer.entities.add({
                                                            id: data.id,
                                                            position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                            billboard: {
                                                                image: '../../Resources/img/map/marker.png',
                                                                verticalOrigin: Cesium.VerticalOrigin.BOTTOM,
                                                                width: 24,
                                                                height: 24,
                                                            }
                                                        });
                                                    }
                                                    else {
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
                                                }

                                                var entitylabel = viewer.entities.getById(data.id + "_LABEL");
                                                if (entitylabel == undefined) {
                                                    if (curtileset != null) {
                                                        viewer.entities.add({
                                                            id: data.id + "_LABEL",
                                                            position: viewer.scene.clampToHeight(Cesium.Cartesian3.fromDegrees(data.bl.L, data.bl.B)),
                                                            label: {
                                                                text: data.label,
                                                                font: '24px Times New Roman',
                                                                horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                                verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                                pixelOffset: new Cesium.Cartesian2(0.0, -60),
                                                            }
                                                        });
                                                    }
                                                    else {
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
                                                }

                                                data.checked = true;
                                            }
                                            else if (data.type == "PROJECTSUMODEL") {
                                                //项目模型
                                                LoadModel(data);

                                            }
                                            else if (data.type == "DISASTERCENTER") {
                                                //灾害体位置

                                            }
                                            else if (data.type == "DISASTERSURMODEL") {
                                                //灾害体模型

                                            }
                                            else if (data.type == "MONITORPOINT") {
                                                //监测点
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    //当无此元素添加
                                                    viewer.entities.add({
                                                        id: data.id,
                                                        position: new Cesium.Cartesian3(data.xyz.X, data.xyz.Y, data.xyz.Z),
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
                                                        position: new Cesium.Cartesian3(data.xyz.X, data.xyz.Y, data.xyz.Z),
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
                                            else if (data.type == "MONITORSECTION") {
                                                //监测剖面
                                                var entity = viewer.entities.getById(data.id);
                                                if (entity == undefined) {
                                                    var line = [];
                                                    var xsum = 0;
                                                    var ysum = 0;
                                                    var zsum = 0;
                                                    for (var j in data.line) {
                                                        line.push(new Cesium.Cartesian3(data.line[j].X, data.line[j].Y, data.line[j].Z));
                                                        xsum += data.line[j].X;
                                                        ysum += data.line[j].Y;
                                                        zsum += data.line[j].Z;
                                                    }

                                                    viewer.entities.add({
                                                        id: data.id,
                                                        polyline: {
                                                            positions: line,
                                                            width: 5,
                                                            arcType: Cesium.ArcType.RHUMB,
                                                            material: Cesium.Color.GREEN,
                                                            show: true,
                                                            clampToGround: true,
                                                            classificationType: Cesium.ClassificationType.CESIUM_3D_TILE
                                                        }
                                                    });

                                                    viewer.entities.add({
                                                        id: data.id + "_LABEL",
                                                        position: new Cesium.Cartesian3(xsum / line.length, ysum / line.length, zsum / line.length),
                                                        label: {
                                                            text: data.title,
                                                            font: '20px Times New Roman',
                                                            horizontalOrigin: Cesium.HorizontalOrigin.CENTER,
                                                            verticalOrigin: Cesium.VerticalOrigin.CENTER,
                                                            pixelOffset: new Cesium.Cartesian2(0.0, -60),
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

                                            data.checked = false;
                                        }
                                        else {
                                            if (data.type == "PROJECTSUMODEL" || data.type == "DISASTERSURMODEL") {
                                                viewer.scene.primitives.remove(curtileset);
                                                curtileset = null;
                                            }
                                            else {
                                                viewer.entities.removeById(data.id);
                                                viewer.entities.removeById(data.id + "_LABEL");
                                            }

                                            data.checked = false;
                                        }

                                    }

                                }
                            });

                        }

                    }

                }, datatype: "json"
            });

        }

    }

}