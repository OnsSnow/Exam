const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ProduitSchema = new Schema(
 {
 username : {type: String},
 email : {type: String, require: true},
 password : {type: String, require: true},
 },
 { timestamps: true }
);
module.exports = mongoose.model('Produit', ProduitSchema);
