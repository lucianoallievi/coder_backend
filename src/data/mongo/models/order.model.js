import { Types, model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "ordes";

const schema = new Schema(
  {
    product_id: { type: Types.ObjectId, required: true, ref: "products" },
    user_id: { type: Types.ObjectId, required: true, ref: "users" },
    quantity: { type: Number, default: 1 },
    state: {
      type: String,
      enum: ["reserved", "paid", "delivered"],
      default: "reserved",
    },
  },
  { timestamps: true }
);

schema.plugin(mongoosePaginate);
const Order = model(collection, schema);
export default Order;
