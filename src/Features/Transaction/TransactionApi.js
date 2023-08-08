import axios from "axios"

export const getTransaction = async() =>
{
    const response=await axios.get("http://localhost:9000/transactions")
    return response.data
}
export const addTransaction = async(data) =>
{
    const response=await axios.post("http://localhost:9000/transactions",data)
    return response.data
}
export const editTransaction = async(id,data) =>
{
    const response=await axios.put(`http://localhost:9000/transactions/${id}`,data)
    return response.data
}
export const deleteTransaction = async(id) =>
{
    const response=await axios.delete(`http://localhost:9000/transactions/${id}`)
    return response.data
}