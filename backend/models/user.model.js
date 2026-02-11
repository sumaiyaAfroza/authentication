import mongoose from "mongoose";
import bcrypt from 'bcryptjs'

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    minLength: 6
  }
}, {
  timestamps: true,
  versionKey: false
})

// ✅ Mongoose 6+ compatible pre-save middleware
userSchema.pre('save', async function (next) {
  // শুধুমাত্র password পরিবর্তন হলে hash করব
  if (!this.isModified('password')) {
    return  // ❌ next() না, শুধু return
  }

  try {
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
    // ✅ next() call করার দরকার নেই
  } catch (error) {
    // Error handle করুন
    console.error('Error hashing password:', error)
    throw error
  }
})

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password)
}

export const User = mongoose.model("User", userSchema)