import mongoose from "mongoose";
import bcrypt from "bcrypt";

const modelName = "employees";
export const loginController = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { username, password } = data;
    const Model = mongoose.model(modelName);

    const existingUser = Model.find({ username })
    if (existingUser) {
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        throw new Error('Invalid Password');
      }
      if (existingUser.isVerified == false) {
        throw new Error('Email not verify');
      }
      if (existingUser.deleled != true) {
        throw new Error('Account was delete');
      }

      return existingUser;

    }

  } catch (error) {
    console.log("🚀 ~ loginController ~ error:", error)
  }
};

export const createEmployeeController = async (req, res) => {
  console.log('create');
}