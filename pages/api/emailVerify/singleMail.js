var quickemailverification = require('quickemailverification').client(`${process.env.EMAIL_SECRET}`).quickemailverification();

export default function mailHandler(req,res){
    // Email address which need to be verified
    // valid@example.com
    const {email} = req.body
    quickemailverification.verify(`${email}`, function (err, response) { 
    // Print response object
    // console.log(response.body);
    res.status(200).json(response.body);
    });
 }