const express = require("express");
const accountsRouter = require("./accounts/accounts-router");

const server = express();

server.use(express.json());

// Mount the accounts router
server.use("/api/accounts", accountsRouter);

// Error handling middleware
server.use((err, req, res, next) => {
  console.error(err); // Log the error for debugging purposes
  res.status(500).json({ message: "Something went wrong" });
});

module.exports = server;