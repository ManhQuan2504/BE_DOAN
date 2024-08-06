import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";
import { CREATE, GET, HTTP_METHOD, LOGIN } from "../core/constant/routersConstant.js";
import { salesAggregate } from "../controller/salesController.js"

const model = {
  modelName: 'sales',
  version: '1',
  apiList: [
    {
      code: GET,
      path: "/salesAggregate/",
      method: HTTP_METHOD.GET,
      controller: salesAggregate,
    },
    ...API_LIST.CRUD,
  ],
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
      type: mongoose.Schema.Types.String,
    },

    phoneNumber: {
      type: mongoose.Schema.Types.String,
    },

    saleDate: {
      type: mongoose.Schema.Types.Date,
      default: new Date(),
    },

    totalAmount: {
      type: mongoose.Schema.Types.Number,
    },

  },
};

export default model;
