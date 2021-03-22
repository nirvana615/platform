using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    public class PCloudData
    {
        /// <summary>
        /// id
        /// </summary>
        public int Id { get; set; }
        /// <summary>
        /// id
        /// </summary>
        public int ProjectId { get; set; }
        /// <summary>
        /// 点云路径
        /// </summary>
        public string MXLJ { get; set; }
        /// <summary>
        /// 点云采集时间
        /// </summary>
        public string CJSJ { get; set; }
        /// <summary>
        /// SRID
        /// </summary>
        public int? SRID { get; set; }
        /// <summary>
        /// 标识码
        /// </summary>
        public string BSM { get; set; }
        /// <summary>
        /// 状态码
        /// </summary>
        public int ZTM { get; set; }
        /// <summary>
        /// 备注
        /// </summary>
        public string BZ { get; set; }

        /// <summary>
        /// 区域
        /// </summary>
        public int QY { get; set; }

    }
}
