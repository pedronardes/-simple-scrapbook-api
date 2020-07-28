const express = require("express");

const app = express();

app.use(express.json());

const projects = [];

const { uuid } = require("uuidv4");

app.get("/projects", (request, response) => {
//   const { title } = request.query;
 
  
//   const results = title


//     ? projects.filter((project) => project.title.includes(title))
//     : projects;

    return response.send("Hello World");
});



app.listen(3333, () => {
  console.log("Back-end started! 😎");
});