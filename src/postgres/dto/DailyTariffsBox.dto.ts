import { WarehouseItem } from "#wb-api/tariffs/tariffs.schema.js";

export class DailyTariffsBoxDto {
    readonly tariff_date: string;
    readonly warehouse_name: string;

    readonly geo_name: string | null;

    readonly dt_next_box: string | null;
    readonly dt_till_max: string;

    readonly box_delivery_base: number | null;
    readonly box_delivery_liter: number | null;
    readonly box_delivery_coef_expr: number | null;

    readonly box_delivery_marketplace_base: number | null;
    readonly box_delivery_marketplace_liter: number | null;
    readonly box_delivery_marketplace_coef_expr: number | null;

    readonly box_storage_base: number | null;
    readonly box_storage_liter: number | null;
    readonly box_storage_coef_expr: number | null;

    constructor(tariffBox: WarehouseItem, dtNextBox: string | null, dtTillMax: string, tariffDate: string) {
        this.tariff_date = tariffDate;
        this.warehouse_name = tariffBox.warehouseName;
        this.geo_name = tariffBox.geoName;
        this.dt_next_box = dtNextBox;
        this.dt_till_max = dtTillMax;
        this.box_delivery_base = tariffBox.boxDeliveryBase;
        this.box_delivery_liter = tariffBox.boxDeliveryLiter;
        this.box_delivery_coef_expr = tariffBox.boxDeliveryCoefExpr;
        this.box_delivery_marketplace_base = tariffBox.boxDeliveryMarketplaceBase;
        this.box_delivery_marketplace_liter = tariffBox.boxDeliveryMarketplaceLiter;
        this.box_delivery_marketplace_coef_expr = tariffBox.boxDeliveryMarketplaceCoefExpr;
        this.box_storage_base = tariffBox.boxStorageBase;
        this.box_storage_liter = tariffBox.boxStorageLiter;
        this.box_storage_coef_expr = tariffBox.boxStorageCoefExpr;
    }

    getAsStringArray(): string[] {
        return [
            this.tariff_date,
            this.warehouse_name,
            this.geo_name ?? "",
            this.dt_next_box ?? "",
            this.dt_till_max,
            this.box_delivery_base?.toString() ?? "",
            this.box_delivery_liter?.toString() ?? "",
            this.box_delivery_coef_expr?.toString() ?? "",
            this.box_delivery_marketplace_base?.toString() ?? "",
            this.box_delivery_marketplace_liter?.toString() ?? "",
            this.box_delivery_marketplace_coef_expr?.toString() ?? "",
            this.box_storage_base?.toString() ?? "",
            this.box_storage_liter?.toString() ?? "",
            this.box_storage_coef_expr?.toString() ?? "",
        ];
    }

    getTotalCoefficient(): number {
        return (this.box_delivery_coef_expr ?? 0) + (this.box_storage_coef_expr ?? 0);
    }

    static getHeaders(): string[] {
        return [
            "Дата тарифа",
            "Склад",
            "Регион",
            "Действует с",
            "Действует по",
            "Логистика (1л)",
            "Логистика (доп)",
            "Коэф. логистики",
            "FBS (1л)",
            "FBS (доп)",
            "Коэф. FBS",
            "Хранение (1л)",
            "Хранение (доп)",
            "Коэф. хранения",
        ];
    }
}
