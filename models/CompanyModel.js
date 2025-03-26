const mongoose = require(`mongoose`);

const CampanySchema = new mongoose.Schema(
  {
    Code: {
      type: Number,
      required: true,
    },
    Name: {
      type: String,
      required: true,
    },
    Link: {
      type: String,
      required: true,
    },
    Machines: {
      type: Number,
      required: true,
    },
    Frequency: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low",
    },
    Contact_Number: {
      type: String,
      required: true,
    },
    Remark: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const CampanyModel = mongoose.model("campany", CampanySchema);

module.exports = CampanyModel;
