import './Help.css'
import SideNav from '../component/SideNav'
import useAuth from '../hooks/useAuth'
import help from '../assets/help.gif'
import { Link } from 'react-router-dom'
import logo from '../assets/white-logo.svg'
import { useEffect, useState } from 'react'

export default function Help() {
  const { authIsReady } = useAuth()
  const [menu, setMenu] = useState('close')

  const closeMenu = () => {
      setMenu('close')
      console.log("close")
  }

  const openMenu = () => {
      setMenu('open')
      console.log("open")
  }


  useEffect(() => {
    setTimeout(() => {
      // window.location.replace('https://t.me/beeyond_finance')
    }, 10000)
  }, [])


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
                  <section className='help'>
                    <div>
                      <img src={help} alt="Help" />
                      <p style={{fontFamily: "Poppins", fontSize: "0.8rem", opacity: "80%"}}>Contacting Support, Please hold....</p>
                    </div>
                  </section>
              </div>
          </div>
      </>
      }
    </div>
  )
}
