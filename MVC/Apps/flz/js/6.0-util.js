//工具栏
util.fixbar({
    bar1: '<li class="layui-icon" lay-type="bar1" id="utilbar1" style="margin:5px;border-radius:5px;background-color:#393D49"><svg t="1582978582932" class="icon" style="position:relative;top:5px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2324" width="40" height="40"><path d="M512.011289 35.773961l440.4295 220.231683-440.4295 220.231684L71.547922 256.016933l440.463367-220.242972m0-35.773961L0 256.016933l512.011289 255.994356 511.977422-255.994356L512.011289 0z" p-id="2325" fill="#ffffff"></path><path d="M892.226745 417.885922l60.214044 30.107023-440.4295 220.231683L71.547922 447.992945l60.225333-30.107023-35.785249-17.892625L0 447.992945l512.011289 256.016933 511.966134-256.016933-95.976717-47.999648z" p-id="2326" fill="#ffffff"></path><path d="M892.226745 577.892272l60.214044 30.107022-440.4295 220.220395L71.547922 607.999294l60.225333-30.107022-35.785249-17.892625L0 607.999294l512.011289 256.005645 511.966134-256.005645-95.976717-47.999647z" p-id="2327" fill="#ffffff"></path><path d="M892.226745 737.876045l60.214044 30.107022-440.4295 220.220395L71.547922 767.983067l60.225333-30.107022-35.785249-17.892625L0 767.983067l512.011289 255.994356 511.966134-255.994356-95.976717-47.999647z" p-id="2328" fill="#ffffff"></path></svg></li>'
    
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

