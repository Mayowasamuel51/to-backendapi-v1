const fs = require("fs");
// const pdf = require("pdf-parse");
const pdfParse = require("pdf-parse");

const mongoose = require("mongoose");
const Quiz = require("./model/quiz");

const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers";
const PDF_PATH = "./controller/T.OAnalyticsSplunkAdminExam.pdf";

async function parseQuestions() {
  const dataBuffer = fs.readFileSync(PDF_PATH);
  // const data = await pdf(dataBuffer);
  const data = await pdfParse(dataBuffer);

  const text = data.text;
  const blocks = text.split(/(?=QUESTION\s*\d+)/i).filter(b => b.trim().length);

  const questions = [];

  for (const block of blocks) {
    const qMatch = block.match(/QUESTION\s*\d+[\s\S]*?(?=A\.)/i);
    const question = qMatch ? qMatch[0].replace(/QUESTION\s*\d+/i, "").trim() : "";

    const options = [];
    const optionMatches = block.match(/([A-D]\..*?)(?=(?:[A-D]\.|Correct Answer|$))/gis);
    if (optionMatches) {
      optionMatches.forEach(o => {
        const cleaned = o.replace(/\n/g, " ").trim();
        options.push(cleaned);
      });
    }

    const ansMatch = block.match(/Correct Answer\s*[:\-]?\s*([A-D,\sTrueFals]+)/i);
    let correct = [];
    if (ansMatch) {
      const ans = ansMatch[1].trim();
      if (/True|False/i.test(ans) && !options.length) {
        options.push("A. True", "B. False");
        correct = [ans.toLowerCase().includes("true") ? "A. True" : "B. False"];
      } else {
        const letters = ans.match(/[A-D]/gi);
        if (letters && letters.length && options.length) {
          correct = options.filter(o => letters.includes(o[0]));
        } else {
          correct = [ans];
        }
      }
    }

    if (question && (options.length || correct.length))
      questions.push({ question, options, correct });
  }
  return questions;
}

async function seed() {
  try {
    console.log("Reading PDF and generating quiz...");
    const questions = await parseQuestions();
    console.log(`Found ${questions.length} questions ✅`);

    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    const quiz = {
      title: "T.O Analytics Splunk Admin Exam Quiz",
      description: "Comprehensive test for Splunk Admin students under T.O Analytics.",
      questions,
    };

    await Quiz.Quiz.deleteMany({ title: quiz.title });
    await Quiz.Quiz.create(quiz);

    console.log(`Inserted ${quiz.questions.length} questions successfully! 🚀`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();



// const mongoose = require("mongoose");
// const Quiz = require("../model/quiz.js");

// const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"; // change to your DB URI

// const splunkAdminQuiz = {
//   title: "T.O Analytics Splunk Admin Exam Quiz",
//   description: "Comprehensive test for Splunk Admin students under T.O Analytics.",
//   questions: [
//     {
//       question: "What is the primary purpose of the Splunk Indexer?",
//       options: [
//         "A. Collects data from sources",
//         "B. Parses and stores data into indexes",
//         "C. Manages user authentication",
//         "D. Displays dashboards",
//       ],
//       correct: ["B. Parses and stores data into indexes"],
//     },
//     {
//       question: "Which Splunk component handles search requests from users?",
//       options: [
//         "A. Forwarder",
//         "B. Search Head",
//         "C. Indexer",
//         "D. Deployment Server",
//       ],
//       correct: ["B. Search Head"],
//     },
//     {
//       question: "What is the function of a Universal Forwarder?",
//       options: [
//         "A. Parses and indexes data",
//         "B. Sends raw data to indexers",
//         "C. Manages Splunk apps",
//         "D. Generates dashboards",
//       ],
//       correct: ["B. Sends raw data to indexers"],
//     },
//     {
//       question: "Which configuration file controls data inputs in Splunk?",
//       options: [
//         "A. props.conf",
//         "B. inputs.conf",
//         "C. transforms.conf",
//         "D. outputs.conf",
//       ],
//       correct: ["B. inputs.conf"],
//     },
//     {
//       question: "Which file defines how events are transformed in Splunk?",
//       options: [
//         "A. transforms.conf",
//         "B. inputs.conf",
//         "C. props.conf",
//         "D. indexes.conf",
//       ],
//       correct: ["A. transforms.conf"],
//     },
//     {
//       question: "What does props.conf primarily control?",
//       options: [
//         "A. Input data sources",
//         "B. Event processing, field extractions, and line breaking",
//         "C. Index locations",
//         "D. Search configurations",
//       ],
//       correct: ["B. Event processing, field extractions, and line breaking"],
//     },
//     {
//       question: "Which Splunk role is responsible for managing authentication and authorization?",
//       options: [
//         "A. Indexer",
//         "B. Search Head",
//         "C. License Master",
//         "D. Deployment Server",
//       ],
//       correct: ["B. Search Head"],
//     },
//     {
//       question: "Which command is used to summarize and aggregate data?",
//       options: ["A. eval", "B. stats", "C. fields", "D. dedup"],
//       correct: ["B. stats"],
//     },
//     {
//       question: "Which Splunk dashboard type provides more modern and customizable visuals?",
//       options: [
//         "A. Classic Dashboard",
//         "B. Simple XML Dashboard",
//         "C. Dashboard Studio",
//         "D. Report Builder",
//       ],
//       correct: ["C. Dashboard Studio"],
//     },
//     {
//       question: "Which configuration file is used to define indexes?",
//       options: [
//         "A. inputs.conf",
//         "B. outputs.conf",
//         "C. indexes.conf",
//         "D. server.conf",
//       ],
//       correct: ["C. indexes.conf"],
//     },
//     {
//       question: "Which role does the License Master play in Splunk?",
//       options: [
//         "A. Manages distributed search heads",
//         "B. Tracks and enforces license usage",
//         "C. Handles data forwarding",
//         "D. Controls user permissions",
//       ],
//       correct: ["B. Tracks and enforces license usage"],
//     },
//     {
//       question: "Which configuration file defines where Splunk sends indexed data?",
//       options: [
//         "A. props.conf",
//         "B. outputs.conf",
//         "C. inputs.conf",
//         "D. indexes.conf",
//       ],
//       correct: ["B. outputs.conf"],
//     },
//     {
//       question: "What is the main use of the Deployment Server?",
//       options: [
//         "A. Deploys and manages configurations across multiple Splunk instances",
//         "B. Collects metrics from forwarders",
//         "C. Stores indexed data",
//         "D. Generates reports",
//       ],
//       correct: ["A. Deploys and manages configurations across multiple Splunk instances"],
//     },
//     {
//       question: "Which Splunk command converts field values into a list of values?",
//       options: ["A. makemv", "B. eval", "C. dedup", "D. stats"],
//       correct: ["A. makemv"],
//     },
//     {
//       question: "Which command removes duplicate values from results?",
//       options: ["A. dedup", "B. sort", "C. table", "D. stats"],
//       correct: ["A. dedup"],
//     },
//   ],
// };

// async function seed() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to DB ✅");

//     await Quiz.Quiz.deleteMany({ title: "T.O Analytics Splunk Admin Exam Quiz" });
//     await Quiz.Quiz.create(splunkAdminQuiz);

//     console.log("T.O Analytics Splunk Admin Exam Quiz 🚀 inserted successfully!");
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seed();
