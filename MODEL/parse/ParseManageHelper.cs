using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析管理类
    /// </summary>
    public class ParseManageHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseManageHelper));


        #region 管理类
        /// <summary>
        /// 用户
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static User ParseUser(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析用户数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                User user = new User()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserName = row[1].ToString(),
                    AliasName = row[10].ToString(),
                    PassWord = row[2].ToString(),
                    BSM = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    DLSJ = row[5].ToString(),
                    SSDW = row[6].ToString(),
                    SSQY = row[7].ToString(),
                    BZ = row[9].ToString()
                };

                return user;
            }
            catch (Exception ex)
            {
                logger.Error("User解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 角色
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static Role ParseRole(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析角色数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("角色不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Role role = new Role()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    RoleName = row[1].ToString(),
                    RoleAlias = row[6].ToString(),
                    RoleCode = Convert.ToInt16(row[2].ToString()),
                    CJSJ = row[3].ToString(),
                    BZ = row[5].ToString()
                };

                return role;
            }
            catch (Exception ex)
            {
                logger.Error("Role解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 行政区
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static XZQ ParseXZQ(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析行政区数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("行政区不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                XZQ xzq = new XZQ()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Name = row[1].ToString(),
                    Code = row[2].ToString()
                };

                return xzq;
            }
            catch (Exception ex)
            {
                logger.Error("XZQ解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 自动化监测设备
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static Device ParseDevice(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析自动化监测设备数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("自动化监测设备不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Device device = new Device()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    SBMC = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    SBXH = row[4].ToString(),
                    SBLX = Convert.ToInt16(row[5].ToString()),
                    //GDFS = Convert.ToInt16(row[6].ToString()),
                    CJID = null,
                    JXSID = null,
                    CJSJ = row[9].ToString(),
                    BSM = row[10].ToString(),
                    //ZTM = Convert.ToInt16(row[11].ToString()),
                    BZ = row[12].ToString()
                };

                if (!string.IsNullOrEmpty(row[6].ToString()))
                {
                    device.GDFS = Convert.ToInt16(row[6].ToString());
                }
                if (!string.IsNullOrEmpty(row[7].ToString()))
                {
                    device.CJID = Convert.ToInt16(row[7].ToString());
                }
                if (!string.IsNullOrEmpty(row[8].ToString()))
                {
                    device.JXSID = Convert.ToInt16(row[8].ToString());
                }

                return device;
            }
            catch (Exception ex)
            {
                logger.Error("Device解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 自动化监测设备(文本)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static DeviceString ParseDeviceString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析自动化监测设备(文本)数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("自动化监测设备(文本)不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                DeviceString deviceString = new DeviceString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    SBMC = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    SBXH = row[4].ToString(),
                    CJSJ = row[9].ToString(),
                    BSM = row[10].ToString(),
                    //ZTM = Convert.ToInt16(row[11].ToString()),
                    BZ = row[12].ToString()
                };

                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    deviceString.SBLX = String.Empty;
                }
                else
                {
                    deviceString.SBLX = EnumExtension.GetRemark((MODEL.Enum.AutoDeviceType)System.Enum.Parse(typeof(MODEL.Enum.AutoDeviceType), row[5].ToString()));
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    deviceString.GDFS = String.Empty;
                }
                else
                {
                    deviceString.GDFS = EnumExtension.GetRemark((MODEL.Enum.PowerType)System.Enum.Parse(typeof(MODEL.Enum.PowerType), row[6].ToString()));
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    deviceString.CJID = null;
                }
                else
                {
                    deviceString.CJID = Convert.ToInt16(row[7].ToString());
                }
                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    deviceString.JXSID = null;
                }
                else
                {
                    deviceString.JXSID = Convert.ToInt16(row[8].ToString());
                }

                return deviceString;
            }
            catch (Exception ex)
            {
                logger.Error("DeviceString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 自动化监测数据库
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static Database ParseDatabase(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析自动化监测数据库数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("自动化监测数据库不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Database database = new Database()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DBLX = Convert.ToInt16(row[1].ToString()),
                    DBIP = row[2].ToString(),
                    DBPORT = row[3].ToString(),
                    DBNAME = row[4].ToString(),
                    DBUSER = row[5].ToString(),
                    DBPW = row[6].ToString(),
                    DBADD = row[7].ToString(),
                    DBCONN = row[8].ToString(),
                    CJSJ = row[9].ToString(),
                    //ZTM = Convert.ToInt16(row[10].ToString()),
                    BZ = row[11].ToString()
                };

                return database;
            }
            catch (Exception ex)
            {
                logger.Error("Database解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 自动化监测数据库（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static DatabaseString ParseDatabaseString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析自动化监测数据库(文本)数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("自动化监测数据库(文本)不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                DatabaseString databaseString = new DatabaseString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DBIP = row[2].ToString(),
                    DBPORT = row[3].ToString(),
                    DBNAME = row[4].ToString(),
                    DBUSER = row[5].ToString(),
                    DBPW = row[6].ToString(),
                    DBADD = row[7].ToString(),
                    DBCONN = row[8].ToString(),
                    CJSJ = row[9].ToString(),
                    //ZTM = Convert.ToInt16(row[10].ToString()),
                    BZ = row[11].ToString()
                };

                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    databaseString.DBLX = String.Empty;
                }
                else
                {
                    databaseString.DBLX = EnumExtension.GetRemark((MODEL.Enum.DbType)System.Enum.Parse(typeof(MODEL.Enum.DbType), row[1].ToString()));
                }

                return databaseString;
            }
            catch (Exception ex)
            {
                logger.Error("DatabaseString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// ETL SQL
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static SQL ParseSQL(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析SQL数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("SQL不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SQL sql = new SQL()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Sql = row[1].ToString(),
                    CJSJ = row[2].ToString(),
                    //ZTM = Convert.ToInt16(row[3].ToString()),
                    BZ = row[4].ToString(),
                    Type = Convert.ToInt16(row[5].ToString())
                };

                return sql;
            }
            catch (Exception ex)
            {
                logger.Error("SQL解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// ETL SQL(文本)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static SQLString ParseSQLString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析SQL(文本)数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("SQL(文本)不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SQLString sqlString = new SQLString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Sql = row[1].ToString(),
                    CJSJ = row[2].ToString(),
                    //ZTM = Convert.ToInt16(row[3].ToString()),
                    BZ = row[4].ToString()
                };

                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    sqlString.Type = string.Empty;
                }
                else
                {
                    sqlString.Type = EnumExtension.GetRemark((MODEL.Enum.SqlType)System.Enum.Parse(typeof(MODEL.Enum.SqlType), row[5].ToString()));
                }

                return sqlString;
            }
            catch (Exception ex)
            {
                logger.Error("SQLString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 厂家
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static Factory ParseFactory(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析厂家数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("厂家不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Factory factory = new Factory()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    CJMC = row[1].ToString(),
                    CJJC = row[2].ToString(),
                    CJBM = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    //ZTM = Convert.ToInt16(row[5].ToString()),
                    BZ = row[6].ToString()
                };

                return factory;
            }
            catch (Exception ex)
            {
                logger.Error("Factory解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 经销商
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static Sale ParseSale(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析经销商数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("经销商不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Sale sale = new Sale()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    JXSMC = row[1].ToString(),
                    JXSJC = row[2].ToString(),
                    JXSBM = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    //ZTM = Convert.ToInt16(row[5].ToString()),
                    BZ = row[6].ToString()
                };

                return sale;
            }
            catch (Exception ex)
            {
                logger.Error("Sale解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 坐标系
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static Coordinate ParseCoordinate(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析坐标系统数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("坐标系统不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Coordinate coord = new Coordinate()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    SRID = Convert.ToInt16(row[1].ToString()),
                    NAME = row[2].ToString(),
                    WKT = row[3].ToString()
                };

                return coord;
            }
            catch (Exception ex)
            {
                logger.Error("Coordinate解析失败：" + data, ex);
                return null;
            }
        }


        #endregion


        #region 映射类
        /// <summary>
        /// 用户-角色映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c">列分割符</param>
        /// <param name="r">行分割符</param>
        /// <returns></returns>
        public static MapUserRole ParseMapUserRole(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户角色映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户角色映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserRole mapUserRole = new MapUserRole()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    RoleId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserRole;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserRole解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 设备-数据库（一对一）
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapDeviceDatabase ParseMapDeviceDatabase(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("设备数据库映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设备与数据库不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDeviceDatabase mapDeviceDatabase = new MapDeviceDatabase()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DeviceId = Convert.ToInt32(row[1].ToString()),
                    DbId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDeviceDatabase;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserRole解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 设备-SQL（一对一）
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MapDeviceSql ParseMapDeviceSql(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("设备SQL映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设备与SQL不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDeviceSql mapDeviceSql = new MapDeviceSql()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DeviceId = Convert.ToInt32(row[1].ToString()),
                    SqlId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDeviceSql;
            }
            catch (Exception ex)
            {
                logger.Error("MapDeviceSql解析失败：" + data, ex);
                return null;
            }
        }




        #endregion
    }
}
