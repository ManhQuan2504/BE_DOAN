import mongoose from "mongoose";

const SALES = 'sales';

export const salesAggregate = async (req, res) => {
  try {
    const { modelName, data } = req.query;
    const parsedData = JSON.parse(data);
    const { fromDate, toDate } = parsedData;

    if (modelName !== SALES) {
      return res.status(400).json({ error: "Model is undefined." });
    }

    // Validate input data
    if (!fromDate || !toDate) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const SalesModel = mongoose.model(modelName);

    const mongoMatch = {
      saleDate: {
        $gte: new Date(new Date(fromDate).setHours(0, 0, 0, 0)),
        $lte: new Date(new Date(toDate).setHours(23, 59, 59, 999))
      }
    };

    const reportByDate = await SalesModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$saleDate" } },
          totalSales: { $sum: { $multiply: ["$productList.saleQty", "$productList.price"] } }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const reportByProduct = await SalesModel.aggregate([
      { $match: mongoMatch },
      { $unwind: "$productList" },
      {
        $group: {
          _id: "$productList.product",
          productCode: { $first: "$productList.productCode" },
          productName: { $first: "$productList.productName" },
          totalSales: { $sum: { $multiply: ["$productList.saleQty", "$productList.price"] } },
          totalQuantity: { $sum: "$productList.saleQty" }
        }
      },
      { $sort: { productName: 1 } }
    ]);

    return res.json({ reportByDate, reportByProduct });
  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};
