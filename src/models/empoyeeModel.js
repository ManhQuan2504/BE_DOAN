import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";
import { HTTP_METHOD, LOGIN } from "../core/constant/routersConstant.js";
import { loginController } from "../controller/employeeController.js"

const model = {
  modelName: 'employees',
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
