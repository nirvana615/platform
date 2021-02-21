using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace MVC.Controllers
{
    public class BaseController : Controller
    {
        protected override void OnActionExecuted(ActionExecutedContext filterContext)
        {
            //服务URL
            ViewBag.ServicesURL = ConfigurationManager.AppSettings["ServicesURL"] != null ? ConfigurationManager.AppSettings["ServicesURL"].ToString() : "";
        }
    }
}