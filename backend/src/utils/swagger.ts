const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./src/assets/swagger.json";
const endpointsFiles = ["./src/routes/index.ts"];

swaggerAutogen(outputFile, endpointsFiles);
