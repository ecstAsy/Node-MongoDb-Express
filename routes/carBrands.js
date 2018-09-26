'use strict';

import carTypeModel from '../models/carType'

export default {
    /**
     * 获取车辆品牌
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        carTypeModel.distinct("brand").then(doc => {
            res.send(doc);
        });
    },
}