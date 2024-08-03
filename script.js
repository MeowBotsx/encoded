/**
 *
 * MeowMusic por qjlk
 * Version 2.0.0-Beta
 * © 2024 1sT-Services
 */

const app = require("express")();
const port = process.env.PORT || 443;
const logger = require("@plugins/logger");

app.use(require("express").json());

app.use(require("express-status-monitor")());

app.use(require("express").static(require("path").join(__dirname)));

app.get("/", (req, res) => {
  res.sendFile(require("path").join(__dirname, "index.html"));
});

app.get("/add", (req, res) => {
  res.send(
    '<meta http-equiv="refresh" content="0; URL=https://discord.com/oauth2/authorize?client_id=897179225176547408&permissions=287263026545&scope=bot%20applications.commands"/>',
  );
});

app.get("/support", (req, res) => {
  res.send(
    '<meta http-equiv="refresh" content="0; URL=https://discord.gg/QTMaJPfprB"/>',
  );
});

app.listen(port, () => {
  logger.log(`Loaded Web server | Port : (${port})`, `ready`);
});
