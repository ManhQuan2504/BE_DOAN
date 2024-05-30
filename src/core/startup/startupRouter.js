import cors from "cors";
import bodyParser from 'body-parser';
import initRouter from "../../routers/index.js";

const initCreateRouter = (app) => {
  app.use(cors());
  // Cau hinh static file
  // app.use(Express.static(path.join(__dirname, '../uploads')));

  app.use(bodyParser.json({
    limit: '50mb',
  }));

  app.use(bodyParser.urlencoded({
    limit: '50mb',
    extended: false,
    parameterLimit: 50000
  }));

  app.get('/hello', (request, response) => {
    response.send({
      message: 'Node.js and Express REST API'
    }
    );
  });

  app.use(initRouter);
}

export {
  initCreateRouter
}