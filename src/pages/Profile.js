import './Profile.css'
import SideNav from '../component/SideNav'
import useAuth from '../hooks/useAuth'
import ProfileForm from '../component/ProfileForm'
import useCollection from '../hooks/useCollection'
import { useState } from 'react'
import logo from '../assets/white-logo.svg'
import { Link } from 'react-router-dom'



export default function Profile() {
    const { authIsReady } = useAuth()
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
                    <p></p>
                    <Link to='/' >
                            <img src={logo} alt="logo" />
                    </Link>
                  </nav>
                    <section className='profilef'>
                      <ProfileForm />
                    </section>
                </div>
            </div>
        </>
        }
    </div>
  )
}
