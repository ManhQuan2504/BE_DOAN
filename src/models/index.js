import { registerModelList } from '../core/helper/modelHelper.js';
// import productModel from './productModel.js';
// import permissionModel from './permissionModel.js'; 
import roleModel from './roleModel.js';
import employeeModel from './empoyeeModel.js';

const modelList = [
  // userModel,
  // permissionModel,
  roleModel,
  employeeModel
];

registerModelList(modelList);
export { default as serviceModelList } from '../core/helper/modelHelper.js';
