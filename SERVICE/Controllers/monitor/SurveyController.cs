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

namespace SERVICE.Controllers
{
    /// <summary>
    /// 测绘
    /// </summary>
    public class SurveyController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(SurveyController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取测绘信息
        /// </summary>
        /// <param name="id"></param>
        /// <param name="cookie">验证信息</param>
        /// <returns></returns>
        [HttpGet]
        public string GetSurveyInfo(int id, string cookie)
        {
            return string.Empty;
        }






    }
}
