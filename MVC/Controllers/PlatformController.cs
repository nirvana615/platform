using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;

using COM;
using MODEL;

namespace MVC.Controllers
{
    public class PlatformController : Controller
    {
       private static Logger logger = Logger.CreateLogger(typeof(PlatformController));


        /// <summary>
        /// 登录页 你好
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ViewResult Login()
        {
            return View();
        }

        /// <summary>
        /// 登录
        /// </summary>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <returns></returns>
        [HttpPost]
        public ActionResult Login(string username, string password)
        {
            //当前用户
            User user = null;
            UserManage.LoginResult loginresult = this.HttpContext.UserLogin(username, password, ref user);

            if (loginresult == UserManage.LoginResult.Success)
            {
                //用户角色
                MODEL.Enum.SystemRole systemrole = this.HttpContext.UserRole(user);
                if (systemrole == MODEL.Enum.SystemRole.Null)
                {
                    //无对应角色
                    ModelState.AddModelError("failed", systemrole.GetRemark());
                    return View();
                }
                else
                {
                    return RedirectToAction(systemrole.ToString(), "App");
                }
            }
            else
            {
                #region 登录失败
                ModelState.AddModelError("failed", loginresult.GetRemark());
                return View();
                #endregion
            }
        }

        /// <summary>
        /// 退出登录
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public ActionResult Logout()
        {
            this.HttpContext.UserLogout();
            return RedirectToAction("Login", "Platform");
        }

    }
}