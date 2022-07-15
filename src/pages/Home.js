import logo from '../assets/white-logo.svg'
import welcomeGif from '../assets/welcome-gif.gif'
import './Home.css'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className='home'>
    <div className="bg-blur">
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
            <div className="welcome-text">
                <h1>FINANCE <span>TRACKER.</span></h1>
                <h3>BEYOND CASH FLOW CIRCLE</h3>
                <div className="buttons">
                    <Link to="/login">
                        <button className='login'>LOGIN</button>
                    </Link>
                    <Link to="/sign-up">
                        <button className='sign-up'>SIGN UP</button>
                    </Link>
                </div>
            </div>

            <div className="welcome-gif">
                <img src={welcomeGif} alt="gif" />
            </div>
        </section>
    </div>
    </div>
  )
}
