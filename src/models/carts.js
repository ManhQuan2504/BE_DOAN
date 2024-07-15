import mongoose from "mongoose";

const model = {
  modelName: 'carts',
  version: '1',
  data: {
    taxCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    taxValue: {
      type: mongoose.Schema.Types.Number,
    },
  },
};

export default model;
