import { close } from "./setup-test-db";

const globalTeardown = async () => {
    await close();
};

export default globalTeardown;
