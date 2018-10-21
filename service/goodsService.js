var goodsDAO = require('../dao/goodsDAO');

class mallGoodsService extends goodsDAO {


    async createGoodsService(object) {
        let result = await super.createGoodsDAO(object);
        return result;
    }
}
module.exports=mallGoodsService;