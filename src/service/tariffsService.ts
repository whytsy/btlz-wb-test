import knex, { DailyTariffsBoxs } from "#postgres/knex.js";
import { UpdateDailyTariffsBox } from "#postgres/models/DailyTariffsBox.js";

class TariffsService {
    async updateTariffs(tariffs: UpdateDailyTariffsBox[]): Promise<void> {
        if (tariffs.length === 0) {
            return;
        }

        try {
            // Insert or update values in database
            await DailyTariffsBoxs()
                .insert(
                    tariffs.map((tariff) => ({
                        ...tariff,
                        updated_at: knex.fn.now(),
                    })),
                )
                .onConflict(["tariff_date", "warehouse_name"])
                .merge();
        } catch (error) {
            console.error("Failed to update tariffs:", error);
        }
    }
}

export default new TariffsService();
