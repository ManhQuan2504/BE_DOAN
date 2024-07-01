import registerModelList from '../core/helper/modelHelper.js';

// import productModel from './productModel.js';
// import permissionModel from './permissionModel.js'; 
import roleModel from './roleModel.js';
import employeeModel from './empoyeeModel.js';
import uomModel from './uomModel.js';
import categoryModel from './categoryModel.js';

const modelList = [
  // userModel,
  // permissionModel,
  roleModel,
  employeeModel,
  uomModel,
  categoryModel,
];
const serviceModelList = registerModelList(modelList);

export default serviceModelList;