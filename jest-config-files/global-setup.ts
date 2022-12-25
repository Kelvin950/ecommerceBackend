import { connect } from "./setup-test-db";

const globalSetup = async () => {
    await connect();
};

export default globalSetup;
