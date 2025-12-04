import React, { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useAuthStore } from "@/store/authStore"
import { Label } from "@/components/ui/label"
import Logo from "@/assets/logo.png"

interface Props {
  onSwitchToSignup: () => void
}

export default function LoginPage({ onSwitchToSignup }: Props) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const login = useAuthStore(state => state.login)

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you'd have validation and an API call here.
    console.log("Logging in with:", { email, password })
    const fakeToken = "ExistingUserToken"
    login(fakeToken)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50 p-4">
      <Card className="max-w-md w-full shadow-xl p-2">
        <CardHeader className="text-center">
          <img src={Logo} alt="Logo" className="h-14 w-48 mx-auto" />
          <CardDescription>Welcome back!</CardDescription>
        </CardHeader>
        <CardContent>
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="name@example.com" value={email} onChange={e => setEmail(e.target.value)} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input id="password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" className="bg-blue-600 hover:bg-blue-500">Login</Button>
          </form>

          


          <p className="text-center mt-3 text-sm">
            Don't have an account?{" "}
            <span className="text-blue-600 cursor-pointer hover:underline" onClick={onSwitchToSignup}>
              Sign Up
            </span>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}