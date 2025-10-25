const mongoose = require('mongoose');
const User = require('./user'); // adjust path if needed
const Quiz =require('./quiz')
const MONGO_URI = "mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers";
const deleteUsers = async () => {
    try {
    // connect to MongoDB
    await mongoose.connect(MONGO_URI);
    console.log("✅ Database connected!");

    // delete all quiz results
    const res = await Quiz.QuizResult.deleteMany({});
    console.log(`✅ Deleted ${res.deletedCount} quiz results.`);

    // close connection
    await mongoose.connection.close();
    console.log("🔒 Connection closed.");
  } catch (err) {
    console.error("❌ Error deleting quiz results:", err);
  }
};

deleteUsers();
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