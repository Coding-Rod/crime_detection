const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/swagger.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles);
