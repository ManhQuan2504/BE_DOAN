import mongoose from "mongoose";
import bcrypt from "bcrypt";

const EMPLOYEES = "employees";
export const loginController = async (req, res) => {
  try {
    console.log("MANAGER LOGIN");
    const { modelName, data } = req.body;
    const { employeeCode, password } = data;

    if (modelName !== EMPLOYEES) {
      return res.status(401).json({ error: "Model is undefined." });
    }

    const Model = mongoose.model(modelName); // Đảm bảo rằng modelName là 'Employee'

    // Tìm người dùng dựa trên employeeCode
    const validateEmployeeCode = (employeeCode.trim()).toLowerCase();
    const existingUser = await Model.findOne({ employeeCode: validateEmployeeCode }).populate('roleId');

    if (!existingUser) {
      throw new Error('Wrong username or password');
    } else {
      // So sánh mật khẩu
      const isPasswordValid = await bcrypt.compare(password, existingUser.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Invalid Password' });
      }
      if (!existingUser.active) {
        return res.status(401).json({ error: 'Email not active' });
      }
      if (existingUser.deleted) {
        return res.status(401).json({ error: 'Account was deleted' });
      }

      // Xóa mật khẩu trước khi trả về người dùng
      const userWithoutPassword = existingUser.toObject();
      delete userWithoutPassword.password;

      res.json({ dataObject: userWithoutPassword });
    }

  } catch (error) {
    return res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const createEmployeeController = async (req, res) => {
  try {
    console.log("CREATE EMPLOYEE");
    const { modelName, data } = req.body;
    const { employeeCode, password } = data;
    if (modelName !== EMPLOYEES) {
      throw new Error("Model is undefined.")
    }

    const Model = mongoose.model(modelName);
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field)); // check field data == field model
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModel = mongoose.model(attribute.options.ref);
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const validateEmployeeCode = (employeeCode.trim()).toLowerCase();
    const hashPassword = bcrypt.hashSync(password, parseInt(process.env.SALT));
    data.employeeCode = validateEmployeeCode;
    data.password = hashPassword;
    const dataObject = new Model(data);
    await dataObject.save();

    res.json({ dataObject });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}