export interface DailyTariffsBox {
    tariff_date: string;
    warehouse_name: string;

    dt_next_box: string | null;
    dt_till_max: string;

    box_delivery_base: number | null;
    box_delivery_liter: number | null;
    box_delivery_coef_expr: number | null;

    box_delivery_marketplace_base: number | null;
    box_delivery_marketplace_liter: number | null;
    box_delivery_marketplace_coef_expr: number | null;

    box_storage_base: number | null;
    box_storage_liter: number | null;
    box_storage_coef_expr: number | null;

    updated_at: Date;
}

export type UpdateDailyTariffsBox = Omit<DailyTariffsBox, "updated_at">;
