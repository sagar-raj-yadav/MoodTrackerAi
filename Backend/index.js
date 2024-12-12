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

  if (!mood || !description) {
    return res.status(400).send({ error: 'Mood and description are required.' });
  }

  const prompt = `
    The user rated their mood as ${mood}/5 and described it as: "${description}".
    Provide insights to help them understand their feelings better and offer tips for improvement.
  `;

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
  }
    console.error(error);
    res.status(500).send({ error: 'Failed to fetch AI insights.' });
  }
});


app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
