import { redirect } from "react-router-dom";

export async function requireAuth(request) {
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  const pathname = new URL(request.url).pathname;

  if (!isLoggedIn) {
    throw redirect(
      `/login?message=you must login first &redirectTo=${pathname}`
    );
  }
}
