const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "al";
  const products = await Product.find({}).select("name price").limit(4);
  res.status(200).json({ products, nmHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields } = req.query;
  const queryObj = {};

  if (featured) {
    queryObj.featured = featured === "true" ? true : false;
  }

  if (company) {
    queryObj.company = company;
  }

  if (name) {
    queryObj.name = { $regex: name, $options: "i" };
  }
  let result = Product.find(queryObj);

  //Sort
  if (sort) {
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //Select
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  const products = await result;
  res.status(200).json(products);
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
