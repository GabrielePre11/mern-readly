import { Link, useNavigate } from "react-router-dom";
import Container from "../layout/Container";
import { useState } from "react";
import signupVideo from "../assets/signup-vid.mp4";
import { Eye, EyeOff } from "lucide-react";

import { useAuthStore } from "../store/authStore";
import validatePassword from "../shared/validatePassword";
import Loader from "../shared/Loader";
import AuthInput from "../shared/AuthInput";
import Error from "../shared/Error";
import toast from "react-hot-toast";
import Logo from "../components/Logo";

export default function SignUp() {
  const [email, setEmail] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  //============= useNavigate =============//
  const navigate = useNavigate();

  //============= useAuthStore =============//
  const { signup, errorState, loadingState } = useAuthStore();

  //============= Password Regex =============//
  const isValidPassword = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/.test(
    password
  );

  //============= handleSignupSubmit =============//
  const handleSignupSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await signup({ email, name, password });
      navigate("/verify-email");
      toast.success("You're all set!");
    } catch (error) {
      console.error("There was an error creating the user.");
      throw error;
    }
  };

  return (
    <section aria-label="Signup Section">
      {/*============= Loading State =============*/}
      {loadingState && <Loader />}

      {/*============= Sign Up =============*/}
      <div className="flex flex-col sm:flex-row overflow-hidden">
        {/*============= Create your account =============*/}
        <div className="flex flex-col gap-3 sm:min-w-[350px] h-screen overflow-y-auto">
          <Container className="pt-5 sm:px-8">
            <Logo className="block w-max bg-primary-dark px-3 py-2 rounded-xs text-4xl place-self-center mb-5" />

            <h2 className="text-3xl">Create your account</h2>

            <h3 className="flex items-center gap-2 text-xl pt-1 truncate">
              Have an account?
              <Link to={"/login"}>
                <span className="font-bold text-primary-dark">Log in now</span>
              </Link>
            </h3>

            {/*============= Form =============*/}
            <form
              className="flex flex-col gap-2 py-5"
              onSubmit={handleSignupSubmit}
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

              {/*============= Name Field =============*/}
              <AuthInput
                type="text"
                required
                labelName="Name"
                inputId="nameField"
                inputMode="text"
                pattern="^[A-Za-z]{2,}$"
                title="Please insert a valid name."
                value={name}
                onChange={(e) => setName(e.target.value)}
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

              {/*============= Password Validation =============*/}
              {validatePassword(password)}

              {/*============= Error State =============*/}
              <Error errorState={errorState} />

              {/*============= Submit Button =============*/}
              <button
                className={`inline-flex py-3.5 px-1 font-secondary justify-center text-lg text-primary-light bg-primary-dark rounded-md mt-2 duration-200 ${
                  !email || !name || !password || !isValidPassword
                    ? "bg-primary-dark/60"
                    : "hover:bg-primary-dark/90 cursor-pointer"
                }`}
                type="submit"
                disabled={!email || !name || !password || !isValidPassword}
                onKeyDown={(e: React.KeyboardEvent) =>
                  e.key === "Enter" && handleSignupSubmit
                }
              >
                Create Account
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
