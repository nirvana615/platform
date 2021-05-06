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


using System.Web.UI;
using System.Web.UI.WebControls;

namespace SERVICE.Controllers
{
    public class PointCloudUploadController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(PointCloudProjectController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        /// <summary>
        /// 获取时序数据信息（后台）
        /// </summary>
        /// <param name="cookie"></param>
        /// <returns></returns>
        [HttpPost]

        public string   UploadData()
        {
            string dataid = HttpContext.Current.Request.Form["dataid"];
            PCloudData pCloudData =new PCloudData();
            HttpFileCollection uploadFiles = System.Web.HttpContext.Current.Request.Files;
            for (int i = 0; i < uploadFiles.Count; i++)
            {
                //逐个获取上传文件
                System.Web.HttpPostedFile postedFile = uploadFiles[i];
                string savePath = postedFile.FileName;//完整的路径
                string fileName = System.IO.Path.GetFileName(postedFile.FileName); //获取到名称
                string fileExtension = System.IO.Path.GetExtension(fileName);  //文件的扩展名称 
                if (uploadFiles[i].ContentLength > 0)
                    uploadFiles[i].SaveAs(HttpContext.Current.Server.MapPath("~/Data/SurPointCloud/") + fileName);// +".txt");
            }
            return JsonHelper.ToJson(pCloudData); 
        }
    }
}
