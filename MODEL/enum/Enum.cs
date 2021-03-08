using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using COM;

namespace MODEL
{
    public static class Enum
    {
        /// <summary>
        /// 登录方式
        /// </summary>
        public enum LoginWay
        {
            [RemarkAttribute("网页")]
            Web = 0,

            [RemarkAttribute("微信")]
            WeChat = 1
        }

        /// <summary>
        /// 登录角色
        /// 角色对应视图，对应子系统
        /// </summary>
        public enum SystemRole
        {
            [RemarkAttribute("后台管理")]
            Admin = 0,

            [RemarkAttribute("监测系统")]
            Monitor = 1,

            [RemarkAttribute("演示系统")]
            Display = 2,

            [RemarkAttribute("业主系统")]
            Owner = 3,

            [RemarkAttribute("无人机系统")]
            Uav = 4,

            [RemarkAttribute("消落带系统")]
            Flz = 5,

            [RemarkAttribute("无角色")]
            Null = 99
        }

        /// <summary>
        /// 状态码
        /// </summary>
        public enum State
        {
            [RemarkAttribute("无效")]
            NoUse = 0,

            [RemarkAttribute("有效")]
            InUse = 1
        }

        /// <summary>
        /// 请求响应结果编码
        /// </summary>
        public enum ResponseResultCode
        {
            [RemarkAttribute("失败")]
            Failure = 0,

            [RemarkAttribute("成功")]
            Success = 1
        }

        /// <summary>
        /// SQL类型
        /// </summary>
        public enum SqlType
        {
            [RemarkAttribute("读取")]
            Read = 0,

            [RemarkAttribute("写入")]
            Write = 1
        }

        /// <summary>
        /// 数据库类型
        /// </summary>
        public enum DbType
        {
            [RemarkAttribute("SQLServer")]
            SQLServer = 0,

            [RemarkAttribute("Oracle")]
            Oracle = 1,

            [RemarkAttribute("MySQL")]
            MySQL = 2,

            [RemarkAttribute("PostgreSQL")]
            PostgreSQL = 3,

            [RemarkAttribute("SQLite")]
            SQLite = 4
        }

        /// <summary>
        /// 供电方式
        /// </summary>
        public enum PowerType
        {
            [RemarkAttribute("太阳能")]
            Battery = 0,

            [RemarkAttribute("市电")]
            Grid = 1
        }

        /// <summary>
        /// GNSS解算类型
        /// </summary>
        public enum GNSSType
        {
            [RemarkAttribute("静态解算")]
            Static = 0,

            [RemarkAttribute("动态解算")]
            Dynamic = 1
        }

        /// <summary>
        /// 自动化监测数据标识
        /// </summary>
        public enum AutoDataFlag
        {
            /// <summary>
            /// 自动化监测原始数据（直接从自动化监测数据库迁移的）
            /// </summary>
            [RemarkAttribute("100")]
            Source = 0,

            /// <summary>
            /// 标记保存的数据
            /// </summary>
            [RemarkAttribute("200")]
            Hold = 1,

            /// <summary>
            /// 标记删除的数据（异常值）
            /// </summary>
            [RemarkAttribute("300")]
            Less = 2,

            /// <summary>
            /// 插补数据（保证数据采集的连续性）
            /// </summary>
            [RemarkAttribute("400")]
            Plus = 3
        }

        /// <summary>
        /// 自动化监测数据时间范围
        /// </summary>
        public enum AutoDataDateTime
        {
            [RemarkAttribute("最近三十天")]
            LastMonth = 0,

            [RemarkAttribute("今日")]
            Today = 1,

            [RemarkAttribute("本旬")]
            ThisTen = 2,

            [RemarkAttribute("本月")]
            ThisMonth = 3,

            [RemarkAttribute("本季度")]
            ThisQuarterly = 4,

            [RemarkAttribute("上半年")]
            FirstHalf = 5,

            [RemarkAttribute("下半年")]
            SencondHalf = 6,

            [RemarkAttribute("今年")]
            ThisYear = 7,

            [RemarkAttribute("前一日")]
            Yesterday = 8,

            [RemarkAttribute("上一旬")]
            PreTen = 9,

            [RemarkAttribute("上一月")]
            PreMonth = 10,

            [RemarkAttribute("上一季度")]
            PreQuarterly = 11,

            [RemarkAttribute("上一年")]
            PreYear = 12,

            [RemarkAttribute("全部")]
            All = 13
        }

        /// <summary>
        /// 自动化监测设备类型
        /// </summary>
        public enum AutoDeviceType
        {
            [RemarkAttribute("GNSS")]
            GNSS = 0,

            [RemarkAttribute("裂缝")]
            LF = 1,

            [RemarkAttribute("倾角")]
            QJ = 2,

            [RemarkAttribute("应力")]
            YL = 3,

            [RemarkAttribute("深部位移")]
            SBWY = 4,

