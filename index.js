const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodeFetch = require("node-fetch");

const getHeaders = (rawHeaders) => {
  const headers = {};
  const keys = Object.keys(rawHeaders).filter(
    (k) =>
      k.toLowerCase().includes("x-") ||
      k.toLowerCase().includes("content-type"),
  );
  for (let i = 0; i < keys.length; i++) {
    headers[keys[i]] = rawHeaders[keys[i]];
  }

  return headers;
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("*", async (req, res) => {
  try {
    const targetUrl = req.query["proxter"];
    const targetPath = req.path;
    const response = await nodeFetch(`${targetUrl}${targetPath}`, {
      method: "GET",
      headers: getHeaders(req.headers),
    });
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.post("*", async (req, res) => {
  try {
    const targetUrl = req.query["proxter"];
    const targetPath = req.path;
    const response = await nodeFetch(`${targetUrl}${targetPath}`, {
      method: "POST",
      headers: getHeaders(req.headers),
      body: JSON.stringify(req.body),
    });
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.put("*", async (req, res) => {
  try {
    const targetUrl = req.query["proxter"];
    const targetPath = req.path;
    const response = await nodeFetch(`${targetUrl}${targetPath}`, {
      method: "PUT",
      headers: getHeaders(req.headers),
    });
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

app.delete("*", async (req, res) => {
  try {
    const targetUrl = req.query["proxter"];
    const targetPath = req.path;
    const response = await nodeFetch(`${targetUrl}${targetPath}`, {
      method: "DELETE",
      headers: getHeaders(req.headers),
    });
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
