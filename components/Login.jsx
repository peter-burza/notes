'use client'

import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [isAuthenticating, setIsAuthenticating] = useState(false)

  const { login, signup, forgotPassword } = useAuth()
  const router = useRouter()

  const cantAuth = ! email.includes('@') || password.length < 6

  async function handleAuthUser() {
    // check if email is legit and password is acteptable
    if (cantAuth) {
      return
    }
    setIsAuthenticating(true)

    try {
      if (isRegister) {
        // then we need to register a user
        await signup(email, password)
      } else {
        // otherwise  theyr're wanting to login
        await login(email, password)
      }
      // so if we get there with no error - we're authenticated, so push to the notes page
      router.push('/notes')
    } catch (error) {
      console.log(error.message)
      // ADD AN ERROR STATE THAT IS CONDITIONALY RENDERED IF THERE IS AN ERROR, AND SHOWS THE ERROR MESSAGE ON SCREEN FOR THE USER 
    } finally {
      setIsAuthenticating(false)
    }
  }

  return (
    <>
      <div className="login-container">
        <h1 className="text-gradient">ECHOES</h1>
        <h2>Thoughts that gently resonate</h2>
        <p>Create a personal library of neatly organized and searchable notes and ideas.</p>
        <div className="full-line"></div>
        <h3>{isRegister ? 'Create an account' : 'Sign in'}</h3>
        <div>
            <p>Email</p>
            <input value={email} onChange={(e) => {setEmail(e.target.value)}} type="text" placeholder="Enter your email adress" />
        </div>
        <div>
            <p>Password</p>
            <input value={password} onChange={(e) => {setPassword(e.target.value)}} type="password" placeholder="*******" />
        </div>
        <button onClick={handleAuthUser} disabled={cantAuth} className="submit-btn">
            <h3>{isAuthenticating ? 'Submitting...' : 'Submit'}</h3>
            <h3 className="arrow">-&gt;</h3>
        </button>
        <div className="secondary-btns-container">
            <button onClick={() => {
              setIsRegister(!isRegister)
            }} className="card-button-secondary">
                <small>{isRegister ? 'Sign in' : 'Sign up'}</small>
            </button>
            <button onClick={forgotPassword} className="card-button-secondary">
                <small>Forgot password?</small>
            </button>
        </div>
        <div className="full-line"></div>
        <footer>
            <a target="_blank" href="https://github.com/peter-burza/echoes">
              <img alt="pfp" src="https://avatars.githubusercontent.com/u/18643421?v=4" />
              <h6>@peter-burza</h6>
              <i className="fa-brands fa-github"></i>
            </a>
        </footer>
      </div>
    </>
  );
}
