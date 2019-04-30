import {Router} from 'express';
import {getReport, getReportCount, getReportList} from "../../controllers/mws/reports";

const router = Router();

router.get('/report_count', getReportCount);
router.get('/report_list', getReportList);
router.get('/:id', getReport);

export default router;