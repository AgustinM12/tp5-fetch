const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


port = 5000

//EJERCICIO 1
app.get("/", async (req, res) => {

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts')

        const data = await response.json();

        const primerosTres = data.slice(0, 3);

        console.log("Primeros 3 arrays obtenidos", primerosTres)

        res.status(200).json(primerosTres)
    } catch (error) {
        console.error("Error: ", error)
        res.status(500).json({ error: "Hubo un error en el servidor" })
    }
})


//EJERCICIO 2
app.post("/", () => {

    const postData = {
        title: 'Nuevo Post 2',
        body: 'Contenido del nuevo post 2'
    };

    const apiUrl = 'https://jsonplaceholder.typicode.com/posts';

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(postData)
    })
        .then(response => response.json())

        .then(data => {
            console.log('Respuesta de la solicitud POST:', data);
        })

        .catch(error => {
            console.error('Error:', error);
        });
})


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})
