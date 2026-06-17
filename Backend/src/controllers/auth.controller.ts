import { Request, Response } from "express";
import {register,login,getCurrentUserService} from "../services/auth.service";

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