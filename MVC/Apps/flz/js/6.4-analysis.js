//分析widget
function LoadAnalysisLayer(obj) {


    var analysislayerindex = layer.open({
        type: 1
        , title: ['分析', 'font-weight:bold;font-size:large;font-family:	Microsoft YaHei']
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