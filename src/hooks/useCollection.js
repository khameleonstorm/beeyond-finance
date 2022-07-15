import { collection, onSnapshot, query, where, limit, orderBy } from "firebase/firestore"
import { db } from "../firebase/config"
import { useEffect, useState } from "react"
import useAuth from '../hooks/useAuth'


export default function useCollection(coll, isLimit, sort ) {
  const [document, setDocument] = useState(null)
  const [error, setError] = useState(null)
  const { user } = useAuth()
  const [ isPending, setIsPending ] = useState(false)

  useEffect(() => {
    setIsPending(true)
    let q = query(collection(db, coll), where("uid", "==", user.uid))

    if (sort && isLimit) {
      q = query(collection(db, coll), orderBy("createdAt", "desc"), where("uid", "==", user.uid), limit(4))
    } else{
      q = query(collection(db, coll), orderBy("createdAt", "desc"), where("uid", "==", user.uid))
    }

    if (!sort && !isLimit) {
      q = query(collection(db, coll), where("uid", "==", user.uid))
    } 
    
    const unsubscribe = onSnapshot(
      q, 
      (snapshot) => {
        let results = []
        // looping through snapshot to get each individual doc
        snapshot.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id})
        });

        // setting doc state
        setDocument(results)
        setError(null)
        setIsPending(false)
        console.log(results)
      },
      (error) => {
        // ...setting error param
        setError("could not fetch data frm the database.....")
        console.log(error.message)
      });

      return () => unsubscribe()
  }, [coll, user.uid, isLimit, sort])

  return { error, document, isPending }

}
