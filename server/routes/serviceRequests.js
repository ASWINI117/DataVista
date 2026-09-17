const express = require("express");
const ServiceRequest = require("../models/ServiceRequest");

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      company,
      service,
      description,
    } = req.body;

    if (!name || !email || !phone || !service || !description) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email, phone, service and description are required",
      });
    }

    const serviceRequest = await ServiceRequest.create({
      name,
      email,
      phone,
      company: company || "",
      service,
      description,
    });

    res.status(201).json({
      success: true,
      message: "Service request submitted successfully",
      request: serviceRequest,
    });
  } catch (error) {
    console.error("Service request error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit service request",
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const requests = await ServiceRequest.find().sort({
      createdAt: -1,
    });

    res.json({
      success: true,
      count: requests.length,
      requests,
    });
  } catch (error) {
    console.error("Get service requests error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch service requests",
    });
  }
});

router.patch("/:id/status", async (req, res) => {
  try {
    const { status } = req.body;

    const allowedStatuses = [
      "NEW",
      "CONTACTED",
      "IN_PROGRESS",
      "COMPLETED",
      "CANCELLED",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid status",
      });
    }

    const request = await ServiceRequest.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!request) {
      return res.status(404).json({
        success: false,
        message: "Service request not found",
      });
    }

    res.json({
      success: true,
      message: "Status updated successfully",
      request,
    });
  } catch (error) {
    console.error("Update status error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update status",
    });
  }
});

module.exports = router;