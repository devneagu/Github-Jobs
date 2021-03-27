const path = require("path");
const express = require("express");
const { prependOnceListener } = require("process");
const dotenv = require("dotenv").config();
const fetch = require("node-fetch");
const app = express();
const port = process.env.PORT || 8000;
app.use(express.static("dist"));

var options = {
  data: "Test",
};
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.get("/job/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"), options);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});

app.get("/api/positions", async (req, res) => {
  const page = req.query.page;
  const location = req.query.location;
  const description = req.query.description;
  const full_time = req.query.full_time;
  const markdown = req.query.markdown;
  console.log(markdown);
  let url = "https://jobs.github.com/positions.json?";
  if (page != undefined) url = url + "page=" + page + "&";
  if (description != undefined) url = url + "description=" + description + "&";
  if (location != undefined) url = url + "location=" + location + "&";
  if (full_time != undefined) url = url + "full_time=" + full_time + "&";
  url = url + "markdown=true";
  console.log(url);
  await fetch(url)
    .then((data) => data.text())
    .then((text) => res.send(text));
});

app.get("/api/positionid", async (req, res) => {
  const id = req.query.id;
  await fetch(
    "https://jobs.github.com/positions/" + id + ".json?" + "markdown=true"
  )
    .then((data) => data.text())
    .then((text) => res.send(text));
});
