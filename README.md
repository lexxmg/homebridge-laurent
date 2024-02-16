# config.json

## Cоздание кнопки "OUT"
<pre>
    "accessories": [
        {
            "ip": "192.168.0.101",
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

    Значение "ip": ip адрес laurent (можно использовать несколько laurent с разными ip)
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
            "ip": "192.168.0.101",
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

    Значение "ip": ip адрес laurent (можно использовать несколько laurent с разными ip)
    Значение "uniqueId": уникальный для проекта набор букв
    Значение "displayName": имя отоброжаемое на кнопке
    Значение "out" может быть: числом от 1 до 4
    Значение "outInv" инвертирование состояния выхода, может быть: true (инвертируется), false (не инвертируется)
    Значение "mode" может быть:  "true" (вкыл. выкл.), "onOff" (включить на время), "tiggle"
    Значение "accessory" может быть: "Lightbulb" (лампочка), "Outlet" (розетка), "Switch" (выключатель)

## Температура

<pre>
    "accessories": [
        {
            "ip": "192.168.0.101",
            "uniqueId": "fjkasg",
            "displayName": "Температура",
            "outType": "temp"
        }
    ]    
</pre>

    Значение "ip": ip адрес laurent (можно использовать несколько laurent с разными ip)
    Значение "uniqueId": уникальный для проекта набор букв
    Значение "displayName": имя отоброжаемое на кнопке