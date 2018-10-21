const router = require('koa-router')();
router.prefix('/mall/api')

var goodsList=require('../controllers/goods');
router.post('/mallgoods',goodsList.create);


router.get('/', async (ctx, next) => {
    ctx.response.body = `<h1>Index</h1>
    <form action="/signin" method="post">
        <p>Name: <input name="name" value="koa"></p>
        <p>Password: <input name="password" type="password"></p>
        <p><input type="submit" value="Submit"></p>
    </form>`;
})

router.get('/string', async (ctx, next) => {
  ctx.body = {aa:'koa2 string'}
})

router.get('/json', async (ctx, next) => {
  ctx.body = {
    title: 'koa2 json'
  }
})

router.get('/myget',async(ctx,next)=>{
    let sql='select * from name'
    let queryresult=await query.query(sql, [ctx.request.body.name]);
    if(queryresult.length==0){
        ctx.body={}
    }else{
        code:'00',
        ctx.body=queryresult
        message:'success'
    }
})
//查
router.post('/ccc',async(ctx,next)=>{
    let sql='select * from name where name=?';
    let queryresult=await query.query(sql, [ctx.request.body.name]);
    if(queryresult.length==0){
        ctx.body={}
    }else{
        ctx.body=queryresult[0]
    }
})
//存
router.post('/add',async(ctx,next)=>{
    let sql='INSERT INTO name(name) values(?)';
    let queryresult=await query.query(sql, [ctx.request.body.name]);
    ctx.body={
        code:'00',
        data:ctx.request.body,
        message:'success'
    }
})
//改
router.post('/update',async(ctx,next)=>{
    let sql='update name set name=? where Id=?';
    let queryresult=await query.query(sql, [ctx.request.body.name,1]);
    ctx.body='';
})
//删
router.post('/del',async(ctx,next)=>{
    let sql='delete from name where name=?';
    let queryresult=await query.query(sql, [ctx.request.body.name]);
    ctx.body='';
})



router.post('/signin',async(ctx,next)=>{
    var name =ctx.request.body.name || "",
        password=ctx.request.body.password || "";
    console.log(`signin with name: ${name}, password: ${password}`);
    if (name === 'koa' && password === '12345') {
        ctx.body={
            code:'00',
            data:ctx.request.body,
            message:'success'
        }
    } else {
        ctx.body={
            code:'01',
            data:'',
            message:'success'
        }
    }
})
module.exports = router
