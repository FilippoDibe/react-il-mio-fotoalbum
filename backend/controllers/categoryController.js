const {PrismaClient} = require  ('@prisma/client');
const prisma = new PrismaClient();
const errorHandler = require("../middlewares/errorHandler.js");
const RestError = require ("../middlewares/restError.js")



