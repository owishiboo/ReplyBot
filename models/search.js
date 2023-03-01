const mongoose = require("mongoose");


const searchSchema = new mongoose.Schema({
	email: { type: String, required: true },
	queries:[
		{
			body:{type: String}
		}
	]
});


const Search =  mongoose.models.search || mongoose.model("search", searchSchema);
module.exports = { Search };