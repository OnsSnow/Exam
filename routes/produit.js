var express = require('express');
const Produit = require('../model/Produit');
var router = express.Router();
const produitModel = require('../model/Produit');
var router = express.Router();


router.get("/find", async function (req, res, next) {
  const products = await Produit.find();
  res.render("products", { products });
});

router.post('/',async (req,res,next) => {
  try{
  const {Libelle, Prix , Description, Quantite, Stock} =req.body;
  const produit = new Produit ({
    Libelle,
    Prix,
    Description,
    Quantite,
    Stock
  });
  await produit.save();
  res.redirect("/produit/find");
} catch (error) {
  console.log(error);
}
});


//delete
router.delete("/deleteProduct/:id", async function (req, res, next) {
  const { id } = req.params;
  console.log(id);
  try {
    const checkIfProductExists = await Produit.findOne({ _id: id });
    if(!checkIfProductExists) {
      throw new Error("Product does not exists !");
    }
    await Produit.findOneAndDelete({ _id: id });
    res.redirect("http://localhost:3000");
  } catch (error) {
    res.status(404).json(error.message);
  }
});


module.exports = router;
