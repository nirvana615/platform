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
    /// 消落带项目
    /// </summary>
    public class FlzController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 获取当前用户所有项目
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpGet]
        public string GetUserFlzProjectList(string cookie)
        {
            string userbsms = string.Empty;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, cookie, ref userbsms);

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                //有效cookie
                List<FlzProject> projectList = new List<FlzProject>();
                string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM flz_project  ORDER BY id ASC"));
                if (string.IsNullOrEmpty(data))
                {
                    //无项目信息
                    return string.Empty;
                }

                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length < 1)
                {
                    //无项目信息
                    return string.Empty;
                }

                for (int i = 0; i < rows.Length; i++)
                {
                    FlzProject project = ParseFlzoneHelper.ParseProject(rows[i]);
                    if (project != null)
                    {
                        projectList.Add(project);
                    }
                }

                if (projectList.Count > 0)
                {
                    return JsonHelper.ToJson(projectList);
                }
                else
                {
                    return string.Empty;
                }
            }
            else
            {
                //无效cookie
                return string.Empty;
            }
        }







    }
}
