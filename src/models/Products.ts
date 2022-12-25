import mongoose, { Schema, model } from "mongoose";
import { Iproduct } from "./interfaces";

const productSchema = new Schema<Iproduct>({
  title: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },

  image: String,
});

export default model<Iproduct>("Product", productSchema);
