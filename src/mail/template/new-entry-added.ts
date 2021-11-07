export function newEntryAddedEmailTemplate(
  totalAmount: number,
  partnerAmount: number,
): string {
  const userExpenses = totalAmount - partnerAmount;
  return `<h1> Hello! </h1>
    <p>A new entry has been added. Just take a look, because you are also included in this entry! </p> 
    <p>Total cost of expenses: ${totalAmount}</p> 
    <p>Partner expenses: ${partnerAmount}</p> 
    <p>Your expenses: ${userExpenses}</p> 
    `; // TODO: Add a deeplink to application screen with details of new entry
}
