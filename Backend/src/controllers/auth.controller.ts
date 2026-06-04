import { Request, Response } from "express";
import {
  register,
  login,
  getCurrentUser,
} from "../services/auth.service";

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

export const getMe = async (req: any, res: Response) => {
  const user = await getCurrentUser(req.user.userId);

  res.json({
    success: true,
    user,
  });
};