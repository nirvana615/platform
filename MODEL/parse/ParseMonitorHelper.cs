using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析监测类
    /// </summary>
    public class ParseMonitorHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseMonitorHelper));


        /// <summary>
        /// 用户-监测项目映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapUserMonitorProject ParseMapUserMonitorProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("用户-监测项目映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("用户-监测项目映射不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapUserMonitorProject mapUserMonitorProject = new MapUserMonitorProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    UserId = Convert.ToInt32(row[1].ToString()),
                    MonitorProjectId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapUserMonitorProject;
            }
            catch (Exception ex)
            {
                logger.Error("MapUserMonitorProject解析失败：" + data, ex);
                return null;
            }
        }



        #region 业务
        /// <summary>
        /// GNSS
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static GNSS ParseGNSS(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析GNSS数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("GNSS不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                GNSS gnss = new GNSS()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    X = Convert.ToDouble(row[4].ToString()),
                    Y = Convert.ToDouble(row[5].ToString()),
                    H = Convert.ToDouble(row[6].ToString()),
                    ZBDW = row[7].ToString(),
                    KJCK = Convert.ToInt16(row[8].ToString()),
                    JSLX = Convert.ToInt16(row[9].ToString()),
                    LB = row[10].ToString(),
                    GCSJ = row[11].ToString(),
                    CJSJ = row[12].ToString(),
                    BSM = row[13].ToString(),
                    BZ = row[14].ToString()
                };

                return gnss;
            }
            catch (Exception ex)
            {
                logger.Error("GNSS解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 倾角
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static QJ ParseQJ(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析倾角数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("倾角不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                QJ qj = new QJ()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    X = Convert.ToDouble(row[4].ToString()),
                    Y = Convert.ToDouble(row[5].ToString()),
                    DW = row[7].ToString(),
                    LB = row[8].ToString(),
                    GCSJ = row[9].ToString(),
                    CJSJ = row[10].ToString(),
                    BSM = row[11].ToString(),
                    BZ = row[12].ToString()
                };

                if (!string.IsNullOrEmpty(row[6].ToString()))
                {
                    qj.Z = Convert.ToDouble(row[6].ToString());
                }

                return qj;
            }
            catch (Exception ex)
            {
                logger.Error("QJ解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 裂缝
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static LF ParseLF(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析裂缝数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("裂缝不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LF lf = new LF()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    Value = Convert.ToDouble(row[4].ToString()),
                    DW = row[5].ToString(),
                    LB = row[6].ToString(),
                    GCSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[10].ToString()
                };

                return lf;
            }
            catch (Exception ex)
            {
                logger.Error("LF解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 应力
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static YL ParseYL(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析应力数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("应力不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                YL yl = new YL()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    Value = Convert.ToDouble(row[4].ToString()),
                    DW = row[5].ToString(),
                    LB = row[6].ToString(),
                    GCSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[10].ToString()
                };

                return yl;
            }
            catch (Exception ex)
            {
                logger.Error("YL解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 深部位移
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static SBWY ParseSBWY(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析深部位移数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("深部位移不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SBWY sbwy = new SBWY()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    X = Convert.ToDouble(row[4].ToString()),
                    Y = Convert.ToDouble(row[5].ToString()),
                    WYDW = row[7].ToString(),
                    LB = row[8].ToString(),
                    GCSJ = row[9].ToString(),
                    CJSJ = row[10].ToString(),
                    BSM = row[11].ToString(),
                    BZ = row[12].ToString()
                };

                if (!string.IsNullOrEmpty(row[6].ToString()))
                {
                    sbwy.Z = Convert.ToDouble(row[6].ToString());
                }

                return sbwy;
            }
            catch (Exception ex)
            {
                logger.Error("SBWY解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 雨量
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RAIN ParseRAIN(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析雨量数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("雨量不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RAIN rain = new RAIN()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    Value = Convert.ToDouble(row[4].ToString()),
                    DW = row[5].ToString(),
                    LB = row[6].ToString(),
                    GCSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[10].ToString()
                };

                return rain;
            }
            catch (Exception ex)
            {
                logger.Error("RAIN解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 地下水位
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static WATER ParseWATER(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析地下水位数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("地下水位不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WATER water = new WATER()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Code = row[1].ToString(),
                    Index = row[2].ToString(),
                    SBBH = row[3].ToString(),
                    Value = Convert.ToDouble(row[4].ToString()),
                    DW = row[5].ToString(),
                    LB = row[6].ToString(),
                    GCSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    BZ = row[10].ToString()
                };

                return water;
            }
            catch (Exception ex)
            {
                logger.Error("WATER解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 设备初始值
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Value ParseValue(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析设备初始值数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设备初始值不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Value value = new Value()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    VALUE = row[1].ToString(),
                    CJSJ = row[2].ToString(),
                    BSM = row[3].ToString(),
                    ZTM = Convert.ToInt16(row[4].ToString()),
                    BZ = row[5].ToString()
                };

                return value;
            }
            catch (Exception ex)
            {
                logger.Error("Value解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Project ParseProject(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析Project数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("Project不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Project project = new Project()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XMKJWZ = row[6].ToString(),
                    XMKJWZYS = row[7].ToString(),
                    XZQBM = row[8].ToString(),
                    XMWZ = row[9].ToString(),
                    XMKSSJ = row[10].ToString(),
                    XMJSSJ = row[11].ToString(),
                    ZHLX = Convert.ToInt16(row[14].ToString()),
                    ZHDMC = row[15].ToString(),
                    ZHDTYBH = row[16].ToString(),
                    QTWX = row[31].ToString(),
                    CJSJ = row[33].ToString(),
                    BSM = row[34].ToString(),
                    ZTM = Convert.ToInt16(row[35].ToString()),
                    BZ = row[36].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    project.ZXJD = null;
                }
                else
                {
                    project.ZXJD = Convert.ToDouble(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    project.ZXWD = null;
                }
                else
                {
                    project.ZXWD = Convert.ToDouble(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    project.SRID = null;
                }
                else
                {
                    project.SRID = Convert.ToInt16(row[5].ToString());
                }
                if (string.IsNullOrEmpty(row[12].ToString()))
                {
                    project.XMLX = null;
                }
                else
                {
                    project.XMLX = Convert.ToInt16(row[12].ToString());
                }
                if (string.IsNullOrEmpty(row[13].ToString()))
                {
                    project.XMLB = null;
                }
                else
                {
                    project.XMLB = Convert.ToInt16(row[13].ToString());
                }
                if (string.IsNullOrEmpty(row[17].ToString()))
                {
                    project.ZHDJ = null;
                }
                else
                {
                    project.ZHDJ = Convert.ToInt16(row[17].ToString());
                }
                if (string.IsNullOrEmpty(row[18].ToString()))
                {
                    project.ZHXQ = null;
                }
                else
                {
                    project.ZHXQ = Convert.ToInt16(row[18].ToString());
                }
                if (string.IsNullOrEmpty(row[19].ToString()))
                {
                    project.JCJB = null;
                }
                else
                {
                    project.JCJB = Convert.ToInt16(row[19].ToString());
                }
                if (string.IsNullOrEmpty(row[20].ToString()))
                {
                    project.JCSD = null;
                }
                else
                {
                    project.JCSD = Convert.ToInt16(row[20].ToString());
                }
                if (string.IsNullOrEmpty(row[21].ToString()))
                {
                    project.YJJB = null;
                }
                else
                {
                    project.YJJB = Convert.ToInt16(row[21].ToString());
                }
                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    project.SFKQ = null;
                }
                else
                {
                    project.SFKQ = Convert.ToBoolean(row[22].ToString());
                }
                if (string.IsNullOrEmpty(row[23].ToString()))
                {
                    project.SFSS = null;
                }
                else
                {
                    project.SFSS = Convert.ToBoolean(row[23].ToString());
                }
                if (string.IsNullOrEmpty(row[24].ToString()))
                {
                    project.MJ = null;
                }
                else
                {
                    project.MJ = Convert.ToDouble(row[24].ToString());
                }
                if (string.IsNullOrEmpty(row[25].ToString()))
                {
                    project.MJDW = null;
                }
                else
                {
                    project.MJDW = Convert.ToInt16(row[25].ToString());
                }
                if (string.IsNullOrEmpty(row[26].ToString()))
                {
                    project.TJ = null;
                }
                else
                {
                    project.TJ = Convert.ToDouble(row[26].ToString());
                }
                if (string.IsNullOrEmpty(row[27].ToString()))
                {
                    project.TJDW = null;
                }
                else
                {
                    project.TJDW = Convert.ToInt16(row[27].ToString());
                }
                if (string.IsNullOrEmpty(row[28].ToString()))
                {
                    project.WXHS = null;
                }
                else
                {
                    project.WXHS = Convert.ToInt16(row[28].ToString());
                }
                if (string.IsNullOrEmpty(row[29].ToString()))
                {
                    project.WXRS = null;
                }
                else
                {
                    project.WXRS = Convert.ToInt32(row[29].ToString());
                }
                if (string.IsNullOrEmpty(row[30].ToString()))
                {
                    project.WXFWMJ = null;
                }
                else
                {
                    project.WXFWMJ = Convert.ToDouble(row[30].ToString());
                }
                if (string.IsNullOrEmpty(row[32].ToString()))
                {
                    project.SFJS = null;
                }
                else
                {
                    project.SFJS = Convert.ToBoolean(row[32].ToString());
                }

                return project;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目信息（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ProjectString ParseProjectString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析项目信息数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目信息不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ProjectString projectString = new ProjectString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    ZXJD = row[3].ToString(),
                    ZXWD = row[4].ToString(),
                    XMKJWZ = row[6].ToString(),
                    SRID = row[5].ToString(),
                    XMKJWZYS = row[7].ToString(),
                    XZQBM = row[8].ToString(),
                    XMWZ = row[9].ToString(),
                    XMKSSJ = row[10].ToString().Substring(0, 10),
                    XMJSSJ = row[11].ToString().Substring(0, 10),
                    ZHDMC = row[15].ToString(),
                    ZHDTYBH = row[16].ToString(),
                    QTWX = row[31].ToString(),
                    CJSJ = row[33].ToString(),
                    BSM = row[34].ToString(),
                    ZTM = Convert.ToInt16(row[35].ToString()),
                    BZ = row[36].ToString()
                };

                projectString.XMLX = row[12].ToString();//项目类型

                if (string.IsNullOrEmpty(row[13].ToString()))
                {
                    projectString.XMLB = String.Empty;
                }
                else
                {
                    projectString.XMLB = EnumExtension.GetRemark((MODEL.Enum.ProjectCategory)System.Enum.Parse(typeof(MODEL.Enum.ProjectCategory), row[13].ToString()));
                }

                if (string.IsNullOrEmpty(row[14].ToString()))
                {
                    projectString.ZHLX = String.Empty;
                }
                else
                {
                    projectString.ZHLX = EnumExtension.GetRemark((MODEL.Enum.GeodisasterType)System.Enum.Parse(typeof(MODEL.Enum.GeodisasterType), row[14].ToString()));
                }

                if (string.IsNullOrEmpty(row[17].ToString()))
                {
                    projectString.ZHDJ = String.Empty;
                }
                else
                {
                    projectString.ZHDJ = EnumExtension.GetRemark((MODEL.Enum.GeodisasterLevel)System.Enum.Parse(typeof(MODEL.Enum.GeodisasterLevel), row[17].ToString()));
                }

                if (string.IsNullOrEmpty(row[18].ToString()))
                {
                    projectString.ZHXQ = String.Empty;
                }
                else
                {
                    projectString.ZHXQ = EnumExtension.GetRemark((MODEL.Enum.GeodisasterDanger)System.Enum.Parse(typeof(MODEL.Enum.GeodisasterDanger), row[18].ToString()));
                }

                if (string.IsNullOrEmpty(row[19].ToString()))
                {
                    projectString.JCJB = String.Empty;
                }
                else
                {
                    projectString.JCJB = EnumExtension.GetRemark((MODEL.Enum.MonitorLevel)System.Enum.Parse(typeof(MODEL.Enum.MonitorLevel), row[19].ToString()));
                }

                if (string.IsNullOrEmpty(row[20].ToString()))
                {
                    projectString.JCSD = String.Empty;
                }
                else
                {
                    projectString.JCSD = EnumExtension.GetRemark((MODEL.Enum.MonitorMeans)System.Enum.Parse(typeof(MODEL.Enum.MonitorMeans), row[20].ToString()));
                }

                if (string.IsNullOrEmpty(row[21].ToString()))
                {
                    projectString.YJJB = String.Empty;
                }
                else
                {
                    projectString.YJJB = EnumExtension.GetRemark((MODEL.EnumEW.WarningLevel)System.Enum.Parse(typeof(MODEL.EnumEW.WarningLevel), row[21].ToString()));
                }

                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    projectString.SFKQ = string.Empty;
                }
                else
                {
                    if (Convert.ToBoolean(row[22].ToString()))
                    {
                        projectString.SFKQ = "是";
                    }
                    else
                    {
                        projectString.SFKQ = "否";
                    }
                }
                if (string.IsNullOrEmpty(row[23].ToString()))
                {
                    projectString.SFSS = string.Empty;
                }
                else
                {
                    if (Convert.ToBoolean(row[23].ToString()))
                    {
                        projectString.SFSS = "是";
                    }
                    else
                    {
                        projectString.SFSS = "否";
                    }
                }

                projectString.MJ = row[24].ToString();

                if (string.IsNullOrEmpty(row[25].ToString()))
                {
                    projectString.MJDW = String.Empty;
                }
                else
                {
                    projectString.MJDW = EnumExtension.GetRemark((MODEL.Enum.AreaUnit)System.Enum.Parse(typeof(MODEL.Enum.AreaUnit), row[25].ToString()));
                }

                projectString.TJ = row[26].ToString();

                if (string.IsNullOrEmpty(row[27].ToString()))
                {
                    projectString.TJDW = String.Empty;
                }
                else
                {
                    projectString.TJDW = EnumExtension.GetRemark((MODEL.Enum.VolumeUnit)System.Enum.Parse(typeof(MODEL.Enum.VolumeUnit), row[27].ToString()));
                }

                projectString.WXHS = row[28].ToString();
                projectString.WXRS = row[29].ToString();
                projectString.WXFWMJ = row[30].ToString();

                if (string.IsNullOrEmpty(row[32].ToString()))
                {
                    projectString.SFJS = "";
                }
                else
                {
                    if (Convert.ToBoolean(row[32].ToString()))
                    {
                        projectString.SFJS = "是";
                    }
                    else
                    {
                        projectString.SFJS = "否";
                    }
                }


                return projectString;
            }
            catch (Exception ex)
            {
                logger.Error("ProjectString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Disaster ParseDisaster(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析灾害体数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Disaster disaster = new Disaster()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ZHTMC = row[1].ToString(),
                    ZHTBH = row[2].ToString(),
                    ZHTLX = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[6].ToString(),
                    BSM = row[7].ToString(),
                    ZTM = Convert.ToInt16(row[8].ToString()),
                    BZ = row[9].ToString()
                };

                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    disaster.ZXJD = null;
                }
                else
                {
                    disaster.ZXJD = Convert.ToDouble(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    disaster.ZXWD = null;
                }
                else
                {
                    disaster.ZXWD = Convert.ToDouble(row[5].ToString());
                }

                return disaster;
            }
            catch (Exception ex)
            {
                logger.Error("Disaster解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体(文本)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static DisasterString ParseDisasterString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析灾害体(文本)数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体(文本)不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                DisasterString disasterString = new DisasterString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ZHTMC = row[1].ToString(),
                    ZHTBH = row[2].ToString(),
                    ZXJD = row[4].ToString(),
                    ZXWD = row[5].ToString(),
                    CJSJ = row[6].ToString(),
                    BSM = row[7].ToString(),
                    ZTM = Convert.ToInt16(row[8].ToString()),
                    BZ = row[9].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    disasterString.ZHTLX = string.Empty;
                }
                else
                {
                    disasterString.ZHTLX = EnumExtension.GetRemark((MODEL.Enum.GeodisasterType)System.Enum.Parse(typeof(MODEL.Enum.GeodisasterType), row[3].ToString()));
                }

                return disasterString;
            }
            catch (Exception ex)
            {
                logger.Error("DisasterString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测点
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Monitor ParseMonitor(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析监测点数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测点不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Monitor monitor = new Monitor()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    JCDMC = row[1].ToString(),
                    JCDBH = row[2].ToString(),
                    JCFF = Convert.ToInt16(row[3].ToString()),
                    PMWZX = Convert.ToDouble(row[5].ToString()),
                    PMWZY = Convert.ToDouble(row[6].ToString()),
                    GC = Convert.ToDouble(row[7].ToString()),
                    CJSJ = row[11].ToString(),
                    BSM = row[12].ToString(),
                    ZTM = Convert.ToInt16(row[13].ToString()),
                    BZ = row[14].ToString()
                };

                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    monitor.JCZLX = null;
                }
                else
                {
                    monitor.JCZLX = Convert.ToInt16(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    monitor.SD = null;
                }
                else
                {
                    monitor.SD = Convert.ToDouble(row[8].ToString());
                }
                if (string.IsNullOrEmpty(row[9].ToString()))
                {
                    monitor.KS = null;
                }
                else
                {
                    monitor.KS = Convert.ToDouble(row[9].ToString());
                }
                if (string.IsNullOrEmpty(row[10].ToString()))
                {
                    monitor.KJCK = null;
                }
                else
                {
                    monitor.KJCK = Convert.ToInt16(row[10].ToString());
                }

                return monitor;
            }
            catch (Exception ex)
            {
                logger.Error("Monitor解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测点（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static MonitorString ParseMonitorString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析监测点（文本）数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测点（文本）不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MonitorString monitorString = new MonitorString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    JCDMC = row[1].ToString(),
                    JCDBH = row[2].ToString(),
                    PMWZX = row[5].ToString(),
                    PMWZY = row[6].ToString(),
                    GC = row[7].ToString(),
                    SD = row[8].ToString(),
                    KS = row[9].ToString(),
                    KJCK = row[10].ToString(),
                    CJSJ = row[11].ToString(),
                    BSM = row[12].ToString(),
                    ZTM = Convert.ToInt16(row[13].ToString()),
                    BZ = row[14].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    monitorString.JCFF = string.Empty;
                }
                else
                {
                    monitorString.JCFF = EnumExtension.GetRemark((MODEL.Enum.AutoDeviceType)System.Enum.Parse(typeof(MODEL.Enum.AutoDeviceType), row[3].ToString()));
                }

                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    monitorString.JCZLX = string.Empty;
                }
                else
                {
                    monitorString.JCZLX = EnumExtension.GetRemark((MODEL.Enum.GNSSStationType)System.Enum.Parse(typeof(MODEL.Enum.GNSSStationType), row[4].ToString()));
                }

                return monitorString;
            }
            catch (Exception ex)
            {
                logger.Error("MonitorStringr解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测剖面
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static Section ParseSection(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析监测剖面数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测剖面不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                Section section = new Section()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    PMMC = row[1].ToString(),
                    PMBH = row[2].ToString(),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    ZTM = Convert.ToInt16(row[7].ToString()),
                    BZ = row[8].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    section.PMLX = null;
                }
                else
                {
                    section.PMLX = Convert.ToInt16(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    section.PMDJ = null;
                }
                else
                {
                    section.PMDJ = Convert.ToInt16(row[4].ToString());
                }

                return section;
            }
            catch (Exception ex)
            {
                logger.Error("Section解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测剖面（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static SectionString ParseSectionString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析监测剖面（文本）数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测剖面（文本）不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SectionString sectionString = new SectionString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    PMMC = row[1].ToString(),
                    PMBH = row[2].ToString(),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    ZTM = Convert.ToInt16(row[7].ToString()),
                    BZ = row[8].ToString()
                };

                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    sectionString.PMLX = string.Empty;
                }
                else
                {
                    sectionString.PMLX = EnumExtension.GetRemark((MODEL.Enum.SectionType)System.Enum.Parse(typeof(MODEL.Enum.SectionType), row[3].ToString()));
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    sectionString.PMDJ = string.Empty;
                }
                else
                {
                    sectionString.PMDJ = EnumExtension.GetRemark((MODEL.Enum.SectionLevel)System.Enum.Parse(typeof(MODEL.Enum.SectionLevel), row[4].ToString()));
                }

                return sectionString;
            }
            catch (Exception ex)
            {
                logger.Error("SectionString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 崩塌（危岩体）属性
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockfallProperty ParseRockfallProperty(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析崩塌（危岩体）属性数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("崩塌（危岩体）属性不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallProperty rockfallProperty = new RockfallProperty()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    QTKZJGMLX = row[4].ToString(),
                    BTSJ = row[8].ToString(),
                    YFYS = row[17].ToString(),
                    QTYFYS = row[18].ToString(),
                    WXDX = row[31].ToString(),
                    QTWXDX = row[32].ToString(),
                    DXDM = row[33].ToString(),
                    DCYXYXZH = row[34].ToString(),
                    XPJGDZGZ = row[35].ToString(),
                    SWDZTJ = row[36].ToString(),
                    ZBTDLY = row[37].ToString(),
                    RLGCHD = row[38].ToString(),
                    BTYQ = row[39].ToString(),
                    BTDJT = row[40].ToString(),
                    BTLJQ = row[41].ToString(),
                    WXXFX = row[42].ToString(),
                    WHFX = row[43].ToString(),
                    CJSJ = row[44].ToString(),
                    BSM = row[45].ToString(),
                    ZTM = Convert.ToInt16(row[46].ToString()),
                    BZ = row[47].ToString()
                };

                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    rockfallProperty.YDXS = null;
                }
                else
                {
                    rockfallProperty.YDXS = Convert.ToInt16(row[1].ToString());
                }
                if (string.IsNullOrEmpty(row[2].ToString()))
                {
                    rockfallProperty.BTLX = null;
                }
                else
                {
                    rockfallProperty.BTLX = Convert.ToInt16(row[2].ToString());
                }
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    rockfallProperty.KZJGMLX = null;
                }
                else
                {
                    rockfallProperty.KZJGMLX = Convert.ToInt16(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    rockfallProperty.HGWDXPJ = null;
                }
                else
                {
                    rockfallProperty.HGWDXPJ = Convert.ToInt16(row[5].ToString());
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    rockfallProperty.HDZT = null;
                }
                else
                {
                    rockfallProperty.HDZT = Convert.ToInt16(row[6].ToString());
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    rockfallProperty.BTYKZFS = null;
                }
                else
                {
                    rockfallProperty.BTYKZFS = Convert.ToInt16(row[7].ToString());
                }
                if (string.IsNullOrEmpty(row[9].ToString()))
                {
                    rockfallProperty.ZBFX = null;
                }
                else
                {
                    rockfallProperty.ZBFX = Convert.ToDouble(row[9].ToString());
                }
                if (string.IsNullOrEmpty(row[10].ToString()))
                {
                    rockfallProperty.BTYGC = null;
                }
                else
                {
                    rockfallProperty.BTYGC = Convert.ToDouble(row[10].ToString());
                }
                if (string.IsNullOrEmpty(row[11].ToString()))
                {
                    rockfallProperty.ZDLC = null;
                }
                else
                {
                    rockfallProperty.ZDLC = Convert.ToDouble(row[11].ToString());
                }
                if (string.IsNullOrEmpty(row[12].ToString()))
                {
                    rockfallProperty.ZDSPWY = null;
                }
                else
                {
                    rockfallProperty.ZDSPWY = Convert.ToDouble(row[12].ToString());
                }
                if (string.IsNullOrEmpty(row[13].ToString()))
                {
                    rockfallProperty.BTYKD = null;
                }
                else
                {
                    rockfallProperty.BTYKD = Convert.ToDouble(row[13].ToString());
                }
                if (string.IsNullOrEmpty(row[14].ToString()))
                {
                    rockfallProperty.BTYHD = null;
                }
                else
                {
                    rockfallProperty.BTYHD = Convert.ToDouble(row[14].ToString());
                }
                if (string.IsNullOrEmpty(row[15].ToString()))
                {
                    rockfallProperty.BTYMJ = null;
                }
                else
                {
                    rockfallProperty.BTYMJ = Convert.ToDouble(row[15].ToString());
                }
                if (string.IsNullOrEmpty(row[16].ToString()))
                {
                    rockfallProperty.BTYTJ = null;
                }
                else
                {
                    rockfallProperty.BTYTJ = Convert.ToDouble(row[16].ToString());
                }
                if (string.IsNullOrEmpty(row[19].ToString()))
                {
                    rockfallProperty.DJTPJHD = null;
                }
                else
                {
                    rockfallProperty.DJTPJHD = Convert.ToDouble(row[19].ToString());
                }
                if (string.IsNullOrEmpty(row[20].ToString()))
                {
                    rockfallProperty.DJTMJ = null;
                }
                else
                {
                    rockfallProperty.DJTMJ = Convert.ToDouble(row[20].ToString());
                }
                if (string.IsNullOrEmpty(row[21].ToString()))
                {
                    rockfallProperty.DJTTJ = null;
                }
                else
                {
                    rockfallProperty.DJTTJ = Convert.ToDouble(row[21].ToString());
                }
                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    rockfallProperty.GMDJ = null;
                }
                else
                {
                    rockfallProperty.GMDJ = Convert.ToInt16(row[22].ToString());
                }
                if (string.IsNullOrEmpty(row[23].ToString()))
                {
                    rockfallProperty.STGH = null;
                }
                else
                {
                    try
                    {
                        rockfallProperty.STGH = Convert.ToBoolean(row[23].ToString());
                    }
                    catch
                    {
                        rockfallProperty.STGH = null;
                    }
                }
                if (string.IsNullOrEmpty(row[24].ToString()))
                {
                    rockfallProperty.QDXCD = null;
                }
                else
                {
                    rockfallProperty.QDXCD = Convert.ToInt16(row[24].ToString());
                }
                if (string.IsNullOrEmpty(row[25].ToString()))
                {
                    rockfallProperty.SWRS = null;
                }
                else
                {
                    rockfallProperty.SWRS = Convert.ToInt16(row[25].ToString());
                }
                if (string.IsNullOrEmpty(row[26].ToString()))
                {
                    rockfallProperty.WXRS = null;
                }
                else
                {
                    rockfallProperty.WXRS = Convert.ToInt16(row[26].ToString());
                }
                if (string.IsNullOrEmpty(row[27].ToString()))
                {
                    rockfallProperty.ZJSS = null;
                }
                else
                {
                    rockfallProperty.ZJSS = Convert.ToDouble(row[27].ToString());
                }
                if (string.IsNullOrEmpty(row[28].ToString()))
                {
                    rockfallProperty.WXCC = null;
                }
                else
                {
                    rockfallProperty.WXCC = Convert.ToDouble(row[28].ToString());
                }
                if (string.IsNullOrEmpty(row[29].ToString()))
                {
                    rockfallProperty.ZQDJ = null;
                }
                else
                {
                    rockfallProperty.ZQDJ = Convert.ToInt16(row[29].ToString());
                }
                if (string.IsNullOrEmpty(row[30].ToString()))
                {
                    rockfallProperty.XQDJ = null;
                }
                else
                {
                    rockfallProperty.XQDJ = Convert.ToInt16(row[30].ToString());
                }

                return rockfallProperty;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallProperty解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 崩塌（危岩体）属性(文本)
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static RockfallPropertyString ParseRockfallPropertyString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析崩塌（危岩体）属性数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("崩塌（危岩体）属性不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallPropertyString rockfallPropertyString = new RockfallPropertyString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    QTKZJGMLX = row[4].ToString(),
                    BTSJ = row[8].ToString(),
                    ZBFX = row[9].ToString(),
                    BTYGC = row[10].ToString(),
                    ZDLC = row[11].ToString(),
                    ZDSPWY = row[12].ToString(),
                    BTYKD = row[13].ToString(),
                    BTYHD = row[14].ToString(),
                    BTYMJ = row[15].ToString(),
                    BTYTJ = row[16].ToString(),
                    QTYFYS = row[18].ToString(),
                    DJTPJHD = row[19].ToString(),
                    DJTMJ = row[20].ToString(),
                    DJTTJ = row[21].ToString(),
                    SWRS = row[25].ToString(),
                    WXRS = row[26].ToString(),
                    ZJSS = row[27].ToString(),
                    WXCC = row[28].ToString(),
                    QTWXDX = row[32].ToString(),
                    DXDM = row[33].ToString(),
                    DCYXYXZH = row[34].ToString(),
                    XPJGDZGZ = row[35].ToString(),
                    SWDZTJ = row[36].ToString(),
                    ZBTDLY = row[37].ToString(),
                    RLGCHD = row[38].ToString(),
                    BTYQ = row[39].ToString(),
                    BTDJT = row[40].ToString(),
                    BTLJQ = row[41].ToString(),
                    WXXFX = row[42].ToString(),
                    WHFX = row[43].ToString(),
                    CJSJ = row[44].ToString(),
                    BSM = row[45].ToString(),
                    ZTM = Convert.ToInt16(row[46].ToString()),
                    BZ = row[47].ToString()
                };

                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    rockfallPropertyString.YDXS = null;
                }
                else
                {
                    rockfallPropertyString.YDXS = EnumExtension.GetRemark((MODEL.EnumEW.WYYDXS)System.Enum.Parse(typeof(MODEL.EnumEW.WYYDXS), row[1].ToString()));
                }
                if (string.IsNullOrEmpty(row[2].ToString()))
                {
                    rockfallPropertyString.BTLX = null;
                }
                else
                {
                    rockfallPropertyString.BTLX = EnumExtension.GetRemark((MODEL.EnumEW.WYBTLX)System.Enum.Parse(typeof(MODEL.EnumEW.WYBTLX), row[2].ToString()));
                }
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    rockfallPropertyString.KZJGMLX = null;
                }
                else
                {
                    rockfallPropertyString.KZJGMLX = EnumExtension.GetRemark((MODEL.EnumEW.WYKZJGMLX)System.Enum.Parse(typeof(MODEL.EnumEW.WYKZJGMLX), row[3].ToString()));
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    rockfallPropertyString.HGWDXPJ = null;
                }
                else
                {
                    rockfallPropertyString.HGWDXPJ = EnumExtension.GetRemark((MODEL.EnumEW.WYHGWDXPJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYHGWDXPJ), row[5].ToString()));
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    rockfallPropertyString.HDZT = null;
                }
                else
                {
                    rockfallPropertyString.HDZT = EnumExtension.GetRemark((MODEL.EnumEW.WYHDZT)System.Enum.Parse(typeof(MODEL.EnumEW.WYHDZT), row[6].ToString()));
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    rockfallPropertyString.BTYKZFS = null;
                }
                else
                {
                    rockfallPropertyString.BTYKZFS = EnumExtension.GetRemark((MODEL.EnumEW.WYBTYKZFS)System.Enum.Parse(typeof(MODEL.EnumEW.WYBTYKZFS), row[7].ToString()));
                }
                if (string.IsNullOrEmpty(row[17].ToString()))
                {
                    rockfallPropertyString.YFYS = string.Empty;
                }
                else
                {
                    string yfyss = string.Empty;
                    string[] wyyfyss = row[17].ToString().Split(new char[] { ',' });
                    for (int i = 0; i < wyyfyss.Length; i++)
                    {
                        yfyss += EnumExtension.GetRemark((MODEL.EnumEW.WYYFYS)System.Enum.Parse(typeof(MODEL.EnumEW.WYYFYS), wyyfyss[i])) + ",";
                    }
                    rockfallPropertyString.YFYS = yfyss.TrimEnd(',');
                }
                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    rockfallPropertyString.GMDJ = null;
                }
                else
                {
                    rockfallPropertyString.GMDJ = EnumExtension.GetRemark((MODEL.EnumEW.WYGMDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYGMDJ), row[22].ToString()));
                }
                if (string.IsNullOrEmpty(row[23].ToString()))
                {
                    rockfallPropertyString.STGH = string.Empty;
                }
                else
                {
                    if ((row[23].ToString().ToLower() == "true") || (row[23].ToString() == "t"))
                    {
                        rockfallPropertyString.STGH = "是";
                    }
                    else if ((row[23].ToString().ToLower() == "false") || (row[23].ToString() == "f"))
                    {
                        rockfallPropertyString.STGH = "否";
                    }
                    else
                    {
                        rockfallPropertyString.STGH = string.Empty;
                    }
                }
                if (string.IsNullOrEmpty(row[24].ToString()))
                {
                    rockfallPropertyString.QDXCD = null;
                }
                else
                {
                    rockfallPropertyString.QDXCD = EnumExtension.GetRemark((MODEL.EnumEW.WYQDXCD)System.Enum.Parse(typeof(MODEL.EnumEW.WYQDXCD), row[24].ToString()));
                }

                if (string.IsNullOrEmpty(row[29].ToString()))
                {
                    rockfallPropertyString.ZQDJ = null;
                }
                else
                {
                    rockfallPropertyString.ZQDJ = EnumExtension.GetRemark((MODEL.EnumEW.WYZQDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYQDXCD), row[29].ToString()));
                }
                if (string.IsNullOrEmpty(row[30].ToString()))
                {
                    rockfallPropertyString.XQDJ = null;
                }
                else
                {
                    rockfallPropertyString.XQDJ = EnumExtension.GetRemark((MODEL.EnumEW.WYXQDJ)System.Enum.Parse(typeof(MODEL.EnumEW.WYXQDJ), row[30].ToString()));
                }
                if (string.IsNullOrEmpty(row[31].ToString()))
                {
                    rockfallPropertyString.WXDX = string.Empty;
                }
                else
                {
                    string wxdxs = string.Empty;
                    string[] wywxdxss = row[31].ToString().Split(new char[] { ',' });
                    for (int i = 0; i < wywxdxss.Length; i++)
                    {
                        wxdxs += EnumExtension.GetRemark((MODEL.EnumEW.WYWXDX)System.Enum.Parse(typeof(MODEL.EnumEW.WYWXDX), wywxdxss[i])) + ",";
                    }
                    rockfallPropertyString.WXDX = wxdxs.TrimEnd(',');
                }

                return rockfallPropertyString;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallPropertyString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 崩塌（危岩体）预警模型参数
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static RockfallWarning ParseRockfallRockfallWarning(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析崩塌（危岩体）预警模型参数为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("崩塌（危岩体）预警模型参数不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallWarning rockfallWarning = new RockfallWarning()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    CJSJ = row[43].ToString(),
                    BSM = row[44].ToString(),
                    ZTM = Convert.ToInt16(row[45].ToString()),
                    BZ = row[46].ToString()
                };

                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    rockfallWarning.CType1 = null;
                }
                else
                {
                    rockfallWarning.CType1 = Convert.ToInt16(row[1].ToString());
                }
                if (string.IsNullOrEmpty(row[2].ToString()))
                {
                    rockfallWarning.CType2 = null;
                }
                else
                {
                    rockfallWarning.CType2 = Convert.ToInt16(row[2].ToString());
                }
                if (string.IsNullOrEmpty(row[3].ToString()))
                {
                    rockfallWarning.Alt_up = null;
                }
                else
                {
                    rockfallWarning.Alt_up = Convert.ToDouble(row[3].ToString());
                }
                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    rockfallWarning.Alt_down = null;
                }
                else
                {
                    rockfallWarning.Alt_down = Convert.ToDouble(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    rockfallWarning.Rock_vol = null;
                }
                else
                {
                    rockfallWarning.Rock_vol = Convert.ToDouble(row[5].ToString());
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    rockfallWarning.Frame_H = null;
                }
                else
                {
                    rockfallWarning.Frame_H = Convert.ToDouble(row[6].ToString());
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    rockfallWarning.Frame_W = null;
                }
                else
                {
                    rockfallWarning.Frame_W = Convert.ToDouble(row[7].ToString());
                }
                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    rockfallWarning.Frame_Th = null;
                }
                else
                {
                    rockfallWarning.Frame_Th = Convert.ToDouble(row[8].ToString());
                }
                if (string.IsNullOrEmpty(row[9].ToString()))
                {
                    rockfallWarning.Rock_char = null;
                }
                else
                {
                    rockfallWarning.Rock_char = Convert.ToInt16(row[9].ToString());
                }
                if (string.IsNullOrEmpty(row[10].ToString()))
                {
                    rockfallWarning.Coll_Dir = null;
                }
                else
                {
                    rockfallWarning.Coll_Dir = Convert.ToDouble(row[10].ToString());
                }
                if (string.IsNullOrEmpty(row[11].ToString()))
                {
                    rockfallWarning.OcofRS = null;
                }
                else
                {
                    rockfallWarning.OcofRS = Convert.ToDouble(row[11].ToString());
                }
                if (string.IsNullOrEmpty(row[12].ToString()))
                {
                    rockfallWarning.IAofRS = null;
                }
                else
                {
                    rockfallWarning.IAofRS = Convert.ToDouble(row[12].ToString());
                }
                if (string.IsNullOrEmpty(row[13].ToString()))
                {
                    rockfallWarning.UW = null;
                }
                else
                {
                    rockfallWarning.UW = Convert.ToDouble(row[13].ToString());
                }
                if (string.IsNullOrEmpty(row[14].ToString()))
                {
                    rockfallWarning.SA = null;
                }
                else
                {
                    rockfallWarning.SA = Convert.ToDouble(row[14].ToString());
                }
                if (string.IsNullOrEmpty(row[15].ToString()))
                {
                    rockfallWarning.OW = null;
                }
                else
                {
                    rockfallWarning.OW = Convert.ToDouble(row[15].ToString());
                }
                if (string.IsNullOrEmpty(row[16].ToString()))
                {
                    rockfallWarning.IASS = null;
                }
                else
                {
                    rockfallWarning.IASS = Convert.ToDouble(row[16].ToString());
                }
                if (string.IsNullOrEmpty(row[17].ToString()))
                {
                    rockfallWarning.LSS = null;
                }
                else
                {
                    rockfallWarning.LSS = Convert.ToDouble(row[17].ToString());
                }
                if (string.IsNullOrEmpty(row[18].ToString()))
                {
                    rockfallWarning.FASS = null;
                }
                else
                {
                    rockfallWarning.FASS = Convert.ToDouble(row[18].ToString());
                }
                if (string.IsNullOrEmpty(row[19].ToString()))
                {
                    rockfallWarning.CSS = null;
                }
                else
                {
                    rockfallWarning.CSS = Convert.ToDouble(row[19].ToString());
                }
                if (string.IsNullOrEmpty(row[20].ToString()))
                {
                    rockfallWarning.HDPC = null;
                }
                else
                {
                    rockfallWarning.HDPC = Convert.ToDouble(row[20].ToString());
                }
                if (string.IsNullOrEmpty(row[21].ToString()))
                {
                    rockfallWarning.PRR = null;
                }
                else
                {
                    rockfallWarning.PRR = Convert.ToDouble(row[21].ToString());
                }
                if (string.IsNullOrEmpty(row[22].ToString()))
                {
                    rockfallWarning.EMR = null;
                }
                else
                {
                    rockfallWarning.EMR = Convert.ToDouble(row[22].ToString());
                }
                if (string.IsNullOrEmpty(row[23].ToString()))
                {
                    rockfallWarning.IAPC = null;
                }
                else
                {
                    rockfallWarning.IAPC = Convert.ToDouble(row[23].ToString());
                }
                if (string.IsNullOrEmpty(row[24].ToString()))
                {
                    rockfallWarning.IAI = null;
                }
                else
                {
                    rockfallWarning.IAI = Convert.ToDouble(row[24].ToString());
                }
                if (string.IsNullOrEmpty(row[25].ToString()))
                {
                    rockfallWarning.HDCD = null;
                }
                else
                {
                    rockfallWarning.HDCD = Convert.ToDouble(row[25].ToString());
                }
                if (string.IsNullOrEmpty(row[26].ToString()))
                {
                    rockfallWarning.VDCD = null;
                }
                else
                {
                    rockfallWarning.VDCD = Convert.ToDouble(row[26].ToString());
                }
                if (string.IsNullOrEmpty(row[27].ToString()))
                {
                    rockfallWarning.SCP_H = null;
                }
                else
                {
                    rockfallWarning.SCP_H = Convert.ToDouble(row[27].ToString());
                }
                if (string.IsNullOrEmpty(row[28].ToString()))
                {
                    rockfallWarning.VDPC = null;
                }
                else
                {
                    rockfallWarning.VDPC = Convert.ToDouble(row[28].ToString());
                }
                if (string.IsNullOrEmpty(row[29].ToString()))
                {
                    rockfallWarning.MRC = null;
                }
                else
                {
                    rockfallWarning.MRC = Convert.ToDouble(row[29].ToString());
                }
                if (string.IsNullOrEmpty(row[30].ToString()))
                {
                    rockfallWarning.SCP_HD = null;
                }
                else
                {
                    rockfallWarning.SCP_HD = Convert.ToDouble(row[30].ToString());
                }
                if (string.IsNullOrEmpty(row[31].ToString()))
                {
                    rockfallWarning.SCP_AO = null;
                }
                else
                {
                    rockfallWarning.SCP_AO = Convert.ToDouble(row[31].ToString());
                }
                if (string.IsNullOrEmpty(row[32].ToString()))
                {
                    rockfallWarning.SCP_BO = null;
                }
                else
                {
                    rockfallWarning.SCP_BO = Convert.ToDouble(row[32].ToString());
                }
                if (string.IsNullOrEmpty(row[33].ToString()))
                {
                    rockfallWarning.SCP_C = null;
                }
                else
                {
                    rockfallWarning.SCP_C = Convert.ToDouble(row[33].ToString());
                }
                if (string.IsNullOrEmpty(row[34].ToString()))
                {
                    rockfallWarning.SCP_FA = null;
                }
                else
                {
                    rockfallWarning.SCP_FA = Convert.ToDouble(row[34].ToString());
                }
                if (string.IsNullOrEmpty(row[35].ToString()))
                {
                    rockfallWarning.FLk = null;
                }
                else
                {
                    rockfallWarning.FLk = Convert.ToDouble(row[35].ToString());
                }
                if (string.IsNullOrEmpty(row[36].ToString()))
                {
                    rockfallWarning.HDCR = null;
                }
                else
                {
                    rockfallWarning.HDCR = Convert.ToDouble(row[36].ToString());
                }
                if (string.IsNullOrEmpty(row[37].ToString()))
                {
                    rockfallWarning.VDCR = null;
                }
                else
                {
                    rockfallWarning.VDCR = Convert.ToDouble(row[37].ToString());
                }
                if (string.IsNullOrEmpty(row[38].ToString()))
                {
                    rockfallWarning.SCP_DS = null;
                }
                else
                {
                    rockfallWarning.SCP_DS = Convert.ToDouble(row[38].ToString());
                }
                if (string.IsNullOrEmpty(row[39].ToString()))
                {
                    rockfallWarning.SCP_Ba = null;
                }
                else
                {
                    rockfallWarning.SCP_Ba = Convert.ToDouble(row[39].ToString());
                }
                if (string.IsNullOrEmpty(row[40].ToString()))
                {
                    rockfallWarning.SCP_Mk = null;
                }
                else
                {
                    rockfallWarning.SCP_Mk = Convert.ToDouble(row[40].ToString());
                }
                if (string.IsNullOrEmpty(row[41].ToString()))
                {
                    rockfallWarning.SCP_e = null;
                }
                else
                {
                    rockfallWarning.SCP_e = Convert.ToDouble(row[41].ToString());
                }
                if (string.IsNullOrEmpty(row[42].ToString()))
                {
                    rockfallWarning.Rt = null;
                }
                else
                {
                    rockfallWarning.Rt = Convert.ToDouble(row[42].ToString());
                }


                return rockfallWarning;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallWarning解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 崩塌（危岩体）预警模型参数(文本)
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static RockfallWarningString ParseRockfallWarningString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析崩塌（危岩体）预警模型参数(文本)为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("崩塌（危岩体）预警模型参数(文本)不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallWarningString rockfallWarningString = new RockfallWarningString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Alt_up = row[3].ToString(),
                    Alt_down = row[4].ToString(),
                    Rock_vol = row[5].ToString(),
                    Frame_H = row[6].ToString(),
                    Frame_W = row[7].ToString(),
                    Frame_Th = row[8].ToString(),
                    Coll_Dir = row[10].ToString(),
                    OcofRS = row[11].ToString(),
                    IAofRS = row[12].ToString(),
                    UW = row[13].ToString(),
                    SA = row[14].ToString(),
                    OW = row[15].ToString(),
                    IASS = row[16].ToString(),
                    LSS = row[17].ToString(),
                    FASS = row[18].ToString(),
                    CSS = row[19].ToString(),
                    HDPC = row[20].ToString(),
                    PRR = row[21].ToString(),
                    EMR = row[22].ToString(),
                    IAPC = row[23].ToString(),
                    IAI = row[24].ToString(),
                    HDCD = row[25].ToString(),
                    VDCD = row[26].ToString(),
                    SCP_H = row[27].ToString(),
                    VDPC = row[28].ToString(),
                    MRC = row[29].ToString(),
                    SCP_HD = row[30].ToString(),
                    SCP_AO = row[31].ToString(),
                    SCP_BO = row[32].ToString(),
                    SCP_C = row[33].ToString(),
                    SCP_FA = row[34].ToString(),
                    FLk = row[35].ToString(),
                    HDCR = row[36].ToString(),
                    VDCR = row[37].ToString(),
                    SCP_DS = row[38].ToString(),
                    SCP_Ba = row[39].ToString(),
                    SCP_Mk = row[40].ToString(),
                    SCP_e = row[41].ToString(),
                    Rt = row[42].ToString(),
                    CJSJ = row[43].ToString(),
                    BSM = row[44].ToString(),
                    ZTM = Convert.ToInt16(row[45].ToString()),
                    BZ = row[46].ToString()
                };


                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    rockfallWarningString.CType1 = string.Empty;
                }
                else
                {
                    rockfallWarningString.CType1 = EnumExtension.GetRemark((MODEL.EnumEW.WYPHMSDM)System.Enum.Parse(typeof(MODEL.EnumEW.WYPHMSDM), row[1].ToString()));
                }
                if (string.IsNullOrEmpty(row[2].ToString()))
                {
                    rockfallWarningString.CType2 = string.Empty;
                }
                else
                {
                    rockfallWarningString.CType2 = EnumExtension.GetRemark((MODEL.EnumEW.WYPHMSYXDM)System.Enum.Parse(typeof(MODEL.EnumEW.WYPHMSYXDM), row[2].ToString()));
                }
                if (string.IsNullOrEmpty(row[9].ToString()))
                {
                    rockfallWarningString.Rock_char = row[9].ToString();
                }
                else
                {
                    rockfallWarningString.Rock_char = row[9].ToString();
                }

                return rockfallWarningString;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallWarningString解析失败：" + data, ex);
                return null;
            }
        }




        /// <summary>
        /// 预警信息
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static WarningInfo ParseWarningInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析预警信息数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("预警信息不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WarningInfo warningInfo = new WarningInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    YJJB = Convert.ToInt16(row[1].ToString()),
                    ZHT = Convert.ToInt32(row[2].ToString()),
                    YJSJ = row[3].ToString(),
                    YJNR = row[4].ToString(),
                    YJZT = Convert.ToInt16(row[5].ToString()),
                    CLNR = row[6].ToString(),
                    CLSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    ZTM = Convert.ToInt16(row[10].ToString()),
                    BZ = row[11].ToString()
                };

                return warningInfo;
            }
            catch (Exception ex)
            {
                logger.Error("WarningInfo解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 预警信息（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static WarningInfoString ParseWarningInfoString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析预警信息（文本）数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("预警信息（文本）不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WarningInfoString warningInfoString = new WarningInfoString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ZHT = row[2].ToString(),
                    YJSJ = row[3].ToString(),
                    YJNR = row[4].ToString(),
                    CLNR = row[6].ToString(),
                    CLSJ = row[7].ToString(),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    ZTM = Convert.ToInt16(row[10].ToString()),
                    BZ = row[11].ToString()
                };

                if (string.IsNullOrEmpty(row[1].ToString()))
                {
                    warningInfoString.YJJB = String.Empty;
                }
                else
                {
                    warningInfoString.YJJB = EnumExtension.GetRemark((MODEL.EnumEW.WarningLevel)System.Enum.Parse(typeof(MODEL.EnumEW.WarningLevel), row[1].ToString()));
                }
                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    warningInfoString.YJZT = String.Empty;
                }
                else
                {
                    warningInfoString.YJZT = EnumExtension.GetRemark((MODEL.EnumEW.WarningState)System.Enum.Parse(typeof(MODEL.EnumEW.WarningState), row[5].ToString()));
                }

                return warningInfoString;
            }
            catch (Exception ex)
            {
                logger.Error("WarningInfoString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 危岩崩塌临界条件/阈值
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static RockfallThreshold ParseRockfallThreshold(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("危岩崩塌临界条件数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("危岩崩塌临界条件不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallThreshold rockfallThreshold = new RockfallThreshold()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    GS = Convert.ToInt16(row[1].ToString()),
                    XS = Convert.ToDouble(row[2].ToString()),
                    YZ = Convert.ToDouble(row[3].ToString()),
                    DW = row[4].ToString(),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    ZTM = Convert.ToInt16(row[7].ToString()),
                    BZ = row[8].ToString()
                };

                return rockfallThreshold;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallThreshold解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 危岩崩塌临界条件/阈值（文本）
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static RockfallThresholdString ParseRockfallThresholdString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("危岩崩塌临界条件（文本）数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("危岩崩塌临界条件（文本）不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RockfallThresholdString rockfallThresholdString = new RockfallThresholdString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    GS = row[1].ToString(),
                    XS = row[2].ToString(),
                    YZ = row[3].ToString(),
                    DW = row[4].ToString(),
                    CJSJ = row[5].ToString(),
                    BSM = row[6].ToString(),
                    ZTM = Convert.ToInt16(row[7].ToString()),
                    BZ = row[8].ToString()
                };

                return rockfallThresholdString;
            }
            catch (Exception ex)
            {
                logger.Error("RockfallThresholdString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测阈值
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MonitorThreshold ParseMonitorThreshold(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("监测阈值数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测阈值不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MonitorThreshold monitorThreshold = new MonitorThreshold()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    LX = Convert.ToInt16(row[1].ToString()),
                    XS = Convert.ToDouble(row[2].ToString()),
                    YZ = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt16(row[6].ToString()),
                    BZ = row[7].ToString()
                };

                return monitorThreshold;
            }
            catch (Exception ex)
            {
                logger.Error("MonitorThreshold解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 监测阈值
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MonitorThresholdString ParseMonitorThresholdString(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("监测阈值（文本）数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测阈值（文本）不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MonitorThresholdString monitorThresholdString = new MonitorThresholdString()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    LX = EnumExtension.GetRemark((MODEL.Enum.AutoDeviceType)System.Enum.Parse(typeof(MODEL.Enum.AutoDeviceType), row[1].ToString())),
                    XS = row[2].ToString(),
                    YZ = row[3].ToString(),
                    CJSJ = row[4].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt16(row[6].ToString()),
                    BZ = row[7].ToString()
                };

                return monitorThresholdString;
            }
            catch (Exception ex)
            {
                logger.Error("MonitorThresholdString解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 预警判据
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static WarningCriterion ParseWarningCriterion(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("预警判据数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("预警判据不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WarningCriterion warningCriterion = new WarningCriterion()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    PJMC = row[1].ToString(),
                    YJJB = Convert.ToInt16(row[2].ToString()),
                    ZHT = Convert.ToInt32(row[3].ToString()),
                    JCD = Convert.ToInt32(row[4].ToString()),
                    PJGS = row[5].ToString(),
                    MS = row[6].ToString(),
                    CJSJ = row[7].ToString(),
                    BSM = row[8].ToString(),
                    ZTM = Convert.ToInt16(row[9].ToString()),
                    BZ = row[10].ToString()
                };

                return warningCriterion;
            }
            catch (Exception ex)
            {
                logger.Error("WarningCriterion解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 预警模型
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static WarningModel ParseWarningModel(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("预警模型数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("预警模型不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WarningModel warningModel = new WarningModel()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MXMC = row[1].ToString(),
                    ZHT = Convert.ToInt32(row[2].ToString()),
                    YJTJ = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt16(row[6].ToString()),
                    BZ = row[7].ToString()
                };

                return warningModel;
            }
            catch (Exception ex)
            {
                logger.Error("WarningModel解析失败：" + data, ex);
                return null;
            }
        }










        /// <summary>
        /// 三维实景模型
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static SurModel ParseSurModel(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析三维实景模型数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("三维实景模型不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SurModel model = new SurModel()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MXMC = row[1].ToString(),
                    MXLJ = row[2].ToString(),
                    MXSJ = row[3].ToString(),
                    MXJB = Convert.ToInt16(row[4].ToString()),
                    CJSJ = row[8].ToString(),
                    BSM = row[9].ToString(),
                    ZTM = Convert.ToInt16(row[10].ToString()),
                    BZ = row[11].ToString()
                };

                if (string.IsNullOrEmpty(row[5].ToString()))
                {
                    model.MXST = null;
                }
                else
                {
                    model.MXST = row[5].ToString();
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    model.MXFW = null;
                }
                else
                {
                    model.MXFW = row[6].ToString();
                }
                if (string.IsNullOrEmpty(row[7].ToString()))
                {
                    model.SRID = null;
                }
                else
                {
                    model.SRID = Convert.ToInt16(row[7].ToString());
                }

                return model;
            }
            catch (Exception ex)
            {
                logger.Error("SurModel解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 点云
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static SurPointCloud ParseSurPointCloud(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析点云数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("点云不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SurPointCloud surPointCloud = new SurPointCloud()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DYMC = row[1].ToString(),
                    DYLJ = row[2].ToString(),
                    DYGS = Convert.ToInt16(row[3].ToString()),
                    SJSJ = row[5].ToString(),
                    QKFW = row[7].ToString(),
                    CJSJ = row[9].ToString(),
                    BSM = row[10].ToString(),
                    BZ = row[12].ToString()
                };

                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    surPointCloud.DYJB = null;
                }
                else
                {
                    surPointCloud.DYJB = Convert.ToInt16(row[4].ToString());
                }
                if (string.IsNullOrEmpty(row[6].ToString()))
                {
                    surPointCloud.FBL = null;
                }
                else
                {
                    surPointCloud.FBL = Convert.ToDouble(row[6].ToString());
                }
                if (string.IsNullOrEmpty(row[8].ToString()))
                {
                    surPointCloud.SRID = null;
                }
                else
                {
                    surPointCloud.SRID = Convert.ToInt16(row[8].ToString());
                }

                return surPointCloud;
            }
            catch (Exception ex)
            {
                logger.Error("SurPointCloud解析失败：" + data, ex);
                return null;
            }
        }





        #endregion

        #region 业务映射
        /// <summary>
        /// 项目-灾害体映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectDisaster ParseMapProjectDisaster(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-灾害体映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-灾害体不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectDisaster mapProjectDisaster = new MapProjectDisaster()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    DisasterId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapProjectDisaster;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectDisaster解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目-监测点映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectMonitor ParseMapProjectMonitor(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-监测点映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-监测点映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectMonitor mapProjectMonitor = new MapProjectMonitor()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    MonitorId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapProjectMonitor;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectMonitor解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目-测绘数据映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectSurvey ParseMapProjectSurvey(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目测绘数据映射映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目测绘数据映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectSurvey mapProjectSurvey = new MapProjectSurvey()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    SurveyId = Convert.ToInt32(row[2].ToString()),
                    Type = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString(),
                    Role = Convert.ToInt16(row[5].ToString())
                };

                return mapProjectSurvey;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectSurvey解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目-预警信息映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectWarningInfo ParseMapProjectWarningInfo(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-预警信息映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-预警信息映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectWarningInfo mapProjectWarningInfo = new MapProjectWarningInfo()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    WarningInfoId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapProjectWarningInfo;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectWarningInfo解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 项目-预警模型映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapProjectWarningModel ParseMapProjectWarningModel(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("项目-预警模型映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("项目-预警模型映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapProjectWarningModel mapProjectWarningModel = new MapProjectWarningModel()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    WarningModelId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapProjectWarningModel;
            }
            catch (Exception ex)
            {
                logger.Error("MapProjectWarningModel解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 灾害体-监测剖面映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterSection ParseMapDisasterSection(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-监测剖面映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-监测剖面映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterSection mapDisasterSection = new MapDisasterSection()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    SectionId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDisasterSection;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterSection解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体-监测点映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterMonitor ParseMapDisasterMonitor(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-监测点映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-监测点映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterMonitor mapDisasterMonitor = new MapDisasterMonitor()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    MonitorId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDisasterMonitor;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterMonitor解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体-属性映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterProperty ParseMapDisasterProperty(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-属性映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-属性映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterProperty mapDisasterProperty = new MapDisasterProperty()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    PropertyId = Convert.ToInt32(row[2].ToString()),
                    Type = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString()
                };

                return mapDisasterProperty;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterProperty解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体-预警模型参数映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterWarning ParseMapDisasterWarning(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-预警模型参数映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-预警模型参数映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterWarning mapDisasterWarning = new MapDisasterWarning()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    WarningId = Convert.ToInt32(row[2].ToString()),
                    Type = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString()
                };

                return mapDisasterWarning;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterWarning解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体-临界条件映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterThreshold ParseMapDisasterThreshold(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-临界条件映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-临界条件映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterThreshold mapDisasterThreshold = new MapDisasterThreshold()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    ThresholdId = Convert.ToInt32(row[2].ToString()),
                    Type = Convert.ToInt16(row[3].ToString()),
                    CJSJ = row[4].ToString()
                };

                return mapDisasterThreshold;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterThreshold解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 灾害体-预警判据映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDisasterCriterion ParseMapDisasterCriterion(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("灾害体-预警判据映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("灾害体-预警判据映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDisasterCriterion mapDisasterCriterion = new MapDisasterCriterion()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DisasterId = Convert.ToInt32(row[1].ToString()),
                    CriterionId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDisasterCriterion;
            }
            catch (Exception ex)
            {
                logger.Error("MapDisasterCriterion解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 监测剖面-监测点映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapSectiontMonitor ParseMapSectiontMonitor(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("监测剖面-监测点映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测剖面-监测点映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapSectiontMonitor mapSectiontMonitor = new MapSectiontMonitor()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    SectionId = Convert.ToInt32(row[1].ToString()),
                    MonitorId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapSectiontMonitor;
            }
            catch (Exception ex)
            {
                logger.Error("MapSectiontMonitor解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 监测点-设备映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapMonitorDevice ParseMapMonitorDevice(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("监测点-设备映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测点-设备映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapMonitorDevice mapMonitorDevice = new MapMonitorDevice()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MonitorId = Convert.ToInt32(row[1].ToString()),
                    DeviceId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapMonitorDevice;
            }
            catch (Exception ex)
            {
                logger.Error("MapMonitorDevice解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 设备-初始值映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapDeviceValue ParseMapDeviceValue(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("设备初始值映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("设备与初始值不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapDeviceValue mapDeviceValue = new MapDeviceValue()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    DeviceId = Convert.ToInt32(row[1].ToString()),
                    ValueId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapDeviceValue;
            }
            catch (Exception ex)
            {
                logger.Error("MapDeviceSql解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 监测点-阈值映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapMonitorThreshold ParseMapMonitorThreshold(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("监测点-阈值映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("监测点-阈值映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapMonitorThreshold mapMonitorThreshold = new MapMonitorThreshold()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    MonitorId = Convert.ToInt32(row[1].ToString()),
                    ThresholdId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapMonitorThreshold;
            }
            catch (Exception ex)
            {
                logger.Error("MapMonitorThreshold解析失败：" + data, ex);
                return null;
            }
        }



        /// <summary>
        /// 预警模型-预警判据映射
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static MapModelCriterion ParseMapModelCriterion(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("预警模型-预警判据映射数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("预警模型-预警判据映射不是一对一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                MapModelCriterion mapModelCriterion = new MapModelCriterion()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ModelId = Convert.ToInt32(row[1].ToString()),
                    CriterionId = Convert.ToInt32(row[2].ToString()),
                    CJSJ = row[3].ToString()
                };

                return mapModelCriterion;
            }
            catch (Exception ex)
            {
                logger.Error("MapModelCriterion解析失败：" + data, ex);
                return null;
            }
        }








        #endregion



        #region
        /// <summary>
        /// GNSS变化量
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static GNSSDelta ParseGNSSDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析GNSSDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("GNSSDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                GNSSDelta gnssdelta = new GNSSDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Dx = Convert.ToDouble(row[2].ToString()),
                    Dy = Convert.ToDouble(row[3].ToString()),
                    Dxy = Convert.ToDouble(row[4].ToString()),
                    Dh = Convert.ToDouble(row[5].ToString()),
                    Time = row[6].ToString(),
                    Flag = row[7].ToString()
                };

                return gnssdelta;
            }
            catch (Exception ex)
            {
                logger.Error("GNSSDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static GNSSDelta ParseGNSSDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析GNSSDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("GNSSDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                GNSSDelta gnssdelta = new GNSSDelta()
                {
                    Id = id,
                    Unix = unix,
                    Dx = Convert.ToDouble(row[0].ToString()),
                    Dy = Convert.ToDouble(row[1].ToString()),
                    Dxy = Convert.ToDouble(row[2].ToString()),
                    Dh = Convert.ToDouble(row[3].ToString()),
                    Time = row[4].ToString(),
                    Flag = row[5].ToString()
                };

                return gnssdelta;
            }
            catch (Exception ex)
            {
                logger.Error("GNSSDelta解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 倾角
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static QJDelta ParseQJDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析QJDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("QJDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                QJDelta qjdelta = new QJDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Dx = Convert.ToDouble(row[2].ToString()),
                    Dy = Convert.ToDouble(row[3].ToString()),
                    Time = row[5].ToString(),
                    Flag = row[6].ToString()
                };

                if (string.IsNullOrEmpty(row[4].ToString()))
                {
                    qjdelta.Dz = Convert.ToDouble(row[4].ToString());
                }

                return qjdelta;
            }
            catch (Exception ex)
            {
                logger.Error("QJDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static QJDelta ParseQJDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析QJDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("QJDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                QJDelta qjdelta = new QJDelta()
                {
                    Id = id,
                    Unix = unix,
                    Dx = Convert.ToDouble(row[0].ToString()),
                    Dy = Convert.ToDouble(row[1].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                if (!string.IsNullOrEmpty(row[2].ToString()))
                {
                    qjdelta.Dz = Convert.ToDouble(row[2].ToString());
                }

                return qjdelta;
            }
            catch (Exception ex)
            {
                logger.Error("QJDelta解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 裂缝变形量
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static LFDelta ParseLFDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析LFDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("LFDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LFDelta lfdelta = new LFDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Dv = Convert.ToDouble(row[2].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                return lfdelta;
            }
            catch (Exception ex)
            {
                logger.Error("LFDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static LFDelta ParseLFDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析LFDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("LFDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                LFDelta lfdelta = new LFDelta()
                {
                    Id = id,
                    Unix = unix,
                    Dv = Convert.ToDouble(row[0].ToString()),
                    Time = row[1].ToString(),
                    Flag = row[2].ToString()
                };

                return lfdelta;
            }
            catch (Exception ex)
            {
                logger.Error("LFDelta解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 应力变形量
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static YLDelta ParseYLDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析YLDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("YLDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                YLDelta yldelta = new YLDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Dv = Convert.ToDouble(row[2].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                return yldelta;
            }
            catch (Exception ex)
            {
                logger.Error("YLDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static YLDelta ParseYLDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析YLDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("YLDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                YLDelta yldelta = new YLDelta()
                {
                    Id = id,
                    Unix = unix,
                    Dv = Convert.ToDouble(row[0].ToString()),
                    Time = row[1].ToString(),
                    Flag = row[2].ToString()
                };

                return yldelta;
            }
            catch (Exception ex)
            {
                logger.Error("YLDelta解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 深部位移
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static SBWYDelta ParseSBWYDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析SBWYDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("SBWYDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SBWYDelta sbwydelta = new SBWYDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    X = Convert.ToDouble(row[2].ToString()),
                    Y = Convert.ToDouble(row[3].ToString()),
                    Time = row[5].ToString(),
                    Flag = row[6].ToString()
                };

                if (!string.IsNullOrEmpty(row[4].ToString()))
                {
                    sbwydelta.Z = Convert.ToDouble(row[4].ToString());
                }

                return sbwydelta;
            }
            catch (Exception ex)
            {
                logger.Error("SBWYDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static SBWYDelta ParseSBWYDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析SBWYDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("SBWYDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                SBWYDelta sbwydelta = new SBWYDelta()
                {
                    Id = id,
                    Unix = unix,
                    X = Convert.ToDouble(row[0].ToString()),
                    Y = Convert.ToDouble(row[1].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                if (!string.IsNullOrEmpty(row[2].ToString()))
                {
                    sbwydelta.Z = Convert.ToDouble(row[2].ToString());
                }

                return sbwydelta;
            }
            catch (Exception ex)
            {
                logger.Error("SBWYDelta解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 雨量
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static RAINDelta ParseRAINDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析RAINDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("RAINDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RAINDelta raindelta = new RAINDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Value = Convert.ToDouble(row[2].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                return raindelta;
            }
            catch (Exception ex)
            {
                logger.Error("RAINDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static RAINDelta ParseRAINDelta(string data, int id, int unix)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析RAINDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("RAINDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                RAINDelta raindelta = new RAINDelta()
                {
                    Id = id,
                    Unix = unix,
                    Value = Convert.ToDouble(row[0].ToString()),
                    Time = row[1].ToString()
                };

                return raindelta;
            }
            catch (Exception ex)
            {
                logger.Error("RAINDelta解析失败：" + data, ex);
                return null;
            }
        }
        /// <summary>
        /// 地下水位
        /// </summary>
        /// <param name="data"></param>
        /// <param name="c"></param>
        /// <param name="r"></param>
        /// <returns></returns>
        public static WATERDelta ParseWATERDelta(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析WATERDelta数据为空！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("WATERDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WATERDelta waterdelta = new WATERDelta()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Unix = Convert.ToInt32(row[1].ToString()),
                    Value = Convert.ToDouble(row[2].ToString()),
                    Time = row[3].ToString(),
                    Flag = row[4].ToString()
                };

                return waterdelta;
            }
            catch (Exception ex)
            {
                logger.Error("WATERDelta解析失败：" + data, ex);
                return null;
            }
        }
        public static WATERDelta ParseWATERDelta(string data, int id, int unix, double gc, double? ks)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析WATERDelta数据为空！");
                return null;
            }

            if (ks == null)
            {
                gc = 0;
                ks = 0;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });
                if (rows.Length != 1)
                {
                    logger.Warn("WATERDelta不唯一！");
                    return null;
                }

                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                WATERDelta waterdelta = new WATERDelta()
                {
                    Id = id,
                    Unix = unix,
                    Value = gc - (Convert.ToDouble(ks) - Convert.ToDouble(row[0].ToString())),
                    Time = row[1].ToString(),
                    Flag = row[2].ToString()
                };

                return waterdelta;
            }
            catch (Exception ex)
            {
                logger.Error("WATERDelta解析失败：" + data, ex);
                return null;
            }
        }

        #endregion









    }
}
