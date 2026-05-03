import express from 'express';
import compression from 'compression';
import cors from 'cors';
import helmet from 'helmet';
import mongoSanitize from 'express-mongo-sanitize';
import morgan from 'morgan';
import routes from './routes/index.js';

import error from './middlewares/error.js';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();


const __dirname = path.dirname(fileURLToPath(import.meta.url));


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true }));


if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}


app.use(cors({
  origin: '*', 
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
}));



const dashPath = path.join(__dirname, 'dash'); 
const frontPath = path.join(__dirname, 'prepros'); 


app.use('/assets_front', express.static(path.join(frontPath, 'assets_front')));
app.use('/vendor', express.static(path.join(frontPath, 'vendor')));
app.use('/assets', express.static(path.join(dashPath, 'assets')));
app.use('/logo2.png', express.static(path.join(dashPath, '/logo2.png')));


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/uploads/*', express.static(path.join(__dirname, 'uploads')));
app.use('/v1', routes);

app.get('/dash*', (req, res) => {
  res.sendFile(path.join(dashPath, 'index.html'));
});

app.get('/*', (req, res) => {
  res.sendFile(path.join(frontPath, 'index.html'));
});



app.use(helmet());


app.use(compression());


app.use(mongoSanitize());





app.use(error.notFound);


app.use(error.converter);


app.use(error.handler);





  

export default app;













