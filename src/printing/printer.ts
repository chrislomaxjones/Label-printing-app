import { LabelData } from './../models/labeldata';

export class Printer {

  private static readonly documentTemplate = `
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

      </bod00/9988/01y>
    </html>
  `;

  private static readonly stdLabelTemplate = `
    <div class="label">
      <table>
        <thead>
        </thead>
        <tbody>
          <tr>
            <td class="centred">{{logo}}PartNo.</td>
            <td>{{customer-part-no}}</td>
          </tr>
          <tr class="descs">
            <td colspan="2">
            {{description1}} <br>
            {{description2}} <br>
            {{description3}}
            </td>
          </tr>
          <tr>
            <td>Spec size: {{spec-no}}</td>
            <td>Lot no: {{serial-no}}</td>
          </tr>
          <tr>
          <td>Quantity: {{quantity}}</td>
          <td class="centred">{{barcode}}</td>
        </tr>
        </tbody>
      </table>
    </div>
  `;

  public static print(labels : LabelData[]) {
    // Start by opening a new window in which we'll write the label markup
    let w = window.open();

    let labelsString=  ``;

    // Iterate through each label we wish to print
    for (let label of labels) {
      // Print the number of copies of each individual label necessary
      for (var i = 0; i < label.userData.labelsToPrint; i++) {
        // Append another label string formatted by the correct template
        labelsString += this.generateLabelTemplate(label, this.stdLabelTemplate);
      }
    }

    // Insert the labels string into the document string and write it to the window
    let newDocument = this.documentTemplate.replace('{{labels}}', labelsString);
    w.document.write(newDocument);
  }

  public static generateLabelTemplate(label : LabelData, template : string) {
    // Perform a very basic form of string interpolation on the table
    // This will populate the template with the label data from label
    var t = template;

    t = t.replace(`{{logo}}`, `<img src="templates/css/STL.jpg">`);

    t = t.replace(`{{serial-no}}`, label.csvData.serialNumber.toString());
    t = t.replace(`{{customer-part-no}}`, label.csvData.customerPartNumber.toString());

    t = t.replace(`{{description1}}`, label.csvData.description1.toString());
    t = t.replace(`{{description2}}`, label.csvData.description2.toString());
    t = t.replace(`{{description3}}`, label.csvData.description3.toString());
    
    t = t.replace(`{{spec-no}}`, label.userData.specNo.toString());
    t = t.replace(`{{quantity}}`, label.userData.boxQuantity.toString());

    t = t.replace(`{{barcode}}`, `<span class="barcode">` + label.calculateBarcodeString() + `</span></div>`);
    return t;
  }
}