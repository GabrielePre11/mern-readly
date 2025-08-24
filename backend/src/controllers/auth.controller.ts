import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcryptjs from "bcryptjs";
import crypto from "crypto";
import { generateTokenAndSetCookie } from "../utils/generateTokenAndSetCookie";
import { sendVerificationEmail } from "../utils/sendVerificationEmail";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail";
import { sendPasswordResetEmail } from "../utils/sendPasswordResetEmail";
import { sendPasswordResetSuccessEmail } from "../utils/sendPasswordResetSuccessEmail";

//===================== signUpBody Type =====================//
type signUpBody = {
  email: string;
  name: string;
  password: string;
};

//===================== AuthenticatedRequest Interface =====================//
interface AuthenticatedRequest extends Request {
  userId?: string;
}

//===================== Sign Up =====================//
export const signupFunction = async (
  req: Request<{}, {}, signUpBody>,
  res: Response
) => {
  const { email, name, password } = req.body;

  try {
    //========= Check all the fields =========//
    if (!email || !name || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide all the required fields!",
      });
    }

    //========= Check if a user with this email already exists =========//
    const userAlreadyExists = await User.findOne({ email });

    if (userAlreadyExists) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists!" });
    }

    //========= Create the hashed password with bcryptjs =========//
    const hashedPassword = await bcryptjs.hash(password, 10);

    //=== Create the verification token (to verify the user's email) ===//
    const verificationToken = Math.floor(
      100000 + Math.random() * 900000
    ).toString();

    //========= Create the user =========//
    const user = new User({
      name,
      email,
      password: hashedPassword,
      verificationToken,
      verificationTokenExpiresAt: Date.now() + 24 * 60 * 60 * 1000, // The token expire in 24 hours
    });

    //========= Save the user in the database =========//
    await user.save();

    //========= JWT Token Generation and Cookies =========//
    generateTokenAndSetCookie(res, user._id, user.role ?? "user");

    //========= Verification Email with Token (powered by Resend) =========//
    await sendVerificationEmail(user.email, verificationToken);

    // ⚠️ As any because TypeScript didn't allow me to deselect the password normally and I need to send the user without password.
    const userToSendWithResponse = user.toObject() as any;
    delete userToSendWithResponse.password;

    res.status(201).json({
      success: true,
      message: "User created successfully!",
      user: userToSendWithResponse,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during signup:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//===================== Verify User's Email =====================//
export const verifyEmail = async (
  req: Request<{}, {}, { code: string }>,
  res: Response
) => {
  const { code } = req.body;

  //========= Check if the code is available =========//
  if (!code) {
    return res.status(400).json({
      success: false,
      message: "Please provide the verification code.",
    });
  }

  try {
    //========= Check the user's code and if it's expired ("$gt") =========//
    const user = await User.findOne({
      verificationToken: code,
      verificationTokenExpiresAt: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid user or verification code expired.",
      });
    }

    //========= ✅ If the code is valid, the user's now verified. =========//
    user.isVerified = true;
    user.verificationToken = undefined;
    user.verificationTokenExpiresAt = undefined;

    await user.save();

    //========= Welcome Email =========//
    await sendWelcomeEmail(user.email, user.name);

    const userToSendWithResponse = user.toObject() as any;
    delete userToSendWithResponse.password;

    res.status(200).json({
      success: true,
      message: "Email verified successfully!",
      user: userToSendWithResponse,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during email verification:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//===================== Forgot Password =====================//
export const forgotPassword = async (
  req: Request<{}, {}, { email: string }>,
  res: Response
) => {
  const { email } = req.body;

  //========= Check if the email is available =========//
  if (!email) {
    return res.status(400).json({
      success: false,
      message: "Please provide an email.",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    //========= Generate the reset password token with Crypto =========//
    const resetPasswordToken = crypto.randomBytes(20).toString("hex");

    user.resetPasswordToken = resetPasswordToken;
    user.resetPasswordTokenExpiresAt = new Date(
      Date.now() + 1 * 60 * 60 * 1000
    ); // The reset password token will expire in 1 hour.

    await user.save();

    //========= Send the password reset email (the user can click on the link to reset the password) =========//
    await sendPasswordResetEmail(
      user.email,
      `${process.env.CLIENT_URI}/reset-password/${resetPasswordToken}`
    );

    res.status(200).json({
      success: true,
      message: "The password reset link has been sent to your email!",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during password reset:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//===================== Reset the Password =====================//
export const resetPassword = async (
  req: Request<{ token: string }, {}, { password: string }>,
  res: Response
) => {
  const { token } = req.params;
  const { password } = req.body;

  //========= Check if the password is available =========//
  if (!password) {
    return res.status(400).json({
      success: false,
      message: "Please provide a new password.",
    });
  }

  try {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordTokenExpiresAt: { $gt: Date.now() }, // Check if the token is still valid.
    });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset password token.",
      });
    }

    //========= Create the hashed password with bcryptjs =========//
    const hashedPassword = await bcryptjs.hash(password, 10);
    user.password = hashedPassword;

    //========= Reset the resetPasswordToken & resetPasswordTokenExpiresAt fields (they aren't needed anymore) =========//
    user.resetPasswordToken = undefined;
    user.resetPasswordTokenExpiresAt = undefined;

    await user.save();

    //========= Send a confirmation email to the user =========//
    await sendPasswordResetSuccessEmail(user.email);

    res.status(200).json({
      success: true,
      message: "Password has been reset successfully.",
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during password reset:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//===================== Login =====================//
export const loginFunction = async (
  req: Request<{}, {}, { email: string; password: string }>,
  res: Response
) => {
  const { email, password } = req.body;

  //========= Check all the fields =========//
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please provide all the required fields!",
    });
  }

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials." });
    }

    generateTokenAndSetCookie(res, user._id, user.role ?? "user");
    user.lastLogin = new Date();

    await user.save();

    const userToSendWithResponse = user.toObject() as any;
    delete userToSendWithResponse.password;

    res.status(200).json({
      success: true,
      message: "Logged in successfully!",
      user: userToSendWithResponse,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error during login:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }
};

//===================== Logout =====================//
export const logoutFunction = async (req: Request, res: Response) => {
  res.clearCookie("token");
  res.status(200).json({ success: true, message: "Logget out successfully" });
};

//===================== Check Auth =====================//
export const checkAuth = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findById(req.userId).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in checkAuth function:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

//===================== totalUsers =====================//
export const totalUsers = async (req: Request, res: Response) => {
  try {
    const users = await User.find().select("-password");

    if (!users) {
      return res.status(404).json({
        success: false,
        message: "Users not found.",
      });
    }

    res.status(200).json({
      success: true,
      totalUsers: users.length,
      users,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in totalUsers function:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};

//===================== Count Admins =====================//
export const totalAdmins = async (req: Request, res: Response) => {
  try {
    const admins = await User.find({ role: "admin" }).select("-password");

    if (!admins) {
      return res.status(404).json({
        success: false,
        message: "Admins not found.",
      });
    }

    res.status(200).json({
      success: true,
      totalAdmins: admins.length,
      admins,
    });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error in totalAdmins function:", error);
      return res.status(400).json({ success: false, message: error.message });
    }
  }
};
