const mongoose = require("mongoose");
const Quiz = require("../model/quiz.js");

const MONGO_URI =
  "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers"; // Change to your DB URI

const splunkWebQuiz = {
  title: "T.O Analytics Splunk Class 2 Quiz",
  description: "Test your understanding of Splunk Web interface and SPL command basics.",
  questions: [
    {
      question: "What is Splunk Web used for?",
      options: [
        "Only data input and indexing",
        "Searching, analyzing, and managing Splunk through a browser",
        "Configuring system hardware",
        "Uploading dashboards from Excel",
      ],
      correct: ["Searching, analyzing, and managing Splunk through a browser"],
    },
    {
      question: "What is the URL format for accessing Splunk Web?",
      options: [
        "http://splunk.local",
        "http://<server-name>:8080",
        "http://<server-name>:8000",
        "https://splunk-enterprise.com",
      ],
      correct: ["http://<server-name>:8000"],
    },
    {
      question: "Which component in Splunk Web lists installed apps?",
      options: [
        "Time Range Picker",
        "Search Bar",
        "Apps Menu / App Selector",
        "View Tabs",
      ],
      correct: ["Apps Menu / App Selector"],
    },
    {
      question: "What is the purpose of the Time Range Picker?",
      options: [
        "To display charts",
        "To select the time window for searches",
        "To set field extractions",
        "To save dashboards",
      ],
      correct: ["To select the time window for searches"],
    },
    {
      question: "Where do you type SPL queries in Splunk Web?",
      options: ["Time Range Picker", "Results Panel", "Settings Menu", "Search Bar"],
      correct: ["Search Bar"],
    },
    {
      question: "What does the Fields Sidebar allow you to do?",
      options: [
        "Add new data inputs",
        "Manage Splunk licenses",
        "Filter or refine search results without rewriting queries",
        "Change visualization types",
      ],
      correct: ["Filter or refine search results without rewriting queries"],
    },
    {
      question: "What is the purpose of the Search Job/Progress area?",
      options: [
        "To edit dashboards",
        "To monitor search status and system messages",
        "To add fields",
        "To adjust color themes",
      ],
      correct: ["To monitor search status and system messages"],
    },
    {
      question: "Which step is NOT part of adding data through Splunk Web?",
      options: [
        "Choose a method (Upload, Monitor, or Forward)",
        "Assign an index",
        "Configure a REST API endpoint",
        "Select a source type",
      ],
      correct: ["Configure a REST API endpoint"],
    },
    {
      question: "What SPL command retrieves all HTTP 500 error events?",
      options: [
        "index=web_logs status=200",
        "index=web_logs status=404",
        "index=web_logs status=500",
        "search index=web_logs 200",
      ],
      correct: ["index=web_logs status=500"],
    },
    {
      question: "Which command limits results to the top 5 records?",
      options: ["stats", "sort", "head", "dedup"],
      correct: ["head"],
    },
    {
      question: "Why are fields important in Splunk?",
      options: [
        "They reduce disk usage",
        "They allow Splunk to structure, filter, and analyze data",
        "They hide raw data",
        "They delete old events",
      ],
      correct: ["They allow Splunk to structure, filter, and analyze data"],
    },
    {
      question: "What is the Search App primarily used for?",
      options: [
        "Visual design",
        "Data exploration and reporting",
        "Field extraction only",
        "System configuration",
      ],
      correct: ["Data exploration and reporting"],
    },
    {
      question: "Which of these is NOT an interface for using the Search App?",
      options: [
        "Splunk Web",
        "Command Line Interface",
        "Splunk Search Processing Language (SPL)",
        "Splunk Admin Dashboard",
      ],
      correct: ["Splunk Admin Dashboard"],
    },
    {
      question: "Which command type processes each event independently on indexers?",
      options: [
        "Transforming",
        "Distributable Streaming",
        "Orchestrating",
        "Dataset Processing",
      ],
      correct: ["Distributable Streaming"],
    },
    {
      question: "Which command type summarizes or aggregates data?",
      options: ["Transforming", "Generating", "Streaming", "Distributable"],
      correct: ["Transforming"],
    },
    {
      question: "Which command starts a search by generating data?",
      options: ["stats", "makemv", "inputlookup", "sort"],
      correct: ["inputlookup"],
    },
    {
      question: "What is a key performance tip for non-streaming commands like sort?",
      options: [
        "Place them at the beginning of your search",
        "Avoid using them",
        "Place them at the end to maintain speed",
        "Use them only on indexers",
      ],
      correct: ["Place them at the end to maintain speed"],
    },
    {
      question:
        "Which command type controls how searches behave rather than transforming data?",
      options: ["Orchestrating", "Transforming", "Streaming", "Dataset Processing"],
      correct: ["Orchestrating"],
    },
    {
      question: "What is the main purpose of understanding command types in Splunk?",
      options: [
        "To memorize syntax",
        "To configure new apps",
        "To write faster, more efficient searches",
        "To delete old data",
      ],
      correct: ["To write faster, more efficient searches"],
    },
    {
      question: "What happens when a non-streaming command runs early in the search?",
      options: [
        "The search speeds up",
        "Processing moves to the search head, slowing performance",
        "The command runs in parallel on all indexers",
        "The results are cached",
      ],
      correct: ["Processing moves to the search head, slowing performance"],
    },
    {
      question: "What is a Distributable Streaming command best known for?",
      options: [
        "Running on the search head",
        "Running in parallel across indexers",
        "Creating new indexes",
        "Generating datasets",
      ],
      correct: ["Running in parallel across indexers"],
    },
    {
      question:
        "Which Splunk component allows switching between Events, Statistics, and Visualizations?",
      options: ["Search Job Monitor", "View Tabs", "Field Sidebar", "Search Bar"],
      correct: ["View Tabs"],
    },
    {
      question: "Which Splunk interface is used by those who prefer terminal commands?",
      options: [
        "Splunk Web",
        "Dashboard Studio",
        "Command Line Interface",
        "Admin Panel",
      ],
      correct: ["Command Line Interface"],
    },
    {
      question: "The ‘collect’ command is primarily used to:",
      options: [
        "Delete indexed data",
        "Store summarized search results into a summary index",
        "Parse timestamps",
        "Restart Splunk service",
      ],
      correct: ["Store summarized search results into a summary index"],
    },
    {
      question: "What is the benefit of using summary indexes?",
      options: [
        "They slow down searches",
        "They allow pre-aggregated data for faster searches",
        "They store raw data",
        "They replace lookup tables",
      ],
      correct: ["They allow pre-aggregated data for faster searches"],
    },
    {
      question: "What does the ‘stats’ command do?",
      options: [
        "Creates new indexes",
        "Aggregates and summarizes data",
        "Lists all indexes",
        "Deletes duplicate fields",
      ],
      correct: ["Aggregates and summarizes data"],
    },
    {
      question: "What type of Splunk command is ‘sort’?",
      options: ["Streaming", "Transforming", "Dataset Processing", "Generating"],
      correct: ["Dataset Processing"],
    },
    {
      question: "What command would you use to create a dummy event for testing?",
      options: ["makeresults", "addtotals", "rare", "eval"],
      correct: ["makeresults"],
    },
    {
      question: "What are transforming commands mainly used for?",
      options: [
        "Event filtering",
        "Aggregating and summarizing data for reports",
        "Field extraction",
        "System configuration",
      ],
      correct: ["Aggregating and summarizing data for reports"],
    },
    {
      question:
        "What command helps monitor system messages and errors during a search?",
      options: ["jobstatus", "Search Job / Progress", "fields", "results"],
      correct: ["Search Job / Progress"],
    },
  ],
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB ✅");

    await Quiz.Quiz.deleteMany({ title: "T.O Analytics Splunk Class 2 Quiz" });
    await Quiz.Quiz.create(splunkWebQuiz);

    console.log("T.O Analytics Splunk Class 2 Quiz 🚀 inserted!");
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

// const splunk2Quiz = {
//   title: "T.O Analytics Splunk Class 2 Quiz",
//   description: "Advanced Splunk SIEM and operational knowledge test",
//   questions: [
//     {
//       question: "Name two core functions of Splunk SIEM.",
//       options: [
//         "Detection and Response",
//         "Logging and Backup",
//         "Visualization and Exporting",
//         "Formatting and Compilation",
//       ],
//       correct: ["Detection and Response"],
//     },
//     {
//       question: "List two Splunk certifications required for advanced users.",
//       options: [
//         "Splunk Certified Power User, Splunk Certified Admin",
//         "Splunk Beginner, Splunk Starter",
//         "Splunk Developer, Splunk Support",
//         "Splunk Intern, Splunk Junior",
//       ],
//       correct: ["Splunk Certified Power User, Splunk Certified Admin"],
//     },
//     {
//       question: "What is the average salary range for a Splunk Architect or Developer?",
//       options: [
//         "$50,000 - $80,000",
//         "$90,000 - $110,000",
//         "$120,000 - $180,000",
//         "$200,000 - $250,000",
//       ],
//       correct: ["$120,000 - $180,000"],
//     },
//     {
//       question: "What is the purpose of a Splunk Dashboard?",
//       options: [
//         "To visualize and monitor key data metrics",
//         "To manage user accounts",
//         "To clean up event logs",
//         "To restart Splunk servers",
//       ],
//       correct: ["To visualize and monitor key data metrics"],
//     },
//     {
//       question:
//         "Match the visualization type with its use: Pie Chart, Line Chart, Single Value",
//       options: [
//         "Pie Chart → distribution; Line Chart → trends; Single Value → key metrics",
//         "Pie Chart → trends; Line Chart → static data; Single Value → logs",
//         "Pie Chart → counts; Line Chart → anomalies; Single Value → alerts",
//         "Pie Chart → IPs; Line Chart → ports; Single Value → hosts",
//       ],
//       correct: ["Pie Chart → distribution; Line Chart → trends; Single Value → key metrics"],
//     },
//     {
//       question:
//         "What does the following SPL query return? index=main | stats count by src_ip | sort -count | head 10",
//       options: [
//         "Top 10 source IPs by event count",
//         "Failed logins only",
//         "Top 10 users by name",
//         "Top 10 search queries",
//       ],
//       correct: ["Top 10 source IPs by event count"],
//     },
//     {
//       question:
//         "What is the main difference between Classic Dashboard and Dashboard Studio?",
//       options: [
//         "Dashboard Studio offers modern, customizable, and flexible visualizations",
//         "Classic Dashboard is faster and newer",
//         "Dashboard Studio runs without data",
//         "Classic Dashboard supports AI insights",
//       ],
//       correct: ["Dashboard Studio offers modern, customizable, and flexible visualizations"],
//     },
//     {
//       question: "What are the two main types of Splunk Clusters?",
//       options: [
//         "Indexer Cluster and Search Head Cluster",
//         "User Cluster and Admin Cluster",
//         "Forwarder Cluster and Collector Cluster",
//         "Index Cluster and Dashboard Cluster",
//       ],
//       correct: ["Indexer Cluster and Search Head Cluster"],
//     },
//     {
//       question: "Define Replication Factor (RF) and Search Factor (SF).",
//       options: [
//         "RF is copies of data; SF is copies of searchable data",
//         "RF is backup files; SF is users",
//         "RF is indexes; SF is queries",
//         "RF is inputs; SF is outputs",
//       ],
//       correct: ["RF is copies of data; SF is copies of searchable data"],
//     },
//     {
//       question: "Differentiate between a Universal Forwarder and a Heavy Forwarder.",
//       options: [
//         "UF sends raw data; HF can parse and filter data",
//         "UF is for dashboards; HF is for users",
//         "UF parses data; HF sends encrypted data only",
//         "UF sends events; HF stores data locally",
//       ],
//       correct: ["UF sends raw data; HF can parse and filter data"],
//     },
//     {
//       question: "What is the main function of the Monitoring Console in Splunk?",
//       options: [
//         "To monitor health and performance of Splunk components",
//         "To view security alerts",
//         "To create user dashboards",
//         "To schedule reports",
//       ],
//       correct: ["To monitor health and performance of Splunk components"],
//     },
//     {
//       question: "List two advantages of using Splunk SIEM.",
//       options: [
//         "Real-time monitoring and advanced analytics",
//         "Offline reporting and local storage",
//         "Log cleaning and formatting",
//         "Limited access and cost reduction",
//       ],
//       correct: ["Real-time monitoring and advanced analytics"],
//     },
//     {
//       question: "List two challenges of using Splunk SIEM.",
//       options: [
//         "High cost and complexity",
//         "Slow query speed and poor visuals",
//         "Low data accuracy and scalability",
//         "Weak authentication and no search",
//       ],
//       correct: ["High cost and complexity"],
//     },
//     {
//       question:
//         "True or False: Splunk SIEM is easy to set up and requires no training.",
//       options: ["True", "False"],
//       correct: ["False"],
//     },
//     {
//       question:
//         "Mention one emerging technology trend in the future of Splunk SIEM.",
//       options: [
//         "AI-driven security automation",
//         "Manual log review",
//         "Offline backups only",
//         "Basic data visualization",
//       ],
//       correct: ["AI-driven security automation"],
//     },
//     {
//       question: "What does RBA stand for in the context of Splunk SIEM?",
//       options: [
//         "Risk-Based Alerting",
//         "Role-Based Access",
//         "Real-time Backup Analysis",
//         "Random Binary Assignment",
//       ],
//       correct: ["Risk-Based Alerting"],
//     },
//     {
//       question:
//         "According to the slides, Splunk is a leader in which Gartner report?",
//       options: [
//         "Security Information and Event Management Magic Quadrant",
//         "Data Analytics and AI Market Quadrant",
//         "Log Management Insights Report",
//         "Cybersecurity Mesh Framework Report",
//       ],
//       correct: ["Security Information and Event Management Magic Quadrant"],
//     },
//     {
//       question:
//         "Summarize in one sentence why Splunk SIEM is important for organizations.",
//       options: [
//         "It helps detect, analyze, and respond to security threats efficiently.",
//         "It helps create user dashboards.",
//         "It generates static data reports.",
//         "It stores passwords securely.",
//       ],
//       correct: ["It helps detect, analyze, and respond to security threats efficiently."],
//     },
//     {
//       question:
//         "Which of the following best describes Splunk Enterprise Security?",
//       options: [
//         "Splunk’s SIEM solution that provides real-time security monitoring",
//         "Splunk’s cloud monitoring dashboard",
//         "Splunk’s user interface library",
//         "Splunk’s free trial version",
//       ],
//       correct: ["Splunk’s SIEM solution that provides real-time security monitoring"],
//     },
//     {
//       question:
//         "Which Splunk feature allows correlation searches to detect threats?",
//       options: [
//         "Security Content Management (SCM)",
//         "Data Forwarding",
//         "Indexing Layer",
//         "Search Head Clustering",
//       ],
//       correct: ["Security Content Management (SCM)"],
//     },
//   ],
// };

// async function seed() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log("Connected to DB ✅");

//     await Quiz.Quiz.deleteMany({ title: "T.O Analytics Splunk Class 2 Quiz" });
//     await Quiz.Quiz.create(splunk2Quiz);

//     console.log("T.O Analytics Splunk Class 2 Quiz🚀");
//     process.exit(0);
//   } catch (err) {
//     console.error(err);
//     process.exit(1);
//   }
// }

// seed();
