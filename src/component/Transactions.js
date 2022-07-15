import './Transactions.css'
import useCollection from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFirestore'

export default function Transactions() {
  const isLimit = true
  const sort = true
  const { document, error } = useCollection("transactions", isLimit, sort)
  const { deleteDocument } = useFirestore('transactions')


  return (
    <div className="transactions-container">
      {error && <p>{error.message}</p>}
      {document && document.map((doc) => 
        <div className="transactions-wrapper" key={doc.id}>
          <div className="t-content">
            <h2>${doc.amount}</h2>
            <p>{doc.title}</p>
            <h4 className='icon' onClick={() => deleteDocument(doc.id)}>x</h4>
          </div>
        </div>
        )}
    </div>
  )
}
