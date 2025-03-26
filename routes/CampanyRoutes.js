const mongoose = require("mongoose");
const CampanyRouter = require("express").Router();
const AuthJWT = require("../middleware/AuthJWT");
const CampanyModel = require("../models/CompanyModel");

CampanyRouter.get("/", AuthJWT, async (req, res) => {
  try {
    const allCampanies = await CampanyModel.find();
    res.status(200).json({
      success: true,
      message: "campany fetched successfully",
      data: allCampanies,
    });
    return;
  } catch (err) {
    res.status({ message: err.message, success: false });
    return;
  }
});

CampanyRouter.post("/", AuthJWT, async (req, res) => {
  const { Code, Name, Link, Machines, Frequency, Contact_Number, Remark } =
    req.body;

  try {
    const newCampany = new CampanyModel({
      Code,
      Name,
      Link,
      Machines,
      Frequency,
      Contact_Number,
      Remark,
    });
    const newCampanySaved = await newCampany.save();
    if (newCampanySaved) {
      res.status(201).json({
        message: "successfully added",
        success: true,
        data: newCampanySaved,
      });
      return;
    } else {
      res.status(400).json({
        message: "required data missing",
        success: false,
      });
      return;
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
    return;
  }
});

CampanyRouter.delete("/:id", AuthJWT, async (req, res) => {
  const { id } = req.params;
  try {
    const deleted = await CampanyModel.findByIdAndDelete(id);
    if (deleted) {
      res.status(200).json({
        success: true,
        message: "successfully deleted",
        data: deleted,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Failed to delete",
      });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

CampanyRouter.patch("/", AuthJWT, async (req, res) => {
  const { _id, Code, Name, Link, Machines, Frequency, Contact_Number, Remark } =
    req.body;

  try {
    const updatedCampanyDetails = await CampanyModel.findByIdAndUpdate(
      _id,
      {
        $set: {
          Code,
          Name,
          Link,
          Machines,
          Frequency,
          Contact_Number,
          Remark,
        },
      },
      { new: true }
    );
    if (updatedCampanyDetails) {
      res.status(200).json({
        message: "successfully updated",
        success: true,
        data: updatedCampanyDetails,
      });
    } else {
      res.status(400).json({
        message: "Failed to update",
        success: false,
      });
    }
  } catch (err) {
    res.status(500).json({ message: err.message, success: false });
    return;
  }
});

module.exports = CampanyRouter;
