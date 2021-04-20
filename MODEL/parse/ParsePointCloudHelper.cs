using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    /// <summary>
    /// 解析点云
    /// </summary>
    public class ParsePointCloudHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseMonitorHelper));

        /// <summary>
        /// 点云时序数据信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PCloudProject ParsePCloudProject(string data)
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
                PCloudProject project = new PCloudProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XZQBM = row[8].ToString(),
                    XMWZ = row[9].ToString(),
                    CJSJ = row[11].ToString(),
                    BSM = row[12].ToString(),
                    ZTM = Convert.ToInt32(row[13].ToString()),
                    BZ = row[14].ToString(),
                    ZXJD = Convert.ToDouble(row[3].ToString()),
                    ZXWD = Convert.ToDouble(row[4].ToString()),
                };
                return project;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }


        /// <summary>
        /// 项目图层加载
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static PCloudData ParsePCloudData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }

            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                PCloudData PCloudData = new PCloudData()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    ProjectId = Convert.ToInt32(row[1].ToString()),
                    CJSJ = row[2].ToString(),
                    SRID = row[4].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt32(row[6].ToString()),
                    BZ = row[7].ToString(),
                    Regionid = Convert.ToInt32(row[8].ToString()),
                    MQLCid = Convert.ToInt32(row[9].ToString()),
                    DYSM = row[10].ToString(),
                    Typeid = Convert.ToInt32(row[11].ToString()),
                    CJRY = row[12].ToString(),
                    SJGSid = Convert.ToInt32(row[13].ToString()),
                    Deviceid = Convert.ToInt32(row[14].ToString()),
                    CJZQ = Convert.ToInt32(row[15].ToString())
                };

                return PCloudData;
            }
            catch (Exception ex)
            {
                logger.Error("PCloudData解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 统计滤波参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static StatisticoutlierPara ParseStatisticoutlierPara(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                StatisticoutlierPara Para = new StatisticoutlierPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    Meank = Convert.ToInt32(row[4].ToString()),
                    StddevMulThresh = Convert.ToInt32(row[5].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[8].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("StatisticoutlierPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// ICP配准参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ICPPara ParseICPPara(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ICPPara Para = new ICPPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    LeafSize = Convert.ToDouble(row[4].ToString()),
                    MaxIteration = Convert.ToInt32(row[6].ToString()),
                    RadiusSearch = Convert.ToDouble(row[5].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[8].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("ICPPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 非重叠区域参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static OverlapPara ParseOverlap(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                OverlapPara Para = new OverlapPara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[5].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("OverlapPara解析失败：" + data, ex);
                return null;
            }
        }

        /// <summary>
        /// 边界提取参数
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static ShapePara ParseShape(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("无点云数据！");
                return null;
            }
            try
            {
                string[] rows = data.Split(new char[] { COM.ConstHelper.rowSplit });


                string[] row = rows[0].Split(new char[] { COM.ConstHelper.columnSplit });
                ShapePara Para = new ShapePara()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    BJFF = Convert.ToInt32(row[4].ToString()),
                    CJSJ = row[2].ToString(),
                    ZTM = Convert.ToInt32(row[6].ToString()),
                };

                return Para;
            }
            catch (Exception ex)
            {
                logger.Error("ShapePara解析失败：" + data, ex);
                return null;
            }
        }
    }
}
