import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = 8000;

app.use(cors());
app.use(bodyParser.json());

app.post('/mood', async (req, res) => {
  const { mood, description } = req.body;

  

  try {
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: prompt }],
      },
      { headers: { Authorization: `Bearer ${process.env.OPENAI_API_KEY}` } }
    );

    const aiInsight = response.data.choices[0].message.content;
    res.send({ aiInsight });
  } catch (error) {
    if (error.response && error.response.status === 429) {
      console.error('Rate limit exceeded.');
      return res.status(429).send({
        error: 'Rate limit exceeded. Please try again after some time.',
      });
    }

    console.error(error);
    res.status(500).send({ error: 'Failed to fetch AI insights.' });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
