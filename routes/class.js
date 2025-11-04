import { useEffect, useState } from "react";
import Quiz from "./Quiz";
import { NavLink } from "react-router-dom";
const ClassM = () => {
  const api = import.meta.env.VITE_HOME_OO;
  const allowedEmails = [
    "samuelsamuelmayowa@gmail.com",
    "adenusitimi@gmail.com",
    "oluwaferanmiolulana@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "tomideolulana@gmail.com",
    "lybertyudochuu@gmail.com",
    "yinkalola51@gmail.com",
    "oluwaferanmiolulana@gmail.com",
    "randommayowa@gmail.com",
    "toanalyticsllc@gmail.com",
    "kevwe_oberiko@yahoo.com",
    "denisgsam@gmail.com",
    "oluwaferanmi.olulana@gmail.com",
    "fpasamuelmayowa51@gmail.com",
    "oluwatiroyeamoye@gmail.com",
    "trbanjo@gmail.com",
    "emanfrimpong@gmail.com",
    "dipeoluolatunji@gmail.com",
    "lybertyudochuu@gmail.com",
  ];

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedQuiz, setSelectedQuiz] = useState("");
  const [quizData, setQuizData] = useState(null);
  const [userEmail, setUserEmail] = useState("");
  const [isAllowed, setIsAllowed] = useState(false);

  // ✅ Load user email from localStorage and verify access
  useEffect(() => {
    const email = localStorage.getItem("user");
    setUserEmail(email);

    if (email) {
      const normalized = email.toLowerCase();
      const allowed = allowedEmails.map((e) => e.toLowerCase());
      setIsAllowed(allowed.includes(normalized));
    }
  }, []);

  // ✅ Fetch assignments only if user is allowed
  useEffect(() => {
    if (isAllowed) {
      fetch("https://to-backendapi-v1.vercel.app/api/all/assignment")
        .then((res) => res.json())
        .then((data) => {
          setAssignments(data.data || []);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching assignments:", err);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [isAllowed]);

  // ✅ Load a specific quiz
  const loadQuiz = async (quizName) => {
    setSelectedQuiz(quizName);
    try {
      const res = await fetch(`${api}/api/quiz/${quizName}`);
      const data = await res.json();
      setQuizData(data);
    } catch (err) {
      console.error("Error loading quiz:", err);
    }
  };

  // 🕐 Loading state
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-lg font-medium text-gray-700 animate-pulse">
          Loading assignments...
        </div>
      </div>
    );

  // 🚫 If user not allowed, block access
  if (!isAllowed) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Access Denied 🚫
        </h1>
        <p className="text-gray-700 text-lg">
          Only authorized To-Analytics members can view this page.
        </p>
        {userEmail ? (
          <p className="mt-4 text-sm text-gray-500">
            Your email: <span className="font-medium">{userEmail}</span>
          </p>
        ) : (
          <p className="mt-4 text-sm text-gray-500">
            Please log in to access the content.
          </p>
        )}
      </div>
    );
  }

  // ✅ Allowed content
  return (
    <div className="min-h-screen bg-gradient-to-b py-10 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Page Title */}
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          📚 Class Assignments
        </h2>

        {/* Quiz Selector */}
        {/* <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
          <label className="block text-lg font-semibold text-gray-700 mb-3">
            Select a Quiz:
          </label>
          <select
            value={selectedQuiz}
            onChange={(e) => loadQuiz(e.target.value)}
            className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          >
            <option value="">-- Choose a Quiz --</option>
            <option value="Splunk 1 Quiz">Splunk Quiz 1</option>
            <option value="Splunk 2 Quiz">Splunk Quiz 2</option>
            <option value="splunk3">Splunk Quiz 3</option>
          </select>
        </div> */}

        {/* Quiz Section */}
        {/* {quizData && (
          <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
            <Quiz data={quizData} />
          </div>
        )} */}

        {/* Assignments Section */}
        <div className="mt-14 px-6 sm:px-10 lg:px-20">
          <h3 className="text-2xl sm:text-1xl font-bold text-gray-800 mb-10">
            📝 Recent Assignments
          </h3>

          <ul className="space-y-10">
            {assignments.map((assignment) => (
              <li
                key={assignment._id}
                className="bg-white border border-gray-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-8 sm:p-10"
              >
                {/* HEADER */}
                <div className="mb-5 border-b border-gray-100 pb-4">
                  <h4 className="font-bold text-2xl text-gray-800 mb-1">
                    {assignment.name || "TO INSTRUCTOR"}
                  </h4>
                  <p className="text-sm text-gray-500">
                    📅 {new Date(assignment.date).toLocaleString()}
                  </p>
                </div>

                {/* DESCRIPTION / MAIN BODY */}
                <div className="prose prose-gray max-w-none">
                  <p className="text-gray-700 text-[15px] leading-relaxed whitespace-pre-line">
                    {assignment.message || assignment.description}
                  </p>
                </div>

                {/* IMAGE PREVIEW (if any) */}
                {assignment.imageurl && (
                  <div className="mt-6">
                    <img
                      src={assignment.imageurl}
                      alt="Assignment"
                      className="w-full max-h-96 object-cover rounded-xl shadow-md"
                    />
                  </div>
                )}

                {/* FOOTER */}
                {/* <div className="mt-8 flex justify-between items-center border-t border-gray-100 pt-4 text-sm text-gray-600">
                  <p className="font-medium">
                    🧾 Status: <span className="text-BLUE">Active</span>
                  </p>
                </div> */}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClassM;

// import { useEffect, useState } from "react";
// import Quiz from "./Quiz";
// import { NavLink } from "react-router-dom";

// const ClassM = () => {
//   const api = import.meta.env.VITE_HOME_OO;
//   const [assignments, setAssignments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [selectedQuiz, setSelectedQuiz] = useState("");
//   const [quizData, setQuizData] = useState(null);

//   useEffect(() => {
//     fetch("https://to-backendapi-v1.vercel.app/api/assignment")
//       .then((res) => res.json())
//       .then((data) => {
//         setAssignments(data.data || []);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Error fetching assignments:", err);
//         setLoading(false);
//       });
//   }, []);

//   const loadQuiz = async (quizName) => {
//     setSelectedQuiz(quizName);
//     try {
//       const res = await fetch(`${api}/api/quiz/${quizName}`);
//       const data = await res.json();
//       setQuizData(data);
//     } catch (err) {
//       console.error("Error loading quiz:", err);
//     }
//   };

//   if (loading)
//     return (
//       <div className="flex items-center justify-center h-screen bg-gray-50">
//         <div className="text-lg font-medium text-gray-700 animate-pulse">
//           Loading assignments...
//         </div>
//       </div>
//     );

//   return (
//     <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-10 px-4">
//       <div className="max-w-5xl mx-auto">
//         {/* Page Title */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//           📚 Class Assignments & Quizzes
//         </h2>

//         {/* Quiz Selector */}
//         <div className="bg-white shadow-md rounded-2xl p-6 mb-8">
//           <label className="block text-lg font-semibold text-gray-700 mb-3">
//             Select a Quiz:
//           </label>
//           <select
//             value={selectedQuiz}
//             onChange={(e) => loadQuiz(e.target.value)}
//             className="p-3 w-full border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
//           >
//             <option value="">-- Choose a Quiz --</option>
//             <option value="Splunk 1 Quiz">Splunk Quiz 1</option>
//             <option value="Splunk 2 Quiz">Splunk Quiz 2</option>
//             <option value="splunk3">Splunk Quiz 3</option>
//           </select>
//         </div>

//         {/* Quiz Section */}
//         {quizData && (
//           <div className="bg-white rounded-2xl shadow-lg p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl">
//             <Quiz data={quizData} />
//           </div>
//         )}

//         {/* Assignments Section */}
//         <div className="mt-10">
//           <h3 className="text-2xl font-bold text-gray-800 mb-6">
//             📝 Recent Assignments
//           </h3>

//           <ul className="space-y-6">
//             {assignments.map((assignment) => (
//               <li
//                 key={assignment._id}
//                 className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 p-6"
//               >
//                 <h4 className="font-semibold text-xl text-gray-800 mb-2">
//                   {assignment.name || "TO INSTRUCTOR"}
//                 </h4>
//                 <p className="text-gray-700 font-medium mb-3">
//                   {assignment.message || assignment.description}
//                 </p>

//                 {assignment.imageurl && (
//                   <img
//                     src={assignment.imageurl}
//                     alt="Assignment"
//                     className="mt-3 w-full max-h-80 object-cover rounded-lg shadow-sm"
//                   />
//                 )}

//                 <p className="text-sm text-gray-500 mt-4">
//                   📅 {new Date(assignment.date).toLocaleString()}
//                 </p>
//               </li>
//             ))}
//           </ul>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ClassM;

// // export default ClassM;

// // import { useEffect, useState } from "react";

// // const ClassM = () => {
// //   const [files, setFiles] = useState([]);
// //   const [loading, setLoading] = useState(true);

// //   useEffect(() => {
// //     fetch("https://to-backendapi-v1.vercel.app/api/files") // 🔹 Your backend API
// //       .then((res) => res.json())
// //       .then((data) => {
// //         setFiles(data);
// //         setLoading(false);
// //       })
// //       .catch((err) => {
// //         console.error("Error fetching files:", err);
// //         setLoading(false);
// //       });
// //   }, []);

// //   if (loading) {
// //     return <p className="p-6 text-center">Loading files...</p>;
// //   }

// //   return (
// //     <>
// //       <div className="p-6">
// //         <h2 className="text-xl font-bold mb-4">Available Files</h2>

// //         {files.length === 0 ? (
// //           <p>No files uploaded yet.</p>
// //         ) : (
// //           <ul className="space-y-4">
// //             {files.map((file) => (
// //               <li key={file._id} className="border p-4 rounded-lg shadow">
// //                 <h3 className="font-semibold">{file.title}</h3>

// //                 {/* View PDF directly */}
// //                 {file.fileType === "pdf" && (
// //                   <iframe
// //                     src={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
// //                     width="100%"
// //                     height="400"
// //                     title={file.title}
// //                   ></iframe>
// //                 )}

// //                 {/* View PPT via Google Docs Viewer */}
// //                 {file.fileType === "ppt" || file.fileType === "pptx" ? (
// //                   <iframe
// //                     src={`https://docs.google.com/viewer?url=https://to-backendapi-v1.vercel.app${file.fileUrl}&embedded=true`}
// //                     width="100%"
// //                     height="400"
// //                     title={file.title}
// //                   ></iframe>
// //                 ) : null}

// //                 {/* Download Link */}
// //                 <a
// //                   href={`https://to-backendapi-v1.vercel.app${file.fileUrl}`}
// //                   target="_blank"
// //                   rel="noopener noreferrer"
// //                   className="text-blue-600 hover:underline block mt-2"
// //                 >
// //                 Please Download your Material
// //                 </a>
// //               </li>
// //             ))}
// //           </ul>
// //         )}
// //       </div>
// //     </>
// //   );
// // };
