import mongoose from 'mongoose';
import serviceModelList from '../../models/index.js';
import {
  HTTP_METHOD,
  POST, DELETE, CREATE, GET_LIST,
  EXPORT, GET_BY_ID, UPDATE, AGGREGATE
} from '../constant/routersConstant.js';

export const createController = async (req, res) => {
  try {
    console.log("CREATE CONTROLER");
    const { modelName, data } = req.body;
    console.log("🚀 ~ createController ~ data:", data)

    if (!modelName) {
      throw new Error("Model is undefined.")
    }

    const Model = serviceModelList[modelName].collectionName;
    const modelAttributes = Object.keys(Model.schema.paths);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field)); // check field data == field model
    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModelName = attribute.options.ref;
        const referencedModel = serviceModelList[referencedModelName].collectionName;
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const dataObject = new Model(data);
    await dataObject.save();

    res.json({ dataObject });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const getListController = async (req, res) => {
  try {
    console.log("GET LIST CONTROLER");

    let { modelName, data, page = 1, perPage = 10 } = req.query;
    page = parseInt(page);
    page = Math.max(page, 1);
    perPage = parseInt(perPage);
    perPage = Math.max(perPage, 3);

    if (!modelName) {
      throw new Error("Model is undefined.")
    }

    const Model = serviceModelList[modelName].collectionName;

    const offset = (page - 1) * perPage;
    const limit = parseInt(perPage);

    const dataObject = await Model.find();

    res.json({ dataObject });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const exportController = async (req, res) => {
  res.send({
    message: 'exportController'
  }
  );
}

export const getByIdController = async (req, res) => {
  try {
    console.log("GET BY ID CONTROLLER");

    const { modelName, data } = req.body;
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    const Model = serviceModelList[modelName].collectionName;

    const dataGetById = await Model.findById(id, data ? data : null).exec();

    if (!dataGetById) {
      return res.status(404).json({ error: 'Document not found' });
    }

    res.json({ dataGetById });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
};

export const updateController = async (req, res) => {
  try {
    const { modelName, data } = req.body;
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.")
    }

    const Model = serviceModelList[modelName].collectionName;
    const modelAttributes = Object.keys(Model.rawAttributes);
    const invalidFields = Object.keys(data).filter(field => !modelAttributes.includes(field));

    if (invalidFields.length > 0) {
      throw new Error(`Invalid fields: ${invalidFields.join(', ')}`);
    }

    // Kiểm tra các trường có tham chiếu đến các model khác
    for (const field of Object.keys(data)) {
      const attribute = Model.schema.paths[field];
      if (attribute.options && attribute.options.ref) {
        const referencedModelName = attribute.options.ref;
        const referencedModel = serviceModelList[referencedModelName].collectionName;
        const record = await referencedModel.findById(data[field]);
        if (!record) {
          throw new Error(`Referenced record not found for field '${field}'`);
        }
      }
    }

    const dataObject = await Model.update(
      data,
      { where: { id } }
    );

    res.json({ dataObject });

  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const deleteController = async (req, res) => {
  try {
    const { modelName } = req.body;
    const { id } = req.params;

    if (!modelName) {
      throw new Error("Model is undefined.");
    }

    const Model = serviceModelList[modelName].collectionName;

    const dataObject = await Model.update(
      { deleted: true },
      { where: { id } }
    );

    res.json({ dataObject });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal Server Error' });
  }
}

export const postController = (req, res) => {
  res.send({
    message: 'postController'
  }
  );
}

export const aggregateController = (req, res) => {
  res.send({
    message: 'aggregateController'
  }
  );
}

export const API = {
  CREATE: {
    code: CREATE,
    method: HTTP_METHOD.POST,
    path: '/',
    controller: createController,
  },

  GET_LIST: {
    code: GET_LIST,
    method: HTTP_METHOD.GET,
    path: '/',
    controller: getListController,
  },

  EXPORT: {
    code: EXPORT,
    method: HTTP_METHOD.GET,
    path: '/export',
    controller: exportController,
  },

  GET_BY_ID: {
    code: GET_BY_ID,
    method: HTTP_METHOD.GET,
    path: '/:id',
    controller: getByIdController,
  },

  UPDATE: {
    code: UPDATE,
    method: HTTP_METHOD.PUT,
    path: '/:id',
    controller: updateController,
  },

  DELETE: {
    code: DELETE,
    method: HTTP_METHOD.DELETE,
    path: '/:id',
    controller: deleteController,
  },

  POST: {
    code: POST,
    method: HTTP_METHOD.PATCH,
    path: '/post/:id',
    controller: postController,
  },

  AGGREGATE: {
    code: AGGREGATE,
    method: HTTP_METHOD.PATCH,
    path: '/aggregate/:id',
    controller: aggregateController,
  },
};

export const API_LIST = {
  CRUD: [
    API.CREATE,
    // API.AGGREGATE, // [!] cause of router pipeline, "Aggregate" API" must before "GetById API"
    API.GET_LIST,
    API.GET_BY_ID,
    API.UPDATE,
    API.DELETE,
  ],
}