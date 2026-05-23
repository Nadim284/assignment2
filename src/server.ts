import express, { Application, Request, Response } from "express";
import config from "./config";
import { initDB } from "./db/index";
import app from "./app";




const main = async () => {
  const PORT = config.port;
  initDB();

  app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  });

// Connect database
};


main();