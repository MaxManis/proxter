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

const handleReq = async (req, res, method) => {
  try {
    const targetUrl = req.query["proxter"];
    const targetPath = req.path;
    const response = await nodeFetch(`${targetUrl}${targetPath}`, {
      method,
      headers: getHeaders(req.headers),
      body: Object.keys(req.body || {}).length
        ? JSON.stringify(req.body)
        : undefined,
    });

    res.status(response.status);

    let data = null;
    if (response.headers["content-type"]?.includes("json")) {
      data = await response.json();
    } else if (response.headers["content-type"]?.includes("text")) {
      data = await response.text();
    }

    if (data) {
      res.send(data);
    } else {
      res.end();
    }
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
};

const app = express();
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.get("*", async (req, res) => handleReq(req, res, "GET"));
app.post("*", async (req, res) => handleReq(req, res, "POST"));
app.put("*", async (req, res) => handleReq(req, res, "PUT"));
app.delete("*", async (req, res) => handleReq(req, res, "DELETE"));

const PORT = process.env.PORT || 3005;
app.listen(PORT, () => {
  console.log(`Server running on: http://localhost:${PORT}`);
});
