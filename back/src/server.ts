import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chatRoutes';
import bodyParser from 'body-parser';
dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
const frontendURL = ''; // <--- URL FROND
app.use(cors({
    origin: frontendURL,
}));

app.use(express.json()); 

app.use('/api', chatRoutes);

app.get('/', (req, res) => {
  res.send('AI Chat Backend is running!');
});

app.listen(port, () => {
  console.log(`Сервер запущен на http://localhost:${port}`);
});


