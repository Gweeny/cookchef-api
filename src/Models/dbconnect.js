import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const databaseName = process.env.DATABASE_NAME;
    const url = process.env.DATABASE_URL_LOCAL;
    const con = await mongoose.connect(url + databaseName, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`Database connected : ${con.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
