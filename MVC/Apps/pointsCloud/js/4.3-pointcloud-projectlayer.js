//弹出项目列表widget
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['300px', '600px']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , content:'<!--工具栏--><!DOCTYPE html><html><head><meta name="generator" content="HTML Tidy for HTML5 (experimental) for Windows https://github.com/w3c/tidy-html5/tree/c63cc39"><title></title></head><body><div class="layui-row" style="position:absolute;top:5px;width:100%"><!--搜索--><div class="layui-col-md9" style="width:85%"><div class="grid-demo grid-demo-bg1"><input type="text" id="projectfilter" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="left:30px;height:30px;padding-left:35px;border-radius:5px"></div></div><!--创建项目--><div class="layui-col-md3" style="width:15%"><div class="grid-demo"><button id="projectadd" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="border-style:hidden;float:right"></button></div></div></div><!--项目列表--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief"style="margin-top:30px"><!--选项卡--><ul class="layui-tab-title"><li class="layui-this" style="width:90%;padding-top: 3px;">项目</li></ul><!--tree--><div class="layui-tab-content"><div class="layui-tab-item layui-show" id="projectbyname"></div><div class="layui-tab-item" id="projectbytime"></div></div></div></body></html>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);
        PointCloudProjectList();
    }
});

var projectdatagroupname = [];//按项目名称排序
var layers = [];//图层列表数据

//获取点云项目树形
function PointCloudProjectList() {
    $.ajax({
        url: servicesurl + "/api/PointCloudProject/GetPCloudProjectList", type: "get", data: { "cookie": document.cookie },
        success: function (data) {
            if (data == "") {
                layer.msg("无项目信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
            }
            else {
                var layerlist = JSON.parse(data);
                layers = [];//图层列表数据



                //项目树
                if (layerlist.PCloudProjectList != null) {
                    //项目图层
                    for (var i in layerlist.PCloudProjectList) {
                        var project = new Object;
                        project.title = layerlist.PCloudProjectList[i].XMMC;
                        var projectchild = [];
                        var region = [];
                        //获取项目区域
                        for (var j in layerlist.PCDataLayer) {
                            var n = 0;
                            for (var n in layerlist.PCDataLayer[j].PCloudDataList) {
                                if (layerlist.PCDataLayer != null && layerlist.PCDataLayer[j].PCloudDataList[n].ProjectId == layerlist.PCloudProjectList[i].Id) {
                                    region.push(layerlist.PCDataLayer[j].PCloudDataList[n]);
                                }
                            }
                        }
                        var regionlayer = [];
                        var unique = [];
                        if (region.length != 0) {
                            for (var j in region) {
                                var temp = region[j].QY;
                                if (unique.indexOf(temp) == -1) {
                                    unique.push(temp);
                                }                                
                            }
                            for (var i in unique) {
                                for (var j in region) {
                                    var regiontemp = new Object;
                                    regiontemp.title = unique[i]
                                    if (unique[i] == region[j].QY) {
                                        var datatemp = new Object;                                        
                                        datatemp.data = region[j]; 
                                        regiontemp.data = datatemp;
                                        regionlayer.push(regiontemp);
                                    }                                    
                                }
                            }

                            
                        }                      
                        for (var i in unique) {
                            var regionchild = [];
                            regionchild.title = unique[i];                      
                            for (var j in regionlayer) {
                                var regionchildson = [];
                                if (regionlayer[j].title == unique[i]) {
                                    for (var z in regionlayer[j].data)
                                    var pcdata = new Object;
                                    pcdata.title = regionlayer[j].data[z].CJSJ;
                                    pcdata.checked = false;
                                    pcdata.showCheckbox = true;//显示复选框
                                    regionchildson.push(pcdata);
                                    regionchild.children = regionchildson;
                                    regionchild.push(regionchildson);
                                }
                            }
                            projectchild.children = regionchild;
                            projectchild.push(regionchild)
                        }
                        project.children = projectchild
                        layers.push(project);
                    }

                }


                tree.render({
                    elem: '#projectbyname'
                    , id: 'prjlayerlistid'
                    , showCheckbox: true
                    , customCheckbox: true
                    , showLine: true
                    , data: layers
                    , edit: false
                    , accordion: false
                });
            }
        }, datatype: "json"
    });
}