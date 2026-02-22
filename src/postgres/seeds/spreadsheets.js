/**
 * @param {import("knex").Knex} knex
 * @returns {Promise<void>}
 */
export async function seed(knex) {
    // Deletes ALL existing entries
    await knex("spreadsheets").del();
    await knex("spreadsheets").insert(
        [
            { spreadsheet_id: "1cujrCuZ2wS6j04TlgrlYSywlXK3WpgC6YzHJKvgvBjU" },
            { spreadsheet_id: "17O6BF57rv5hvz09djV2STa7Ri7Vn-1CynmU06996kR8" }
        ]
    );
}
