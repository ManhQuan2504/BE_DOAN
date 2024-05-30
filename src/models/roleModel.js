import mongoose from "mongoose";

const model = {
  modelName: 'roles',
  version: '1',
  data: {
    roleCode: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    roleName: {
      type: mongoose.Schema.Types.String,
    },
  },
};

export default model;
