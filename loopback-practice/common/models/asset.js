'use strict';

module.exports = function (Asset) {
    // hooks - override build in crud operation/methods
    Asset.on('dataSourceAttached', function (obj) {
        Asset.deleteById = function (id, cb) {
            console.log('overriden while delete the asset by id');
            // do something 
            // const err = new Error("overriden error while delete the asset");
            
        }
    });

};
