import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";
import { CREATE, HTTP_METHOD, LOGIN } from "../core/constant/routersConstant.js";
import { createEmployeeController, loginController } from "../controller/employeeController.js"

const model = {
  modelName: 'employees',
  version: '1',
  apiList: [
    {
      code: LOGIN,
      path: "/login/",
      method: HTTP_METHOD.POST,
      controller: loginController,
    },
    {
      code: CREATE,
      path: "/createEmployee",
      method: HTTP_METHOD.POST,
      controller: createEmployeeController,
    },
    ...API_LIST.CRUD,
  ],
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

    avatar: {
      type: mongoose.Schema.Types.Array,
    },

    isVerified: {
      type: mongoose.Schema.Types.Boolean,
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

    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'roles',
    },
  },
};

export default model;
