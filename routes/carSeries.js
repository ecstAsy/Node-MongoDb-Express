'use strict';

import carTypeModel from '../models/carType'

export default {
    /**
     * 获取车系
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        carTypeModel.distinct("series", req.query).then(doc => {
            res.send(doc);
        });
    },
}