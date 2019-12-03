const mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Appraisal = require('../models/appraisal');

class CustomersRepository {

    // get all the customers
    getCustomers(callback) {
        console.log('*** CustomersRepository.getCustomers');
        Appraisal.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Appraisal.find({}, (err, customers) => {
                if (err) {
                    console.log(`*** CustomersRepository.getCustomers error: ${err}`);
                    return callback(err);;
                }
                callback(null, {
                    count: count,
                    customers: customers
                });
            });

        });
    }

    getPagedCustomers(skip, top, callback) {
        console.log('*** CustomersRepository.getPagedCustomers');
        Appraisal.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Skip: ${skip} Top: ${top}`);
            console.log(`Customers count: ${count}`);

            Appraisal.find({})
                .sort({ lastName: 1 })
                .skip(skip)
                .limit(top)
                .exec((err, customers) => {
                    if (err) {
                        console.log(`*** CustomersRepository.getPagedCustomers error: ${err}`);
                        return callback(err);
                    }
                    callback(null, {
                        count: count,
                        customers: customers
                    });
                });

        });
    }

    // get the customer summary
    getCustomersSummary(skip, top, callback) {
        console.log('*** CustomersRepository.getCustomersSummary');
        Appraisal.count((err, custsCount) => {
            let count = custsCount;
            console.log(`Customers count: ${count}`);

            Appraisal.find({}, { '_id': 0, 'firstName': 1, 'lastName': 1, 'city': 1, 'state': 1, 'orderCount': 1, 'gender': 1 })
                .skip(skip)
                .limit(top)
                .exec((err, customersSummary) => {
                    callback(null, {
                        count: count,
                        customersSummary: customersSummary
                    });
                });

        });
    }

    // get a  customer
    getCustomer(id, callback) {
        console.log('*** CustomersRepository.getCustomer'); //Appraisal.findById(id
        Appraisal.find( { empId: id } , (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.getCustomer error: ${err}`);
                return callback(err);
            }
            callback(null, customer);
        });
    }

    // insert a  customer
    insertCustomer(body, state, callback) {
        console.log('*** CustomersRepository.insertCustomer');
        console.log(state);
        let performance = new Appraisal();
        // let newState = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }
        console.log(body);

        performance.empId = body.empId;
        performance.passion = body.passion;
        performance.Innovation = body.Innovation;
        performance.respect = body.respect;
        performance.leadership = body.leadership;
        performance.codeQuality = body.codeQuality;
        performance.personalUtilizatin = body.personalUtilizatin;
        performance.Productivity = body.Productivity;
        performance.empFeedback = body.empFeedback;



        performance.save((err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository insertCustomer error: ${err}`);
                return callback(err, null);
            }
            callback(null, customer);
        });
    }

    updateCustomer(id, body, state=null, callback) {
        console.log('*** CustomersRepository.editCustomer');

        // let stateObj = { 'id': state[0].id, 'abbreviation': state[0].abbreviation, 'name': state[0].name }

        Appraisal.findById(id, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.editCustomer error: ${err}`);
                return callback(err);
            }

            customer.empId = body.empId || customer.empId;
            customer.passion = body.passion || customer.passion;
            customer.Innovation = body.Innovation || customer.Innovation;
            customer.respect = body.respect || customer.respect;
            customer.leadership = body.leadership || customer.leadership;
            customer.codeQuality = body.codeQuality || customer.codeQuality;
            customer.personalUtilizatin = body.personalUtilizatin || customer.personalUtilizatin;
            customer.Productivity = body.Productivity || customer.Productivity;
            customer.empFeedback = body.empFeedback || customer.empFeedback;




            customer.save((err, customer) => {
                if (err) {
                    console.log(`*** CustomersRepository.updateCustomer error: ${err}`);
                    return callback(err, null);
                }

                callback(null, customer);
            });

        });
    }

    // delete a customer
    deleteCustomer(id, callback) {
        console.log('*** CustomersRepository.deleteCustomer');
        Appraisal.remove({ '_id': id }, (err, customer) => {
            if (err) {
                console.log(`*** CustomersRepository.deleteCustomer error: ${err}`);
                return callback(err, null);
            }
            callback(null, customer);
        });
    }

}

module.exports = new CustomersRepository();