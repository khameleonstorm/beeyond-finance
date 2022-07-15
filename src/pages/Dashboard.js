import './Dashboard.css'
import SideNav from '../component/SideNav'
import TransactionForm from '../component/TransactionForm'
import Transactions from '../component/Transactions'
import logo from '../assets/white-logo.svg'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useCollection from '../hooks/useCollection'
import { useState } from 'react'



export default function Dashboard() {
    const { user, authIsReady} = useAuth()
    const { document } = useCollection("profile")
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
        {(authIsReady && document) && 
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
                        <p>Hi {user.displayName}!</p>
                        <Link to='/' >
                            <img src={logo} alt="logo" />
                        </Link>
                    </nav>
                    <section>
                        <Transactions />
                    </section>
                    <section>
                        <TransactionForm />
                    </section>
                </div>
            </div>
        </>
        }
    </div>
  )
}
