import mongoose from "mongoose";

import { API_LIST } from "../core/helper/controllerHelper";
import { HTTP_METHOD, LOGIN } from "../core/constant/routersConstant";

import { loginController } from "../controller/customerController"

const model = {
  modelName: 'customers',
  version: '1',
  apiList: [
    ...API_LIST.CRUD,
    {
      code: LOGIN,
      path: "/login/",
      method: HTTP_METHOD.POST,
      controller: loginController,
    }
  ],

  data: {
    customerName: {
      type: mongoose.Schema.Types.String,
    },

    email: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    password: {
      type: mongoose.Schema.Types.String,
    },

    phoneNumber: {
      type: mongoose.Schema.Types.Number,
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
