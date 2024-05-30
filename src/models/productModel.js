import mongoose from 'mongoose';

const model = {
  modelName: 'products',
  version: '1',
  data: {
    id: {
      type: mongoose.Schema.Types.uuidv4,
      default: () => uuidv4(),
    },

    productCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    productName: {
      type: mongoose.Schema.Types.String,
    },
    name: {
      type: mongoose.Schema.Types.String,
    },
    image: {
      type: mongoose.Schema.Types.String,
    },
    unit: {
      type: mongoose.Schema.Types.String,
    },
    price: {
      type: mongoose.Schema.Types.Number,
    },
    sold: {
      type: mongoose.Schema.Types.Number,
    },
    productsAvailable: {
      type: mongoose.Schema.Types.String,
    },
    description: {
      type: mongoose.Schema.Types.String,
    },
    idCategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'categorys'
    },
  },
};

export default model;
