type CurrencyProps = {
    amount: number,
    currency: "USD" | "EUR"
}


const formatCurrency = ({ amount, currency }: CurrencyProps) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: currency
    }).format(amount);

}


export {formatCurrency}