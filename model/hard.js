const mongoose = require('mongoose');
const User = require('./user'); // adjust path if needed

const deleteUsers = async () => {
  try {
    await mongoose.connect("mongodb+srv://fpasamuelmayowa51:5iX35jgh9yB9P6Im@cluster0.unk3ntp.mongodb.net/datausers");
    console.log("✅ Database connected!");

    // delete many users by multiple names
    const result = await User.deleteMany({
      name: { $in: ["Sam","Kirby Fields", "phone@gmail.com"] }
    });

    if (result.deletedCount > 0) {
      console.log(`🗑️ Deleted ${result.deletedCount} users successfully!`);
    } else {
      console.log("⚠️ No users found with those names.");
    }
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    await mongoose.connection.close();
    console.log("🔒 Connection closed.");
  }
};

deleteUsers();
