import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";
import Loader from "../shared/Loader";
import Container from "../layout/Container";
import AuthInput from "../shared/AuthInput";
import signupVideo from "../assets/signup-vid.mp4";
import { Eye, EyeOff } from "lucide-react";
import Error from "../shared/Error";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //============= useNavigate =============//
  const navigate = useNavigate();

  //============= useAuthStore =============//
  const { login, errorState, loadingState } = useAuthStore();

  //============= handleSignupSubmit =============//
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await login(email, password);
      navigate("/");
      toast.success("Logged in successfully!");
    } catch (error) {
      console.error("There was an error while login.");
      throw error;
    }
  };

  return (
    <section aria-label="Login Section">
      {/*============= Loading State =============*/}
      {loadingState && <Loader />}

      {/*============= Login =============*/}
      <div className="flex flex-col sm:flex-row overflow-hidden">
        {/*============= Login Form =============*/}
        <div className="flex flex-col gap-3 sm:min-w-[350px]">
          <Container className="pt-5 sm:px-8">
            <Logo className="block w-max bg-primary-dark px-3 py-2 rounded-xs text-4xl place-self-center mb-5" />

            <h2 className="text-3xl">Welcome back!</h2>

            <div className="flex flex-col py-2 font-secondary">
              <h3 className="flex items-center gap-2 text-xl pt-1">
                Don't have an account?
              </h3>

              <Link to={"/signup"} className="w-max">
                <span className="font-bold text-xl text-primary-dark">
                  Create a new account now
                </span>
              </Link>
            </div>

            {/*============= Form =============*/}
            <form
              className="flex flex-col gap-2 py-5 min-w-[350px"
              onSubmit={handleLoginSubmit}
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

              {/*============= Password Field =============*/}
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

              {/*============= Error State =============*/}
              <Error errorState={errorState} />

              {/*============= Forgot Password? =============*/}
              <Link
                to={"/forgot-password"}
                className="text-primary-dark text-sm font-semibold hover:underline"
              >
                I forgot my password
              </Link>

              {/*============= Submit Button =============*/}
              <button
                className={`inline-flex py-3.5 px-1 font-secondary justify-center text-lg text-primary-light bg-primary-dark rounded-md mt-2 duration-200 ${
                  !email || !password
                    ? "bg-primary-dark/60"
                    : "hover:bg-primary-dark/90 cursor-pointer"
                }`}
                type="submit"
                disabled={!email || !password}
                onKeyDown={(e) => e.key === "Enter" && handleLoginSubmit}
              >
                Login
              </button>
            </form>
          </Container>
        </div>

        {/*============= Side Book Video =============*/}
        <video
          src={signupVideo}
          autoPlay
          loop
          muted
          className="hidden sm:flex sm:flex-1 w-full h-screen object-cover"
        ></video>
      </div>
    </section>
  );
}
