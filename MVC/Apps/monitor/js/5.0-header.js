//提示
$("#noticebtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('消息', '#noticebtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#noticebtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#setbtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('设置', '#setbtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#setbtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});

$("#exitbtn").on("mouseenter", function () {
    if (tipslayer == -1) {
        tipslayer = layer.tips('退出', '#exitbtn', {
            tips: [3, '#78BA32']
        });
    }
});
$("#exitbtn").on("mouseleave", function () {
    if (tipslayer != -1) {
        layer.close(tipslayer);
        tipslayer = -1;
    }
});


//消息
$("#noticebtn").on("click", function () {
    var noticelayerindex = layer.open({
        type: 1
        , title: ['消息', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['500px', '500px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<p>敬请期待……</p>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
        }
    });

});

//设置
$("#setbtn").on("click", function () {
    var setlayerindex = layer.open({
        type: 1
        , title: ['设置', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
        , area: ['500px', '500px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: true
        , moveOut: true
        , content: '<p>敬请期待……</p>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            //置顶
            layer.setTop(layero);
        }
    });


});