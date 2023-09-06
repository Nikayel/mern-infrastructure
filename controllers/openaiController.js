const dotenv = require("dotenv");
dotenv.config();

const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_SECRET,
});

exports.summaryController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-003",
      prompt: `Summarize this \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.paragraphController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "gpt-3.5-turbo",
      prompt: `write a detail paragraph about \n${text}`,
      max_tokens: 500,
      temperature: 0.5,
    });
    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.chatbotController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: `Me: ${text}` },
      ],
      max_tokens: 300,
      temperature: 0.7,
    });
    if (completion.choices[0].message.content) {
      return res.status(200).json(completion.choices[0].message.content);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.jsconverterController = async (req, res) => {
  try {
    const { text } = req.body;
    const completion = await openai.completions.create({
      model: "text-davinci-002",
      prompt: `/* Convert these instructions into JavaScript code: \n${text}`,
      max_tokens: 400,
      temperature: 0.25,
    });
    if (completion.choices[0].text) {
      return res.status(200).json(completion.choices[0].text);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};

exports.scifiImageController = async (req, res) => {
  try {
    const { text } = req.body;
    const image = await openai.images.generate({
      prompt: `Generate a sci-fi image of ${text}`,
      n: 1,
      size: "512x512",
    });
    if (image.data[0].url) {
      return res.status(200).json(image.data[0].url);
    }
  } catch (err) {
    console.error(err);
    return res.status(404).json({
      message: err.message,
    });
  }
};
