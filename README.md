<p align="center">
config.json
</p>

<h2>Cоздание кнопки "OUT"</h2>
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


<p>Значение "displayName": имя отоброжаемое на кнопке</p>
<p>Значение "uniqueId": уникальный для проекта набор букв</p>
<p>Значение "out" может быть: числом от 1 до 12</p>
<p>Значение "outInv" инвертирование состояния выхода, может быть: true (инвертируется), false (не инвертируется)</p>
<p>Значение "mode" может быть: "true" (вкыл. выкл.), "onOff" (включить на время), "tiggle"</p>
<p>Значение "accessory" может быть: "Lightbulb" (лампочка), "Outlet" (розетка), "Switch" (выключатель)</p>

<h2>Cоздание кнопки "RELLE"</h2>
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

<p>Значение "uniqueId": уникальный для проекта набор букв</p>
<p>Значение "displayName": имя отоброжаемое на кнопке
<p>Значение "out" может быть: числом от 1 до 4</p>
<p>Значение "outInv" инвертирование состояния выхода, может быть: true (инвертируется), false (не инвертируется)</p>
<p>Значение "mode" может быть:  "true" (вкыл. выкл.), "onOff" (включить на время), "tiggle"</p>
<p>Значение "accessory" может быть: "Lightbulb" (лампочка), "Outlet" (розетка), "Switch" (выключатель)</p>

