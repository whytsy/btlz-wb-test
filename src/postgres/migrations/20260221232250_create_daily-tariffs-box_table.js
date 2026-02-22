/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function up(knex) {
    return knex.schema.createTable("daily_tariffs_box", (table) => {
        // Compound primary key
        table.date("tariff_date").notNullable();
        table.string("warehouse_name").notNullable();
        table.primary(["tariff_date", "warehouse_name"]);

        table.string("geo_name");

        table.date("dt_next_box");
        table.date("dt_till_max").notNullable();

        table.decimal("box_delivery_base", 10, 2);
        table.decimal("box_delivery_liter", 10, 2);
        table.decimal("box_delivery_coef_expr", 5, 2);

        table.decimal("box_delivery_marketplace_base", 10, 2);
        table.decimal("box_delivery_marketplace_liter", 10, 2);
        table.decimal("box_delivery_marketplace_coef_expr", 5, 2);

        table.decimal("box_storage_base", 10, 2);
        table.decimal("box_storage_liter", 10, 2);
        table.decimal("box_storage_coef_expr", 5, 2);

        table.timestamp("updated_at").defaultTo(knex.fn.now());
    });
}

/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function down(knex) {
    return knex.schema.dropTableIfExists("daily_tariffs_box");
}
