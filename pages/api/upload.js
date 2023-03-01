const { Search } = require("../../models/search");

export default async function upload(req,res){
    //console.log(req.body);
    const email = req.body.email+'@student.sust.edu'
    const query = {
        body: req.body.text
    }
    try{
    const result = await Search.updateOne(
            { email: email },
            { $push: { queries: query} }
          );
        return res.send("sent successfully")   
    }catch(err){
        return res.status(400).send({message:err});
        console.log(err);
    } 
}