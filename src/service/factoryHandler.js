const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/appError');

exports.createone = Model => {
    return catchAsync(async (req,res,next) => {
        const doc = await Model.create(req.body)

        res.status(201).json({
            status:"success",
            data: {
                data: doc
            }
        })
    })
}

exports.getOne = Model => {
    return catchAsync(async (req,res,next) => {
        const doc = await Model.findById(req.params.id)

        if(!doc){
            return next(new AppError('No document found with this Id', 404))
        }

        res.status(200).json({
            status: "success",
            data: {
                data: doc
            }
        })
    })
}

exports.getAll = Model => {
    return catchAsync(async (req,res,next) => {
        const doc = await Model.find()

        if(!doc){
            return next(new AppError('Can not any doc here ', 404))
        }

        res.status(200).json({
            status: "success",
            results: doc.length,
            data: {
                data: doc
            }
        })
    })
}

