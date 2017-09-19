/**
 * Type that represents the fields present for each
 *  label datum in the imported CSV file
 */
export type CSVData = {
  accountCode : String,
  description1 : String,
  description2 : String,
  description3 : String,
  quantity : Number,
  batchId : Number,
  serialNumber : String,
  partNumber : String,
  orderNumber : Number,
  orderLine : Number,
  customerPartNumber : String,
  grade : String,
  template : String,
};

// LabelData is a model of each lot item drawn from the CSV
// May include additional information specified by the user
export class LabelData {
  // Properties that are imported from the CSV file
  public csvData : CSVData;
  
  // Additional properties may be specified by the user
  public userData : {
    specNo        : String;
    boxQuantity   : Number;
    labelsToPrint : Number;
  };

  // Selected determines whether this label has been selected for printing
  // This is set to false by default
  public selectedForPrinting : Boolean = false;
  
  constructor(options : any) {
    this.csvData = options;

    // Provide default options for user data
    this.userData = {
      specNo : "+0.0",
      boxQuantity : 1000,
      labelsToPrint: 1
    }
  };
}