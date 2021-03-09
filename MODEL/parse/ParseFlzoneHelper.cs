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
    public class ParseFlzoneHelper
    {
        private static Logger logger = Logger.CreateLogger(typeof(ParseFlzoneHelper));

        /// <summary>
        /// 消落带项目信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FlzProject ParseProject(string data)
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
                FlzProject project = new FlzProject()
                {
                    Id = Convert.ToInt32(row[0].ToString()),
                    XMMC = row[1].ToString(),
                    XMBM = row[2].ToString(),
                    XZQBM = row[13].ToString(),
                    XMWZ = row[12].ToString(),
                    CJSJ = row[3].ToString(),
                    BSM = row[5].ToString(),
                    ZTM = Convert.ToInt16(row[6].ToString()),
                    BZ = row[7].ToString(),
                    ZXJD = Convert.ToDouble(row[10].ToString()),
                    ZXWD = Convert.ToDouble(row[11].ToString()),
                    FZR= row[8].ToString(),
                    modelId = row[9].ToString(),
                    XMKSSJ= row[14].ToString()


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
        /// 消落带点的存储信息
        /// </summary>
        /// <param name="data"></param>
        /// <returns></returns>
        public static FlzData ParseFlzData(string data)
        {
            if (string.IsNullOrEmpty(data))
            {
                logger.Warn("解析Flz_Data_point数据为空！");
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
                FlzData flzDataPoint = new FlzData()
                {
                    id = Convert.ToInt32(row[0].ToString()),
                    projectId = Convert.ToInt32(row[1].ToString()),
                    postion = row[2].ToString(),
                    type = row[3].ToString(),
                    name = row[4].ToString(),
                    remarks = row[5].ToString(),
                    src = row[6].ToString(),


                };
                return flzDataPoint;
            }
            catch (Exception ex)
            {
                logger.Error("Project解析失败：" + data, ex);
                return null;
            }
        }

    }
}
