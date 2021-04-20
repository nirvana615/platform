﻿

//查看灾害体信息
function DisasterInfoView(disaster) {
    //灾害体属性
    layer.open({
        type: 1
        , title: [disaster.zhtmc, 'font-weight:bold;font-size:large;font-family:Microsoft YaHei']
        , area: ['1200px', '685px']
        , shade: 0
        , offset: 'auto'
        , closeBtn: 1
        , maxmin: false
        , moveOut: true
        , content: '<!--灾害体属性--><div class="layui-tab layui-tab-brief" lay-filter="docDemoTabBrief" style="margin:0px 0px"><ul class="layui-tab-title"><li class="layui-this">基本信息</li><li>属性</li><li>环境</li><li>基本特征</li><li>危险性分析</li><li>危害分析</li><li>预警模型参数</li>       </ul><div class="layui-tab-content" style="margin:0px 0px"><!--基本信息--><div class="layui-tab-item layui-show"><form class="layui-form" style="margin-top:0px" lay-filter="disasterinfoviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体名称</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtmc" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体编号</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtbh" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zhtlx" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心经度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxjd" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">灾害体中心纬度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zxwd" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;padding-top:170px;">备注</label><div class="layui-input-block" style="margin-left:150px;"><textarea name="bz" class="layui-textarea" readonly="readonly" style="min-height:363px!important"></textarea></div></div></form></div><!--属性--><div id="disasterpropertyview" class="layui-tab-item"></div><!--环境--><div id="disasterenvironmentview" class="layui-tab-item"></div><!--基本特征--><div id="disasterfeatureview" class="layui-tab-item"></div><!--危险性分析--><div id="disasterdangerview" class="layui-tab-item"></div><!--危害分析--><div id="disasterharmview" class="layui-tab-item"></div><!--预警模型参数--><div id="disasterforecastview" class="layui-tab-item"></div></div></div>'
        , zIndex: layer.zIndex
        , success: function (layero) {
            layer.setTop(layero);

            //灾害体基本信息
            form.val("disasterinfoviewform", {
                "zhtmc": disaster.zhtmc
                , "zhtbh": disaster.zhtbh
                , "zhtlx": disaster.zhtlx
                , "zxjd": disaster.zxjd
                , "zxwd": disaster.zxwd
                , "bz": disaster.bz
            });

            if (disaster.zhtlx === "危岩崩塌") {
                document.getElementById("disasterpropertyview").innerHTML = '<!--崩塌（危岩体）属性--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallpropertyviewform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">运动形式</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="ydxs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btlx" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">控制结构面类型</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="kzjgmlx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">宏观稳定性评价</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="hgwdxpj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">活动状态</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="hdzt" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源扩展方式</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btykzfs" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">崩塌时间</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btsj" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">主崩方向(°)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zbfx" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源高程(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btygc" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大落差(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdlc" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">最大水平位移(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zdspwy" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">崩塌源宽度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btykd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btyhd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btymj" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">崩塌源体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="btytj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;">诱发因素</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="yfys" class="layui-input" readonly="readonly" /></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体平均厚度(m)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtpjhd" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">堆积体面积(㎡)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djtmj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">堆积体体积(m³)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="djttj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">规模等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="gmdj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">实体勾绘</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="stgh" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">确定性程度</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="qdxcd" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">灾情等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zqdj" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">险情等级</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="xqdj" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="width:120px;">死亡人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="swrs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁人数(人)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxrs" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">直接损失(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="zjss" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="width:120px;">威胁财产(万元)</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxcc" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:120px;padding-top:41px;">威胁对象</label><div class="layui-input-block" style="margin-left:150px;"><input type="text" name="wxdx" class="layui-input" readonly="readonly" style="height:105px;"/></div></div></form>';
                document.getElementById("disasterenvironmentview").innerHTML = '<!--崩塌（危岩体）环境--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallenvironmentviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">地形地貌</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dxdm" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">地层岩性、岩性组合</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="dcyxyxzh" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">斜坡结构与地质构造</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="xpjgdzgz" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">水文地质条件</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="swdztj" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:35px;">植被及土地利用</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="zbtdly" class="layui-textarea" readonly="readonly" style="min-height:90px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:42px;">人类工程活动</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="rlgchd" class="layui-textarea" readonly="readonly" style="min-height:104px!important"></textarea></div></div></form>';
                document.getElementById("disasterfeatureview").innerHTML = '<!--崩塌（危岩体）基本特征--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallfeatureviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌源区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btyq" class="layui-textarea" readonly="readonly" style="min-height:190px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌堆积体</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btdjt" class="layui-textarea" readonly="readonly" style="min-height:190px!important"></textarea></div></div><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:85px;">崩塌路径区</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="btljq" class="layui-textarea" readonly="readonly" style="min-height:189px!important"></textarea></div></div></form>';
                document.getElementById("disasterdangerview").innerHTML = '<!--崩塌（危岩体）危险性分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfalldangerviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:276px;">危险性分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="wxxfx" class="layui-textarea" readonly="readonly" style="min-height:578px!important"></textarea></div></div></form>';
                document.getElementById("disasterharmview").innerHTML = '<!--崩塌（危岩体）危害分析--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallharmviewform"><div class="layui-form-item"><label class="layui-form-label" style="width:130px;padding-top:276px;">危害分析</label><div class="layui-input-block" style="margin-left:160px;"><textarea name="whfx" class="layui-textarea" readonly="readonly" style="min-height:578px!important"></textarea></div></div></form>';
                document.getElementById("disasterforecastview").innerHTML = '<!--崩塌（危岩体）预警模型参数--><form class="layui-form" style="margin-top:0px" lay-filter="rockfallforecastviewform"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CType1" class="layui-input" readonly="readonly" /></div></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩破坏模式亚类</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CType2" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩顶部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_up" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩底部高程(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Alt_down" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体积(m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_vol" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩高度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_H" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩宽度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_W" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩厚度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Frame_Th" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩性</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Rock_char" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">崩塌方向(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="Coll_Dir" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩层产状(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OcofRS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体容重(KN/m³)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="UW" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">条块面积(m²)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SA" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体自重(KN/m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="OW" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IASS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面长度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="LSS" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FASS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">潜在滑面粘聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="CSS" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体泊松比</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="PRR" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">岩体弹性模量(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="EMR" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙倾角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="IAPC" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">偏心荷载弯矩</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_Mk" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">后缘裂隙深度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="VDPC" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩抗弯矩系数</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="MRC" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-row"><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体粘聚力标准值(kPa)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内聚力(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_C" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体内摩擦角标准值(°)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">底部软弱层内摩擦角(°)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_FA" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩体的抗拉强度(kPa)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="FLk" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-xs3"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:160px;">危岩单体底面宽度(m)</label><div class="layui-input-block" style="margin-left:170px;"><input type="text" name="SCP_DS" class="layui-input" readonly="readonly" /></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDPC" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCD" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩重心到倾覆点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCD" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙上端到未贯通段下端的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_H" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">后缘裂隙未贯通段下端到倾覆点之间的水平距离(m)</label>--><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">下部软弱层岩体潜在剪切段破裂面正应力(kPa)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_HD" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到潜在破坏面的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_AO" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩体重心到过潜在破坏面形心的铅垂距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_BO" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的水平距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="HDCR" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-form-item"><div class="layui-form-item"><div class="layui-row"><div class="layui-col-md6"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体重心距离底部旋转点的垂直距离(m)</label><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="VDCR" class="layui-input" readonly="readonly" /></div></div><div class="layui-col-md6"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">岩石抗剪强度(kPa)</label><!--<label class="layui-form-label" style="padding:9px 5px 9px 5px;width:350px;">危岩单体下部岩体的抗压强度(kPa)</label>--><div class="layui-input-block" style="margin-left:360px;"><input type="text" name="SCP_Ba" class="layui-input" readonly="readonly" /></div></div></div></div></div></div><div class="layui-row"><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">岩体单轴抗压强度(kPa)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="Rt" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo grid-demo-bg1"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:200px;">危岩体与基座接触面倾角(°)</label><div class="layui-input-block" style="margin-left:210px;"><input type="text" name="IAI" class="layui-input" readonly="readonly" /></div></div></div><div class="layui-col-md4"><div class="grid-demo"><label class="layui-form-label" style="padding:9px 5px 9px 5px;width:300px;">危岩单体重心到后缘裂缝底部的水平距离(m)</label><div class="layui-input-block" style="margin-left:310px;"><input type="text" name="SCP_e" class="layui-input" readonly="readonly" /></div></div></div></div></form>';
            }
            else if (disaster.zhtlx === "滑坡") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "泥石流") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地面塌陷") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地裂缝") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else if (disaster.zhtlx === "地面沉降") {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }
            else {
                document.getElementById("disasterpropertyview").innerHTML = '';
                document.getElementById("disasterenvironmentview").innerHTML = '';
                document.getElementById("disasterfeatureview").innerHTML = '';
                document.getElementById("disasterdangerview").innerHTML = '';
                document.getElementById("disasterharmview").innerHTML = '';
                document.getElementById("disasterforecastview").innerHTML = '';
            }

            //请求灾害体属性及预警模型参数
            $.ajax({
                url: servicesurl + "/api/Disaster/GetDisasterProperty", type: "get", data: { "id": disaster.id, "cookie": document.cookie },
                success: function (result) {
                    if (result === "") {
                        layer.msg("无灾害体属性信息！", { zIndex: layer.zIndex, success: function (layero) { layer.setTop(layero); } });

                        if (disaster.zhtlx === "危岩崩塌") {
                            form.val("rockfallpropertyviewform", {
                                "ydxs": ""
                                , "btlx": ""
                                , "kzjgmlx": ""
                                , "hgwdxpj": ""
                                , "hdzt": ""
                                , "btykzfs": ""
                                , "btsj": ""
                                , "zbfx": ""
                                , "btygc": ""
                                , "zdlc": ""
                                , "zdspwy": ""
                                , "btykd": ""
                                , "btyhd": ""
                                , "btymj": ""
                                , "btytj": ""
                                , "yfys": ""
                                , "djtpjhd": ""
                                , "djtmj": ""
                                , "djttj": ""
                                , "gmdj": ""
                                , "stgh": ""
                                , "qdxcd": ""
                                , "zqdj": ""
                                , "xqdj": ""
                                , "swrs": ""
                                , "wxrs": ""
                                , "zjss": ""
                                , "wxcc": ""
                                , "wxdx": ""
                            });
                            form.val("rockfallenvironmentviewform", {
                                "dxdm": ""
                                , "dcyxyxzh": ""
                                , "xpjgdzgz": ""
                                , "swdztj": ""
                                , "zbtdly": ""
                                , "rlgchd": ""
                            });
                            form.val("rockfallfeatureviewform", {
                                "btyq": ""
                                , "btdjt": ""
                                , "btljq": ""
                            });
                            form.val("rockfalldangerviewform", {
                                "wxxfx": ""
                            });
                            form.val("rockfallharmviewform", {
                                "whfx": ""
                            });
                            form.val("rockfallforecastviewform", {
                                "CType1": ""
                                , "CType2": ""
                                , "Alt_up": ""
                                , "Alt_down": ""
                                , "Rock_vol": ""
                                , "Frame_H": ""
                                , "Frame_W": ""
                                , "Frame_Th": ""
                                , "Rock_char": ""
                                , "Coll_Dir": ""
                                , "OcofRS": ""
                                , "UW": ""
                                , "SA": ""
                                , "OW": ""
                                , "IASS": ""
                                , "LSS": ""
                                , "FASS": ""
                                , "CSS": ""
                                , "PRR": ""
                                , "EMR": ""
                                , "IAPC": ""
                                , "SCP_Mk": ""
                                , "VDPC": ""
                                , "MRC": ""
                                , "SCP_C": ""
                                , "SCP_FA": ""
                                , "FLk": ""
                                , "SCP_DS": ""
                                , "HDPC": ""
                                , "HDCD": ""
                                , "VDCD": ""
                                , "SCP_H": ""
                                , "SCP_HD": ""
                                , "SCP_AO": ""
                                , "SCP_BO": ""
                                , "HDCR": ""
                                , "VDCR": ""
                                , "SCP_Ba": ""
                                , "IAI": ""
                                , "SCP_e": ""
                                , "Rt": ""
                            });
                        }
                        else if (disaster.zhtlx === "滑坡") {
                        }
                        else if (disaster.zhtlx === "泥石流") {
                        }
                        else if (disaster.zhtlx === "地面塌陷") {
                        }
                        else if (disaster.zhtlx === "地裂缝") {
                        }
                        else if (disaster.zhtlx === "地面沉降") {
                        }
                        else {
                        }
                    }
                    else {
                        var disasterproperty = JSON.parse(result);

                        if (disaster.zhtlx === "危岩崩塌") {
                            form.val("rockfallpropertyviewform", {
                                "ydxs": disasterproperty.RockfallProperty.YDXS
                                , "btlx": disasterproperty.RockfallProperty.BTLX
                                , "kzjgmlx": disasterproperty.RockfallProperty.KZJGMLX
                                , "hgwdxpj": disasterproperty.RockfallProperty.HGWDXPJ
                                , "hdzt": disasterproperty.RockfallProperty.HDZT
                                , "btykzfs": disasterproperty.RockfallProperty.BTYKZFS
                                , "btsj": disasterproperty.RockfallProperty.BTSJ
                                , "zbfx": disasterproperty.RockfallProperty.ZBFX
                                , "btygc": disasterproperty.RockfallProperty.BTYGC
                                , "zdlc": disasterproperty.RockfallProperty.ZDLC
                                , "zdspwy": disasterproperty.RockfallProperty.ZDSPWY
                                , "btykd": disasterproperty.RockfallProperty.BTYKD
                                , "btyhd": disasterproperty.RockfallProperty.BTYHD
                                , "btymj": disasterproperty.RockfallProperty.BTYMJ
                                , "btytj": disasterproperty.RockfallProperty.BTYTJ
                                , "yfys": disasterproperty.RockfallProperty.YFYS
                                , "djtpjhd": disasterproperty.RockfallProperty.DJTPJHD
                                , "djtmj": disasterproperty.RockfallProperty.DJTMJ
                                , "djttj": disasterproperty.RockfallProperty.DJTTJ
                                , "gmdj": disasterproperty.RockfallProperty.GMDJ
                                , "stgh": disasterproperty.RockfallProperty.STGH
                                , "qdxcd": disasterproperty.RockfallProperty.QDXCD
                                , "zqdj": disasterproperty.RockfallProperty.ZQDJ
                                , "xqdj": disasterproperty.RockfallProperty.XQDJ
                                , "swrs": disasterproperty.RockfallProperty.SWRS
                                , "wxrs": disasterproperty.RockfallProperty.WXRS
                                , "zjss": disasterproperty.RockfallProperty.ZJSS
                                , "wxcc": disasterproperty.RockfallProperty.WXCC
                                , "wxdx": disasterproperty.RockfallProperty.WXDX
                            });
                            form.val("rockfallenvironmentviewform", {
                                "dxdm": disasterproperty.RockfallProperty.DXDM
                                , "dcyxyxzh": disasterproperty.RockfallProperty.DCYXYXZH
                                , "xpjgdzgz": disasterproperty.RockfallProperty.XPJGDZGZ
                                , "swdztj": disasterproperty.RockfallProperty.SWDZTJ
                                , "zbtdly": disasterproperty.RockfallProperty.ZBTDLY
                                , "rlgchd": disasterproperty.RockfallProperty.RLGCHD
                            });
                            form.val("rockfallfeatureviewform", {
                                "btyq": disasterproperty.RockfallProperty.BTYQ
                                , "btdjt": disasterproperty.RockfallProperty.BTDJT
                                , "btljq": disasterproperty.RockfallProperty.BTLJQ
                            });
                            form.val("rockfalldangerviewform", {
                                "wxxfx": disasterproperty.RockfallProperty.WXXFX
                            });
                            form.val("rockfallharmviewform", {
                                "whfx": disasterproperty.RockfallProperty.WHFX
                            });
                            if (disasterproperty.RockfallWarning != null) {
                                form.val("rockfallforecastviewform", {
                                    "CType1": disasterproperty.RockfallWarning.CType1
                                    , "CType2": disasterproperty.RockfallWarning.CType2
                                    , "Alt_up": disasterproperty.RockfallWarning.Alt_up
                                    , "Alt_down": disasterproperty.RockfallWarning.Alt_down
                                    , "Rock_vol": disasterproperty.RockfallWarning.Rock_vol
                                    , "Frame_H": disasterproperty.RockfallWarning.Frame_H
                                    , "Frame_W": disasterproperty.RockfallWarning.Frame_W
                                    , "Frame_Th": disasterproperty.RockfallWarning.Frame_Th
                                    , "Rock_char": disasterproperty.RockfallWarning.Rock_char
                                    , "Coll_Dir": disasterproperty.RockfallWarning.Coll_Dir
                                    , "OcofRS": disasterproperty.RockfallWarning.OcofRS
                                    , "UW": disasterproperty.RockfallWarning.UW
                                    , "SA": disasterproperty.RockfallWarning.SA
                                    , "OW": disasterproperty.RockfallWarning.OW
                                    , "IASS": disasterproperty.RockfallWarning.IASS
                                    , "LSS": disasterproperty.RockfallWarning.LSS
                                    , "FASS": disasterproperty.RockfallWarning.FASS
                                    , "CSS": disasterproperty.RockfallWarning.CSS
                                    , "PRR": disasterproperty.RockfallWarning.PRR
                                    , "EMR": disasterproperty.RockfallWarning.EMR
                                    , "IAPC": disasterproperty.RockfallWarning.IAPC
                                    , "SCP_Mk": disasterproperty.RockfallWarning.SCP_Mk
                                    , "VDPC": disasterproperty.RockfallWarning.VDPC
                                    , "MRC": disasterproperty.RockfallWarning.MRC
                                    , "SCP_C": disasterproperty.RockfallWarning.SCP_C
                                    , "SCP_FA": disasterproperty.RockfallWarning.SCP_FA
                                    , "FLk": disasterproperty.RockfallWarning.FLk
                                    , "SCP_DS": disasterproperty.RockfallWarning.SCP_DS
                                    , "HDPC": disasterproperty.RockfallWarning.HDPC
                                    , "HDCD": disasterproperty.RockfallWarning.HDCD
                                    , "VDCD": disasterproperty.RockfallWarning.VDCD
                                    , "SCP_H": disasterproperty.RockfallWarning.SCP_H
                                    , "SCP_HD": disasterproperty.RockfallWarning.SCP_HD
                                    , "SCP_AO": disasterproperty.RockfallWarning.SCP_AO
                                    , "SCP_BO": disasterproperty.RockfallWarning.SCP_BO
                                    , "HDCR": disasterproperty.RockfallWarning.HDCR
                                    , "VDCR": disasterproperty.RockfallWarning.VDCR
                                    , "SCP_Ba": disasterproperty.RockfallWarning.SCP_Ba
                                    , "IAI": disasterproperty.RockfallWarning.IAI
                                    , "SCP_e": disasterproperty.RockfallWarning.SCP_e
                                    , "Rt": disasterproperty.RockfallWarning.Rt
                                });
                            }
                        }
                        else if (disaster.zhtlx === "滑坡") {
                        }
                        else if (disaster.zhtlx === "泥石流") {
                        }
                        else if (disaster.zhtlx === "地面塌陷") {
                        }
                        else if (disaster.zhtlx === "地裂缝") {
                        }
                        else if (disaster.zhtlx === "地面沉降") {
                        }
                        else {
                        }
                    }

                }, datatype: "json"
            });
        }
    });

};