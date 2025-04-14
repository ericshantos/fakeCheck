import { checkInternetConnection } from "../../utils/healthUtils";

const healthService = async () => {

    const internetOk = await checkInternetConnection();

};