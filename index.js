require("dotenv").config();
const db =require("./db");
const port = process.env.PORT;
const express = require('express')
const app = express();

app.use(express.json());

app.get('/', (req, res) => {

    res.json({
        message: 'funciona' 
    })

})

app.get("/places", async (req, res) => {
    const nameFilter = req.query.name;
    const places = await db.selectPlaces(nameFilter);
    res.json(places);
});

app.get("/places/:id", async (req, res) => {
    const place = await db.selectPlaceById(req.params.id);
    if (place) {
        res.json(place);
    } else {
        res.status(404).json({ error: "Lugar não encontrado" });
    }
});


app.post("/places", async (req, res) => {
    const place = await db.insertPlace(req.body);
    res.status(201).json(place);
});


app.patch("/places/:id", async (req, res) => {
    const updatedPlace = await db.updatePlace(req.params.id, req.body);
    if (updatedPlace) {
        res.json(updatedPlace);
    } else {
        res.status(404).json({ error: "Lugar não encontrado" });
    }
});



app.delete("/places/:id", async (req, res) => {
    const deletedPlace = await db.deletePlace(req.params.id);
    if (deletedPlace) {
        res.sendStatus(204);
    } else {
        res.status(404).json({ error: "Lugar não encontrado" });
    }
});
app.listen(port);

console.log("Backend OK");




