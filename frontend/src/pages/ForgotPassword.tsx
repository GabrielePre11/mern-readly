import Container from "../layout/Container";
import Loader from "../shared/Loader";
import { useAuthStore } from "../store/authStore";
import AuthInput from "../shared/AuthInput";
import { useState, type FormEvent } from "react";
import Error from "../shared/Error";
import { ArrowLeft, Send } from "lucide-react";
import { Link } from "react-router-dom";

export default function ForgotPassword() {
  const [email, setEmail] = useState<string>("");
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  //============= useAuthStore =============//
  const { forgotPassword, errorState, loadingState, message } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await forgotPassword(email);
    setIsSubmitted(true);
  };

  return (
    <section aria-label="Forgot Password">
      <Container className="grid place-items-center min-h-screen min-h-dvh">
        {/*============= Loading State =============*/}
        {loadingState && <Loader />}

        <article
          className={`flex flex-col items-center gap-2 bg-bg border border-primary-dark rounded-lg max-w-[380px] ${
            isSubmitted ? "pt-5" : "p-3 sm:p-10"
          }`}
        >
          {/*============= Readly Logo =============*/}
          <img
            src="/readly_logo.png"
            alt="Readly logo"
            className="w-36 sm:w-40"
          />

          {/*============= Send Reset Link Form =============*/}
          {!isSubmitted && (
            <>
              {/*============= Alert =============*/}
              <p className="text-sm font-semibold sm:font-medium text-center py-2">
                Please provide your email address and we'll send you a link to
                reset your password
              </p>
              <form
                className="flex flex-col sm:min-w-[300px]"
                onSubmit={handleSubmit}
              >
                {/*============= Email Field =============*/}
                <AuthInput
                  type="email"
                  required
                  labelName="Email Address"
                  inputId="emailField"
                  inputMode="email"
                  pattern="^[^\s@]+@[^\s@]+\.[^\s@]+$"
                  title="Please insert a valid email."
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                ></AuthInput>

                {/*============= Error State =============*/}
                <Error errorState={errorState} />

                {/*============= Success Message =============*/}
                {message && (
                  <p className="block text-sm text-success font-semibold">
                    {message}
                  </p>
                )}

                {/*============= Submit Button =============*/}
                <button
                  className={`inline-flex w-full py-3.5 px-1 font-secondary justify-center text-lg text-primary-light bg-primary-dark rounded-md mt-2 duration-200 ${
                    !email
                      ? "bg-primary-dark/60"
                      : "hover:bg-primary-dark/90 cursor-pointer"
                  }`}
                  type="submit"
                  disabled={!email}
                >
                  Send link
                </button>
              </form>
            </>
          )}

          {isSubmitted && (
            <div className="flex flex-col items-center gap-2">
              {/*============= Email Icon =============*/}
              <span className="grid place-items-center p-3 bg-primary-dark rounded-full border border-primary text-bg">
                <Send className="transform transition-transform duration-200 hover:translate-x-2 hover:-translate-y-0.5" />
              </span>

              <p className="text-sm font-semibold sm:font-medium text-center py-2 px-3 text-balance">
                If an account exists for{" "}
                <em className="text-primary-dark">
                  gabryprestanoitaly@gmail.com
                </em>
                , you'll receive a password reset link in a few seconds.
              </p>

              <Link
                to={"/login"}
                className="flex left-0 bottom-0 items-center justify-center gap-1.5 bg-primary-dark text-bg w-full px-3 py-2 rounded-b-lg transition-colors duration-200 hover:bg-primary-dark/95"
              >
                <span className="grid place-items-center p-0.5 bg-bg rounded-full border border-primary text-primary-dark cursor-pointer">
                  <ArrowLeft />
                </span>
                <p>Go Back to Login</p>
              </Link>
            </div>
          )}
        </article>
      </Container>
    </section>
  );
}
