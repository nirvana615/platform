//工具栏
util.fixbar({
    bar1: true
    , css: { right: 80, top: 76, height: 60 }
    , bgcolor: '#393D49'
    , click: function (type) {
        if (type === 'bar1') {
            //图层列表
            LoadLayerListLayer(currentprojectid);
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

