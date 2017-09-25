// Import frameworks
import * as $ from "jquery";
import Vue, { ComponentOptions } from "vue";

// Import the data models
import { CSVData, LabelData } from "./models/labeldata";
import { OrderLineData, generateOrderAndLineNumbers } from "./models/orderlinedata";

// Import the components
import PaginationComponent from "./components/pagination/pagination-component"; // DELETE
import SelectPageComponent from "./components/selectpage/select-page-component";
import PrintTableComponent from "./components/printtablepage/print-table-page-component";
import UserTablePageComponent from "./components/usertablepage/user-table-page-component";

// Import the file that controls the printing facility
import { Printer } from './printing/printer';

// ----------------------------------------------------------------------------

// Upon the document being ready
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
      
      // The last element of the array lines may be an empty string
      // Depending on if the CSV is terminated with a newline
      // So test for an empty string and pop the last element if so
      if (/^\s*$/.test(lines[lines.length-1])) lines.pop();

      // Iterate through each line
      for (let line of lines) {
        // Split based on commas
        let data = line.split(',');

        // Convert from array of strings to a CSVData type
        // and pass that into a new LabelData instance
        // and push that onto the array of data items
        importedData.push(new LabelData({
          accountCode        : !/^\s*$/.test(data[0])  ? data[0] : undefined,
          description1       : !/^\s*$/.test(data[1])  ? data[1] : undefined,
          description2       : !/^\s*$/.test(data[2])  ? data[2] : undefined,
          description3       : !/^\s*$/.test(data[3])  ? data[3] : undefined,
          quantity           : !isNaN(Number(data[4])) ? Number(data[4]) : undefined,
          batchId            : !isNaN(Number(data[5])) ? Number(data[5]) : undefined,
          serialNumber       : !/^\s*$/.test(data[6])  ? data[6] : undefined,
          partNumber         : !/^\s*$/.test(data[7])  ? data[7] : undefined,
          orderNumber        : !isNaN(Number(data[8])) ? Number(data[8]) : undefined,
          orderLine          : !isNaN(Number(data[9])) ? Number(data[9]) : undefined,
          customerPartNumber : !/^\s*$/.test(data[10]) ? data[10] : undefined,
          grade              : !/^\s*$/.test(data[11]) ? data[11] : undefined,
          template           : !/^\s*$/.test(data[12]) ? data[12] : undefined,
        }));
      }

      class App extends Vue {
        importedData : LabelData[];
        
        selectedOrderNumber: number;
        selectedLineNumber: number;

        filteredImportedData : LabelData[];
        selectedFilteredImportedData : LabelData[];
      }

      let app = new App({
        el: "#app",
        data: function() {
          return {
            importedData : importedData,

            selectedOrderNumber: 0,
            selectedLineNumber: 0,

            filteredImportedData : importedData,
            selectedFilteredImportedData : importedData,
          }
        },
        components: {
          PaginationComponent,
          SelectPageComponent,
          PrintTableComponent,
          UserTablePageComponent
        },
        methods: {
          pageChange : function(currentPageIndex: number) {
            if (currentPageIndex === 1) {          /* 1st -> 2nd page */
              // Filter out the data not pertaining to the selected order number and line number
              app.filteredImportedData = importedData.filter((labelData : LabelData) => {
                return (labelData.csvData.orderNumber == app.selectedOrderNumber &&
                        labelData.csvData.orderLine   == app.selectedLineNumber);
              });
            } else if (currentPageIndex === 2) {   /* 2nd -> 3rd page */
              // Filter out those which weren't selected from previous table
              app.selectedFilteredImportedData = app.filteredImportedData.filter((labelData : LabelData) => {
                return labelData.selectedForPrinting;
              });
            } else if (currentPageIndex === 3) {   /* 3rd -> 4th page */
              // Print out the edited labels
              Printer.print(app.selectedFilteredImportedData);
            }
          },
          orderNumberChanged: function(newSelectedOrderNumber: number) {
            app.selectedOrderNumber = newSelectedOrderNumber;
          },
          lineNumberChanged: function(newSelectedLineNumber: number) {
            app.selectedLineNumber = newSelectedLineNumber;
          },
        }
      });
    },
    error : (xhr, status, error) => {
      // Display an error alert (for now)
      alert("No CSV file found:\nStatus: " + status.toString() + "\nError: " + error);

      // Possibly introduce an Error display component for the application
      // ...
      // ...
    },
  });
});