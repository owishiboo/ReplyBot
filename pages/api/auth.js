//const router = require("express").Router();
const bcrypt = require("bcrypt");
const Joi = require("joi");
import connectMongo from "../../utils/connectMongo";
const { User } = require("../../models/user");
var jwt = require('jsonwebtoken');

export default async function addTest(req, res) {
	try {
	  console.log('CONNECTING TO MONGO');
	  await connectMongo();
	  console.log('CONNECTED TO MONGO');
	  console.log("this is from api end" + req.body.email);
	  	try {
	  		// const { error } = validate(req.body);
	  		// if (error)
	  		// 	return res.status(400).send({ message: error.details[0].message });
	  
	  		const user = await User.findOne({ email: req.body.email });
			console.log("USER->"+user);
	  		if (!user)
	  			return res.status(401).send({ message: "Invalid Email or Password" });
	  
	  		const validPassword = await bcrypt.compare(
	  			req.body.password,
	  			user.password
	  		);
			console.log("valid password->"+validPassword);
	  		if (!validPassword)
	  			return res.status(401).send({ message: "Invalid Email or Password" });
	        try{
				const token = await user.generateAuthToken();
				// var token = jwt.sign({email:req.body.email},'supersecret',{expiresIn: 120})
				console.log(token);
				res.status(200).send({ data: token, message: "logged in successfully", email: req.body.email ,user_id:user._id });
			}
	  		catch(error){
               res.send(error);
			}
	  		
	  	} catch (error) {
	  		res.status(500).send({ message: "Internal Server Error" });
	  	}
	} catch (error) {
	  console.log(error);
	  res.json({ error });
	}
  }

 

// router.post("/", async (req, res) => {
// 	console.log("this is from api end" + req.body);
// 	try {
// 		const { error } = validate(req.body);
// 		if (error)
// 			return res.status(400).send({ message: error.details[0].message });

// 		const user = await User.findOne({ email: req.body.email });
// 		if (!user)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const validPassword = await bcrypt.compare(
// 			req.body.password,
// 			user.password
// 		);
// 		if (!validPassword)
// 			return res.status(401).send({ message: "Invalid Email or Password" });

// 		const token = user.generateAuthToken();
// 		res.status(200).send({ data: token, message: "logged in successfully" });
// 	} catch (error) {
// 		res.status(500).send({ message: "Internal Server Error" });
// 	}
// });

const validate = (data) => {
	const schema = Joi.object({
		email: Joi.string().email().required().label("Email"),
		password: Joi.string().required().label("Password"),
	});
	return schema.validate(data);
};

//module.exports = router;