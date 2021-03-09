using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

using COM;
using DAL;
using MODEL;
using CC;

namespace SERVICE.Controllers
{
    public class FlzLayerController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzLayerController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取图层信息
        /// </summary>
        /// <param name="id">项目id</param>
        /// <param name="cookie">用户信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetLayerInfo(int id, string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            
                FlzProject project = ParseFlzoneHelper.ParseProject(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT * FROM flz_project WHERE id={0}  AND ztm={1}", id,  (int)MODEL.Enum.State.InUse)));
                if (project != null)
                {
                    LayerList layers = new LayerList();

                    layers.Id = project.Id;



                    ProjectLayer projectLayer = new ProjectLayer();
                    projectLayer.Title = "项目";
                    #region
                    if ((project.ZXJD != null) && (project.ZXWD != null))
                    {
                        PointBL bl = new PointBL(Convert.ToDouble(project.ZXWD), Convert.ToDouble(project.ZXJD));
                        projectLayer.CenterPoint = new CenterPoint
                        {
                            Title = "位置",
                            BL = bl,
                            Label = project.XMMC
                        };
                    }

                    //TODO
                    projectLayer.KJFW = null;
                    projectLayer.YXFW = null;

                    string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT a.* from survey_model a join map_project_survey b on a.id=b.surveyid where b.projectid={0} and b.type={1}", id,'5' ));
                    if (!string.IsNullOrEmpty(data))
                    {
                        SurModels surModels = new SurModels();
                        surModels.Title = "三维实景模型";

                        List<SurModel> surModelList = new List<SurModel>();
                        string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            SurModel surModel = ParseMonitorHelper.ParseSurModel(rows[i]);
                            surModelList.Add(surModel);
                        }

                        if (surModelList.Count > 0)
                        {
                            surModels.SurModelList = surModelList;
                        }

                        projectLayer.SurModels = surModels;
                    }

                    layers.ProjectLayer = projectLayer;
                    #endregion
                    return JsonHelper.ToJson(layers);

                }

          

            return "没有项目";
        }






















    }
}
