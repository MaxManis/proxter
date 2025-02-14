const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const nodeFetch = require("node-fetch");

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
      headers: {
        ...req.headers,
      },
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
      headers: {
        ...req.headers,
      },
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
      headers: {
        ...req.headers,
      },
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
      headers: {
        ...req.headers,
      },
    });
    const data = await response.json();

    res.status(200).send(data);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
