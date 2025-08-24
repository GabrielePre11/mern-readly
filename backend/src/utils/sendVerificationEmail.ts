import { Resend } from "resend";
import dotenv from "dotenv";
import { VERIFICATION_EMAIL_TEMPLATE } from "./emailTemplate";

dotenv.config();

const resend = new Resend(process.env.RESEND_API);

if (!process.env.RESEND_API) {
  throw new Error("RESEND_API is not defined in environment variables");
}

export const sendVerificationEmail = async (
  userEmail: string,
  verificationToken: string
) => {
  const { data, error } = await resend.emails.send({
    from: "Readly <onboarding@resend.dev>",
    to: [userEmail],
    subject: "Verifica il tuo indirizzo email",
    html: VERIFICATION_EMAIL_TEMPLATE(verificationToken),
  });

  if (error) {
    console.error("Errore nell'invio dell'email:", error);
    throw new Error("Impossibile inviare l'email di verifica.");
  }

  console.log("Email inviata con successo:", data);
};
