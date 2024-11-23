![MoodTracker and 2 more pages - Personal - Microsoft​ Edge 23-11-2024 17_37_21 png 23-11-2024 17_37_54](https://github.com/user-attachments/assets/f31f227c-d8c7-4f1f-86f8-12974c1b40b2)


# Mood Tracker with AI Insights

## Overview

The **Mood Tracker with AI Insights** is a mobile application built with **React Native**, which allows users to track their mood on a scale of 1-5 along with a brief description of how they are feeling. The app then uses the **ChatGPT API** to generate insights based on the mood and description provided, helping users understand their feelings better and offering tips for improvement.

The app includes a **simple UI** where users can input their mood, describe their feelings, and get real-time feedback from the AI.

---

## Features

- **Mood Scale Input:** Users can select their mood on a scale from 1 to 5.
- **Mood Description:** Users can describe their mood with a text input.
- **AI Insights:** The app uses the ChatGPT API to provide insights based on the user's mood and description.
- **Local Storage:** Mood history is saved locally using AsyncStorage, allowing users to track their previous entries and insights.
- **Error Handling:** Basic error handling is implemented for failed API requests and invalid inputs.

---

## Technical Stack

- **Frontend:**
  - React Native
  - TypeScript
  - Expo (for easy setup and testing)
  - Axios (for making API requests)

- **Backend:**
  - Node.js
  - Express.js
  - ChatGPT API (via OpenAI)

- **Local Storage:**
  - AsyncStorage (to store mood history)

---

## Setup and Installation
npm install

### 1. Clone the Repository
First, clone the repository to your local machine:

```bash
git clone https://github.com/sagar-raj-yadav/MoodTracker.git
