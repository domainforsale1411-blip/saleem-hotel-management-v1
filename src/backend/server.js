const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const { sequelize } = require('./models');
const swaggerUi = require('swagger-ui-express');
const swaggerSpecs = require('./config/swagger');

// Middleware Imports
const { apiLimiter } = require('./middleware/rateLimiter');

// Routes Imports
const authRoutes = require('./routes/auth.routes');
const hotelRoutes = require('./routes/hotel.routes');
const chatRoutes = require('./routes/chat.routes');

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(apiLimiter); // Apply global rate limiter

// Swagger Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/chat', chatRoutes);

app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Saleem Hotel Management System API' });
});

// Database Connection
const PORT = process.env.PORT || 3000;

async function startServer() {
  try {
    // In production, use migrations instead of sync
    // await sequelize.sync({ force: false }); 
    console.log('Database connected.');
    
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

if (require.main === module) {
  startServer();
}

module.exports = app;
