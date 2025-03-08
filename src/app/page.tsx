import { redirect } from "next/navigation";

export default function Home() {
  redirect("/login"); // Redirect to the login page
  return null;
}
