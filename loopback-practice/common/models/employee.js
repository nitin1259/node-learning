'use strict';

module.exports = function(Employee) {

    Employee.getAssetAmountForEmp = (id, cb) => {
        const filter={
            include: {
                relation : 'assets',
                scope: {
                    fields : ['price']
                }
            }
        };

        /* 
        Employee.findById(id, filter, function(err, emp){
            if(err) throw err;
            const empObj = emp.toJSON();
            let totalAmt = 0;
            empObj.assets.forEach(ele => {
                totalAmt += ele.price;
            });

            // console.log('totalAmt: ', totalAmt);
            cb(null, totalAmt);
        });

        */

        // instead of using call back above we can use promises.

        return Employee.findById(id, filter).then(emp =>{
            const empObj = emp.toJSON();
            let totalAmt = 0;
            empObj.assets.forEach(ele => {
                totalAmt += ele.price;
            });

            return totalAmt;
        }).catch(err =>{
            throw err;
        })
    };


    Employee.remoteMethod('getAssetAmountForEmp', {
        description: 'Return the asset amount for the employee',
        accepts: {
            arg: 'id',
            type: 'string',
            required: true
        },
        http: {
            path : '/:id/getAssetTotalForEmployee',
            verb: 'get'
        },
        returns: {
            arg: 'amount',
            type: 'number'
        }
    });
};
