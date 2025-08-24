import { Resend } from "resend";
import dotenv from "dotenv";
import { WELCOME_EMAIL_TEMPLATE } from "./emailTemplate";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API is not defined in environment variables");
}

export const sendWelcomeEmail = async (userEmail: string, userName: string) => {
  const { data, error } = await resend.emails.send({
    from: "Readly <onboarding@resend.dev>",
    to: [userEmail],
    subject: "Benvenuto in Readly!",
    html: WELCOME_EMAIL_TEMPLATE(userName),
  });

  if (error) {
    console.error("Errore nell'invio dell'email:", error);
    throw new Error("Impossibile inviare l'email di benvenuto.");
  }

  console.log("Email di benvenuto inviata con successo:", data);
};
