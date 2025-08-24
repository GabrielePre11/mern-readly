import { Resend } from "resend";
import dotenv from "dotenv";
import { PASSWORD_RESET_EMAIL_TEMPLATE } from "./emailTemplate";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API is not defined in environment variables");
}

export const sendPasswordResetEmail = async (
  userEmail: string,
  resetPasswordToken: string
) => {
  const { data, error } = await resend.emails.send({
    from: "Readly <onboarding@resend.dev>",
    to: [userEmail],
    subject: "Resetta la tua password",
    html: PASSWORD_RESET_EMAIL_TEMPLATE(resetPasswordToken),
  });

  if (error) {
    console.error("Errore nell'invio dell'email:", error);
    throw new Error("Impossibile inviare l'email per resettare la password.");
  }

  console.log("Email inviata con successo:", data);
};
