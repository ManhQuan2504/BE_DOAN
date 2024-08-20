import mongoose from "mongoose";
import { API_LIST } from "../core/helper/controllerHelper.js";
import { CREATE, GET, HTTP_METHOD, LOGIN } from "../core/constant/routersConstant.js";
import { ordersAggregate } from "../controller/orderController.js";

const model = {
  modelName: 'orders',
  version: '1',
  apiList: [
    {
      code: GET,
      path: "/orderAggregate/",
      method: HTTP_METHOD.GET,
      controller: ordersAggregate,
    },
    ...API_LIST.CRUD,
  ],
  data: {
    orderNumber: {
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

    orderDate: {
      type: mongoose.Schema.Types.Date,
    },

    totalAmount: {
      type: mongoose.Schema.Types.Number,
    },

    paided: {
      type: mongoose.Schema.Types.Number,
    },

    shipTo: {
      type: mongoose.Schema.Types.String,
    },

    orderState: {
      type: mongoose.Schema.Types.String,
    },

    paymentMethod: {
      type: mongoose.Schema.Types.String,
    },

    dataPayment: {
      type: mongoose.Schema.Types.Array,
    },
  },
};

export default model;
