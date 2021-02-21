//工具栏
util.fixbar({
    bar1: true
    , bar2: true
    , bar3: true
    , bar4: true
    , bar5: true
    , bar6: true
    , bar7: true
    , bar8: true
    , bar9: false
    , css: { right: 17, top: 401 }
    , bgcolor: '#393D49'
    , click: function (type) {
        if (type === 'bar1') {
            //图层列表
            LoadLayerListLayer(currentprojectid);
        } else if (type === 'bar2') {
            //设备管理
            LoadAutoDeviceLayer(currentprojectid);
        }
        else if (type === 'bar3') {
            //数据可视化
            LoadAutoDataLayer(currentprojectid);
        }
        else if (type === 'bar4') {
            //综合分析
            LoadAnalysisLayer(currentprojectid);
        }
        else if (type === 'bar5') {
            //预警分析
            LoadWarningLayer(currentprojectid, currentprojectdisastertype);
        }
        else if (type === 'bar6') {
            //测量
            LoadMeasureLayer();
        }
        else if (type === 'bar7') {
            //绘制
            LoadDrawLayer();
        }
        else if (type === 'bar8') {
            //本地工具
            LoadLocalToolLayer();
        }
        else if (type === 'bar9') {
            layer.msg("扩展", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });
        }


    }
});


//提示
$("#utilbar1").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('图层列表', '#utilbar1', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar1").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar2").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('设备管理', '#utilbar2', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar2").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar3").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('数据可视化', '#utilbar3', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar3").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar4").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('综合分析', '#utilbar4', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar4").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar5").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('预警分析', '#utilbar5', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar5").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar6").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('测量', '#utilbar6', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar6").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar7").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('绘图', '#utilbar7', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar7").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#utilbar8").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('工具', '#utilbar8', {
            tips: [4, '#78BA32']
        });
    }
});
$("#utilbar8").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});