using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MODEL
{
    /// <summary>
    /// 消落带项目基本信息
    /// </summary>
    public class FlzData
    {
        /// <summary>
        /// id
        /// </summary>
        public int id { get; set; }
        /// <summary>
        /// 点名称
        /// </summary>
        public string name { get; set; }
        /// <summary>
        /// 点类型
        /// </summary>
        public string type { get; set; }
        
        /// <summary>
        /// 项目id
        /// </summary>
        public int projectId { get; set; }
        /// <summary>
        /// 点数据，用|分割
        /// </summary>
        public string postion { get; set; }
        /// <summary>
        /// 描述
        /// </summary>
        public string remarks { get; set; }
        /// <summary>
        /// 图片路径
        /// </summary>
        public string src { get; set; }
       

    }
}
