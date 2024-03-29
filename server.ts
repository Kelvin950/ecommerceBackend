import mongoose from 'mongoose';
import {app} from './src/app'
const Port  =  process.env.Port || 3001;

(async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("no uri");
    }
    console.log(process.env.MONGO_URI!);
    const connect = await mongoose.connect(process.env.MONGO_URI);
 
    console.log(connect.connection.host);

    app.listen(Port, () => {
      console.log("http://localhost:3001");
    });
  } catch (err) {
    console.log(err);
  }
})();
