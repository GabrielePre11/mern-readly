export const VERIFICATION_EMAIL_TEMPLATE = (token: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Readly - Verify Your Email</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color:#f6f6f6; font-family:Arial, sans-serif; padding:20px;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#fff; padding:20px; border-radius:8px;">
      <tr>
        <td align="center" style="background-color:#4A90E2; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:#fff; margin:0;">Readly</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px 20px;">
          <h2 style="color:#333;">Conferma il tuo indirizzo email</h2>
          <p style="color:#555;">Grazie per esserti registrato su <strong>Readly</strong>! Per completare la registrazione, inserisci il codice di verifica qui sotto:</p>
          <div style="text-align:center; margin:30px 0;">
            <p style="font-size:14px; color:#333; margin-bottom:10px;">Codice di verifica</p>
            <p style="font-size:32px; font-weight:bold; color:#4A90E2; margin:0;">${token}</p>
            <p style="font-size:12px; color:#777;">(Valido per 24 ore)</p>
          </div>
          <p style="color:#777;">Se non hai richiesto questa email, puoi ignorarla in sicurezza.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:20px; font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} Readly. Tutti i diritti riservati.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const WELCOME_EMAIL_TEMPLATE = (username: string) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <title>Readly - Benvenuto!</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color:#f6f6f6; font-family:Arial, sans-serif; padding:20px;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#fff; padding:20px; border-radius:8px;">
      <tr>
        <td align="center" style="background-color:#4A90E2; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:#fff; margin:0;">Readly</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px 20px;">
          <h2 style="color:#333;">Benvenuto, ${username}!</h2>
          <p style="color:#555;">
            Il tuo account è stato verificato con successo. Siamo entusiasti di averti a bordo di <strong>Readly</strong>!
          </p>
          <p style="color:#555;">
            Inizia subito a esplorare, leggere e condividere. Se hai domande o hai bisogno di supporto, siamo qui per aiutarti.
          </p>
          <div style="text-align:center; margin:30px 0;">
            <a href="https://readly-app.example.com" style="background-color:#4A90E2; color:#fff; padding:12px 20px; text-decoration:none; border-radius:4px; font-weight:bold;">
              Vai all'app
            </a>
          </div>
          <p style="color:#777;">Grazie per aver scelto Readly.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:20px; font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} Readly. Tutti i diritti riservati.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const PASSWORD_RESET_EMAIL_TEMPLATE = (resetUrl: string) => `
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Readly - Reset Password</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color:#f6f6f6; font-family:Arial, sans-serif; padding:20px;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#fff; padding:20px; border-radius:8px;">
      <tr>
        <td align="center" style="background-color:#4A90E2; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:#fff; margin:0;">Readly</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px 20px; color:#333;">
          <h2>Reimposta la tua password</h2>
          <p>Abbiamo ricevuto una richiesta di reset della password per il tuo account.</p>
          <p>Clicca sul bottone qui sotto per scegliere una nuova password:</p>
          <div style="text-align:center; margin:30px 0;">
            <a href="${resetUrl}" target="_blank" style="background-color:#4A90E2; color:#fff; text-decoration:none; padding:15px 25px; border-radius:5px; font-weight:bold; display:inline-block;">
              Reimposta la password
            </a>
          </div>
          <p>Se non hai richiesto questa email, puoi ignorarla tranquillamente.</p>
          <p style="font-size:12px; color:#777;">Il link sarà valido per 1 ora.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:20px; font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} Readly. Tutti i diritti riservati.
        </td>
      </tr>
    </table>
  </body>
</html>
`;

export const PASSWORD_RESET_SUCCESS_TEMPLATE = () => `
<!DOCTYPE html>
<html lang="it">
  <head>
    <meta charset="UTF-8" />
    <title>Readly - Password aggiornata</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </head>
  <body style="background-color:#f6f6f6; font-family:Arial, sans-serif; padding:20px;">
    <table align="center" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px; background-color:#fff; padding:20px; border-radius:8px;">
      <tr>
        <td align="center" style="background-color:#4A90E2; padding:20px; border-radius:8px 8px 0 0;">
          <h1 style="color:#fff; margin:0;">Readly</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:30px 20px; color:#333;">
          <h2>Password aggiornata correttamente</h2>
          <p>La tua password è stata modificata con successo.</p>
          <p>Se non sei stato tu a effettuare questa operazione, ti consigliamo di <strong>cambiare immediatamente la password</strong> e contattarci.</p>
        </td>
      </tr>
      <tr>
        <td align="center" style="padding:20px; font-size:12px; color:#aaa;">
          © ${new Date().getFullYear()} Readly. Tutti i diritti riservati.
        </td>
      </tr>
    </table>
  </body>
</html>
`;
