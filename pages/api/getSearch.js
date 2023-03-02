const { Search } = require("../../models/search");

export default async function getSearch(req,res){
    //console.log("This is get search"+req.body.email);
    const email = req.body.email+'@student.sust.edu'
    try{
    const user = await Search.findOne({email:email})
    if(!user){
        return res.send({message:"user not found"});
    }
    if(user.queries===undefined){
        return res.status(400).send({message:"queries undefined"});
    }
        //console.log("getsearch:->"+user);
        return res.send(user);  
    }catch(err){
        return res.status(400).send({message:err});
    } 
}