import Notice from "../models/Notice.js";
import mongoose from "mongoose";

export const createNotice = async (req, res) => {
  try {
    const {
      target,
      noticeTitle,
      employeeId,
      employeeName,
      position,
      noticeType,
      noticeBody,
      isPublished,
      isDraft,
      publishedAt,
    } = req.body;

    if (
      !target ||
      !noticeTitle ||
      !employeeId ||
      !employeeName ||
      !position ||
      !noticeType ||
      !noticeBody
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
      });
    }

    const notice = await Notice.create({
      target,
      noticeTitle,
      employeeId,
      employeeName,
      position,
      noticeType,
      noticeBody,

      isDraft: isDraft || false,

      isPublished: isDraft ? false : isPublished || false,

      publishedAt,
    });

    res.status(201).json({
      success: true,
      message: "Notice created successfully",
      data: notice,
    });
  } catch (error) {
    console.error("Create Notice Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create notice",
    });
  }
};

export const getAllNotices = async (req, res) => {
  try {
    const { page = 1, limit = 10, search = "", status } = req.query;

    const skip = (Number(page) - 1) * Number(limit);

    let query = {};

    if (search) {
      query.employeeName = { $regex: search, $options: "i" };
    }

    if (status === "published") {
      query.isPublished = true;
    }

    if (status === "unpublished") {
      query.isPublished = false;
      query.isDraft = false;
    }

    if (status === "draft") {
      query.isDraft = true;
    }

    const notices = await Notice.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(Number(limit));

    const total = await Notice.countDocuments(query);

    res.status(200).json({
      pagination: {
        total,
        page: Number(page),
        limit: Number(limit),
        totalPages: Math.ceil(total / limit),
      },
      success: true,
      data: notices,
    });
  } catch (error) {
    console.error("Get Notices Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notices",
    });
  }
};

export const patchNotice = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID",
      });
    }

    if (typeof updates.isDraft === "boolean" && updates.isDraft) {
      updates.isPublished = false;
      updates.publishedAt = null;
    }

    if (typeof updates.isPublished === "boolean") {
      updates.publishedAt =
        updates.isPublished && !updates.isDraft ? new Date() : null;
      if (updates.isPublished) updates.isDraft = false;
    }

    const updatedNotice = await Notice.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedNotice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Notice updated successfully",
      data: updatedNotice,
    });
  } catch (error) {
    console.error("Patch Notice Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update notice",
    });
  }
};

export const viewNotice = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid notice ID",
      });
    }

    const notice = await Notice.findById(id);
    if (!notice) {
      return res.status(404).json({
        success: false,
        message: "Notice not found",
      });
    }

    res.status(200).json({
      success: true,
      data: notice,
    });
  } catch (error) {
    console.error("View Notice Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notice",
    });
  }
};
