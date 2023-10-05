import type { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import {
  isUserEmailTaken,
  validateGenerateOtpInput,
} from "../../../lib/userLib";
import { responseFormatter } from "@/lib/responseLib";
import { createOtp, sendOtpEmail } from "@/lib/otpLib";
import { dbConnectWrapper } from "@/lib/dbConnectWrapper";

export async function createOtpHandler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "POST":
      try {
        // check that request contains an email property
        const validationResult = validateGenerateOtpInput(req.body);

        if (!validationResult.success) {
          return res
            .status(400)
            .json(responseFormatter(false, null, validationResult.message));
        }
        const { email } = req.body;
        if (await isUserEmailTaken(email)) {
          return res
            .status(400)
            .json(
              responseFormatter(false, null, "A user already used this email")
            );
        }

        const otp = await createOtp(email);
        // const emailResult = await sendOtpEmail(user.email);

        return res.status(201).json(responseFormatter(true, { id: otp._id }));
      } catch (error) {
        console.error("Error during sign-up:", error);
        return res
          .status(500)

          .json(
            responseFormatter(
              false,
              null,
              "Unable to create an account in the database"
            )
          );
      }
    default:
      return res
        .status(405)
        .json(responseFormatter(false, null, "Method Not Allowed"));
  }
}

export default dbConnectWrapper(createOtpHandler);