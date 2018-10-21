var response_formatter = ctx => {
    if(ctx.body){
        var json=ctx.body;
        if(typeof json!='object'){
            json=JSON.parse(json);
        }
        if(json.error){
            ctx.body={
                code:"01",
                message:json.error
            }
        }else{
            ctx.body={
                code:'00',
                message:'success',
                data:json.data
            }
        }
    }else{
        ctx.body = {
            code: "01",
            message: 'fail'
        }
    }
}

var url_filter = function (pattern) {
    return async function (ctx, next) {
        var reg = new RegExp(pattern);
        //先去执行路由
        await next();
        //通过正则的url进行格式化处理
        if (reg.test(ctx.originalUrl)) {
            response_formatter(ctx);
        }
    }
}
module.exports = url_filter;