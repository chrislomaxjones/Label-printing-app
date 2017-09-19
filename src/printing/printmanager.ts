import { LabelData } from '../labeldata';

/**
 * Label template specifies the way in which label data is laid out on the label
 * A template may not print every field
 * It may also print static assets (such as a logo)
 * 
 * A template consists of HTML and CSS along with a number of fields to be
 * string interpolated by the Print Manager
 */
export class LabelTemplate {
  // This currently provides a stub standard template
  public static standardTemplate() {
    return new LabelTemplate();
  }
}

/**
 * Provides a number of static methods that assist with label printing
 *
 */
export class PrintManager {
  public static printLabel(label : LabelData, template? : LabelTemplate) {
    // Use the standard template if none is specified
    let temp = template ? template : LabelTemplate.standardTemplate();
    
    // Import a label HTML and CSS file from the template

    // Modify fields to match that of label

    // Emit a location and navigate to that location 

    // Open print dialog
  }

  public static printLabels(labels : LabelData[], template? : LabelTemplate) {
    for (let label of labels) {      
      this.printLabel(label, template);
    }
  }
}