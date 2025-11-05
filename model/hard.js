const mongoose = require('mongoose');
const Assignment = require('./assingment'); // ✅ make sure the filename matches correctly

const MONGO_URI =
  'mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers';

async function deleteSplunkAssignment() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    const deleted = await Assignment.findOneAndDelete({
      message: {
        $regex:
          'Splunk Practice Assignment — Using Internal Logs Objective: Learn to search, filter, and summarize data from Splunk’s own internal index',
        $options: 'i',
      },
    });

    if (deleted) {
      console.log('🗑️ Deleted assignment successfully:');
      console.log('➡️', deleted.message.substring(0, 200) + '...');
    } else {
      console.log('⚠️ No assignment found matching that description.');
    }

    await mongoose.disconnect();
    console.log('🔌 Disconnected from MongoDB');
  } catch (err) {
    console.error('❌ Error deleting assignment:', err.message);
  }
}

deleteSplunkAssignment();


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