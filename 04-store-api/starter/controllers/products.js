const Product = require("../models/product");

const getAllProductsStatic = async (req, res) => {
  const search = "al";
  const products = await Product.find({ price: { $gt: 30 } })
    .select("name price")
    .skip(10)
    .limit(10);
  res.status(200).json({ products, nmHits: products.length });
};

const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObj = {};

  //Три if'а ниже выдают запросы по конкретным значениям полей
  if (featured) {
    //Значение в фичуред должно быть булевым, но из запроса оно приходит в виде строки
    //Поэтому если фичуред пришло то потом мы сравниваем его значение со строкой 'true' и уже исходя из этого присваиваем нормальное булевое значение
    queryObj.featured = featured === "true" ? true : false;
  }

  //Тут мы ищем доки названия компаний которых должны точно совпадать с запросом
  if (company) {
    queryObj.company = company;
  }

  if (name) {
    //А тут уже используется регулярка. Мы ищем доки по имени без точного совпадения имени тоесть по буквам и не смотря на регистр
    queryObj.name = { $regex: name, $options: "i" };
  }

  //
  if (numericFilters) {
    const operatorMap = {
      ">": "$gt",
      ">=": "$gte",
      "=": "$eq",
      "<=": "$lte",
      "<": "$lt",
    };
    const regEx = /\b(<|>|>=|<=|=)\b/g;
    let filters = numericFilters.replace(
      regEx,
      (match) => `-${operatorMap[match]}-`
    );
    console.log(filters);
  }

  let result = Product.find(queryObj);

  //Sort
  if (sort) {
    //Если задано больше одного, надо сплитить и джоинить пробелом
    const sortList = sort.split(",").join(" ");
    result = result.sort(sortList);
  } else {
    result = result.sort("createdAt");
  }

  //Select
  //Показывает только указанные поля
  if (fields) {
    const fieldsList = fields.split(",").join(" ");
    result = result.select(fieldsList);
  }

  //Pagination
  //Все запросы приходят в виде строк, поэтому конвертим в числа если они должны быть числами
  const page = Number(req.query.page) || 1; //Если page не задано то начинаем с первой
  const limit = Number(req.query.limit) || 10; //Если limit не задано то начинаем с первой
  const skip = (page - 1) * limit; //Вычисляем сколько нужно пропустить
  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json(products);
};

module.exports = {
  getAllProductsStatic,
  getAllProducts,
};
