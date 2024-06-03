import registerModelList from '../core/helper/modelHelper.js';

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
const serviceModelList = registerModelList(modelList);

export default serviceModelList;