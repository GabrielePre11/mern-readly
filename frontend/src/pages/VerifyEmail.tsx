import { useRef, useState } from "react";
import Container from "../layout/Container";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loader from "../shared/Loader";
import Error from "../shared/Error";
import toast from "react-hot-toast";

export default function VerifyEmail() {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const inputRef = useRef<(HTMLInputElement | null)[]>([]);

  //============= useNavigate =============//
  const navigate = useNavigate();

  //============= useAuthStore =============//
  const { verifyEmail, errorState, loadingState } = useAuthStore();

  const handleChange = (index: number, value: string) => {
    //============= Create a copy of the current code array=============//
    const newCode = [...code];

    if (value.length > 1) {
      //============= Handle the Pasted Code (Copy & Paste) =============//
      const pastedCode = value.slice(0, 6).split("");
      for (let i = 0; i < 6; i++) {
        newCode[i] = pastedCode[i] || "";
      }
      setCode(newCode);

      //============= Move focus to the last input field =============//
      inputRef.current[5]?.focus();
    } else {
      //========= Update the single digit at the current input index =========//
      newCode[index] = value;
      setCode(newCode);

      //===== If a value was typed and it's not the last field, move focus to the next one =====//
      if (value && index < 5) {
        inputRef.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === "Backspace" && code[index] === "") {
      if (index > 0) {
        inputRef.current[index - 1]?.focus();
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const fullCode = code.join("");
    if (fullCode.length === 6) {
      try {
        await verifyEmail(fullCode);
        navigate("/dashboard");
        toast.success("Email verified successfully!");
      } catch (error) {
        console.error("There was an error verifying the email.");
        throw error;
      }
    }
  };

  return (
    <section aria-label="Verify Email">
      <Container className="grid place-items-center min-h-screen min-h-dvh">
        {/*============= Loading State =============*/}
        {loadingState && <Loader />}

        {/*============= Verify Email Form =============*/}
        <article className="flex flex-col items-center gap-2 bg-bg p-3 sm:p-10 border border-primary-dark rounded-lg">
          {/*============= Readly Logo =============*/}
          <img
            src="/readly_logo.png"
            alt="Readly logo"
            className="w-36 sm:w-40"
          />

          {/*============= Alert =============*/}
          <p className="text-sm sm:text-lg font-semibold sm:font-medium text-center py-2">
            We've sent a code to your email.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="flex items-center space-x-1 sm:space-x-1.5">
              {code.map((digit, index) => (
                <input
                  key={index}
                  type="text"
                  value={digit}
                  pattern="[0-9]{1}"
                  inputMode="numeric"
                  ref={(el) => {
                    inputRef.current[index] = el;
                  }}
                  maxLength={1}
                  onChange={(e) => {
                    const val = e.target.value;

                    //============= Code Regex =============//
                    if (/^\d$/.test(val) || val === "") {
                      handleChange(index, val);
                    }
                  }}
                  onKeyDown={(e) => handleKeyDown(e, index)}
                  className="size-10 sm:size-12 text-center border-2 border-primary rounded-md text-lg outline-0 transition-all duration-100 focus:ring-2 focus:ring-primary-dark"
                />
              ))}
            </div>

            {/*============= Error State =============*/}
            <Error errorState={errorState} className="pt-2" />

            {/*============= Submit Button =============*/}
            <button
              className={`inline-flex py-2.5 px-1 w-full font-secondary justify-center text-lg text-primary-light bg-primary-dark rounded-md mt-5 duration-200 ${
                code.some((digit) => digit === "")
                  ? "bg-primary-dark/60"
                  : "hover:bg-primary-dark/90 cursor-pointer"
              }`}
              type="submit"
              disabled={code.some((digit) => digit === "")}
            >
              Verify Email
            </button>
          </form>
        </article>
      </Container>
    </section>
  );
}
