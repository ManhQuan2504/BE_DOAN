import mongoose from "mongoose";

const serviceModelList = {};

export const registerModelList = async (modelList) => {
  console.log("🚀 ~ 33333registerModelList ~ modelList:")
  if (!Array.isArray(modelList)) {
    throw new Error('modelList is not an array.');
  }
  
  const permissionModel = {
    modelName: 'permissions',
    version: '1',
    data: {
      apiPath: {
        type: mongoose.Schema.Types.String,
      },
      
      method: {
        type: mongoose.Schema.Types.String,
      },

      perCode: {
        type: mongoose.Schema.Types.String,
      },
      
      perName: {
        type: mongoose.Schema.Types.String,
      },
    },
  };
  
  modelList.push(permissionModel)
  
  const crossModelDataConstraint = {};
  
  modelList.forEach((model) => {
    const { modelName, version, data } = model;
    
    if (!modelName) {
      throw new Error('modelName is undefined.');
    }

    if (!data) {
      throw new Error('data is undefined.');
    }

    data.active = { type: Boolean, default: true };
    data.createdAt = { type: Date };
    data.updatedAt = { type: Date };
    data.deleted = { type: Boolean, default: false };
    data.deletedAt = { type: Date };

    const collectionName = mongoose.model(modelName, data);
    serviceModelList[modelName] = {
      modelName,
      collectionName,
      version: version || '1',
      data: data,
    }
    crossModelDataConstraint[modelName] = collectionName;
  });
  
  return crossModelDataConstraint;
};

export default serviceModelList; // bất đồng bộ nên hiện chưa có data, registerModelList chạy ngay sau cái này