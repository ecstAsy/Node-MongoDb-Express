'use strict';

import carTypeModel from '../models/carType'

export default {
    /**
     * 获取车型
     * @param req
     * @param res
     * @param next
     */
    index: (req, res, next) => {
        const params = req.query;

        carTypeModel.find(params).then(doc => {
            res.send(doc);
        });
    },
}