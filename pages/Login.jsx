import React from "react";
import { useLoaderData, useNavigate, redirect, Form } from "react-router-dom";
import { loginUser } from "../api";
import { requireAuth } from "../utils";
export function loader({ request }) {
  return new URL(request.url).searchParams.get("message");
}

export async function action({ request }) {
  const formdata = await request.formData();
  const email = formdata.get("email");
  const password = formdata.get("password");
  let stat;
  try {
    const data = await loginUser({ email, password });
    stat = data.status;
  } catch (error) {
    stat = error.status;
  }
  if (stat == 200) {
    localStorage.setItem("isLoggedIn", true);
  } else {
    localStorage.setItem("isLoggedIn", false);
  }

  return redirect("/host");
}
export default function Login() {
  const message = useLoaderData();
  return (
    <div className="login-container">
      <h1>Sign in to your account</h1>
      {message && <h3 className="red">{message}</h3>}
      <Form method="post" className="login-form" replace>
        <input name="email" type="email" placeholder="Email address" />
        <input name="password" type="password" placeholder="Password" />
        <button disabled={status === "submitting"}>
          {status === "submitting" ? "Logging in..." : "Log in"}
        </button>
      </Form>
    </div>
  );
}
