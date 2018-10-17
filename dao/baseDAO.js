var DB = require('../utils/myspl_pool');

class baseDAO {

    constructor(){
        this.name='goods'
    }

    attributeLabels() {
        return ['id','name','icon','type','image','stock','start_time', 'end_time'];
    }
    async basePublic(){

    }
}
module.exports=baseDAO;