import { DailyTariffsBoxDto } from "#postgres/dto/DailyTariffsBox.dto.js";
import { getBoxTariffs } from "#wb-api/tariffs/tariffsApi.js";

class WbService {
    async getTariffs(): Promise<DailyTariffsBoxDto[]> {
        const currentDateString = new Date().toISOString().split("T")[0];

        const tariffs = await getBoxTariffs(currentDateString);

        // Convert recieved data to database format
        const tariffsFormated = tariffs.warehouseList.map((warehouseItem) => {
            return new DailyTariffsBoxDto(warehouseItem, tariffs.dtNextBox, tariffs.dtTillMax, currentDateString);
        });

        return tariffsFormated;
    }
}

export default new WbService();
