/*
 * 异步获取系统参数
 */

var srids = [];                                     //坐标系
var xjxzqs = [];                                    //县级行政区
var projectlist = [];                               //点云项目列表
var datatype = [];                                  //数据格式
var selectprojectid;                                 //选中项目id


$.ajax({
    url: servicesurl + "/api/PointCloudParameter/GetPointCloudProject", type: "get",
    success: function (data) {
        var projectlistdata = JSON.parse(data);
        for (var i in projectlistdata) {
            var projecttemp = new Object;
            projecttemp.name = projectlistdata[i].XMMC;
            projecttemp.value = projectlistdata[i].Id;
            projectlist.push(projecttemp);
        }
    }, datatype: "json"
});