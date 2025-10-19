const mongoose = require('mongoose');
const Quiz = require('../model/quiz.js');

const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"; // change to your DB URI

const splunk1Quiz = {
  title: "Splunk 1 Quiz",
  description: "Test your knowledge on Splunk fundamentals",
  questions: [
    {
      question: "What is Splunk primarily used for?",
      options: [
        "Video editing",
        "Data collection and analytics from machine data",
        "Word processing",
        "Network cabling",
      ],
      correct: ["Data collection and analytics from machine data"],
    },
    {
      question: "Which of the following are key components of Splunk?",
      options: [
        "Data collection, indexing, searching, and reporting",
        "Encryption, decryption, scanning, and monitoring",
        "Writing, compiling, and debugging",
        "Only data ingestion",
      ],
      correct: ["Data collection, indexing, searching, and reporting"],
    },
    {
      question: "Splunk can analyze data from which of the following sources?",
      options: [
        "Logs, events, and metrics",
        "Emails and text messages",
        "PDF documents only",
        "None of the above",
      ],
      correct: ["Logs, events, and metrics"],
    },
    {
      question: "What does SIEM stand for?",
      options: [
        "Security Information and Event Management",
        "System Information and Event Monitoring",
        "Security Intelligence and Event Mapping",
        "System Integrity and Event Management",
      ],
      correct: ["Security Information and Event Management"],
    },
    {
      question: "Which Splunk product provides SIEM capabilities?",
      options: [
        "Splunk Enterprise Security",
        "Splunk Cloud Monitor",
        "Splunk Universal Forwarder",
        "Splunk Dashboard Studio",
      ],
      correct: ["Splunk Enterprise Security"],
    },
    {
      question: "True or False: Splunk SIEM uses correlation searches and threat intelligence to detect security events.",
      options: ["True", "False"],
      correct: ["True"],
    },
    {
      question: "Who commonly uses Splunk SIEM?",
      options: [
        "SOC Analysts",
        "Security Engineers",
        "Compliance Teams",
        "Web Designers",
      ],
      correct: ["SOC Analysts", "Security Engineers", "Compliance Teams"],
    },
    {
      question: "What is the purpose of a Splunk Dashboard?",
      options: [
        "To visualize and monitor key data metrics",
        "To send alerts via email",
        "To encrypt network traffic",
        "To manage Splunk licenses",
      ],
      correct: ["To visualize and monitor key data metrics"],
    },
    {
      question: "What is a Splunk Forwarder used for?",
      options: [
        "To collect and send data to the indexer",
        "To visualize dashboards",
        "To create reports",
        "To search data",
      ],
      correct: ["To collect and send data to the indexer"],
    },
    {
      question: "True or False: Splunk SIEM is easy to set up and requires no training.",
      options: ["True", "False"],
      correct: ["False"],
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    await Quiz.Quiz.deleteMany({ title: "Splunk 1 Quiz" });
    await Quiz.Quiz.create(splunk1Quiz);

    console.log("Splunk 1 Quiz loaded successfully 🚀");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
