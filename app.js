const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors=require('koa2-cors')
const logUtil = require('./utils/log_util');

const index = require('./routes/index')
const users = require('./routes/users')
const response_formatter =require('./utils/response_formatter')
// error handler
onerror(app)

// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))
app.use(cors())//跨域
app.use(json())
app.use(logger())
app.use(response_formatter('^/mall'))
app.use(async (ctx, next) => {
    //响应开始时间
    const start = new Date();
    //响应间隔时间
    var ms;
    try {
        //开始进入到下一个中间件
        await next();

        ms = new Date() - start;
        logUtil.logResponse(ctx, ms);

    } catch (error) {
        ms = new Date() - start;
        //记录异常日志
        logUtil.logError(ctx, error, ms);
    }
});
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())


// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
