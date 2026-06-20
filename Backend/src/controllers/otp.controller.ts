import { Request, Response } from "express";
import prisma from "../config/prisma";

import { generateOtp } from "../utils/otp";
import { sendOtpEmail } from "../services/email.service";

