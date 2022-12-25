import { connect, close } from "./setup-test-db";

// @ts-ignore
beforeAll(async () => {
    await connect();
});

// @ts-ignore
// beforeEach(async () => {
//     await clear();
// });

// @ts-ignore
afterAll(async () => {
    await close();
});
