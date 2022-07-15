import './TransactionHistory.css'
import useCollection from '../hooks/useCollection'
import { useFirestore } from '../hooks/useFirestore'
import moment from 'moment'

export default function TransactionHistory() {
  const isLimit = false
  const sort = true
  const { document, error } = useCollection("transactions", isLimit, sort)
  const { deleteDocument } = useFirestore('transactions')


  return (
    <div className="transaction-history">
      {error && <p>{error.message}</p>}
      {document && document.map((doc) => 
        <div className="wrapper" key={doc.id}>
          <div className="content">
            <p className='title'>{doc.title}</p>
            <p>${doc.amount}.00</p>
          </div>
          <p>{moment(doc.createdAt.toDate()).calendar()}</p>
          <h4 className="icon" onClick={() => deleteDocument(doc.id)} >x</h4>
        </div>
        )}
    </div>
  )
}
