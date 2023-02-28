let stripe = require('stripe')('sk_test_51MftATCJPPAhstz0Zipx0l3xqcGrNPZtExHDV3D9mfNCJ8o5y4EjRHWXVSjywgZkfbp0uUWHpt4XTpYPPr8fDage00j3ZztuU1');
exports.checkout = async(req,res)=>{
    try {
        console.log(req.body);
        token = req.body.token
      const customer = stripe.customers
        .create({
          email: req.email,
          source: token.id
        })
        .then((customer) => {
          console.log(customer);
          return stripe.charges.create({
            amount: 1000,
            description: "Test Purchase using express and Node",
            currency: "USD",
            customer: customer.id,
          });
        })
        .then((charge) => {
          console.log(charge);
            res.json({
              data:"success"
          })
        })
        .catch((err) => {
            res.json({
              data: "failure",
            });
        });
    
    return true;
    } catch (error) {
      return false;
    }
}

