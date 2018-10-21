var baseDAO = require('../dao/baseDAO');
var DB = require('../utils/myspl_pool');


class goodsDAO extends baseDAO {

    constructor() {
        super();
    }

    async createGoodsDAO(object) {
        let sql = 'insert into mall_goods(name,type,start_time) values (?,?,?)';
        var result='';
        try {
            result = await DB.query(sql,[object.name,object.type,Date.parse(new Date())/1000]);
        } catch (error) {
            console.log(error)
        }
        return result;
    }
}
require('util').inherits(goodsDAO, baseDAO);

module.exports = goodsDAO;