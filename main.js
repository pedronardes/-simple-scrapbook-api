const express = require("express");

const app = express();

app.use(express.json());

const { uuid, isUuid } = require("uuidv4");

const scraps = [];

function logRequests(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.time(logLabel);

  next();

  console.timeEnd(logLabel);
}

function validatescrapId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).
    json({ error: `This is not a valida UUID` });
  }
  next();
};

function validateScrapInfo(request, response, next) {
  const { name, message } = request.body;

  if (name !== "" && message !== "") {
    next();
  } else {
    return res.status(400).json({ error: "Scrap sent is empty" });
  }
}
app.get("/projects", logRequests, (request, response) => {
    const { title } = request.query;

    const results = title
    ? scraps.filter((scrap) => scrap.title.includes(title))
    : scraps;
  
    return response.json(results);
});

app.post("/projects", logRequests, validateScrapInfo, (request, response) => {
  const { title, owner, age } = request.body;

  const scrap = { id: uuid(), title, owner, age };

  scraps.push(scrap);

  return response.json(scrap);
});

app.put("/projects/:id", validatescrapId, logRequests,(request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return response.status(400).json({ error: "scrap not find." });
  }

  const scrap = {
    id,
    title,
    owner,
  };

  // scraps[scrapIndex] = scrap;
  scraps[scrapIndex] = scrap;

  return response.json([scrap]);
  });

app.delete("/projects/:id", validatescrapId, logRequests, (request, response) => {
  const { id } = request.params;

  const scrapIndex = scraps.findIndex((scrap) => scrap.id === id);

  if (scrapIndex < 0) {
    return response.status(400).json({ error: "scrap not find." });
  }

  scraps.splice(scrapIndex, 1);
  return response.status(204).send();
});


app.listen(5555, () => {
  console.log("Back-end started! 😎");
});

