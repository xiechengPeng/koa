var goodsDAO = require('../dao/goodsDAO');

class mallGoodsService extends goodsDAO {

    constructor() {
        this.name = 'goodsService';
    }

    async createGoodsService(object) {
        let result = await super.createGoodsDAO(object);
        return result;
    }
}
module.exports=mallGoodsService;