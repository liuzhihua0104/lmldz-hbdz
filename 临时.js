CREATE TABLE `t_orientation` (
    `id` varchar(32) CHARACTER SET utf8mb4 NOT NULL,
    `create_time` datetime DEFAULT NULL,
    `create_user` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL,
    `name` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '方案名称',
    `remarks` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '备注',
    `area_type` int(11) DEFAULT '0' COMMENT '0不限制1省市区2线级',
    `area_content` varchar(255) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '区域内容',
    `networking` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '联网方式 0不限1wifi2移动3联调4电信',
    `scan_content` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '扫码工具 0不限1微信2支付宝',
    `time_type` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '时段 0不限1时间段2自定义',
    `holidays` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '节假日0不限1节假日2工作日3周一4周二5周三6周四7周五8周六9周日',
    `devices` varchar(32) CHARACTER SET utf8mb4 DEFAULT NULL COMMENT '设备0不限1ios2安卓3鸿蒙',
    `sex` int(11) DEFAULT '0' COMMENT '0不限1男2女',
    `status` int(11) DEFAULT NULL COMMENT '状态：0关闭1开启 2删除',
    `source_id` varchar(255) DEFAULT NULL COMMENT '素材源id',
    `roles` int(11) DEFAULT NULL COMMENT '状态 1商务2运营',
    PRIMARY KEY (`id`)
  ) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='奖品定向方案表';




  [
    {
        "id": 1,
        "startTime": "03:00",
        "endTime": "20:00",
        "sliderValue": [3,20]
    },
    {
        "id": 2,
        "startTime": "04:00",
        "endTime": "16:00",
        "sliderValue": [4,16]
    }
]