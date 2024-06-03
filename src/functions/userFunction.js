import Joi from "joi";
import jwt from "jsonwebtoken";

// import { serviceModelList } from '../models/index.js';

const login = async (req, res) => {
  try {
    console.log("LOGIN");
    // const { username, password } = req.body;

    // if (!username || !password) {
    //   throw new Error(`Input is require`);
    // }
    // const validationInput = Schema.validate({ username, password });
    // if (validationInput.error) {
    //   const errorMessages = validationInput.error.details.map((error) => error.message);
    //   throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
    // }

    // const response = await adminService.login({ username, password });

    // const token = jwt.sign({ data: response }, process.env.JWT_SECRET, { expiresIn: '30 days' })

    // return res.status(200).json(
    //   {
    //     status: "OK",
    //     data: response,
    //     token: token
    //   }
    // )

  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    )
  }
}

const register = async (req, res) => {
  try {
    console.log("LOGIN");
    // const { username, password } = req.body;

    // if (!username || !password) {
    //   throw new Error(`Input is require`);
    // }
    // const validationInput = Schema.validate({ username, password });
    // if (validationInput.error) {
    //   const errorMessages = validationInput.error.details.map((error) => error.message);
    //   throw new Error(`Dữ liệu không hợp lệ: ${errorMessages.join(', ')}`);
    // }

    // const response = await adminService.login({ username, password });

    // const token = jwt.sign({ data: response }, process.env.JWT_SECRET, { expiresIn: '30 days' })

    // return res.status(200).json(
    //   {
    //     status: "OK",
    //     data: response,
    //     token: token
    //   }
    // )

  } catch (error) {
    return res.status(400).json(
      {
        status: "ERR",
        error: error.message
      }
    )
  }
}

export default {
  login,
  register
}