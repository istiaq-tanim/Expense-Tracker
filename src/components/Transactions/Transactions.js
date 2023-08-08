
import { useEffect } from "react";
import Transaction from "./Transaction";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransaction } from "../../Features/Transaction/TransactionSlice";

export default function Transactions() {
    const {transactions,isError,isLoading}=useSelector(state=> state.transactions)
    const dispatch=useDispatch()
    useEffect(()=>{
      dispatch(fetchTransaction())
    },[dispatch])
   
    let content=null

    if(isLoading) content=<p>Loading...</p>
    if(!isLoading && isError) content=<p className="error">There is an error</p>
    if(!isLoading && !isError && transactions?.length===0) content=<p>There is no content</p> 
    if(!isLoading && !isError && transactions?.length>0) content=transactions.map(transaction=><Transaction key={transaction.id} transaction={transaction}></Transaction>)
    return (
        <>
            <p className="second_heading">Your Transactions:</p>

            <div className="conatiner_of_list_of_transactions">
                <ul>
                    {content}
                </ul>
            </div>
        </>
    );
}
