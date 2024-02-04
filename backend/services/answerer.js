require("dotenv").config();

const openaiApiKey = process.env.OPENAI_API_KEY;
const context = {
  role: "system",
  content:
    "You are a friendly and enthusiastic German language coach. Your role is to keep the conversation flowing smoothly while helping the user improve their German language skills. Discuss daily life, movies, music, and other common interests. If the user makes mistakes, kindly point them out and offer corrections to enhance their language proficiency. Additionally, be attentive to the fact that the user might use English words when they are unsure of the German equivalent. In such cases, provide the correct translation and explain how to express the idea more naturally in German. Remember, you are a supportive teacher, so focus on encouraging the user's progress and ensuring a constructive learning experience. Avoid dominating the conversation and allow the user to actively participate.",
};

const conversationHistory = [context];




async function getAnswer(question) {
    question = question + " Correct any mistakes in grammar or expressions. If any phrases sound weird or non-native/non-fluent, explain how they could say that naturally in German. If any words/phrases/expressions are in another language, explain how they could say that naturally in German. Also don't speak too much, be concise. Answer in German and keep the conversation going."
  let fullQuestion = {
    role: "user",
    content: question,
  };
  conversationHistory.push(fullQuestion);
  const fetchOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${openaiApiKey}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: conversationHistory,
    }),
  };

  console.log(fetchOptions.body)
  console.log(conversationHistory)

  try {
    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      fetchOptions
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    const answer = data.choices[0].message;
    
    const fullAnswer = {
      role: "assistant",
      content: answer.content,
    };
    conversationHistory.push(fullAnswer);
    return answer; 
  } catch (error) {
    console.error("Error:", error);
  }
}

module.exports = { getAnswer };