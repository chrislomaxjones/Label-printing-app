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