import swaggerJSDoc from "swagger-jsdoc";
import swaggerDefinition from "./swagger";

const options = {
  swaggerDefinition,
  apis: ["./app/api/auth/**/*.ts"], // Adjust the path as needed
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
