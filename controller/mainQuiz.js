const mongoose = require("mongoose");
const Quiz = require("../model/quiz.js");

const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"; // change to your DB URI

const splunk2Quiz = {
  title: "T.O Analytics Splunk  Quiz 2",
  description: "Advanced Splunk SIEM and operational knowledge test",
  questions: [
    {
      question: "Name two core functions of Splunk SIEM.",
      options: [
        "Detection and Response",
        "Logging and Backup",
        "Visualization and Exporting",
        "Formatting and Compilation",
      ],
      correct: ["Detection and Response"],
    },
    {
      question: "List two Splunk certifications required for advanced users.",
      options: [
        "Splunk Certified Power User, Splunk Certified Admin",
        "Splunk Beginner, Splunk Starter",
        "Splunk Developer, Splunk Support",
        "Splunk Intern, Splunk Junior",
      ],
      correct: ["Splunk Certified Power User, Splunk Certified Admin"],
    },
    {
      question: "What is the average salary range for a Splunk Architect or Developer?",
      options: [
        "$50,000 - $80,000",
        "$90,000 - $110,000",
        "$120,000 - $180,000",
        "$200,000 - $250,000",
      ],
      correct: ["$120,000 - $180,000"],
    },
    {
      question: "What is the purpose of a Splunk Dashboard?",
      options: [
        "To visualize and monitor key data metrics",
        "To manage user accounts",
        "To clean up event logs",
        "To restart Splunk servers",
      ],
      correct: ["To visualize and monitor key data metrics"],
    },
    {
      question:
        "Match the visualization type with its use: Pie Chart, Line Chart, Single Value",
      options: [
        "Pie Chart → distribution; Line Chart → trends; Single Value → key metrics",
        "Pie Chart → trends; Line Chart → static data; Single Value → logs",
        "Pie Chart → counts; Line Chart → anomalies; Single Value → alerts",
        "Pie Chart → IPs; Line Chart → ports; Single Value → hosts",
      ],
      correct: ["Pie Chart → distribution; Line Chart → trends; Single Value → key metrics"],
    },
    {
      question:
        "What does the following SPL query return? index=main | stats count by src_ip | sort -count | head 10",
      options: [
        "Top 10 source IPs by event count",
        "Failed logins only",
        "Top 10 users by name",
        "Top 10 search queries",
      ],
      correct: ["Top 10 source IPs by event count"],
    },
    {
      question:
        "What is the main difference between Classic Dashboard and Dashboard Studio?",
      options: [
        "Dashboard Studio offers modern, customizable, and flexible visualizations",
        "Classic Dashboard is faster and newer",
        "Dashboard Studio runs without data",
        "Classic Dashboard supports AI insights",
      ],
      correct: ["Dashboard Studio offers modern, customizable, and flexible visualizations"],
    },
    {
      question: "What are the two main types of Splunk Clusters?",
      options: [
        "Indexer Cluster and Search Head Cluster",
        "User Cluster and Admin Cluster",
        "Forwarder Cluster and Collector Cluster",
        "Index Cluster and Dashboard Cluster",
      ],
      correct: ["Indexer Cluster and Search Head Cluster"],
    },
    {
      question: "Define Replication Factor (RF) and Search Factor (SF).",
      options: [
        "RF is copies of data; SF is copies of searchable data",
        "RF is backup files; SF is users",
        "RF is indexes; SF is queries",
        "RF is inputs; SF is outputs",
      ],
      correct: ["RF is copies of data; SF is copies of searchable data"],
    },
    {
      question: "Differentiate between a Universal Forwarder and a Heavy Forwarder.",
      options: [
        "UF sends raw data; HF can parse and filter data",
        "UF is for dashboards; HF is for users",
        "UF parses data; HF sends encrypted data only",
        "UF sends events; HF stores data locally",
      ],
      correct: ["UF sends raw data; HF can parse and filter data"],
    },
    {
      question: "What is the main function of the Monitoring Console in Splunk?",
      options: [
        "To monitor health and performance of Splunk components",
        "To view security alerts",
        "To create user dashboards",
        "To schedule reports",
      ],
      correct: ["To monitor health and performance of Splunk components"],
    },
    {
      question: "List two advantages of using Splunk SIEM.",
      options: [
        "Real-time monitoring and advanced analytics",
        "Offline reporting and local storage",
        "Log cleaning and formatting",
        "Limited access and cost reduction",
      ],
      correct: ["Real-time monitoring and advanced analytics"],
    },
    {
      question: "List two challenges of using Splunk SIEM.",
      options: [
        "High cost and complexity",
        "Slow query speed and poor visuals",
        "Low data accuracy and scalability",
        "Weak authentication and no search",
      ],
      correct: ["High cost and complexity"],
    },
    {
      question:
        "True or False: Splunk SIEM is easy to set up and requires no training.",
      options: ["True", "False"],
      correct: ["False"],
    },
    {
      question:
        "Mention one emerging technology trend in the future of Splunk SIEM.",
      options: [
        "AI-driven security automation",
        "Manual log review",
        "Offline backups only",
        "Basic data visualization",
      ],
      correct: ["AI-driven security automation"],
    },
    {
      question: "What does RBA stand for in the context of Splunk SIEM?",
      options: [
        "Risk-Based Alerting",
        "Role-Based Access",
        "Real-time Backup Analysis",
        "Random Binary Assignment",
      ],
      correct: ["Risk-Based Alerting"],
    },
    {
      question:
        "According to the slides, Splunk is a leader in which Gartner report?",
      options: [
        "Security Information and Event Management Magic Quadrant",
        "Data Analytics and AI Market Quadrant",
        "Log Management Insights Report",
        "Cybersecurity Mesh Framework Report",
      ],
      correct: ["Security Information and Event Management Magic Quadrant"],
    },
    {
      question:
        "Summarize in one sentence why Splunk SIEM is important for organizations.",
      options: [
        "It helps detect, analyze, and respond to security threats efficiently.",
        "It helps create user dashboards.",
        "It generates static data reports.",
        "It stores passwords securely.",
      ],
      correct: ["It helps detect, analyze, and respond to security threats efficiently."],
    },
    {
      question:
        "Which of the following best describes Splunk Enterprise Security?",
      options: [
        "Splunk’s SIEM solution that provides real-time security monitoring",
        "Splunk’s cloud monitoring dashboard",
        "Splunk’s user interface library",
        "Splunk’s free trial version",
      ],
      correct: ["Splunk’s SIEM solution that provides real-time security monitoring"],
    },
    {
      question:
        "Which Splunk feature allows correlation searches to detect threats?",
      options: [
        "Security Content Management (SCM)",
        "Data Forwarding",
        "Indexing Layer",
        "Search Head Clustering",
      ],
      correct: ["Security Content Management (SCM)"],
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    await Quiz.Quiz.deleteMany({ title: "Splunk 2 Quiz" });
    await Quiz.Quiz.create(splunk2Quiz);

    console.log("Splunk 2 Quiz loaded successfully 🚀");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
