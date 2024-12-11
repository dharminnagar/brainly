import { useRef } from "react";
import { Button } from "../components/Button";
import { Input } from "../components/InputBox";
import axios from "axios";
import { BACKEND_URL } from "../config";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function executeSignup() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      await axios.post(BACKEND_URL + "/signup", {
        username: username,
        password: password,
      });
      alert("Signed up successfully");

      navigate("/login");
    } catch (error) {
      alert("Failed to sign up\n" + error?.request.response);
      console.log(error);
    }
  }

  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-md border min-w-48 p-7">
        <div className="text-2xl font-bold text-center pb-4">Sign Up</div>

        <Input
          placeholder="username"
          reference={usernameRef}
          className="mb-5"
        />

        <Input
          placeholder="password"
          reference={passwordRef}
          className="input-class"
        />

        <div className="flex justify-center pt-5">
          <Button
            variant="primary"
            size="lg"
            text="Sign Up"
            className="w-full flex justify-center"
            onClick={executeSignup}
            loading={false}
          />
        </div>

        <div className="text-center pt-5">
          <a href="/signin" className="underline">
            Already have an account? Sign in
          </a>
        </div>
      </div>
    </div>
  );
};
