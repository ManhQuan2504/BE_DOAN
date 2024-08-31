import mongoose from "mongoose";

const ORDERS = 'orders';

export const ordersAggregate = async (req, res) => {
  try {
    const { modelName, data } = req.query;
    const parsedData = JSON.parse(data);
    const { fromDate, toDate } = parsedData;

    if (modelName !== ORDERS) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const OrdersModel = mongoose.model(modelName);

    const mongoMatch = {
      orderDate: {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999))
      }
    };

    const reportByDate = await OrdersModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          totalOrders: { $sum: { $multiply: ["$productList.count", "$productList.price"] } }
        }
      },
      { $sort: { _id: 1 } } // Sắp xếp theo ngày tăng dần
    ]);

    const reportByProduct = await OrdersModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: "$productList.product",
          productCode: { $first: "$productList.productCode" },
          productName: { $first: "$productList.productName" },
          totalOrders: { $sum: { $multiply: ["$productList.count", "$productList.price"] } },
          totalQuantity: { $sum: "$productList.count" }
        }
      },
      { $sort: { productName: 1 } }
    ]);

    return res.json({ reportByDate, reportByProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
