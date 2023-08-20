const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
// const fetch = require('node-fetch');
const path = require("path");
const app = express()

app.use(cors())
app.use(morgan("dev"))
app.use(express.json());


port = 5000

//EJERCICIO 1 Realiza una solicitud `GET` a la siguiente API de muestra y muestra por consola los
// primeros tres elementos del array obtenido: `https://jsonplaceholder.typicode.com/posts`
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


//EJERCICIO 2 Crea una solicitud `POST` a la misma API de muestra, enviando un objeto JSON con un
// título y un cuerpo de contenido. Muestra por consola la respuesta obtenida.
app.post("/", () => {

    const postData = {
        title: 'Nuevo Post a la api',
        body: 'Contenido del nuevo post a la api'
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

//EJERCICIO 3 METODO UNO 
// Realiza una solicitud `GET` para obtener una imagen de muestra desde esta URL:
// `https://via.placeholder.com/150`. Luego, muestra la imagen en una etiqueta `<img>` en tu
// página.

// (NO FUNCIONA POR EL SIGUIENTE ERROR:
// Access to fetch at 'https://via.placeholder.com/150' from origin 'http://localhost:5000' has been blocked by CORS 
// policy: No 'Access-Control-Allow-Origin' header is present on the requested resource. 
// If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.)

app.get('/index', (req, res) => {
    const indexPath = path.join(__dirname, "index.html");
    res.sendFile(indexPath);
});


//METODO 2 NODE-FETCH
app.get('/index2', async (req, res) => {

    try {
      const Modulofetch = await import('node-fetch');
      const fetch = Modulofetch.default;
  
      const response = await fetch('https://via.placeholder.com/150');
      if (!response.ok) {
        throw new Error('Error al realizar el fetch a la imagen');
      }
  
      const imageBuffer = await response.buffer();
      const base64Image = imageBuffer.toString('base64');
      const imageSrc = `data:image/png;base64,${base64Image}`;
  
      const html = `
        <!DOCTYPE html>
        <html>
        <head>
          <title>Image Example</title>
        </head>
        <body>
          <img src="${imageSrc}" alt="Sample Image" />
        </body>
        </html>
      `;
  
      res.send(html);
    } catch (error) {
      res.status(500).send('Error del servidor');
    }
  });

app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`)
})