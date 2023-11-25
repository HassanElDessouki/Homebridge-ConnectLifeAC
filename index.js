const express = require('express')
const app = express()
const axios = require('axios').default;

const AuthorizationKey = 'YOUR TOKEN STARTING WITH BEARER'
const myACid = "YOUR AC ID"

const url = 'https://api.connectlife.io/api/v1/appliance/' + myACid;
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }
};

async function getACData(){
    let response = await fetch(url, options)

    data = await response.json()

    ACPropertires = data[0].properties
    return ACPropertires
}

app.get('/currentRoomTemp', async (req, res) => {
    ACData = await getACData()
    res.send(ACData.CurrentTemperature)
})

app.get('/currentSetTemp', async (req, res) => {
    ACData = await getACData()
    res.send(ACData.SetTemperature)
})

app.get('/currentMode', async (req, res) => {
    ACData = await getACData()
    switch (ACData.Mode) {
        case '0':
            res.send("1")
            break
            
        case '2':
            res.send("2")
            break
            
        case '3':
            res.send("1")
            break

        case '4':
            res.send("0")
            break
    }
})

app.get('/currentState', async (req, res) => {
    ACData = await getACData()
    if (ACData.CurrentTemperature > ACData.SetTemperature) {
        res.send("3")
    } else if (ACData.CurrentTemperature < ACData.SetTemperature) {
        res.send("1")
    }
})

app.get('/getName', async (req, res) => {
    let response = await fetch(url, options)

    data = await response.json()

    ACName = data[0].Name

    res.send(ACName)
})

app.get('/active', async (req, res) => {
    ACData = await getACData()
    res.send(ACData.Power)
})

app.get('/setTemp', async (req, res) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }

    const ACproperties = 
    [{
        "properties": {
            "SetTemperature": req.query.temperature,
        },
        "id": myACid
    }]

    async function setAC() {
        try {
          const response = await axios.post(`https://api.connectlife.io/api/v1/appliance`, ACproperties, {headers: headers});
          res.send("Temp set to " + req.query.temperature)
        } catch (error) {
          console.error(error.message);
        }
      }
      
    setAC()
})

app.get('/setMode', async (req, res) => {
    var requestedMode;

    if (req.query.mode === "2") {
        requestedMode = "2"
    } else if (req.query.mode === "0") {
        requestedMode = "4"
    }

    const headers = {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }

    const ACproperties = 
    [{
        "properties": {
            "Mode": requestedMode,
        },
        "id": myACid
    }]

    async function setAC() {
        try {
          await axios.post(`https://api.connectlife.io/api/v1/appliance`, ACproperties, {headers: headers});
          res.send("Temp set to " + req.query.mode)
        } catch (error) {
          console.error(error.message);
        }
      }
      
    setAC()
})

app.get('/setActive', async (req, res) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }

    const ACproperties = 
    [{
        "properties": {
            "Power": req.query.power,
        },
        "id": myACid
    }]

    async function setAC() {
        try {
          await axios.post(`https://api.connectlife.io/api/v1/appliance`, ACproperties, {headers: headers});
          res.send("Temp set to " + req.query.power)
        } catch (error) {
          console.error(error.message);
        }
      }
      
    setAC()
})

app.get('/getTempUnits', async (req, res) => {
    ACData = await getACData()
    res.send(ACData.TemperatureUnit)
})

app.get('/setTempUnits', async (req, res) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }

    const ACproperties = 
    [{
        "properties": {
            "TemperatureUnit": req.query.unit,
        },
        "id": myACid
    }]

    async function setAC() {
        try {
          await axios.post(`https://api.connectlife.io/api/v1/appliance`, ACproperties, {headers: headers});
          res.send("Temp set to " + req.query.unit)
        } catch (error) {
          console.error(error.message);
        }
      }
      
    setAC()
})

app.get('/getFanSpeed', async (req, res) => {
    ACData = await getACData()

    switch (ACData.FanSpeed) {
        case '5':
            res.send("20")
            break
            
        case '7':
            res.send("50")
            break
            
        case '9':
            res.send("100")
            break
    }
})

app.get('/setFanSpeed', async (req, res) => {
    const headers = {
        'Accept': 'application/json',
        'Authorization': AuthorizationKey
    }

    if (req.query.speed <= 30) {
        requestedSpeed = "5"
    } else if (req.query.speed > 30 & req.query.speed <= 70) {
        requestedSpeed = "7"
    } else if (req.query.speed > 70 & req.query.speed <= 100) {
        requestedSpeed = "9"
    }

    const ACproperties = 
    [{
        "properties": {
            "FanSpeed": requestedSpeed,
        },
        "id": myACid
    }]

    async function setAC() {
        try {
          await axios.post(`https://api.connectlife.io/api/v1/appliance`, ACproperties, {headers: headers});
          res.send("Temp set to " + req.query.speed)
        } catch (error) {
          console.error(error.message);
        }
      }
      
    setAC()
})

// Configure the port to listen on
const PORT = 9999;

// Call the listen() method on the server object
app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server is listening on port ${PORT}`);
});

process.on('uncaughtException', function (err) {
    console.error(err);
});