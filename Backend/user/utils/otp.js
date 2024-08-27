// utils/otp.js

// utils/otp.js

exports.generateUserId = () => {
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const digits = "0123456789";
  let userId = "";

  for (let i = 0; i < 3; i++) {
    userId += letters.charAt(Math.floor(Math.random() * letters.length));
  }
  for (let i = 0; i < 2; i++) {
    userId += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return userId;
};

// Helper function to generate a 6-digit password
exports.generatePassword = () => {
  const digits = "0123456789";
  let password = "";

  for (let i = 0; i < 6; i++) {
    password += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return password;
};
// Helper function to generate a 5-digit OTP
exports.generateOtp = () => {
  const digits = "0123456789";
  let otp = "";

  for (let i = 0; i < 5; i++) {
    otp += digits.charAt(Math.floor(Math.random() * digits.length));
  }

  return otp;
};
