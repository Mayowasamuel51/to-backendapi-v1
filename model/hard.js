const mongoose = require('mongoose');
const Assignment = require('./assingment'); // ✅ make sure file name matches exactly

const MONGO_URI =
  'mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers';

async function deleteByDate() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // 🗓️ Example: delete all assignments created before November 6, 2025
    const targetDate = new Date('2025-11-06'); // adjust to your exact date

    const deleted = await Assignment.deleteMany({
      date: { $lte: targetDate },
    });

    if (deleted.deletedCount > 0) {
      console.log(`🗑️ Deleted ${deleted.deletedCount} assignment(s) successfully.`);
    } else {
      console.log('⚠️ No assignments found matching that date.');
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error deleting assignment:', err.message);
  }
}

deleteByDate();

// const mongoose = require('mongoose');
// const Assignment = require('./assingment'); // ✅ check that the filename is EXACTLY 'assignment.js'

// const MONGO_URI =
//   'mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers';

// async function deleteSplunkAssignment() {
//   try {
//     await mongoose.connect(MONGO_URI);
//     console.log('✅ Connected to MongoDB');

//     // Delete by title (most reliable)
//     const deleted = await Assignment.findOneAndDelete({
//       title: { $regex: 'T.O Analytics – Splunk Class 3 Practical Assignment', $options: 'i' },
//     });

//     if (deleted) {
//       console.log('🗑️ Deleted assignment successfully:');
//       console.log('➡️', deleted.title);
//     } else {
//       console.log('⚠️ No assignment found matching that title.');
//     }

//     await mongoose.disconnect();
//     console.log('🔌 Disconnected from MongoDB');
//   } catch (err) {
//     console.error('❌ Error deleting assignment:', err.message);
//   }
// }

// deleteSplunkAssignment();



// const deleteUsers = async () => {
//     try {
//     // connect to MongoDB
//     await mongoose.connect(MONGO_URI);
//     console.log("✅ Database connected!");

//     // delete all quiz results
//     const res = await Quiz.QuizResult.deleteMany({});
//     console.log(`✅ Deleted ${res.deletedCount} quiz results.`);

//     // close connection
//     await mongoose.connection.close();
//     console.log("🔒 Connection closed.");
//   } catch (err) {
//     console.error("❌ Error deleting quiz results:", err);
//   }
// };

// deleteUsers();
    // delete many users by multiple names
  //   const result = await User.deleteMany({
  //     name: { $in: ["Mayowa samuel"] }
  //   });

  //   if (result.deletedCount > 0) {
  //     console.log(`🗑️ Deleted ${result.deletedCount} users successfully!`);
  //   } else {
  //     console.log("⚠️ No users found with those names.");
  //   }
  // } catch (err) {
  //   console.error("❌ Error:", err.message);
  // } finally {
  //   await mongoose.connection.close();
  //   console.log("🔒 Connection closed.");
  // }