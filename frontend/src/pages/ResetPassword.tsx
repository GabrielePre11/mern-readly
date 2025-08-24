import { useNavigate, useParams } from "react-router-dom";
import Container from "../layout/Container";
import Error from "../shared/Error";
import Loader from "../shared/Loader";
import { useAuthStore } from "../store/authStore";
import AuthInput from "../shared/AuthInput";
import { useState, type FormEvent } from "react";
import { Eye, EyeOff } from "lucide-react";
import toast from "react-hot-toast";

export default function ResetPassword() {
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //============= useAuthStore =============//
  const { resetPassword, errorState, loadingState, message } = useAuthStore();
  const { token } = useParams();

  //============= useNavigate =============//
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!token) return;

    try {
      await resetPassword(token, confirmPassword);
      toast.success("Password has been reset!");
      navigate("/login");
    } catch (error) {
      toast.error(errorState ?? "There was an error resetting your password.");
    }
  };

  return (
    <section aria-label="Reset Password">
      <Container className="grid place-items-center min-h-screen min-h-dvh">
        {/*============= Loading State =============*/}
        {loadingState && <Loader />}

        {/*============= Reset Password Form =============*/}
        <article className="flex flex-col items-center gap-2 bg-bg p-3 sm:p-10 border border-primary-dark rounded-lg">
          {/*============= Readly Logo =============*/}
          <img
            src="/readly_logo.png"
            alt="Readly logo"
            className="w-36 sm:w-40"
          />

          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            {/*============= Current Password Field =============*/}
            <AuthInput
              type={showPassword ? "text" : "password"}
              required
              labelName="Password"
              inputId="passwordField"
              inputMode="text"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              icon={showPassword ? <Eye /> : <EyeOff />}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
            ></AuthInput>

            {/*============= New Password Field =============*/}
            <AuthInput
              type={showPassword ? "text" : "password"}
              required
              labelName="Confirm New Password"
              inputId="confirmPasswordField"
              inputMode="text"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              icon={showPassword ? <Eye /> : <EyeOff />}
              showPassword={showPassword}
              setShowPassword={setShowPassword}
              disabled={!password}
              className={"disabled:brightness-90"}
            ></AuthInput>

            {/*============= Error State =============*/}
            <Error errorState={errorState} className="pt-2" />

            {/*============= Success Message =============*/}
            {message && (
              <p className="block text-sm text-success font-semibold">
                {message}
              </p>
            )}

            {/*============= Submit Button =============*/}
            <button
              className={`inline-flex py-2.5 px-1 w-full font-secondary justify-center text-lg text-primary-light bg-primary-dark rounded-md duration-200 ${
                password !== confirmPassword
                  ? "bg-primary-dark/60"
                  : "hover:bg-primary-dark/90 cursor-pointer"
              }`}
              type="submit"
              disabled={password !== confirmPassword}
            >
              Update Password
            </button>
          </form>
        </article>
      </Container>
    </section>
  );
}
