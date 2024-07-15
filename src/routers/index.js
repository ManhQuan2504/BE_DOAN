import { Router } from 'express';
import { registerRouterList } from '../core/helper/routerHelper.js';
import uploadRouter from './uploadRouter.js';
import userRouter from './userRouter.js';

const router = Router();
// overwrite thì khai báo trước registerRouterList(router);
router.use('/users', userRouter); 
router.use('/', uploadRouter);

registerRouterList(router);

export default router;
// export { registerRouterList };
