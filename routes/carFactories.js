'use strict';

import carTypeModel from '../models/carType'

export default {
    /**
     * 获取车辆主机厂
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        carTypeModel.distinct("factory", req.query).then(doc => {
            res.send(doc);
        });
    },
}