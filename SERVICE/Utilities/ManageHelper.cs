using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

using COM;
using DAL;
using MODEL;


namespace SERVICE
{
    public class ManageHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ManageHelper));
        /// <summary>
        /// 验证cookie并返回用户项目标识码
        /// </summary>
        /// <param name="connect"></param>
        /// <param name="cookie"></param>
        /// <param name="bsms"></param>
        /// <returns></returns>
        public static COM.CookieHelper.CookieResult ValidateCookie(string connect, string cookie, ref string bsms)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(connect))
            {
                return CookieHelper.CookieResult.FailureCookkie;//无连接信息
            }

            if (string.IsNullOrEmpty(cookie))
            {
                return CookieHelper.CookieResult.NoCookie;//无cookie信息
            }
            #endregion

            try
            {
                string encryptUser = string.Empty;//加密用户信息
                string encryptRole = string.Empty;//加密角色信息
                logger.Info("【" + cookie + "】cookie里面的");
                string[] items = cookie.Split(new char[] { ';' }); 
                logger.Info("【" + items + "】items");
                if (items.Length != 2)
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                for (int i = 0; i < items.Length; i++)
                {
                    if (items[i].Contains("User"))
                    {
                        encryptUser = items[i].Replace("User=\"", "").Replace("\"", "").Trim(' ');
                    }
                    if (items[i].Contains("Role"))
                    {
                        encryptRole = items[i].Replace("Role=\"", "").Replace("\"", "").Trim(' ');
                    }
                }

                if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole))
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);//解密用户信息
                string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);//解密角色信息
                logger.Info("【" + userinfo + "】userinfo");
                logger.Info("【" + roleinfo + "】roleinfo");
                #region 验证时效性
                if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                {
                    return CookieHelper.CookieResult.ExpireCookie;//时效过期
                }
                #endregion

                User user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                logger.Info("【" + user + "】user");
                if (user == null)
                {
                    return CookieHelper.CookieResult.FailureCookkie;//验证用户失败
                }
                else
                {
                    #region 用户项目标识码
                    string bsminfo = string.Empty;

                    #region 监测项目
                    string monitormaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM monitor_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    if (!string.IsNullOrEmpty(monitormaps))
                    {
                        string[] rows = monitormaps.Split(new char[] { COM.ConstHelper.rowSplit });
                        for (int i = 0; i < rows.Length; i++)
                        {
                            MapUserMonitorProject mapUserMonitorProject = ParseMonitorHelper.ParseMapUserMonitorProject(rows[i]);
                            if (mapUserMonitorProject != null)
                            {
                                Project project = ParseMonitorHelper.ParseProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM business_project WHERE id={0} AND ztm={1}", mapUserMonitorProject.MonitorProjectId, (int)MODEL.Enum.State.InUse)));
                                if (project != null)
                                {
                                    bsminfo += project.BSM + ",";
                                }
                            }
                        }
                    }
                    #endregion

                    #region 无人机项目
                    //string uavmaps = PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM uav_map_user_project WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                    //if (!string.IsNullOrEmpty(uavmaps))
                    //{
                    //    string[] rows = uavmaps.Split(new char[] { COM.ConstHelper.rowSplit });
                    //    for (int i = 0; i < rows.Length; i++)
                    //    {
                    //        MapUserUavProject mapUserUavProject = ParseUavHelper.ParseMapUserUavProject(rows[i]);
                    //        if (mapUserUavProject != null)
                    //        {
                    //            UavProject uavProject = ParseUavHelper.ParseUavProject(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM uav_project WHERE id={0} AND ztm={1}", mapUserUavProject.UavProjectId, (int)MODEL.Enum.State.InUse)));
                    //            if (uavProject != null)
                    //            {
                    //                bsminfo += uavProject.BSM + ",";
                    //            }
                    //        }
                    //    }
                    //}
                    #endregion

                    if (!string.IsNullOrEmpty(bsminfo))
                    {
                        bsminfo = bsminfo.TrimEnd(',');
                    }

                    bsms = string.Empty;
                    if (string.IsNullOrEmpty(bsminfo))
                    {
                        bsms = "=''";
                    }
                    else
                    {
                        string[] rows = bsminfo.Split(new char[] { ',' });
                        if (rows.Length == 1)
                        {
                            bsms = "='" + rows[0] + "'";
                        }
                        else
                        {
                            for (int i = 0; i < rows.Length - 1; i++)
                            {
                                bsms += "'" + rows[i] + "',";
                            }

                            bsms = " IN (" + bsms + "'" + rows[rows.Length - 1] + "'" + ")";
                        }
                    }
                    #endregion
                    logger.Info("11111");
                    return CookieHelper.CookieResult.SuccessCookkie;
                }
            }
            catch
            {
                return CookieHelper.CookieResult.FailureCookkie;//验证cookie出错
            }
        }

        /// <summary>
        /// 验证cookie并返回用户
        /// </summary>
        /// <param name="connect"></param>
        /// <param name="cookie"></param>
        /// <param name="user"></param>
        /// <returns></returns>
        public static COM.CookieHelper.CookieResult ValidateCookie(string connect, string cookie, ref User user)
        {
            #region 参数检查
            if (string.IsNullOrEmpty(connect))
            {
                return CookieHelper.CookieResult.FailureCookkie;//无连接信息
            }

            if (string.IsNullOrEmpty(cookie))
            {
                return CookieHelper.CookieResult.NoCookie;//无cookie信息
            }
            #endregion

            try
            {
                string encryptUser = string.Empty;//加密用户信息
                string encryptRole = string.Empty;//加密角色信息

                string[] items = cookie.Split(new char[] { ';' });
                if (items.Length != 2)
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                for (int i = 0; i < items.Length; i++)
                {
                    if (items[i].Contains("User"))
                    {
                        encryptUser = items[i].Replace("User=\"", "").Replace("\"", "").Trim(' ');
                    }
                    if (items[i].Contains("Role"))
                    {
                        encryptRole = items[i].Replace("Role=\"", "").Replace("\"", "").Trim(' ');
                    }
                }

                if (string.IsNullOrEmpty(encryptUser) || string.IsNullOrEmpty(encryptRole))
                {
                    return CookieHelper.CookieResult.ErrorCookie;//cookie错误
                }

                List<string> userinfo = COM.CookieHelper.GetUserInfoFromEncrypt(encryptUser);//解密用户信息
                string roleinfo = COM.CookieHelper.GetRoleInfoFromCookie(encryptRole);//解密角色信息

                #region 验证时效性
                if (DateTime.Now.CompareTo(Convert.ToDateTime(userinfo[3])) > 0)
                {
                    return CookieHelper.CookieResult.ExpireCookie;//时效过期
                }
                #endregion

                user = ParseManageHelper.ParseUser(PostgresqlHelper.QueryData(connect, string.Format("SELECT *FROM manage_user WHERE username={0} AND password={1} AND ztm={2}", SQLHelper.UpdateString(userinfo[0]), SQLHelper.UpdateString(userinfo[2]), (int)MODEL.Enum.State.InUse)));
                if (user == null)
                {
                    return CookieHelper.CookieResult.FailureCookkie;//验证用户失败
                }
                else
                {
                    return CookieHelper.CookieResult.SuccessCookkie;
                }
            }
            catch
            {
                return CookieHelper.CookieResult.FailureCookkie;//验证cookie出错
            }
        }




















    }
}