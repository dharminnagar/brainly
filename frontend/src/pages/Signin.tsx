import axios from "axios";
import { Button } from "../components/Button";
import { Input } from "../components/InputBox";
import { BACKEND_URL } from "../config";
import { useRef } from "react";
import { useNavigate } from "react-router-dom";

export const Signin = () => {
  const usernameRef = useRef<HTMLInputElement>();
  const passwordRef = useRef<HTMLInputElement>();
  const navigate = useNavigate();

  async function executeSignin() {
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;

    try {
      const res = await axios.post(BACKEND_URL + "/login", {
        username: username,
        password: password,
      });

      const jwt = res.data.token;
      localStorage.setItem("token", jwt);

      alert("Logged in successfully");
      navigate("/dashboard");
    } catch (error) {
      //@ts-ignore
      alert("Failed to log in\n" + error?.request.response);
      console.log(error);
    }
  }
  return (
    <div className="h-screen w-screen bg-gray-200 flex justify-center items-center">
      <div className="bg-white rounded-lg border min-w-48 p-7">
        <div className="text-2xl font-bold text-center pb-4">Sign In</div>

        <Input
          placeholder="username"
          className="mb-5"
          reference={usernameRef}
        />

        <Input
          placeholder="password"
          className="input-class"
          reference={passwordRef}
        />

        <div className="flex justify-center pt-5">
          <Button
            variant="primary"
            size="lg"
            text="Sign In"
            className="w-full flex justify-center"
            onClick={executeSignin}
            loading={false}
          />
        </div>

        <div className="text-center pt-5">
          <a href="/signup" className="underline">
            Don't have an account? Sign up
          </a>
        </div>
      </div>
    </div>
  );
};
