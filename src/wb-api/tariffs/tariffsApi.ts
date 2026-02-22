import wbApi from "#wb-api/wbApi.js";
import { TariffsBoxItem, tariffsBoxResponseSchema } from "./tariffs.schema.js";

const TARIFFS_API__BASE_URL = "/api/v1/tariffs";

export const getBoxTariffs = async (dateString: string): Promise<TariffsBoxItem> => {
    const response = await wbApi.get(TARIFFS_API__BASE_URL + "/box", {
        params: { date: dateString },
    });

    try {
        return tariffsBoxResponseSchema.parse(response.data).response.data;
    } catch (error) {
        console.error("Error. Unsupported response:", error);
        throw error;
    }
};
