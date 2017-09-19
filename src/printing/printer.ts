import { LabelData } from './../models/labeldata';

export class Printer {

  private static documentTemplate = `
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>Standard Label template</title>
        <link rel="stylesheet" href="templates/css/reset.css">
        <link rel="stylesheet" href="templates/css/template_style.css">
      </head>
      <body>

      {{labels}}

      </body>
    </html>
  `;

  private static labelTemplate = `
    <div class="label">
      Oi oi.<br>
      Oi oi oi<br>
      Hello world<br>
      Another one<br>
      Another one<br>
      Oi oi.<br>
      Oi oi.<br>
      Another one<br>
      Oi oi.<br>
      Oi oi.<br>
    </div>
  `;

  public static print(labels : LabelData[]) {
    let w = window.open();

    let labelsString=  ``;

    for (let label of labels) {
      for (var i = 0; i < label.userData.labelsToPrint; i++) {
        labelsString += this.generateLabelTemplate(label);
      }
    }

    this.documentTemplate = this.documentTemplate.replace('{{labels}}', labelsString);
    w.document.write(this.documentTemplate);
  }

  public static generateLabelTemplate(label : LabelData) {
    var labelString = `<div class="label">`;

    // Import some csv data 
    labelString += `Serial no: ` + label.csvData.serialNumber + `<br>`;
    labelString += `Customer part no: ` + label.csvData.customerPartNumber + `<br>`;
    labelString += `Description 1:` + label.csvData.description1 + `<br>`;
    labelString += `Description 2:` + label.csvData.description2 + `<br>`;
    labelString += `Description 3:` + label.csvData.description3 + `<br>`;

    // Add user data
    labelString += `Spec no:` + label.userData.specNo + `&micro;<br>`;
    labelString += `Quantity in box:` + label.userData.boxQuantity + `<br>`;
    
    // Add barcode pertaining to customer part number
    labelString += `<span class="barcode">` + label.csvData.customerPartNumber + `</span></div>`;

    return labelString;
  }
}