//弹出项目列表widget
layer.open({
    type: 1
    , title: ['项目列表', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
    , area: ['350px', '600px']
    , shade: 0
    , offset: ['60px', '10px']
    , closeBtn: 0
    , maxmin: true
    , moveOut: true
    , content:'<!--工具栏--><div class="layui-row" style="position:absolute;top:5px;width:100%">    <!--搜索-->    <div class="layui-col-md6" style="width:70%">        <div class="grid-demo grid-demo-bg1">            <input type="text" id="projectfilter" lay-verify="title" autocomplete="off" placeholder="搜索" class="layui-input" style="left:30px;height:30px;padding-left:35px;border-radius:5px">        </div>    </div>    <!--创建项目-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button id="projectadd" type="button" class="layui-btn layui-btn-primary layui-btn-sm" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-add-circle" style="margin-right:0px"></i></button>        </div>    </div>    <!--选择文件-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="selectpcdata" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-file-b" style="margin-right:0px"></i></button>        </div>    </div>    <!--文件上传-->    <div class="layui-col-md2" style="width:10%">        <div class="grid-demo">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="startupload" style="border-style:hidden;float:right"><i class="layui-icon layui-icon-upload-circle" style="margin-right:0px"></i></button>        </div>    </div></div><!--项目列表--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief"     style="margin-top:30px">    <!--选项卡-->    <ul class="layui-tab-title">        <li class="layui-this" style="width:90%;padding-top: 3px;">            项目        </li>    </ul>    <!--tree-->    <div class="layui-tab-content">        <div class="layui-tab-item layui-show" id="projectbyname"></div>        <div class="layui-tab-item" id="projectbytime"></div>    </div></div>'
    , zIndex: layer.zIndex
    , success: function (layero) {
        layer.setTop(layero);
        PointCloudProjectList();
    }
});







var projectdatagroupname = [];//按项目名称排序
var layers = [];//图层列表数据

//获取点云项目树形LAYUI
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
                                var temp = region[j].Regionid;
                                if (unique.indexOf(temp) == -1) {
                                    unique.push(temp);
                                }                                
                            }
                            for (var i in unique) {
                                for (var j in region) {
                                    var regiontemp = new Object;
                                    regiontemp.title = unique[i]
                                    if (unique[i] == region[j].Regionid) {
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
                                    pcdata.id = regionlayer[j].data[z].Id;
                                    pcdata.checked = false;
                                 //   pcdata.showCheckbox = true;//显示复选框
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
                    , customOperate: false
                    , showLine: true
                    , data: layers
                    , edit: ['add', 'update']
                    , accordion: true
                    , operate: function (obj) {
                        ProjectNodeOperate(obj);
                    }                    
                });
            }
        }, datatype: "json"
    });
}


//节点操作(查看、编辑、删除)
function ProjectNodeOperate(obj) {
    if (obj.type === 'add') {
        //查看项目
        if ((projectinfoaddlayerindex == null) && (projectinfoeditlayerindex == null)) {
           PCloudProjectInfo(obj.data.id, "view");
        }
        else {
            layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                CloseProjectinfoLayer();
                PCloudProjectInfo(obj.data.id, "view");
                layer.close(index);
            });
        }      
    }
    else if (obj.type === 'update') {
        //编辑项目
        if ((projectinfoaddlayerindex == null) && (projectinfoviewlayerindex == null)) {
            PCloudProjectInfo(obj.data.id, "edit");
        }
        else {
            layer.confirm('是否打开新的模块?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
                CloseProjectinfoLayer();
                //ProjectInfo(obj.data.id, "edit");
                layer.close(index);
            });
        }
    }
}



