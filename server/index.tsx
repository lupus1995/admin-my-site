import fs from "fs";
import path from "path";

import React from "react";

import dotenv from "dotenv";
import express, { Express, Request, Response } from "express";
import ReactDOMServer from "react-dom/server";
import { StaticRouter } from "react-router-dom/server";

import App from "../src/App";
import { createGenerateId, JssProvider, SheetsRegistry } from "react-jss";

dotenv.config();

const app: Express = express();

app.get(
  /\.(js|css|map|ico)/,
  express.static(path.resolve(__dirname, "../../../dist"))
);

app.use("*", (req, res) => {
  // читаем файл `index.html`
  let indexHTML = fs.readFileSync(path.resolve(__dirname, "./index.html"), {
    encoding: "utf8",
  });

  const sheets = new SheetsRegistry();
  const generateId = createGenerateId();

  const appHTML = ReactDOMServer.renderToString(
    <StaticRouter location={req.originalUrl}>
      <JssProvider registry={sheets} generateId={generateId}>
        <App />
      </JssProvider>
    </StaticRouter>
  );

  indexHTML = indexHTML.replace(
    '<div id="root"></div>',
    `<div id="root">${appHTML}</div>`
  );

  // устанавливаем заголовок и статус
  res.contentType("text/html");
  res.status(200);

  return res.send(indexHTML);
});

app.listen("9002", () => {
  console.log("Express server started at <http://localhost:9002>");
});
