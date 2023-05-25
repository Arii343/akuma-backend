import mongoose from "mongoose";

const connectDataBase = async (mongoDbUrl: string) => {
  mongoose.set("debug", true);

  mongoose.set("toJSON", {
    virtuals: true,
    versionKey: false,
    transform(doc, ret) {
      delete ret._id;
    },
  });

  await mongoose.connect(mongoDbUrl);
};

export default connectDataBase;
