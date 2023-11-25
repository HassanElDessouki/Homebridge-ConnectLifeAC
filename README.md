# Homebridge-ConnectLifeAC
This Repository contains a draft (but working!) code for integrating a ConnectLife AC that utilzies the AEH-W4G2 WiFi Module
- This has been tested on a ClassPro AC only so far

------------

You will need to install **homebridge-http-advanced-accessory plugin** in Homebridge

Place the following in the plugin settings:

```
{
    "accessory": "HttpAdvancedAccessory",
    "service": "HeaterCooler",
    "name": "AEH-W4G2 AC",
    "forceRefreshDelay": 10,
    "optionCharacteristic": [
        "CoolingThresholdTemperature",
        "TemperatureDisplayUnits",
        "RotationSpeed",
        "SwingMode"
    ],
    "debug": false,
    "urls": {
        "getCurrentTemperature": {
            "url": "localhost:9999/currentRoomTemp"
        },
        "getCurrentHeater-CoolerState": {
            "url": "localhost:9999/currentState"
        },
        "getTargetHeater-CoolerState": {
            "url": "localhost:9999/currentMode"
        },
        "setTargetHeater-CoolerState": {
            "url": "localhost:9999/setMode?mode={value}"
        },
        "getCoolingThresholdTemperature": {
            "url": "localhost:9999/currentSetTemp"
        },
        "setCoolingThresholdTemperature": {
            "url": "localhost:9999/setTemp?temperature={value}"
        },
        "getTemperatureDisplayUnits": {
            "url": "localhost:9999/getTempUnits"
        },
        "setTemperatureDisplayUnits": {
            "url": "localhost:9999/setTempUnits?unit={value}"
        },
        "getRotationSpeed": {
            "url": "localhost:9999/getFanSpeed"
        },
        "setRotationSpeed": {
            "url": "localhost:9999/setFanSpeed?speed={value}"
        },
        "getActive": {
            "url": "localhost:9999/active"
        },
        "setActive": {
            "url": "localhost:9999/setActive?power={value}"
        },
        "getSwingMode": 0
    }
}
```


------------

Now, download both the - index.js-  and - package.json - files in the same folder. run **npm install** to install the required dependencies.

Then, **edit** the following in the index.JS file
- AuthorizationKey: the authorization key used in the API Link https://api.connectlife.io/swagger/index.html
- myACid: your AC id (can be found using "/api/v1/appliance"

Finally, you can now run node index.js or nodemon to run the node server in the background.

Restart Homebridge and you will find the AC in your Apple Home devices
