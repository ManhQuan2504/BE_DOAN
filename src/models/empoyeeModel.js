import mongoose from "mongoose";

const model = {
  modelName: 'employees',
  version: '1',
  data: {
    employeeCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    employeeName: {
      type: mongoose.Schema.Types.String,
    },

    email: {
      type: mongoose.Schema.Types.String,
    },

    password: {
      type: mongoose.Schema.Types.String,
    },

    phoneNumber: {
      type: mongoose.Schema.Types.Number,
    },

    identityNumber: {
      type: mongoose.Schema.Types.String,
    },

    address: {
      type: mongoose.Schema.Types.String,
    },

    idRole: {
      type: mongoose.Schema.Types.ObjectId,
      references: {
        model: 'roles',
        key: 'id'
      }
    },
  },
};

export default model;
