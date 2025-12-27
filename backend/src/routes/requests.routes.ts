import { Router } from 'express';
import * as requestsController from '../controllers/requests.controller.js';
import { auth } from '../middleware/auth.js';

const router = Router();

router.use(auth);

router.get('/', requestsController.getAll);
router.get('/calendar', requestsController.getCalendar);
router.get('/kanban', requestsController.getKanban);
router.get('/my-requests', requestsController.getMyRequests); // Get requests for current user based on team
router.get('/:id', requestsController.getById);
router.post('/', requestsController.create);
router.patch('/:id', requestsController.update);
router.patch('/:id/status', requestsController.updateStatus);
router.patch('/:id/assign', requestsController.assign); // Assign technician with team validation

export default router;

