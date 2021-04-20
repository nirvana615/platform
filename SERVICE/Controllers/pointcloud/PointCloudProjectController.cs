using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using COM;
using DAL;
using MODEL;

namespace SERVICE.Controllers
{
    /// <summary>
    /// 3D 点云项目
    /// </summary>
    public class PointCloudProjectController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取全部项目（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPCloudProjectList()
        {
            List<PCloudProject> projectList = new List<PCloudProject>();
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project  ORDER BY id ASC"));
            if (string.IsNullOrEmpty(data))
            {
                return string.Empty;
            }

            string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
            if (rows.Length < 1)
            {
                return string.Empty;
            }

            for (int i = 0; i < rows.Length; i++)
            {
                PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(rows[i]);
                if (project != null)
                {
                    projectList.Add(project);
                }
            }

            if (projectList.Count > 0)
            {
                Layer layer = new Layer();
                layer.PCloudProjectList = projectList;
                List<PCDataLayer> PCDataLayertemp = new List<PCDataLayer>();
                for (int i = 0; i < projectList.Count; i++)
                {
                    PCDataLayer PCDataLayer = new PCDataLayer();
                    PCDataLayer.PCloudDataList = new List<PCloudData>();
                    data = string.Empty;
                    data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_data WHERE projectid={0}", projectList[i].Id));
                    string[] row = data.Split(new char[] { COM.ConstHelper.rowSplit });
                    if (!string.IsNullOrEmpty(data))
                    {
                        PCloudData pCloudData = new PCloudData();
                        for (int j = 0; j < row.Length; j++)
                        {
                            pCloudData = ParsePointCloudHelper.ParsePCloudData(row[j]);
                            PCDataLayer.PCloudDataList.Add(pCloudData);
                        }
                        PCDataLayertemp.Add(PCDataLayer);
                    }
                }

                layer.PCDataLayer = PCDataLayertemp;

                return JsonHelper.ToJson(layer);
            }
            else
            {
                return string.Empty;
            }
        }

        /// <summary>
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetPointCloudDataInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                PCloudData pCloudData = ParsePointCloudHelper.ParsePCloudData(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM pointcloud_data WHERE id={0}",id)));
                if (pCloudData != null)
                {
                    if (!string.IsNullOrEmpty(pCloudData.SRID.ToString()))
                    {
                        Coordinate coordinate = ParseManageHelper.ParseCoordinate(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_coordinate WHERE srid={0}", pCloudData.SRID)));
                        if (coordinate != null)
                        {
                            pCloudData.SRID = coordinate.NAME;
                        }
                    }
                    if (!string.IsNullOrEmpty(pCloudData.ProjectId.ToString()))
                    {
                        PCloudProject project = ParsePointCloudHelper.ParsePCloudProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM pointcloud_project WHERE id={0}", pCloudData.ProjectId)));
                        if (project != null)
                        {
                            pCloudData.XMMC = project.XMMC;
                            pCloudData.ZXJD = project.ZXJD.ToString();
                            pCloudData.ZXWD = project.ZXWD.ToString();
                        }
                    }

                    pCloudData.projectSet = new ProjectSetUp();
                    pCloudData.projectSet.StatisticoutlierPara = ParsePointCloudHelper.ParseStatisticoutlierPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_statisticoutlier_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.ICPPara = ParsePointCloudHelper.ParseICPPara(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_icp_para  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.OverlapPara = ParsePointCloudHelper.ParseOverlap(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_overlap  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));
                    pCloudData.projectSet.ShapePara = ParsePointCloudHelper.ParseShape(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT   * FROM pointcloud_shape  WHERE dataid ={0} ORDER BY cjsj DESC LIMIT 1", id)));



                    return JsonHelper.ToJson(pCloudData);
                }
            }
            return string.Empty;
        }





    }
}
