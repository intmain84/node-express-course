const {StatusCodes} = require('http-status-codes')
const path = require('path')
const CustomError = require('../errors')


const uploadProductImage = async (req, res) => {
    if(!req.files) {
        throw new CustomError.BadRequestError('No upload files')
    }

    const productImage = req.files.image;
    if(!productImage.mimetype.startsWith('image')) throw new CustomError.BadRequestError('Please upload an image')
    if(productImage.size > 1024*1024) throw new CustomError.BadRequestError('The image size should be less than 1KB')

    const imagePath = path.join(__dirname, '../public/uploads/' + `${productImage.name}`);

    await productImage.mv(imagePath);

    return res.status(StatusCodes.OK).json({image: {src:`/uploads/${productImage.name}`}})
}

module.exports = {
    uploadProductImage
}