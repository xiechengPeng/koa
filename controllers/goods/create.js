var Service=require('../../service/goodsService');

let obj=new Service();

module.exports = async(ctx,next)=>{

    let json = ctx.request.body;
    let result = await obj.createGoodsService(json);
    ctx.body={
        data:'添加成功'
    }
    
}