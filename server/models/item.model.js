const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const config = require('../config/config');
const FileSchema = require('./sub-documents/file.model');

let ItemSchema = Schema({
    name: {
        type: String,
        unique: true,
        required: true
    },
    description: String,
    categoryId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    brandId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    tags: Array,
    purchaseDate: Date,
    price: Number,
    files: [ FileSchema ],
    createdBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
}, { toJSON: { virtuals: true } });

ItemSchema.virtual('category', {
    ref: 'Category',
    localField: 'categoryId',
    foreignField: '_id'
});

ItemSchema.virtual('brand', {
    ref: 'Brand',
    localField: 'brandId',
    foreignField: '_id'
});

ItemSchema.virtual('noImageUrl').get(function() {
    return config.noImageUrl;
});

module.exports = mongoose.model('Item', ItemSchema);
