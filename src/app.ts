import { DailyTariffsBoxDto } from "#postgres/dto/DailyTariffsBox.dto.js";
import { migrate, seed } from "#postgres/knex.js";
import googleSheetsService from "#service/googleSheetsService.js";
import { ScheduleService } from "#service/ScheduleService.js";
import tariffsService from "#service/tariffsService.js";
import wbService from "#service/wbService.js";

const configureDatabase = async () => {
    await migrate.latest();
    await seed.run();

    console.log("All migrations and seeds have been run");
}

const exportTariffs = async () => {

    const tariffs = await wbService.getTariffs()

    await tariffsService.updateTariffs(tariffs)
    console.log("Updated tariffs in database")

    // Sort by total sum of delivery and storage coefs
    const sorted = [...tariffs].sort((a, b) => {
        return a.getTotalCoefficient() - b.getTotalCoefficient()
    })

    const tariffsWithHeaders = [
        DailyTariffsBoxDto.getHeaders(),
        ...sorted.map(tariff => tariff.getAsStringArray())
    ]

    await googleSheetsService.updateSpreadsheets(tariffsWithHeaders, "stocks_coefs!A1")
    console.log("Updated tariffs in spreadsheets")
}

const scheduler = new ScheduleService(exportTariffs)

const start = async () => {
    console.log("Starting service...")

    await configureDatabase()

    scheduler.start()
}

start()