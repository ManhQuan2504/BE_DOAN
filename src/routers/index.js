import { Router } from 'express';
import { registerRouterList } from '../core/helper/routerHelper.js';
// import userRouter from './userRouters.js';

const router = Router();

// router.use('/v1/users', userRouter); // overwrite thì khai báo trước registerRouterList(router);

registerRouterList(router);

export default router;
export { registerRouterList };