//项目信息
function PCloudProjectInfo(id, style) {
    if (style == "view") {
        //查看项目信息
        if (projectinfoviewlayerindex == null) {
            projectinfoviewlayerindex = layer.open({
                type: 1
                , title: ['时序数据信息', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['700px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , anim: 0
                , maxmin: true
                , moveOut: true
                , content:'<!--查看项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px">    <ul class="layui-tab-title">        <li class="layui-this">基本信息</li>        <li>工程设置</li>    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--基本信息-->        <div class="layui-tab-item layui-show">            <form class="layui-form" style="margin-top:0px" lay-filter="projectinfoviewform">                <div class="layui-form-item" >                    <label class="layui-form-label" style="margin-top:10px">所属项目</label>                    <div class="layui-input-block">                        <input type="text" name="xmmc" class="layui-input" readonly="readonly" />                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">采集人员</label>                                <div class="layui-input-block">                                    <input type="text" name="cjry" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目区域</label>                                <div class="layui-input-block">                                    <input type="text" name="xmqy" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">中心经度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxjd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">中心纬度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxwd" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md8">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">坐标系统</label>                                <div class="layui-input-block">                                    <input type="text" name="kjck" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">数据格式</label>                                <div class="layui-input-block">                                    <input type="text" name="sjgs" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集设备</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsb" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">数据类型</label>                                <div class="layui-input-block">                                    <input type="text" name="sjlx" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">点云数目</label>                                <div class="layui-input-block">                                    <input type="text" name="dysm" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row" >                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">目前流程</label>                                <div class="layui-input-block">                                    <input type="text" name="mqlc" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">采集周期</label>                                <div class="layui-input-block">                                    <input type="text" name="cjzq" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">备注</label>                    <div class="layui-input-block">                        <input type="text" name="bz" class="layui-input" readonly="readonly" />                    </div>                </div>            </form>        </div>        <!--工程设置-->        <div class="layui-tab-item">            <form class="layui-form" style="margin-top:0px" lay-filter="datasetupviewform">                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>统计滤波参数设置</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">邻近点数</label>                                <div class="layui-input-block">                                    <input type="text" name="meank" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">离群点阈值</label>                                <div class="layui-input-block">                                    <input type="text" name="StddevMulThresh" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">设置时间</label>                    <div class="layui-input-block">                        <input type="text" name="szsj" class="layui-input" readonly="readonly" />                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>FHFP-ICP配置参数</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">创建时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">VoexlGri体素大小</label>                                <div class="layui-input-block">                                    <input type="text" name="leafsize" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">最大迭代次数</label>                                <div class="layui-input-block">                                    <input type="text" name="maxIteration" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">计算表面法线/FPFH搜索范围半径</label>                                <div class="layui-input-block">                                    <input type="text" name="radiusSearch" class="layui-input" readonly="readonly" />                                </div>                            </div>                        </div>                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>提取点云边界方式</legend>                </fieldset>                <div class="layui-form-item">                    <label class="layui-form-label">边界方法</label>                    <div class="layui-input-block">                        <input type="text" name="bjff" class="layui-input" readonly="readonly" />                    </div>                </div>            </form>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);
                    form.render();
                }
                , end: function () {
                    projectinfoviewlayerindex = null;
                }
            });
        }

        //项目信息
        $.ajax({
            url: servicesurl + "/api/PointCloudProject/GetPointCloudDataInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                if (data == "") {
                    layer.msg("无点云时序数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("projectinfoviewform", {
                        "xmmc": ""
                        , "cjry": ""
                        , "cjsj": ""
                        , "region": ""
                        , "zxjd": ""
                        , "zxwd": ""
                        , "kjck": ""
                        , "sjgs": ""
                        , "cjsb": ""
                        , "sjlx": ""
                        , "dysm": ""
                        , "mqlc": ""
                        , "cjzq": ""   
                        , "bz": ""
                    });
                }
                else {
                    //项目信息
                    var projectinfo = JSON.parse(data);

                    form.val("projectinfoviewform", {
                        "xmmc": projectinfo.XMMC
                        , "cjry": projectinfo.CJRY
                        , "cjsj": projectinfo.CJSJ
                        , "xmqy": projectinfo.Regionid
                        , "zxjd": projectinfo.ZXJD
                        , "zxwd": projectinfo.ZXWD
                        , "kjck": projectinfo.SRID
                        , "sjgs": projectinfo.SJGSid
                        , "cjsb": projectinfo.Deviceid
                        , "sjlx": projectinfo.Typeid
                        , "dysm": projectinfo.DYSM
                        , "mqlc": projectinfo.MQLCid
                        , "cjzq": projectinfo.CJZQ
                        , "bz": projectinfo.BZ
                    });
                }
            }, datatype: "json"
        });

        //工程设置信息
        $.ajax({
            url: servicesurl + "/api/PointCloudProjectSetUp/GetPointCloudSetupInfo", type: "get", data: { "id": id, "cookie": document.cookie },
            success: function (data) {
                if (data == "") {
                    layer.msg("无工程设置数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                    //清除项目信息
                    form.val("datasetupviewform", {
                        "meank": ""
                        , "StddevMulThresh": ""
                        , "szsj": ""
                        , "cjsj": ""
                        , "leafsize": ""
                        , "maxIteration": ""
                        , "radiusSearch": ""
                        , "bjff": ""
                    });
                }
                else {
                    //项目信息
                    var setupinfo = JSON.parse(data);

                    form.val("datasetupviewform", {
                        "meank": setupinfo.StatisticoutlierPara.Meank
                        , "StddevMulThresh": setupinfo.StatisticoutlierPara.StddevMulThresh
                        , "szsj": setupinfo.StatisticoutlierPara.CJSJ
                        , "cjsj": setupinfo.ICPPara.CJSJ
                        , "leafsize": setupinfo.ICPPara.LeafSize
                        , "maxIteration": setupinfo.ICPPara.MaxIteration
                        , "radiusSearch": setupinfo.ICPPara.RadiusSearch
                        , "bjff": setupinfo.ShapePara.BJFF
                    });
                }
            }, datatype: "json"
        });


    }
    else if (style == "edit") {
        //编辑项目
        if (projectinfoeditlayerindex == null) {
            projectinfoeditlayerindex = layer.open({
                type: 1
                , title: ['编辑项目', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
                , area: ['900px', '800px']
                , shade: 0
                , offset: 'auto'
                , closeBtn: 1
                , maxmin: true
                , moveOut: true
                , content:'<!--编辑项目--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:1px 0px">    <ul class="layui-tab-title">        <li class="layui-this">基本信息</li>        <li>工程设置</li>    </ul>    <div class="layui-tab-content" style="margin:0px 0px">        <!--基本信息-->        <div class="layui-tab-item layui-show">            <form class="layui-form" style="margin-top:0px" lay-filter="pointcloudprojectedit">                <div class="layui-form-item">                    <label class="layui-form-label" style="margin-top:10px">所属项目</label>                    <div class="layui-input-block">                        <input type="text" name="xmmc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">采集人员</label>                                <div class="layui-input-block">                                    <input type="text" name="cjry" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">项目区域</label>                                <div class="layui-input-block">                                    <input type="text" name="xmqy" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">中心经度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxjd" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">中心纬度</label>                                <div class="layui-input-block">                                    <input type="text" name="zxwd" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md8">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">坐标系统</label>                                <div class="layui-input-block">                                    <input type="text" name="kjck" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">数据格式</label>                                <div class="layui-input-block">                                    <input type="text" name="sjgs" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md4">                            <div class="grid-demo">                                <label class="layui-form-label">采集设备</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsb" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">数据类型</label>                                <div class="layui-input-block">                                    <input type="text" name="sjlx" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md4">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">点云数目</label>                                <div class="layui-input-block">                                    <input type="text" name="dysm" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">目前流程</label>                                <div class="layui-input-block">                                    <input type="text" name="mqlc" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">采集周期</label>                                <div class="layui-input-block">                                    <input type="text" name="cjzq" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">备注</label>                    <div class="layui-input-block">                        <input type="text" name="bz" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <div class="layui-form-item" style="margin-top:5px">                    <div style="position:absolute;right:5px;">                        <button type="submit" class="layui-btn" lay-submit="" lay-filter="editpointcloudprojectinfosubmit" style="width:120px">保存</button>                    </div>                </div>            </form>        </div>        <!--工程设置-->        <div class="layui-tab-item">            <form class="layui-form" style="margin-top:0px" lay-filter="pointcloudprojectsetedit">                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>统计滤波参数设置</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">邻近点数</label>                                <div class="layui-input-block">                                    <input type="text" name="meank" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">离群点阈值</label>                                <div class="layui-input-block">                                    <input type="text" name="StddevMulThresh" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <label class="layui-form-label">设置时间</label>                    <div class="layui-input-block">                        <input type="text" name="szsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>FHFP-ICP配置参数</legend>                </fieldset>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">创建时间</label>                                <div class="layui-input-block">                                    <input type="text" name="cjsj" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">VoexlGrid体素大小</label>                                <div class="layui-input-block">                                    <input type="text" name="leafsize" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <div class="layui-form-item">                    <div class="layui-row">                        <div class="layui-col-md6">                            <div class="grid-demo grid-demo-bg1">                                <label class="layui-form-label">最大迭代次数</label>                                <div class="layui-input-block">                                    <input type="text" name="maxIteration" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                        <div class="layui-col-md6">                            <div class="grid-demo">                                <label class="layui-form-label">表面法线/FPFH搜索范围半径</label>                                <div class="layui-input-block">                                    <input type="text" name="radiusSearch" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                                </div>                            </div>                        </div>                    </div>                </div>                <fieldset class="layui-elem-field layui-field-title" style="margin-top: 10px;">                    <legend>提取点云边界方式</legend>                </fieldset>                <div class="layui-form-item">                    <label class="layui-form-label">边界方法</label>                    <div class="layui-input-block">                        <input type="text" name="bjff" autocomplete="off" placeholder="请输入" lay-verify="required" class="layui-input" />                    </div>                </div>            </form>        </div>    </div></div>'
                , zIndex: layer.zIndex
                , success: function (layero) {
                    layer.setTop(layero);

                    //项目信息
                    $.ajax({
                        url: servicesurl + "/api/PointCloudProject/GetPointCloudDataInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无点云时序数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                //清除项目信息
                                form.val("projectinfoviewform", {
                                    "xmmc": ""
                                    , "cjry": ""
                                    , "cjsj": ""
                                    , "region": ""
                                    , "zxjd": ""
                                    , "zxwd": ""
                                    , "kjck": ""
                                    , "sjgs": ""
                                    , "cjsb": ""
                                    , "sjlx": ""
                                    , "dysm": ""
                                    , "mqlc": ""
                                    , "cjzq": ""
                                    , "bz": ""
                                });
                            }
                            else {
                                //项目信息
                                var projectinfo = JSON.parse(data);
                            
                                form.val("pointcloudprojectedit", {
                                    "xmmc": projectinfo.XMMC
                                    , "cjry": projectinfo.CJRY
                                    , "cjsj": projectinfo.CJSJ
                                    , "xmqy": projectinfo.Regionid
                                    , "zxjd": projectinfo.ZXJD
                                    , "zxwd": projectinfo.ZXWD
                                    , "kjck": projectinfo.SRID
                                    , "sjgs": projectinfo.SJGSid
                                    , "cjsb": projectinfo.Deviceid
                                    , "sjlx": projectinfo.Typeid
                                    , "dysm": projectinfo.DYSM
                                    , "mqlc": projectinfo.MQLCid
                                    , "cjzq": projectinfo.CJZQ
                                    , "bz": projectinfo.BZ
                                });

                            }
                        }, datatype: "json"
                    });

                    ////更新项目信息
                    form.on('submit(editpointcloudprojectinfosubmit)', function (data) {
                        data.field.id = id;
                        data.field.cookie = document.cookie;

                        $.ajax({
                            url: servicesurl + "/api/PointCloudProject/UpdatePointCloudProjectInfo", type: "put", data: data.field,
                            success: function (result) {
                                layer.msg(result, { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                            }, datatype: "json"
                        });
                        return false;
                    });

                    //工程设置信息
                    $.ajax({
                        url: servicesurl + "/api/PointCloudProjectSetUp/GetPointCloudSetupInfo", type: "get", data: { "id": id, "cookie": document.cookie },
                        success: function (data) {
                            if (data == "") {
                                layer.msg("无工程设置数据信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
                                //清除项目信息
                                form.val("pointcloudprojectsetedit", {
                                    "meank": ""
                                    , "StddevMulThresh": ""
                                    , "szsj": ""
                                    , "cjsj": ""
                                    , "leafsize": ""
                                    , "maxIteration": ""
                                    , "radiusSearch": ""
                                    , "bjff": ""
                                });
                            }
                            else {
                                //项目信息
                                var setupinfo = JSON.parse(data);

                                form.val("pointcloudprojectsetedit", {
                                    "meank": setupinfo.StatisticoutlierPara.Meank
                                    , "StddevMulThresh": setupinfo.StatisticoutlierPara.StddevMulThresh
                                    , "szsj": setupinfo.StatisticoutlierPara.CJSJ
                                    , "cjsj": setupinfo.ICPPara.CJSJ
                                    , "leafsize": setupinfo.ICPPara.LeafSize
                                    , "maxIteration": setupinfo.ICPPara.MaxIteration
                                    , "radiusSearch": setupinfo.ICPPara.RadiusSearch
                                    , "bjff": setupinfo.ShapePara.BJFF
                                });
                            }
                        }, datatype: "json"
                    });

                }
                , end: function () {
                    projectinfoeditlayerindex = null;
                }
            });
        }
    }
};

//上传文件
function UploadData() {
    layer.open({
        type: 1
        , title: ['上传点云数据', 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['800px', '400px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content:'<!--上传数据--><form class="layui-form" style="margin-top:5px;margin-right:5px;" lay-filter="uploaddataform">    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">上传项目</label>                    <div class="layui-input-block">                        <select id="projectid" name="project">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>                     <div class="layui-col-md6">                <div class="grid-demo">                    <label class="layui-form-label">项目区域</label>                    <div class="layui-input-block">                        <select id="regionid" name="region" lay-filter="regionidfilter">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>                </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6" style="width:50%">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">文件名</label>                    <div class="layui-input-block">                        <input type="text" name="filename" lay-verify="required|number" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <div class="layui-inline">                        <label class="layui-form-label">采集时间</label>                        <div class="layui-input-inline" style="width:250px;">                            <input type="text" id="cjsjid" name="cjsj" lay-verify="date" placeholder="YYYY-MM-DD" autocomplete="off" class="layui-input" />                        </div>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <div class="layui-row">            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">采集人员</label>                    <div class="layui-input-block">                        <input type="text" name="people" lay-verify="required" autocomplete="off" placeholder="请输入" class="layui-input" />                    </div>                </div>            </div>            <div class="layui-col-md6">                <div class="grid-demo grid-demo-bg1">                    <label class="layui-form-label">数据类型</label>                    <div class="layui-input-block">                        <select id="typeid" name="type">                            <option value="">请选择</option>                        </select>                    </div>                </div>            </div>        </div>    </div>    <div class="layui-form-item">        <label class="layui-form-label">备注</label>        <div class="layui-input-block">            <input type="text" name="bz" autocomplete="off" placeholder="请输入" class="layui-input" />        </div>    </div>    <div class="layui-form-item" style="margin-top:30px">        <div style="position:absolute;left:50px;">            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="selectdata" style="width:100px">选择文件</button>            <button type="button" class="layui-btn layui-btn-primary layui-btn-sm" id="uploaddata" style="width:100px">上传</button>        </div>    </div></form>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            if (projectlist.length > 0) {
                for (var i in projectlist) {
                    document.getElementById("projectid").innerHTML += '<option value="' + projectlist[i].value + '">' + projectlist[i].name + '</option>';
                }
            }

            //渲染开始时间&结束时间
            date.render({
                elem: '#cjsjid'
            });
            form.render();
            form.render('select');

            // 联动
            layui.use('form', function () {

                form.on('select(regionidfilter)', function (data) {
                    getregion(data);
                });
            });



            layui.use('upload', function (obj) {
            var $ = layui.jquery , upload = layui.upload;

                //选完文件后不自动上传
                upload.render({
                    elem: '#selectdata'
                    , url: servicesurl + "/api/PointCloudUpload/UploadData" //改成您自己的上传接口
                    , auto: false
                    , accept: 'file'                  //上传文件类型
                    , bindAction: '#uploaddata'
                    , before: function () {//携带额外的数据
                        this.data = {
                            "dataid": 1,
                            "filename": '1-2010'
                        }
                    }
                    , done: function (res) {
                        if (res.code == 1) {
                            layer.msg('点云上传成功');
                        }
                        else {
                            layer.msg('上传失败，请重试！！！');
                        }
                    }, datatype: "json"
                });
            });     

        }
    });
}
// 获取项目区域
function getregion(data) {
    var params = {
        buildingId: data.value
    }
    //检查项目添加到下拉框中
    $.ajax({
        url: servicesurl + "/api/PointCloudParameter/GetPointCloudRegion",
        type: "get",
        dataType: 'json',
        data: { "projectid": params.buildingId },
        success: function (data) {
            $("#regionid").empty();//清空下拉框的值
            $.each(data, function (index, item) {
                $('#regionid').append(new Option(item.name, item.id));// 下拉菜单里添加元素
            });
            layui.form.render("select");//重新渲染 固定写法
        }
    });
};

//创建项目
$("#projectadd").on("click", function () {
    //创建项目
    if (((projectinfoviewlayerindex == null) && (projectinfoeditlayerindex == null))) {
        //ProjectInfo(null, "add");
    }
    else {
        layer.confirm('是否打开新项目?', { icon: 3, title: '提示', zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } }, function (index) {
            CloseProjectinfoLayer();
            //ProjectInfo(null, "add");
            layer.close(index);
        });
    }
});

//上传数据
$("#selectpcdata").on("click", function () {
    UploadData();
});

//新增项目提示
$("#projectadd").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('创建项目', '#projectadd', {
            tips: [2, '#78BA32']
        });
    }
});
$("#projectadd").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

//上传文件提示
$("#startupload").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('上传点云文件', '#startupload', {
            tips: [2, '#78BA32']
        });
    }
});
$("#startupload").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

//上传提示
$("#selectpcdata").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('上传', '#selectpcdata', {
            tips: [2, '#78BA32']
        });
    }
});
$("#selectpcdata").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});
