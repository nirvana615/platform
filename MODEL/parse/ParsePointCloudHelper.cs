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
        /// 点云项目信息
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
        public static PCloudData ParsePCloudDataLayer(string data)
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
                    QY = Convert.ToInt32(row[8].ToString())
                };

                return PCloudData;
            }
            catch (Exception ex)
            {
                logger.Error("PCloudData解析失败：" + data, ex);
                return null;
            }
        }

    }
}
