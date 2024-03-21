import { model, Schema } from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const collection = "users";

const schema = new Schema(
  {
    name: { type: String, requiered: true },
    photo: { type: String, requiered: true },
    email: { type: String, requiered: true },
  },
  { timestamps: true }
);
schema.plugin(mongoosePaginate);
const User = model(collection, schema);

export default User;
