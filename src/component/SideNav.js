import './SideNav.css'
import { NavLink } from 'react-router-dom'
// import profilePic from '../assets/profileImg.png'
import IMG from "../assets/profileIMG.gif"
import { useLogout } from '../hooks/useLogout'
import useAuth from '../hooks/useAuth'
import { useState, useEffect } from 'react'

export default function SideNav() {
  const { logout } = useLogout()
  const { user } = useAuth()
  const [defaultImg, setDefaultImg] = useState(IMG)

  useEffect(() => {
    if (user.photoURL !== null) {
      setDefaultImg(user.photoURL)
    }
  }, [user.photoURL])


  return (
    <div className="side-nav">
        <div className="profile">
            <img src={defaultImg} alt="dp" />
            <p>{user.displayName}</p>
        </div>
        <div className="links">
          <NavLink to="/dashboard">
            Dashboard
          </NavLink>
          <NavLink to="/profile">
            Profile
          </NavLink>
          <NavLink to="/help">
            Help
          </NavLink>
          <NavLink to="/history">
            History
          </NavLink>
        </div>
        <div className="logout"><p onClick={logout}>Log Out</p></div>
    </div>
  )
}
