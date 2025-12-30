// domain.com/verify/asdsadsadsd  - this is better if it is server component
// domain.com/verifytoken?token=adadfg - this is better if it is client component

import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

type EmailPayload = {
  email: string;
  emailType: "VERIFY" | "RESET";
  userId: string | object;
};

export const sendEmail = async ({ email, emailType, userId }: EmailPayload) => {
  try {
    //create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.USER_SMTP,
        pass: process.env.PASS_SMTP,
      },
    });

    const mailOptions = {
      from: "kishore@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",
      html: `<p> Click <a href="${
        process.env.DOMAIN
      }verifymail?token=${hashedToken}">here</a> to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }
      or copy an paste the link below in your browser.
      <br>
      ${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "resetpassword"
      }?token=${hashedToken}
      </p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message || "Verify email cannot be sent");
  }
};
