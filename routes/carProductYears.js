'use strict';

import carTypeModel from '../models/carType'

export default {
    /**
     * 获取生成年份
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        carTypeModel.distinct("productYear", req.query).then(doc => {
            res.send(doc);
        });
    },
}