const performanceRepo = require('../../../lib/performanceRepository'),
      statesRepo = require('../../../lib/statesRepository'),
      util = require('util');

class PerformanceController {

    constructor(router) {
        router.get('/', this.getCustomers.bind(this));
        router.get('/page/:skip/:top', this.getCustomersPage.bind(this));
        router.get('/:id', this.getCustomer.bind(this));
        router.post('/', this.insertCustomer.bind(this));
        router.put('/:id', this.updateCustomer.bind(this));
        router.delete('/:id', this.deleteCustomer.bind(this));
    }

    getCustomers(req, res) {
        console.log('*** getCustomers');
        performanceRepo.getCustomers((err, data) => {
            if (err) {
                console.log('*** getCustomers error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCustomers ok');
                res.json(data.customers);
            }
        });
    }

    getCustomersPage(req, res) {
        console.log('*** getCustomersPage');
        const topVal = req.params.top,
              skipVal = req.params.skip,
              top = (isNaN(topVal)) ? 10 : +topVal,
              skip = (isNaN(skipVal)) ? 0 : +skipVal;

        performanceRepo.getPagedCustomers(skip, top, (err, data) => {
            res.setHeader('X-InlineCount', data.count);
            if (err) {
                console.log('*** getCustomersPage error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCustomersPage ok');
                res.json(data.customers);
            }
        });
    }

    getCustomer(req, res) {
        console.log('*** getCustomer');
        const id = req.params.id;
        console.log(id);

        performanceRepo.getCustomer(id, (err, customer) => {
            if (err) {
                console.log('*** getCustomer error: ' + util.inspect(err));
                res.json(null);
            } else {
                console.log('*** getCustomer ok');
                res.json(customer);
            }
        });
    }

    insertCustomer(req, res) {
        console.log('*** insertCustomer');
        // statesRepo.getState(req.body.stateId, (err, state) => {
        //     if (err) {
        //         console.log('*** statesRepo.getState error: ' + util.inspect(err));
        //         res.json({ status: false, error: 'State not found', customer: null });
        //     } else {
                performanceRepo.insertCustomer(req.body, null, (err, customer) => {
                    if (err) {
                        console.log('*** customersRepo.insertCustomer error: ' + util.inspect(err));
                        res.json({status: false, error: 'Insert failed', customer: null});
                    } else {
                        console.log('*** insertCustomer ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            }
    //     });
    // }

    updateCustomer(req, res) {
        console.log('*** updateCustomer');
        console.log('*** req.body');
        console.log(req.body);

        if (!req.body || !req.body.empId) {
            throw new Error('employee  associated empId required');
        }

        // statesRepo.getState(req.body.empId, (err, state) => {
        //     if (err) {
        //         console.log('*** statesRepo.getState error: ' + util.inspect(err));
        //         res.json({ status: false, error: 'State not found', customer: null });
        //     } else {
            console.log("req:"+req.body._id)
                performanceRepo.updateCustomer(req.body._id, req.body,null,  (err, customer) => {
                    if (err) {
                        console.log('*** updateCustomer error: ' + util.inspect(err));
                        res.json({ status: false, error: 'Update failed', customer: null });
                    } else {
                        console.log('*** updateCustomer ok');
                        res.json({ status: true, error: null, customer: customer });
                    }
                });
            // }
        // });
    }

    deleteCustomer(req, res) {
        console.log('*** deleteCustomer');

        performanceRepo.deleteCustomer(req.params.id, (err) => {
            if (err) {
                console.log('*** deleteCustomer error: ' + util.inspect(err));
                res.json({ status: false });
            } else {
                console.log('*** deleteCustomer ok');
                res.json({ status: true });
            }
        });
    }

}

module.exports = PerformanceController;