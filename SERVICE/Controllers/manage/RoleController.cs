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

namespace SERVICE.Controllers.manage
{
    public class RoleController : ApiController
    {
        private static Logger logger = Logger.CreateLogger(typeof(RoleController));
        private static string pgsqlConnection = ConfigurationManager.ConnectionStrings["postgresql"].ConnectionString.ToString();


        /// <summary>
        /// 获取用户角色
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetUserRole()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<UserRole> userRoles = new List<UserRole>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    User user = ParseManageHelper.ParseUser(rows[i]);
                    if (user != null)
                    {
                        UserRole userRole = new UserRole();
                        userRole.Id = user.Id;
                        userRole.UserName = user.UserName;
                        userRole.AliasName = user.AliasName;

                        data = string.Empty;
                        data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM map_user_role WHERE userid={0} AND ztm={1}", user.Id, (int)MODEL.Enum.State.InUse));
                        if (!string.IsNullOrEmpty(data))
                        {
                            string[] maps = data.Split(new char[] {COM.ConstHelper.rowSplit});
                            if (maps.Length == 1)
                            {
                                MapUserRole mapUserRole = ParseManageHelper.ParseMapUserRole(maps[0]);
                                if (mapUserRole != null)
                                {
                                    Role role = ParseManageHelper.ParseRole(PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE id={0} AND ztm={1}", mapUserRole.RoleId, (int)MODEL.Enum.State.InUse)));
                                    if (role != null)
                                    {
                                        userRole.RoleName = role.RoleName;
                                        userRole.RoleAlias = role.RoleAlias;
                                    }
                                }
                            }
                            else
                            {
                                userRole.RoleName = "用户角色不唯一";
                            }
                        }

                        userRoles.Add(userRole);
                    }
                }

                return JsonHelper.ToJson(userRoles);
            }

            return string.Empty;
        }

        /// <summary>
        /// 获取全部角色信息
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public string GetRoleInfo()
        {
            string data = PostgresqlHelper.QueryData(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE ztm={0}", (int)MODEL.Enum.State.InUse));
            if (!string.IsNullOrEmpty(data))
            {
                List<Role> roles = new List<Role>();
                string[] rows = data.Split(new char[] {COM.ConstHelper.rowSplit});
                for (int i = 0; i < rows.Length; i++)
                {
                    Role role = ParseManageHelper.ParseRole(rows[i]);
                    if (role != null)
                    {
                        roles.Add(role);
                    }
                }

                if (roles.Count > 0)
                {
                    return JsonHelper.ToJson(roles);
                }
            }

            return string.Empty;
        }

        /// <summary>
        /// 更新用户角色
        /// </summary>
        /// <returns></returns>
        [HttpPut]
        public string UpdateUserRole()
        {
            string userid = HttpContext.Current.Request.Form["userid"];
            string roleid = HttpContext.Current.Request.Form["roleselect"];

            if (!string.IsNullOrEmpty(userid) && !string.IsNullOrEmpty(roleid))
            {
                int usercount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_user WHERE id={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                int rolecount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM manage_role WHERE id={0} AND ztm={1}", roleid, (int)MODEL.Enum.State.InUse));

                if ((usercount == 1) && (rolecount == 1))
                {
                    bool logout = true;//注销映射
                    bool newmap = false;//新建映射

                    //注销映射
                    int mapcount = PostgresqlHelper.QueryResultCount(pgsqlConnection, string.Format("SELECT *FROM map_user_role WHERE userid={0} AND ztm={1}", userid, (int)MODEL.Enum.State.InUse));
                    if (mapcount != 0)
                    {
                        int logoutcount = PostgresqlHelper.UpdateData(pgsqlConnection, string.Format("UPDATE map_user_role SET ztm={0} WHERE userid={1}", (int)MODEL.Enum.State.NoUse, userid));
                        if (logoutcount == 0)
                        {
                            logout = false;
                        }
                    }

                    //新建映射
                    int newmapcount = PostgresqlHelper.InsertData(pgsqlConnection, string.Format("INSERT INTO map_user_role(userid,roleid,cjsj,ztm) VALUES({0},{1},{2},{3})", userid, roleid, SQLHelper.UpdateString(DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss")), (int)MODEL.Enum.State.InUse));
                    if (newmapcount == 1)
                    {
                        newmap = true;
                    }

                    if (logout && newmap)
                    {
                        return "更新成功";
                    }
                }
            }

            return "更新失败";
        }



    }
}