            [RemarkAttribute("地下水位")]
            WATER = 5,

            [RemarkAttribute("雨量")]
            RAIN = 6,

            [RemarkAttribute("声光预警")]
            ALARM = 7
        }

        /// <summary>
        /// 监测站类型
        /// </summary>
        public enum GNSSStationType
        {
            [RemarkAttribute("GNSS基准站")]
            GNSSBase = 0,

            [RemarkAttribute("GNSS监测站")]
            GNSSSite = 1
        }

        /// <summary>
        /// 剖面类型
        /// </summary>
        public enum SectionType
        {
            [RemarkAttribute("单一剖面")]
            Simple = 0,

            [RemarkAttribute("综合剖面")]
            Complex = 1
        }

        /// <summary>
        /// 剖面等级
        /// </summary>
        public enum SectionLevel
        {
            [RemarkAttribute("主剖面")]
            Main = 0,

            [RemarkAttribute("次剖面")]
            Minor = 1
        }

        /// <summary>
        /// 地质灾害类型
        /// </summary>
        public enum GeodisasterType
        {
            [RemarkAttribute("危岩崩塌")]
            Rockfall = 0,

            [RemarkAttribute("滑坡")]
            Landslide = 1,

            [RemarkAttribute("泥石流")]
            Debrisflow = 2,

            [RemarkAttribute("地面塌陷")]
            GroundCollapse = 3,

            [RemarkAttribute("地裂缝")]
            Groundfissure = 4,

            [RemarkAttribute("地面沉降")]
            Groundsubsidence = 5
        }

        /// <summary>
        /// 地质灾害等级
        /// </summary>
        public enum GeodisasterLevel
        {
            [RemarkAttribute("特大型")]
            XL = 0,

            [RemarkAttribute("大型")]
            L = 1,

            [RemarkAttribute("中型")]
            M = 2,

            [RemarkAttribute("小型")]
            S = 3
        }

        /// <summary>
        /// 地质灾害险情
        /// </summary>
        public enum GeodisasterDanger
        {
            [RemarkAttribute("特大型")]
            XL = 0,

            [RemarkAttribute("大型")]
            L = 1,

            [RemarkAttribute("中型")]
            M = 2,

            [RemarkAttribute("小型")]
            S = 3
        }

        /// <summary>
        /// 监测级别
        /// </summary>
        public enum MonitorLevel
        {
            [RemarkAttribute("一级监测预警")]
            Ⅰ = 0,

            [RemarkAttribute("二级监测预警")]
            Ⅱ = 1,

            [RemarkAttribute("三级监测预警")]
            Ⅲ = 2
        }

        /// <summary>
        /// 监测手段
        /// </summary>
        public enum MonitorMeans
        {
            [RemarkAttribute("手动")]
            M = 0,

            [RemarkAttribute("自动")]
            A = 1,

            [RemarkAttribute("手动和自动")]
            AM = 2
        }

        /// <summary>
        /// 模型类型
        /// </summary>
        public enum ModelLevel
        {
            [RemarkAttribute("无")]
            No = -1,

            [RemarkAttribute("整体")]
            Whole = 0,

            [RemarkAttribute("局部")]
            Part = 1
        }

        /// <summary>
        /// 测绘数据类型
        /// </summary>
        public enum SurveyDataType
        {
            [RemarkAttribute("模型")]
            Model = 0,

            [RemarkAttribute("点云")]
            PointCloud = 1,

            [RemarkAttribute("数字正射影像")]
            DOM = 2,

            [RemarkAttribute("数字表面模型")]
            DSM = 3,

            [RemarkAttribute("制图")]
            Map = 4
        }

        /// <summary>
        /// 项目类别
        /// </summary>
        public enum ProjectCategory
        {
            [RemarkAttribute("库区应急监测")]
            KQYJJC = 0,

            [RemarkAttribute("后规专业监测")]
            HGZYJC = 1,

            [RemarkAttribute("非库区应急专业监测")]
            FKQYJZYJC = 2,

            [RemarkAttribute("非库区专业监测")]
            FKQZYJC = 3
        }

        /// <summary>
        /// 面积单位
        /// </summary>
        public enum AreaUnit
        {
            [RemarkAttribute("平方米")]
            m2 = 0,

            [RemarkAttribute("平方公里")]
            km2 = 1
        }

        /// <summary>
        /// 体积单位
        /// </summary>
        public enum VolumeUnit
        {
            [RemarkAttribute("立方米")]
            m3 = 0,

            [RemarkAttribute("立方千米")]
            km3 = 1
        }


        /// <summary>
        /// 点云文件格式
        /// </summary>
        public enum PointCloudFormat
        {
            [RemarkAttribute("TXT")]
            TXT = 0,

            [RemarkAttribute("LAS")]
            LAS = 1,

            [RemarkAttribute("PNTS")]
            PNTS = 2
        }


































    }
}
