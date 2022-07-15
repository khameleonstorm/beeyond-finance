import './History.css'
import SideNav from '../component/SideNav'
import useAuth from '../hooks/useAuth'
import { Link } from 'react-router-dom'
import logo from '../assets/white-logo.svg'
import TransactionHistory from '../component/TransactionHistory'
import { useState } from 'react'



export default function History() {
    const { authIsReady} = useAuth()
    const [menu, setMenu] = useState('close')

    const closeMenu = () => {
        setMenu('close')
        console.log("close")
    }

    const openMenu = () => {
        setMenu('open')
        console.log("open")
    }


  return (
    <div className='dashboard'>
        {(authIsReady) && 
        <>
        <div className={`side ${menu}`} onClick={closeMenu}>
            <SideNav />
            <h2>x</h2>
        </div>
        <div className="main">
            <div className="main-wrapper">
                    <nav>
                        <div className="hamburger" onClick={openMenu}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </div>
                        <p></p>
                        <Link to='/' >
                            <img src={logo} alt="logo" />
                        </Link>
                    </nav>
                    <section className='history'>
                      <TransactionHistory />
                    </section>
                </div>
            </div>
        </>
        }
    </div>
  )
}
