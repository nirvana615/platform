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
    public class FlzDataController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(FlzDataController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();

        /// <summary>
        /// 新建项目
        /// </summary>
        /// <returns></returns>
        [HttpPost]
        public string AddFlzPoint()
        {
            #region 参数
            string projectId = HttpContext.Current.Request.Form["projectId"];
            string position = HttpContext.Current.Request.Form["position"];
            string type = HttpContext.Current.Request.Form["type"];
            string name = HttpContext.Current.Request.Form["name"];
            string remarks = HttpContext.Current.Request.Form["remarks"];
            string src = HttpContext.Current.Request.Form["src"];
           
            #endregion

            #region 解析验证用户
            User user = null;
            COM.CookieHelper.CookieResult cookieResult = ManageHelper.ValidateCookie(pgsqlConnection, HttpContext.Current.Request.Form["cookie"], ref user);
            #endregion

            if (cookieResult == COM.CookieHelper.CookieResult.SuccessCookkie)
            {
                if (user == null)
                {
                    return "用户为空！";
                }

                if (!string.IsNullOrEmpty(projectId)
                    && !string.IsNullOrEmpty(position)
                    && !string.IsNullOrEmpty(type)
                    && !string.IsNullOrEmpty(name)
                    && !string.IsNullOrEmpty(remarks))
                {
                    
                    if (true)
                    {
                        string value = "("
                        + projectId + ","
                        + SQLHelper.UpdateString(position) + ","
                        + SQLHelper.UpdateString(type) + ","
                        + SQLHelper.UpdateString(name) + ","
                        + SQLHelper.UpdateString(remarks)
                        + ")";


                        int id = PostgresqlHelper.InsertDataReturnID(pgsqlConnection, "INSERT INTO flz_data_point (project_id,position,type,name,remarks) VALUES" + value);
                        if (id != -1)
                        {
                            if (!string.IsNullOrEmpty(src))
                            {
                                PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE flz_data_point SET src={0} WHERE id={1}", src, id));
                            }
                            return "保存成功！";
                        }
                        else
                        {
                            return "保存失败！";
                        }
                    }
                    
                }
                else
                {
                    return "参数不全！";
                }
            }
            else
            {
                return "验证用户失败！";
            }
        }




    }
}
