import mongoose from 'mongoose';
import {app} from './src/app'
const Port  =  3001 || process.env.Port;

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("no uri");
    }
    console.log(process.env.MONGO_URI!);
    const connect = await mongoose.connect(
      "mongodb://localhost:27017/ecommerce"
    );
 
    console.log(connect.connection.host);

    app.listen(Port, () => {
      console.log("http://localhost:3001");
    });
  } catch (err) {
    console.log(err);
  }
})();
