import React from "react";
import {
  useLoaderData,
  useActionData,
  useNavigate,
  useNavigation,
  redirect,
  Form,
} from "react-router-dom";
import { loginUser } from "../api";
import { requireAuth } from "../utils";
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formdata = await request.formData();
  const email = formdata.get("email");
  const password = formdata.get("password");
  const pathname =
    new URL(request.url).searchParams.get("redirectTo") || "/host";
  try {
    const data = await loginUser({ email, password });
    localStorage.setItem("isLoggedIn", true);
    return redirect(pathname);
  } catch (error) {
    return error.message;
  }
}
export default function Login() {
  const message = useLoaderData();
  const errorMessage = useActionData();
  const state = useNavigation().state;
  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      {errorMessage && <h3 className="red">{errorMessage}</h3>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={state === "submitting"}>
          {state === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
