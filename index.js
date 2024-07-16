require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const swaggerDefinition = require('./swaggerDefinition');
const authRoutes = require('./routes/authRoutes');
const programRoutes = require('./routes/programRoutes');
const registrationRoutes = require('./routes/registrationRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());  
app.use(bodyParser.json());

// Swagger setup
const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Path to the API docs
};

const swaggerSpec = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/programs', programRoutes);
app.use('/api/registrations', registrationRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
