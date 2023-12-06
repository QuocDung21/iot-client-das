import mongoose from "mongoose";

 const connectToDB = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://quocdung:quocdung@iot_smart_home.stjgq5a.mongodb.net/smarthome"
    );
    console.log("Connected to mongodb");
  } catch (error) {
    console.log(error);
  }
};

export default connectToDB;
