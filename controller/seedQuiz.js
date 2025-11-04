const mongoose = require("mongoose");
const Quiz = require("../model/quiz.js");

const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers";

const splunkDay1Quiz = {
  title: "T.O Analytics Splunk Class 1 Quiz",
  description: "Covers Splunk SIEM concepts from Day 1 presentation",
  questions: [
    {
      question: "What is Splunk primarily designed to do?",
      options: [
        "Collect and analyze machine data from various sources",
        "Edit documents and spreadsheets",
        "Manage databases manually",
        "Host virtual machines"
      ],
      correct: ["Collect and analyze machine data from various sources"]
    },
    {
      question: "What does SIEM stand for?",
      options: [
        "Security Information and Event Management",
        "System Intelligence and Event Mapping",
        "Secure Internet Event Monitoring",
        "System Information and Event Machine"
      ],
      correct: ["Security Information and Event Management"]
    },
    {
      question: "Which Splunk product provides SIEM capabilities?",
      options: [
        "Splunk Enterprise Security",
        "Splunk Forwarder",
        "Splunk Dashboard Studio",
        "Splunk Free"
      ],
      correct: ["Splunk Enterprise Security"]
    },
    {
      question: "Who commonly uses Splunk SIEM?",
      options: [
        "SOC Analysts and Security Engineers",
        "Graphic Designers",
        "Sales Executives",
        "Medical Researchers"
      ],
      correct: ["SOC Analysts and Security Engineers"]
    },
    {
      question: "Which of the following is NOT a core certification in Splunk?",
      options: [
        "Splunk Core Certified User",
        "Splunk Cloud Certified Admin",
        "Splunk Certified Game Developer",
        "Splunk Enterprise Certified Architect"
      ],
      correct: ["Splunk Certified Game Developer"]
    },
    {
      question: "On average, how much can a Splunk Administrator earn per year?",
      options: [
        "$85,000 - $135,000",
        "$30,000 - $50,000",
        "$250,000 - $360,000",
        "$10,000 - $25,000"
      ],
      correct: ["$85,000 - $135,000"]
    },
    {
      question: "Which of these companies uses Splunk?",
      options: [
        "Intel",
        "Shazam",
        "Coca-Cola",
        "All of the above"
      ],
      correct: ["All of the above"]
    },
    {
      question: "What is the purpose of a Splunk Dashboard?",
      options: [
        "To visualize and monitor key data metrics",
        "To host web applications",
        "To install software packages",
        "To scan devices for malware"
      ],
      correct: ["To visualize and monitor key data metrics"]
    },
    {
      question: "Which of the following is a Splunk visualization type?",
      options: [
        "Bar chart",
        "Pie chart",
        "Line chart",
        "All of the above"
      ],
      correct: ["All of the above"]
    },
    {
      question: "What is the function of Splunk Alerts?",
      options: [
        "To notify when specific data conditions are met",
        "To create dashboards",
        "To install forwarders",
        "To visualize static data"
      ],
      correct: ["To notify when specific data conditions are met"]
    },
    {
      question: "Which language is used within Splunk for queries?",
      options: [
        "SPL (Search Processing Language)",
        "Python",
        "C++",
        "Bash"
      ],
      correct: ["SPL (Search Processing Language)"]
    },
    {
      question: "What does a Splunk Forwarder do?",
      options: [
        "Collects and sends data to indexers",
        "Analyzes data for anomalies",
        "Creates reports and dashboards",
        "Stores index data locally"
      ],
      correct: ["Collects and sends data to indexers"]
    },
    {
      question: "What are the two types of Splunk forwarders?",
      options: [
        "Universal Forwarder and Heavy Forwarder",
        "Light Forwarder and Quick Forwarder",
        "Cloud Forwarder and Local Forwarder",
        "Master Forwarder and Slave Forwarder"
      ],
      correct: ["Universal Forwarder and Heavy Forwarder"]
    },
    {
      question: "What is the purpose of the Splunk Monitoring Console?",
      options: [
        "To monitor the health and performance of the Splunk infrastructure",
        "To collect raw data from users",
        "To install third-party apps",
        "To reset user passwords"
      ],
      correct: ["To monitor the health and performance of the Splunk infrastructure"]
    },
    {
      question: "What is the difference between Forwarders and the Monitoring Console?",
      options: [
        "Forwarders send data; the Monitoring Console observes performance",
        "They both perform the same function",
        "Forwarders create dashboards",
        "Monitoring Console forwards syslogs"
      ],
      correct: ["Forwarders send data; the Monitoring Console observes performance"]
    },
    {
      question: "What is the purpose of clustering in Splunk?",
      options: [
        "To ensure high availability and data replication",
        "To reduce server size",
        "To improve user interface design",
        "To store duplicate dashboards"
      ],
      correct: ["To ensure high availability and data replication"]
    },
    {
      question: "Which of these defines the number of copies of data in a Splunk cluster?",
      options: [
        "Replication Factor",
        "Search Factor",
        "Data Factor",
        "Cluster Factor"
      ],
      correct: ["Replication Factor"]
    },
    {
      question: "Which of the following is an advantage of Splunk SIEM?",
      options: [
        "Real-time monitoring and alerting",
        "Limited data integration",
        "High complexity only",
        "No visualization features"
      ],
      correct: ["Real-time monitoring and alerting"]
    },
    {
      question: "Which of the following is a challenge of using Splunk?",
      options: [
        "High licensing cost",
        "Ease of setup",
        "Low data volume capacity",
        "No need for optimization"
      ],
      correct: ["High licensing cost"]
    },
    {
      question: "What is one future trend of Splunk SIEM?",
      options: [
        "AI and ML integration for advanced detection",
        "Reduced security analytics",
        "Manual log correlation only",
        "No cloud support"
      ],
      correct: ["AI and ML integration for advanced detection"]
    }
  ]
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    await Quiz.Quiz.deleteMany({ title: "T.O Analytics Splunk Class 1 Quiz" });
    await Quiz.Quiz.create(splunkDay1Quiz);

    console.log("T.O Analytics Splunk Class 1 Quiz🚀");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();



// const mongoose = require('mongoose');
// const Quiz = require('../model/quiz.js');

// const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"; // change to your DB URI

// const splunk1Quiz = {
//   title: "T.O Analytics Splunk  Quiz 1 ",
//   description: "Test your knowledge on Splunk fundamentals",
//   questions: [
//     {
//       question: "What is Splunk primarily used for?",
//       options: [
//         "Video editing",
//         "Data collection and analytics from machine data",
//         "Word processing",
//         "Network cabling",
//       ],
//       correct: ["Data collection and analytics from machine data"],
//     },
//     {
//       question: "Which of the following are key components of Splunk?",
//       options: [
//         "Data collection, indexing, searching, and reporting",
//         "Encryption, decryption, scanning, and monitoring",
//         "Writing, compiling, and debugging",
//         "Only data ingestion",
//       ],
//       correct: ["Data collection, indexing, searching, and reporting"],
//     },
//     {
//       question: "Splunk can analyze data from which of the following sources?",
//       options: [
//         "Logs, events, and metrics",
//         "Emails and text messages",
//         "PDF documents only",
//         "None of the above",
//       ],
//       correct: ["Logs, events, and metrics"],
//     },
//     {
//       question: "What does SIEM stand for?",
//       options: [
//         "Security Information and Event Management",
//         "System Information and Event Monitoring",
//         "Security Intelligence and Event Mapping",
//         "System Integrity and Event Management",
//       ],
//       correct: ["Security Information and Event Management"],
//     },
//     {
//       question: "Which Splunk product provides SIEM capabilities?",
//       options: [
//         "Splunk Enterprise Security",
//         "Splunk Cloud Monitor",
//         "Splunk Universal Forwarder",
//         "Splunk Dashboard Studio",
//       ],
//       correct: ["Splunk Enterprise Security"],
//     },
//     {
//       question: "True or False: Splunk SIEM uses correlation searches and threat intelligence to detect security events.",
//       options: ["True", "False"],
//       correct: ["True"],
//     },
//     {
//       question: "Who commonly uses Splunk SIEM?",
//       options: [
//         "SOC Analysts",
//         "Security Engineers",
//         "Compliance Teams",
//         "Web Designers",
//       ],
//       correct: ["SOC Analysts", "Security Engineers", "Compliance Teams"],
//     },
//     {
//       question: "What is the purpose of a Splunk Dashboard?",
//       options: [
//         "To visualize and monitor key data metrics",
//         "To send alerts via email",
//         "To encrypt network traffic",
//         "To manage Splunk licenses",
//       ],
//       correct: ["To visualize and monitor key data metrics"],
//     },
//     {
//       question: "What is a Splunk Forwarder used for?",
//       options: [
//         "To collect and send data to the indexer",
//         "To visualize dashboards",
//         "To create reports",
//         "To search data",
//       ],
//       correct: ["To collect and send data to the indexer"],
//     },
//     {
//       question: "True or False: Splunk SIEM is easy to set up and requires no training.",
//       options: ["True", "False"],
//       correct: ["False"],
//     },
//   ],
// };

// async function seed() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to DB ✅");

//     await Quiz.Quiz.deleteMany({ title: "Splunk 1 Quiz" });
//     await Quiz.Quiz.create(splunk1Quiz);

//     console.log("Splunk 1 Quiz loaded successfully 🚀");
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seed();
