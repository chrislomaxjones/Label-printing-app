// Import Vue framework
import Vue, { ComponentOptions } from "vue";

// Import label data model
import { LabelData } from "../models/labeldata";

export default Vue.extend({
  template: `
  <tr>
      <td>{{label.csvData.serialNumber}}</td>
      <td>{{label.csvData.customerPartNumber}}</td>
      <td>{{label.csvData.description1}}</td>
      <td>{{label.csvData.description2}}</td>
      <td>{{label.csvData.description3}}</td>
      <td>{{label.csvData.template}}</td>
      <td>
        <div class="form-check">
          <label class="form-check-label">
            <input class="form-check-input" type="checkbox" value="" v-model="label.selectedForPrinting">
          </label>
        </div>
      </td>
  </tr>`,
  props: ['label'],
  data: { 
    label : LabelData
  },
});