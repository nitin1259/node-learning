module.exports = (app) => {
    const db = app.dataSources.mongodb;

    // this automigrate the model
    db.autoupdate('Employee', (err) => {
        if (err) throw err;

        app.models.Employee.create({
            empid: "ct-1255",
            name: "Kundan"
        }, (err, emp) => {
            if (err) throw err;

            console.log('Model Employee created/updated: \n ', emp);
        });
    });



    db.autoupdate('Asset', (err) => {
        if (err) throw err;

        app.models.Asset.create({
            description: 'Dell inspiron',
            serialno: '335643',
            price: 3452
        }, (err, emp) => {
            if (err) throw err;

            console.log('Model Asset created/updated: \n ', emp);
        });
    });
};