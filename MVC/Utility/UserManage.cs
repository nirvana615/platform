using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Security;
using Newtonsoft.Json;

using COM;
using DAL;
using MODEL;



namespace MVC
{
    /// <summary>
    /// 用户登录/退出
    /// </summary>
    public static class UserManage
    {
        private static Logger logger = Logger.CreateLogger(typeof(UserManage));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();
        private static double hour = 2;//有效时间（小时）

        /// <summary>
        /// 登录结果
        /// </summary>
        public enum LoginResult
        {
            [RemarkAttribute("登录成功")]
            Success = 0,

            [RemarkAttribute("用户为空")]
            NullUser = 1,

            [RemarkAttribute("用户不存在")]
            NoUser = 2,

            [RemarkAttribute("用户不唯一")]
            NotOneUser = 3,

            [RemarkAttribute("密码为空")]
            NullPassword = 4,

            [RemarkAttribute("密码错误")]
            ErrorPassword = 5,

            [RemarkAttribute("验证失败")]
            Failure = 6
        }



        /// <summary>
        /// 用户验证
        /// </summary>
        /// <param name="context"></param>
        /// <param name="username"></param>
        /// <param name="password"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static LoginResult UserLogin(this HttpContextBase context, string username, string password, ref User user)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(username))
            {
                return LoginResult.NullUser;//用户为空
            }
            else if (string.IsNullOrEmpty(password))
            {
                return LoginResult.NullPassword;//密码为空
            }
            #endregion

            try
            {
                #region 验证失败
                int usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0}", SQLHelper.UpdateString(username)));
                if (usercount < 1)
                {
                    return LoginResult.NoUser;//用户不存在
                }

                usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)), (int)MODEL.Enum.State.InUse));
                if (usercount < 1)
                {
                    return LoginResult.ErrorPassword;//密码错误
                }
                if (usercount != 1)
                {
                    return LoginResult.NotOneUser;//用户不唯一
                }
                #endregion

                #region 验证成功
                user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(username), SQLHelper.UpdateString(MD5Encrypt.Encrypt(password)), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return LoginResult.NoUser;//获取用户失败
                }
                else
                {
                    COM.CookieHelper.WriteCookie(context, user.UserName, COM.CookieHelper.CreateCookie(user.UserName, user.AliasName, user.PassWord, hour), "User", hour);//写入cookie
                    PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE manage_user SET dlsj={0} WHERE id={1}", SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), user.Id));//更新用户登录时间
                    PostgresqlHelper.InsertDataReturnID(pgsqlConnection, string.Format("INSERT INTO manage_user_login (userid,type,time) VALUES({0},{1},{2})", user.Id, (int)MODEL.Enum.LoginWay.Web, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"))));//记录用户登录时间

                    return LoginResult.Success;
                }
                #endregion
            }
            catch
            {
                return LoginResult.Failure;
            }
        }

        /// <summary>
        /// 权限验证
        /// </summary>
        /// <param name="context"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static MODEL.Enum.SystemRole UserRole(this HttpContextBase context, User user)
        {
            //根据用户id获取用户角色
            MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM map_user_role WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse)));
            if (mapUserRole == null)
            {
                return MODEL.Enum.SystemRole.Null;//无角色
            }
            else
            {
                Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE id={0} AND ztm={1}", mapUserRole.RoleId, (int)MODEL.Enum.State.InUse)));
                if (role == null)
                {
                    return MODEL.Enum.SystemRole.Null;//无角色
                }
                else
                {
                    #region cookie {角色}
                    COM.CookieHelper.WriteCookie(context, user.UserName, role.RoleName, "Role", hour);
                    #endregion

                    #region 角色
                    if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Admin.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Admin;
                    }
                    else if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Monitor.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Monitor;
                    }
                    else if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Display.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Display;
                    }
                    else if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Owner.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Owner;
                    }
                    else if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Uav.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Uav;
                    }
                    else if (role.RoleName.ToUpper() == MODEL.Enum.SystemRole.Flz.ToString().ToUpper())
                    {
                        return MODEL.Enum.SystemRole.Flz;
                    }
                    else
                    {
                        return MODEL.Enum.SystemRole.Null;
                    }
                    #endregion
                }
            }
        }

        /// <summary>
        /// 解密cookie
        /// </summary>
        /// <param name="encryptTicket"></param>
        /// <param name="role"></param>
        /// <returns></returns>
        public static bool ValidateCookie(string encryptUser, string encryptRole, string role)
        {
            if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole) || string.IsNullOrEmpty(role))
            {
                return false;
            }
            else
            {
                try
                {
                    List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);
                    string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);

                    if (userinfo.Count != 4)
                    {
                        return false;//用户信息不正确
                    }

                    #region 验证时效性
                    if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                    {
                        return false;//时效过期
                    }
                    #endregion

                    #region 验证用户
                    User user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                    if (user == null)
                    {
                        return false;//验证失败
                    }
                    else
                    {
                        #region 验证角色
                        if (role.ToUpper() == roleinfo.ToUpper())
                        {
                            return true;//验证成功
                        }
                        else
                        {
                            return false;//角色不符
                        }
                        #endregion
                    }
                    #endregion
                }
                catch
                {
                    return false;
                }
            }
        }

        /// <summary>
        /// 退出系统
        /// </summary>
        /// <param name="context"></param>
        /// <returns></returns>
        public static void UserLogout(this HttpContextBase context)
        {
            #region Cookie
            HttpCookie cookie = context.Request.Cookies["User"];
            if (cookie != null)
            {
                cookie.Expires = DateTime.Now.AddMinutes(-1);//设置过期
                context.Response.Cookies.Add(cookie);
            }
            #endregion Cookie

            #region Session
            context.Session.Clear();
            context.Session.RemoveAll();
            context.Session.Abandon();
            #endregion Session
        }
    }
}