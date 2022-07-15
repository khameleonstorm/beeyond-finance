import './TransactionForm.css'
import { useEffect, useState } from 'react'
import {useFirestore} from '../hooks/useFirestore'
import useAuth from '../hooks/useAuth'
import { serverTimestamp } from "firebase/firestore"; 

export default function TransactionForm() {
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const { res, addDocument } = useFirestore("transactions")
  const { user } = useAuth()
  const createdAt = serverTimestamp()

  const handleSubmit = (e) => {
    e.preventDefault()
    const docs = {
      title,
      amount,
      uid: user.uid,
      createdAt
    }

    addDocument(docs)
    console.log(docs)
  }

  useEffect(() => {
    if (res.success) {
      setAmount('')
      setTitle('')
    }
  }, [res.success])
  

  return (
    <div className='ts-form'>
        <form onSubmit={handleSubmit}>
            <h2>ADD TRANSACTION</h2>
            <input type="text" placeholder='Title' maxLength={30} required onChange={(e) => setTitle(e.target.value)} value={title}/>
            <div>
                <input type="number" placeholder='Amount' required 
                min={0} max={9999999}
                onChange={(e) => setAmount(e.target.value)} value={amount}
                />
                <input type="submit" value="ADD" className='button' />
            </div>
        </form>
    </div>
  )
}
