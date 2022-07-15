import './Login.css'
import logo from '../assets/white-logo.svg'
import bikeGif from '../assets/login-gif.gif'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useLogin } from '../hooks/useLogin'

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const { error, isPending, login} = useLogin()


    const handleSubmit = (e) => {
        e.preventDefault()

        login(email, password)
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
                        <h1>LOGIN</h1>
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
                                LOGIN
                            </button>
                        }
                        {isPending && 
                            <button className='sign-up-btn' disabled>
                                Please wait...
                            </button>
                        }

                        {error && <p>{error}</p>}
                        <p>Don't have an account?  
                            <span>
                                <Link to="/sign-up">
                                    SIGN UP
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
