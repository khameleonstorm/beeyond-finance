import { useState, useEffect } from 'react'
import './ProfileForm.css'
import IMG from "../assets/profileIMG.gif"
import useAuth from "../hooks/useAuth"
import { useFirestore } from '../hooks/useFirestore'
import useCollection from '../hooks/useCollection'
// import loader from "../assets/button-loader.gif"

export default function ProfileForm() {
  const [isDisabled, setIsDisabled] = useState(true)
  const { user } = useAuth()
  const { updateprofile } = useFirestore('profile')
  const isLimit = false
  const sort = false
  const { document, error, isPending } = useCollection("profile", isLimit, sort)
  const [ profileImg, setProfileImg ] = useState(null)
  const [ defaultImg, setDefaultImg ] = useState(IMG)
  const [ firstName, setFirstName ] = useState('')
  const [ lastName, setLastName ] = useState('')
  const [ phone, setPhone ] = useState('')
  const [ displayName, setDisplayName ] = useState('')
  const [ country, setCountry ] = useState('')
  const [ state, setState ] = useState('')
  const [ city, setCity ] = useState('')
  const [ address, setAddress ] = useState('')



  const handleFile = (e) => {
    if (e.target.files[0] || e.target.files[0].size < 50000000) {
      setProfileImg(e.target.files[0])
    } else{
      console.log(error)
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const inputs = { firstName, lastName, phone, country, state, city, address, uid: user.uid }

    if (!isPending) {
      setIsDisabled(true)
      setFirstName(document.firstName)
      setLastName(document.lastName)
      setPhone(document.phone)
      setDisplayName(user.displayName)
      setCountry(document.country)
      setState(document.state)
      setCity(document.city)
      setAddress(document.address)
    }

    updateprofile(inputs, profileImg, displayName)

  }

  // console.log(document)

  useEffect(() => {
    if (document !== null && document.firstName !== null && document.lastName !== null && 
      document.phone !== null && document.country !== null && document.state !== null && document.city !== null && 
      document.address !== null && user.photoURL !== null) {

        // update states

      setDefaultImg(user.photoURL)
      setFirstName(document[0].firstName)
      setLastName(document[0].lastName)
      setPhone(document[0].phone)
      setDisplayName(user.displayName)
      setCountry(document[0].country)
      setState(document[0].state)
      setCity(document[0].city)
      setAddress(document[0].address)

    } else {
      setFirstName('')
      setLastName('')
      setPhone('')
      setDisplayName(user.displayName)
      setCountry('')
      setState('')
      setCity('')
      setAddress('')
      console.log(document)
    }
  }, [document, isPending, user.photoURL, user.displayName])


  return (
    <div className='profile-form'>
      {document && document.map((doc) => 
            <form onSubmit={handleSubmit} key={doc.uid}>
            <div className="profile-circle">
              <img src={defaultImg} alt="DP" />
            </div>
            <div className='NCA'>
              <input disabled={isDisabled} type="text" placeholder='First Name' onChange={(e) => setFirstName(e.target.value)} 
              value={firstName}/>
              <input disabled={isDisabled} type="text" placeholder='Last Name' onChange={(e) => setLastName(e.target.value)} value={lastName}/>
              <input disabled={isDisabled} type="text" placeholder='Display Name' onChange={(e) => setDisplayName(e.target.value)} 
              value={displayName}/>
              <input disabled={isDisabled} type="text" placeholder='Phone' onChange={(e) => setPhone(e.target.value)} value={phone}/>
              <input disabled={isDisabled} type="text" placeholder='Country' onChange={(e) => setCountry(e.target.value)} value={country}/>
              <input disabled={isDisabled} type="text" placeholder='State' onChange={(e) => setState(e.target.value)} value={state}/>
              <input disabled={isDisabled} type="text" placeholder='City' onChange={(e) => setCity(e.target.value)} value={city}/>
              <input disabled={isDisabled} type="text" placeholder='Address' onChange={(e) => setAddress(e.target.value)} value={address}/>
            </div>
            <input disabled={isDisabled} className='custom-file-input' type="file" accept="image/png, image/jpg, image/gif, image/jpeg"
            onChange={handleFile}
            />
            {(!isDisabled && !isPending) && <button>Submit</button>}
            {isPending && <button>Processing...</button>}
            {(isDisabled && !isPending) && <button onClick={() => setIsDisabled(false)} className='update'>Update</button>}
            {error && <p>Couldn't complete this action.</p>}
          </form>
      )}
    </div>
  )
}
