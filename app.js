import createError from 'http-errors';
import express from 'express';
// import expressValidator from 'express-validator';

import routes from "./routes/index";

const app = express();

const { check, validationResult } = require('express-validator/check');

// 处理验证信息
const handleValidation = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    next();
};

// 加入 json、urlencoded 中间件 才可以获取body里面数据
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// restful 接口配置
// 位置不能变动，中间件处理顺序有关

// 品牌接口
app.get('/carBrands', routes.carBrands.index);

// 主机厂接口
app.get('/carFactories', [
    check('brand').isLength({ min: 1 }).withMessage('品牌不能为空！')
], handleValidation, routes.carFactories.index);

// 车系接口
app.get('/carSeries', [
    check('brand').isLength({ min: 1 }).withMessage('品牌不能为空！'),
    check('factory').isLength({ min: 1 }).withMessage('主机厂不能为空！'),
], handleValidation, routes.carSeries.index);

// 生产年份接口
app.get('/carProductYears', [
    check('brand').isLength({ min: 1 }).withMessage('品牌不能为空！'),
    check('factory').isLength({ min: 1 }).withMessage('主机厂不能为空！'),
    check('series').isLength({ min: 1 }).withMessage('车系不能为空！'),
], handleValidation, routes.carProductYears.index);

// 车型接口
app.get('/carTypes', [
    check('brand').exists().withMessage('品牌为空！'),
    check('factory').isLength({ min: 1 }).withMessage('主机厂不能为空！'),
    check('series').isLength({ min: 1 }).withMessage('车系不能为空！'),
    check('productYear').isLength({ min: 1 }).withMessage('生产年份不能为空！'),
], handleValidation, routes.carTypes.index);

// 返回404
app.use(function(req, res, next) {
    next(createError(404));
});

// 系统错误
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


export default app;
