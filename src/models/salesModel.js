import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";
import { CREATE, HTTP_METHOD, LOGIN } from "../core/constant/routersConstant.js";
import { createEmployeeController, loginController } from "../controller/employeeController.js"

const model = {
  modelName: 'sales',
  version: '1',
  // apiList: [
  //   {
  //     code: LOGIN,
  //     path: "/login/",
  //     method: HTTP_METHOD.POST,
  //     controller: loginController,
  //   },
  //   {
  //     code: CREATE,
  //     path: "/createEmployee/",
  //     method: HTTP_METHOD.POST,
  //     controller: createEmployeeController,
  //   },
  //   ...API_LIST.CRUD,
  // ],
  data: {
    saleNumber: {
      type: mongoose.Schema.Types.String,
      unique: true,
    },

    productList: {
      type: mongoose.Schema.Types.Array,
    },

    employee: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'employees'
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'customers'
    },

    saleDate: {
      type: mongoose.Schema.Types.Date,
    },

    totalAmount: {
      type: mongoose.Schema.Types.Number,
    },

    shipTo: {
      type: mongoose.Schema.Types.String,
    },
  },
};

export default model;
