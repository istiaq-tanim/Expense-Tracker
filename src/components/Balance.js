import { useSelector } from "react-redux";

export default function Balance() {
    const { transactions } = useSelector(state => state.transactions)
    const calculateIncome = (transactions) => {
        let totalBalance = 0;
        transactions.forEach(transaction => {
            const { type, amount } = transaction
            if (type === "income") {
                totalBalance += Number(amount)
            }
            else {
                totalBalance -= Number(amount)
            }

        });
        return totalBalance
    }
    return (
        <div className="top_card">
            <p>Your Current Balance</p>
            <h3>
                <span>৳</span>
                {transactions.length > 0 ? <span>{calculateIncome(transactions)}</span> : 0}
            </h3>
        </div>
    );
}
