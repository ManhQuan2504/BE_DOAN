import registerModelList from '../core/helper/modelHelper.js';

// import productModel from './productModel.js';
// import permissionModel from './permissionModel.js'; 
import roleModel from './roleModel.js';
import employeeModel from './empoyeeModel.js';
import uomModel from './uomModel.js';
import categoryModel from './categoryModel.js';
import taxModel from './taxModel.js';
import productModel from './productModel.js';
import customerModel from './customerModel.js';
import customertokenModel from './customertokenModel.js';

const modelList = [
  // userModel,
  // permissionModel,
  roleModel,
  employeeModel,
  uomModel,
  categoryModel,
  taxModel,
  productModel,
  customerModel,
  customertokenModel,
];
const serviceModelList = registerModelList(modelList);

export default serviceModelList;