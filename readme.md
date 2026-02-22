# Тестовая задача

## Описание
Сервис, который регулярно (каждый час) получает информацию о тарифах с WB, сохраняет их в бд и обновляет информацию в google-таблицах.

### Инструкция для запуска
1. Создать .env файл и заполнить его в соответтствии с example.env
2. Запуск приложения и базы данных:
```bash
docker compose up --build
```

### Структура базы данных
В базе данных две таблицы: 
spreadsheets:
- spreadsheet_id - primary

daily_tariffs_box:
- tariff_date - primary
- warehouse_name - primary
- geo_name
- dt_next_box
- dt_till_max
- box_delivery_base
- box_delivery_liter
- box_delivery_coef_expr
- box_delivery_marketplace_base
- box_delivery_marketplace_liter
- box_delivery_marketplace_coef_expr
- box_storage_base
- box_storage_liter
- box_storage_coef_expr
- updated_at

