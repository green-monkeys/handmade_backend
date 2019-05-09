import {Router} from 'express';
import {getReport, getReportCount, getReportList, getReportPDF, validate} from "../../controllers/mws/reports";

const router = Router();

router.get('/report_count', getReportCount);
router.get('/report_list', getReportList);

router.get('/pdf/:id', validate('getReportPDF'), getReportPDF);
router.get('/:id', validate('getReport'), getReport);

export default router;