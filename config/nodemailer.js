import nodemailer from "nodemailer";
import { EMAIL_PASSWORD } from "./env.js";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ifechinwokedi@gmail.com",
    pass: EMAIL_PASSWORD
  }
});