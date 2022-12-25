import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";

let mongoServer: any;

// For mongodb-memory-server's old version (< 7) use this instead:
// const mongoServer = new MongoMemoryServer();

// Provide connection to a new in-memory database server.
export const connect = async () => {
    // NOTE: before establishing a new connection close previous
    await mongoose.disconnect();

    mongoServer = await MongoMemoryServer.create();

    const mongoUri = await mongoServer.getUri();
    await mongoose.connect(mongoUri);
};

// Remove and close the database and server.
export const close = async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
};

// Remove all data from collections
export const clear = async () => {
    const { collections } = mongoose.connection;

    // eslint-disable-next-line no-restricted-syntax
    for (const key in collections) {
        if (collections[key]) {
            collections[key].deleteMany({});
        }
    }
};