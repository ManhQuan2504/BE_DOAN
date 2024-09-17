import mongoose from "mongoose";

const model = {
  modelName: 'vendors',
  version: '1',
  data: {
    vendorCode: {
      type: mongoose.Schema.Types.String,
    },

    vendorName: {
      type: mongoose.Schema.Types.String,
    },

    vendorShortName: {
      type: mongoose.Schema.Types.String,
    },

    address: {
      type: mongoose.Schema.Types.String,
    },

    phoneNumber: {
      type: mongoose.Schema.Types.String,
    },

    email: {
      type: mongoose.Schema.Types.String,
    },

    vendorTaxCode: {
      type: mongoose.Schema.Types.String,
    },

    brcCode: {
      type: mongoose.Schema.Types.String,
    },

  },
};

export default model;
