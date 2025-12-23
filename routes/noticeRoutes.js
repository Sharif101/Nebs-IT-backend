import express from "express";
import {
  createNotice,
  getAllNotices,
  patchNotice,
  viewNotice,
} from "../controllers/notice.controller.js";

const router = express.Router();

router.post("/create", createNotice);
router.get("/getall", getAllNotices);
router.patch("/update/:id", patchNotice);
router.get("/getsingle/:id", viewNotice);

export default router;
