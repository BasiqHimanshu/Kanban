import { useState } from "react"
import SignupPage from "./signup/Signup"
import LoginPage from "./login/Login"

export default function AuthContainer() {
  const [showLogin, setShowLogin] = useState(true)

  return showLogin ? (
    <LoginPage onSwitchToSignup={() => setShowLogin(false)} />
  ) : (
    <SignupPage onSwitchToLogin={() => setShowLogin(true)} />
  )
}
