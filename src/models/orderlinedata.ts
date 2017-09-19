import { LabelData } from "./labeldata";

/**
 * 
 */
export class OrderLineData {
  // The number associated with the order
  orderNumber : Number;

  // Each order has some line numbers associated with it
  lineNumbers : Number[];

  constructor(orderNumber : Number, firstLineNumber : Number) {
    this.orderNumber = orderNumber;
    this.lineNumbers = [firstLineNumber];
  }
}

/**
 * Helper function that forms an array of objects that associate each order number
 * with multiple line numbers in an OrderLineData object.
 * 
 * @param labels The array of labels from which the OrderLineData should be generated
 */
export function generateOrderAndLineNumbers(labels : LabelData[]) {
  // Initialize empty array of orders
  let orders : OrderLineData[] = [];

  // Form list of sales orders and line numbers for each lot
  // Iterate over each lot in the imported data
  for (let line of labels) {
    // Check if this order number is already contained within orders
    let isOrderAlreadyPresent = orders.some((value : OrderLineData, index : number) => {
      return line.csvData.orderNumber === value.orderNumber });
    
    if (isOrderAlreadyPresent) {
      // Now need to check if the line number has been entered already
      // Filter by equality then take first element of the filtered result
      // Only one order should match at this point so we can just take first
      let orderIndex = orders.indexOf(orders.filter((value : OrderLineData) => {
        return line.csvData.orderNumber === value.orderNumber })[0]);
      
      // Iterate over each line number already added
      let isLinePresent = orders[orderIndex].lineNumbers.some((value : number) => {
        return line.csvData.orderLine === value
      });
      
      // If the line number isn't present then add it
      if (!isLinePresent) {
        orders[orderIndex].lineNumbers.push(line.csvData.orderLine);
      }
    } else {
      // Otherwise if the order is not present then add it
      orders.push(new OrderLineData(line.csvData.orderNumber, line.csvData.orderLine));
    }
  }

  return orders;
}