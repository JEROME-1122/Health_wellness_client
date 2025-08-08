import { useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true;

function ResetPassword() {
  const navigate = useNavigate();

  // Refs for OTP inputs
  const inputRefs = useRef([]);

  // State
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isOtpSubmitted, setIsOtpSubmitted] = useState(false);

  // Handle OTP typing
  const handleInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    const paste = e.clipboardData.getData("text");
    const pasteArray = paste.split("");
    pasteArray.forEach((char, index) => {
      if (inputRefs.current[index]) {
        inputRefs.current[index].value = char;
      }
    });
  };

  // Step 1: Request OTP
  const onSubmitEmail = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://health-wellness-server.onrender.com/api/password/request", { email });
      alert(data.message);
      if (data.success) {
        setIsEmailSent(true);
      }
    } catch (error) {
      alert(error.message);
    }
  };

  // Step 2: Submit OTP
  const onSubmitOtp = (e) => {
    e.preventDefault();
    const otpArray = inputRefs.current.map((input) => input.value.trim());
    setOtp(otpArray.join(""));
    setIsOtpSubmitted(true);
  };

  // Step 3: Submit New Password
  const onSubmitNewPassword = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("https://health-wellness-server.onrender.com/api/password/reset", {
        email,
        otp,
        newPassword,
      });
      alert(data.message);
      if (data.success) {
        navigate("/login");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-6 bg-gray-100">
      
      {/* Step 1: Enter Email */}
      {!isEmailSent && (
        <form onSubmit={onSubmitEmail} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Reset Password</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full border px-3 py-2 mb-4"
            required
          />
          <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
            Send OTP
          </button>
        </form>
      )}

      {/* Step 2: Enter OTP */}
      {isEmailSent && !isOtpSubmitted && (
        <form onSubmit={onSubmitOtp} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
          <div className="flex justify-between mb-4" onPaste={handlePaste}>
            {Array(6)
              .fill(0)
              .map((_, index) => (
                <input
                  key={index}
                  type="text"
                  maxLength="1"
                  ref={(el) => (inputRefs.current[index] = el)}
                  onInput={(e) => handleInput(e, index)}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="w-12 h-12 text-center border rounded"
                  required
                />
              ))}
          </div>
          <button type="submit" className="w-full bg-green-500 text-white py-2 rounded">
            Verify OTP
          </button>
        </form>
      )}

      {/* Step 3: Enter New Password */}
      {isOtpSubmitted && (
        <form onSubmit={onSubmitNewPassword} className="bg-white p-6 rounded-lg shadow-md w-96">
          <h2 className="text-xl font-semibold mb-4">New Password</h2>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            className="w-full border px-3 py-2 mb-4"
            required
          />
          <button type="submit" className="w-full bg-purple-500 text-white py-2 rounded">
            Reset Password
          </button>
        </form>
      )}
    </div>
  );
}

export default ResetPassword;
