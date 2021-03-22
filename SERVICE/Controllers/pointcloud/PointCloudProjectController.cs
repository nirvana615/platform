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
                            pCloudData = ParsePointCloudHelper.ParsePCloudDataLayer(row[j]);
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
    }
}
