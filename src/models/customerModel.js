import mongoose from "mongoose";

import { API_LIST } from "../core/helper/controllerHelper.js";
import { HTTP_METHOD, LOGIN, SIGNIN, VERIFY } from "../core/constant/routersConstant.js";

import { loginController, signinController, verifyController } from "../controller/customerController.js"

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
    },
    {
      code: SIGNIN,
      path: "/signin/",
      method: HTTP_METHOD.POST,
      controller: signinController,
    },
    {
      code: VERIFY,
      path: "/verifyMail/:id/:token",
      method: HTTP_METHOD.GET,
      controller: verifyController,
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
      type: mongoose.Schema.Types.String,
    },

    address: {
      type: mongoose.Schema.Types.String,
    },

    active: {
      type: mongoose.Schema.Types.Boolean,
      default: false
    },

    avatar: {
      type: mongoose.Schema.Types.String,
    },

    carts: {
      type: mongoose.Schema.Types.Array,
    },

    idRole: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles'
    },
  },
};

export default model;
