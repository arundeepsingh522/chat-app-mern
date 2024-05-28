import mongoose from "mongoose";
// Define a schema for storing image data
const imageSchema = new mongoose.Schema({
  filePath: { type: String, required: true },
  originalName: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});
// Create a model from the schema
const ImageSchma = mongoose.model("Image", imageSchema);
export default ImageSchma;
