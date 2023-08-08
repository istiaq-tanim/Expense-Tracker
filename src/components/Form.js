import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createTransaction, updateTransaction } from "../Features/Transaction/TransactionSlice";

export default function Form() {
    const [name, setName] = useState("")
    const [amount, setAmount] = useState("")
    const [type, setType] = useState("")
    const [editMode,setEditMode]=useState(false)
    const dispatch = useDispatch()
    const {isLoading,isError}=useSelector(state=>state.transactions)
    const {editing}=useSelector(state=>state.transactions)

    useEffect(()=>{
       const {id,name,amount,type}=editing || {}
       if(id)
       {
        setEditMode(true)
        setName(name)
        setAmount(amount)
        setType(type)
       }
       else{
        setEditMode(false)
        reset()
       }
    },[editing])
    const reset = () =>
    {
        setName("")
        setAmount("")
        setType("")
    }
    const handleCreate = (e) => {
        e.preventDefault()
        dispatch(createTransaction({
            name, type, amount:Number(amount)
        }))
       reset()
    }
    const handleEdit = (e) =>{
        e.preventDefault()
        dispatch(updateTransaction
            ({
                id: editing?.id,
                data: {
                    name: name,
                    amount: amount,
                    type: type,
                },
            })
        );
        reset()
        setEditMode(false)
    }

    const handleEditMode=() =>
    {
        setEditMode(false)
    }
    return (
        <div className="form">
            <h3>Add new transaction</h3>

            <form onSubmit={editMode? handleEdit : handleCreate}>
                <div className="form-group">
                    <label >Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="My Salary"
                        value={name}
                        required
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>

                <div className="form-group radio">
                    <label >Type</label>
                    <div className="radio_group">
                        <input
                            required
                            type="radio"
                            value="income"
                            name="type"
                            checked={type === "income"}
                            onChange={() => setType("income")}
                        />
                        <label >Income</label>
                    </div>
                    <div className="radio_group">
                        <input
                            type="radio"
                            value="expense"
                            name="type"
                            placeholder="Expense"
                            checked={type === "expense"}
                            onChange={() => setType("expense")}
                        />
                        <label>Expense</label>
                    </div>
                </div>

                <div className="form-group">
                    <label for="transaction_amount">Amount</label>
                    <input
                        type="number"
                        required
                        placeholder="Enter amount"
                        name="amount"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                    />
                </div>

                <button className="btn" disabled={isLoading} type="submit">{editMode?"Update Transaction":"Add Transaction"}</button>

                {
                    !isLoading && isError && (<p className="error">There was an error occurred</p>)
                }
            </form>

           {
            editMode &&  <button className="btn cancel_edit" onClick={handleEditMode}>Cancel Edit</button>
           }
        </div>
    );
}
