import express from 'express';
import catchAsync from '../../utils/catchAsync.js';
import { getCategory, getHomepage, getListing } from '../../controllers/search.js';
const router = express.Router();
router.get("/listings", catchAsync(getHomepage));
router.get("/listings/one", catchAsync(getListing));
router.get("/listings/category", catchAsync(getCategory));
export default router;
