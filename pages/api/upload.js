const { User } = require("../../models/user");

export default async function upload(req,res){
    console.log(req.body);
    const email = req.body.email+'@gmail.com'
    var query = {
        body: req.body.text
    }
    try{
        await User.findOneAndUpdate(
            { email: email },
            { $push: { queries: query } }
          ).then((error) => {
            res.send(error);
          });
    }catch(error){
        res.send(error);
    } 
}