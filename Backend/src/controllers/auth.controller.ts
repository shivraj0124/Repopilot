import { Request, Response } from "express";
import {register,login,getCurrentUserService} from "../services/auth.service";
import prisma from "../config/prisma";

import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../services/email.service";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const user = await register(req.body);

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const result = await login(req.body);
    console.log(result);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCurrentUser = async (
  req: any,
  res: Response
) => {
  try {
    const user =
      await getCurrentUserService(
        req.user.userId
      );
      console.log("Current user fetched:", user);

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error: any) {
    res.status(401).json({
      success: false,
      message:
        error.message ||
        "Failed to fetch user",
    });
  }
};

export const sendOtpController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { email } = req.body;
      console.log("Sending OTP to email:", email);
      const otp =
        generateOtp();

      await prisma.otp.create({
        data: {
          email,
          otp,
          expiresAt: new Date(
            Date.now() +
              10 * 60 * 1000
          ),
        },
      });

      await sendOtpEmail(
        email,
        otp
      );

      res.status(200).json({
        success: true,
        message:
          "OTP sent successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

export const verifyOtpController =
  async (
    req: Request,
    res: Response
  ) => {
    try {
      const { email, otp } =
        req.body;

      const record =
        await prisma.otp.findFirst({
          where: {
            email,
            otp,
          },
          orderBy: {
            createdAt:
              "desc",
          },
        });

      if (!record) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "Invalid OTP",
          });
      }

      if (
        record.expiresAt <
        new Date()
      ) {
        return res
          .status(400)
          .json({
            success: false,
            message:
              "OTP expired",
          });
      }

      res.status(200).json({
        success: true,
        message:
          "OTP verified successfully",
      });
    } catch (error: any) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };