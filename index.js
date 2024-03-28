// require("express")
// en packge.json se debe agregar "type":"module", para que nos permira usar el import express
// importo fs (file sistem) que se instala con nodemon que me permite trabajar con los archivos del proyecto.
//importar un middleware bodyparse que sirve para que interprete los datos que estoy enviando en el json

import express from 'express';
import fs from "fs";
import bodyParser from "body-parser";

// creo el objeto
const app = express();

//ejecuto el middleware
app.use(bodyParser.json());

// Función que lee el archivo json
const readData = () => {
    try {
        const data = fs.readFileSync("./db.json")
        return JSON.parse(data);
    } catch (error) {
        console.log(error);
    }
};

//función para escribir en el archivo pasando ruta y los datos pero los datos deben transformarse ya que estan en formato json.
const writeData = (data) => {
    try {
        fs.writeFileSync("./db.json", JSON.stringify(data))

    } catch (error) {
        console.log(error);
    }
};


//creo un endpoint con su respectiva ruta, agrego callback con funcion (llamada, respuesta)
app.get("/", (req, res) => {
    res.send('Welcome to my API with Node Js, idiot!')
});

//get al objeto entero en este caso a la propiedad formula1
app.get("/formula1", (req, res) => {
    const data = readData();
    res.json(data.formula1)
})

//get a un piloto
app.get("/formula1/:id", (req, res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pilot = data.formula1.find((pilot) => pilot.id === id);
    res.json(pilot)
})

//post nuevo
app.post("/formula1", (req, res) => {
    const data = readData();
    const body = req.body;
    const newPilot = {
        id: data.formula1.length + 1,
        ...body,
    };
    //voy agregar el nuevo piloto a mi objeto formula1
    data.formula1.push(newPilot);
    writeData(data);
    res.json(newPilot)
});

 // put a un piloto
app.put("/formula1/:id" , (req,res) => {
    const data = readData();
    const body = req.body;
    const id = parseInt(req.params.id);
    const pilotIndex = data.formula1.findIndex((pilot) => pilot.id === id);
    data.formula1[pilotIndex] = {
    ...data.formula1[pilotIndex],
    ...body
    };
    writeData(data);
    res.json({message:"Pilot update succesfully"});
});

//delete a un piloto
app.delete("/formula1/:id" , (req,res) => {
    const data = readData();
    const id = parseInt(req.params.id);
    const pilotIndex = data.formula1.findIndex((pilot) => pilot.id === id);
    data.formula1.splice(pilotIndex,1);
    writeData(data);
    res.json({ message: "Pilot deleted succesfully"})
});


// y le pido que escuche
app.listen(3000, () => {
    console.log('server listening on port 3000, bro!')
});