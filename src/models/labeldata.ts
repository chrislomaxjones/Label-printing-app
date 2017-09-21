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
  // Static values that are to be used for default fields in constructor
  private static defaultEmptyFieldString = "";
  private static defaultEmptyFieldNumber = NaN;

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

  // Method to calculate the barcode 
  public calculateBarcodeString() {
    return "*" + this.csvData.serialNumber + "*";
  }
  constructor(options? : any) {
    // Create a new csv data with the default options
    this.csvData = {
      accountCode :        LabelData.defaultEmptyFieldString,
      description1 :       LabelData.defaultEmptyFieldString,
      description2 :       LabelData.defaultEmptyFieldString,
      description3 :       LabelData.defaultEmptyFieldString,
      quantity :           LabelData.defaultEmptyFieldNumber,
      batchId :            LabelData.defaultEmptyFieldNumber,
      serialNumber :       LabelData.defaultEmptyFieldString,
      partNumber :         LabelData.defaultEmptyFieldString,
      orderNumber :        LabelData.defaultEmptyFieldNumber,
      orderLine :          LabelData.defaultEmptyFieldNumber,
      customerPartNumber : LabelData.defaultEmptyFieldString,
      grade :              LabelData.defaultEmptyFieldString,
      template :           LabelData.defaultEmptyFieldString,
    };

    this.userData = {
      specNo: "+0.1µm",
      boxQuantity : 1000,
      labelsToPrint: 1
    };

    if (options) {
      if (typeof options.accountCode !== "undefined") {
        this.csvData.accountCode = options.accountCode;
      }

      if (typeof options.description1 !== "undefined") {
        this.csvData.description1 = options.description1;
      }

      if (typeof options.description2 !== "undefined") {
        this.csvData.description2 = options.description2;
      }

      if (typeof options.description3 !== "undefined") {
        this.csvData.description3 = options.description3;
      }

      if (typeof options.quantity !== "undefined") {
        this.csvData.quantity = options.quantity;
      }

      if (typeof options.batchId !== "undefined") {
        this.csvData.batchId = options.batchId;
      }

      if (typeof options.serialNumber !== "undefined") {
        this.csvData.serialNumber = options.serialNumber;
      }

      if (typeof options.partNumber !== "undefined" ) {
        this.csvData.partNumber = options.partNumber;
      }
      
      if (typeof options.orderNumber !== "undefined") {
        this.csvData.orderNumber = options.orderNumber;
      }

      if (typeof options.orderLine !== "undefined") {
        this.csvData.orderLine = options.orderLine;
      }

      if (typeof options.customerPartNumber !== "undefined") {
        this.csvData.customerPartNumber = options.customerPartNumber;
      }

      if (typeof options.grade !== "undefined") {
        this.csvData.grade = options.grade;
      }

      if (typeof options.template !== "undefined") {
        this.csvData.template = options.template;
      }
    }
  }
}