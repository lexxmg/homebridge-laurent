# config.json

## Cоздание кнопки "OUT"
<pre>
    "accessories": [
        {
            "uniqueId": "HFDJ",
            "displayName": "выход-9",
            "outType": "out",
            "out": 9,
            "outInv": true,
            "mode": "true",
            "accessory": "Lightbulb"
        }
    ]
</pre>


    Значение "uniqueId": уникальный для проекта набор букв
    Значение "displayName": имя отоброжаемое на кнопке
    Значение "out" может быть: числом от 1 до 12
    Значение "outInv" инвертирование состояния выхода, может быть: true (инвертируется), false (не инвертируется)
    Значение "mode" может быть: "true" (вкыл. выкл.), "onOff" (включить на время), "tiggle"
    Значение "accessory" может быть: "Lightbulb" (лампочка), "Outlet" (розетка), "Switch" (выключатель)

## Cоздание кнопки "RELLE"
<pre>
    "accessories": [
        {
            "uniqueId": "fhsr",
            "displayName": "релле-1",
            "outType": "rel",
            "out": 1,
            "outInv": true,
            "mode": "true",
            "accessory": "Switch"
        }
    ]
</pre>

    Значение "uniqueId": уникальный для проекта набор букв
    Значение "displayName": имя отоброжаемое на кнопке
    Значение "out" может быть: числом от 1 до 4
    Значение "outInv" инвертирование состояния выхода, может быть: true (инвертируется), false (не инвертируется)
    Значение "mode" может быть:  "true" (вкыл. выкл.), "onOff" (включить на время), "tiggle"
    Значение "accessory" может быть: "Lightbulb" (лампочка), "Outlet" (розетка), "Switch" (выключатель)

