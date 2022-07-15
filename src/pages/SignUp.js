import './SignUp.css'
import logo from '../assets/white-logo.svg'
import bikeGif from '../assets/login-gif.gif'
import { useState } from 'react'
import { useSignup } from '../hooks/useSignup'
import { Link } from 'react-router-dom'

export default function SignUp() {
    const [displayName, setDisplayName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, isPending, signUp } = useSignup()


    const handleSubmit = (e) => {
        e.preventDefault()

        signUp(email, password, displayName)
    }

  return (
    <div className='login'>
        <header>
            <nav>
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="logo" />
                    </Link>
                </div>
            </nav>
        </header>
        <section>
            <div className="login-gif">
                <img src={bikeGif} alt="bike" />
            </div>
            <div className="form-container">
                <div className="form-wrapper">
                    <form onSubmit={handleSubmit}>
                        <h1>SIGN UP</h1>
                        <input 
                        type="text" 
                        placeholder='Username'
                        maxLength={12}
                        onChange={e => setDisplayName(e.target.value)}
                        value={displayName}
                        />
                        <input 
                        type="email" 
                        placeholder='Name@gmail.com'
                        onChange={e => setEmail(e.target.value)}
                        value={email}
                        />
                        <input 
                        type="password" 
                        placeholder='Password'
                        onChange={e => setPassword(e.target.value)}
                        value={password}
                        />
                        {!isPending && 
                        <button className='sign-up-btn'>
                            SIGN UP
                        </button>
                        }
                        {isPending && 
                        <button className='sign-up-btn' disabled>
                            Please wait...
                        </button>
                        }

                        {error && <p>{error}</p>}
                        <p>Already have an account? 
                            <span>
                                <Link to="/login">
                                     LOGIN
                                </Link>
                            </span>
                        </p>
                    </form>
                </div>
            </div>
        </section>
    </div>
  )
}
