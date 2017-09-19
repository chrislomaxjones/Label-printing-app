import * as $ from "jquery";

import Vue, { ComponentOptions } from "vue";

import PrintDataLine from "./components/print-line";
import UserDataLine from "./components/user-line";
import PaginationComponent from "./components/pagination";

import { CSVData, LabelData } from "./labeldata";
import { OrderLineData } from "./orderlinedata";

import { Printer } from './printing/printer';

/**
 * 
 */
function generateOrderAndLineNumbers(data : LabelData[]) {
  // Initialize empty array of orders
  let orders : OrderLineData[] = [];

  // Form list of sales orders and line numbers for each lot
  // Iterate over each lot in the imported data
  for (let line of data) {
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

// Use jQuery ajax to pull down the CSV file of label data
$(document).ready( () => {
  $.ajax({
    url : "src/data/data.csv",
    success : (result : string) => {
      // Instantiate empty array of label data items
      let importedData : LabelData[] = [];

      // Split the resulting string into lines of data
      // Each line is a CSV entry
      // Slice to discard the header information
      let lines = result.split('\n').slice(1);
      
      // Discard the last element
      // As we read in one too many after the newline
      lines.pop();

      // Iterate through each line
      for (let line of lines) {
        // Split based on commas
        let data = line.split(',');

        // Convert from array of strings to a CSVData type
        // and pass that into a new LabelData instance
        // and push that onto the array of data items
        importedData.push(new LabelData({
          accountCode        : data[0],
          description1       : data[1],
          description2       : data[2],
          description3       : data[3],
          quantity           : Number(data[4]),
          batchId            : Number(data[5]),
          serialNumber       : data[6],
          partNumber         : data[7],
          orderNumber        : Number(data[8]),
          orderLine          : Number(data[9]),
          customerPartNumber : data[10],
          grade              : data[11],
          template           : data[12],
        }));
      }

      let generatedNumbers = generateOrderAndLineNumbers(importedData);
      var filteredData : LabelData[] = [];

      var selectedOrderNumber : Number = importedData[0].csvData.orderNumber;
      var selectedLineNumber  : Number = importedData[0].csvData.orderLine;

      class Foo extends Vue {
        orders : LabelData[];
        selectedOrderNumber : Number;
        selectedLineNumber : Number;
      }

      let formBindings = new Foo({
        el: '#form-bindings',
        data() {
          return {
            orders: generatedNumbers,
            selectedOrderNumber: selectedOrderNumber,
            selectedLineNumber: selectedLineNumber
          }
        },
        methods: {
          selectedOrder: function() {
            return generatedNumbers[
              (document.getElementById("selectSalesOrder") as HTMLSelectElement).selectedIndex - 1
            ];
          },
        },
      });


      class Bar extends Vue {
        labels : LabelData[];
      }

      let printTableBody = new Bar({
        el: "#print-table-body",
        data : function() {
          return {
            selectedOrderNumber: selectedOrderNumber,
            selectedLineNumber : selectedLineNumber,
            labels: filteredData,
          }
       },
        components: {
          PrintDataLine,
        }
      });

      let v2 = new Bar({
        el: "#user-table-body",
        data() {
          return {
            labels: filteredData,
          }
       },
        components: {
          UserDataLine,
        }
      });

      let paginationContainerApp = new Vue({
        el: "#pagination-container",
        data() {
          return {
          }
       },
        components: {
          PaginationComponent,
        },
        methods: {
          pageChange(currentPage : number) {
            if (currentPage === 1) {          /* 1st -> 2nd page */
              // Filter out the data not pertaining to the selected order number and line number
              printTableBody.labels = filteredData = importedData.filter((labelData : LabelData) => {
                return (labelData.csvData.orderNumber == formBindings.selectedOrderNumber &&
                        labelData.csvData.orderLine   == formBindings.selectedLineNumber);
              });
            } else if (currentPage === 2) {   /* 2nd -> 3rd page */
              // Filter out those which weren't selected from previous table
              v2.labels = printTableBody.labels.filter((labelData : LabelData) => {
                return labelData.selectedForPrinting;
              });
            } else if (currentPage === 3) {   /* 3rd -> 4th page */
              Printer.print(v2.labels);
            }
          }
        }
      });



    },
    error : (xhr, status, error) => {
      // For now just log an error message
      console.log(error);
    },
  });
});