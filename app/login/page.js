import { Suspense } from "react";
import LoginForm from "./LoginForm";

export const metadata = { title: "Member Login | Warwick Law Society" };

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  );
}
