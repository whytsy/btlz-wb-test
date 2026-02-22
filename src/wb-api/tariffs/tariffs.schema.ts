import { z } from "zod";

// Can be "-" or numeric value
const numericField = z.union([
    z
        .string()
        .regex(/^\d+(?:,\d+)?$/)
        .transform((val) => parseFloat(val.replace(",", "."))),
    z.literal("-").transform(() => null),
]);

// All empty or "-" values are changed to null
export const tariffsBoxResponseSchema = z.object({
    response: z.object({
        data: z.object({
            dtNextBox: z.string().transform((val) => val || null),
            dtTillMax: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
            warehouseList: z.array(
                z.object({
                    boxDeliveryBase: numericField,
                    boxDeliveryCoefExpr: numericField,
                    boxDeliveryLiter: numericField,
                    boxDeliveryMarketplaceBase: numericField,
                    boxDeliveryMarketplaceCoefExpr: numericField,
                    boxDeliveryMarketplaceLiter: numericField,
                    boxStorageBase: numericField,
                    boxStorageCoefExpr: numericField,
                    boxStorageLiter: numericField,

                    geoName: z.string().transform((val) => val || null),
                    warehouseName: z.string(),
                }),
            ),
        }),
    }),
});

export type TariffsBoxResponse = z.infer<typeof tariffsBoxResponseSchema>;
export type TariffsBoxItem = TariffsBoxResponse["response"]["data"];
export type WarehouseItem = TariffsBoxItem["warehouseList"][0];
