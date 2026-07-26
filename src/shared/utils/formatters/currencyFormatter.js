export const formatCurrency = (amount, currency = "NGN") => {
  if (amount == null) return "₦0.00";
  if (currency === "NGN") {
    return (
      "₦" +
      Number(amount).toLocaleString("en-US", {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      })
    );
  }
  return new Intl.NumberFormat("en-US", { style: "currency", currency }).format(
    amount,
  );
};
