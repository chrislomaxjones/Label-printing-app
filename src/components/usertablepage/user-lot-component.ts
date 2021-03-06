// Import Vue framework
import Vue, { ComponentOptions } from "vue";

// Import data model for each lot
import { LabelData } from "../../models/labeldata";

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
      <div class="table-input-container was-validated">
      <input required type="text" class="form-control" id="inputSpecNo" placeholder="+0.1µm" v-model="label.userData.specNo">
      </div>
    </td>
    <td>
      <div class="table-input-container was-validated">
        <input required min="1" type="number" class="form-control" id="inputBoxQuantity" placeholder="1000" v-model="label.userData.boxQuantity">
      </div>
    </td>
    <td>
      <div class="table-input-container was-validated">
        <input required min="1" type="number" class="form-control" id="inputCopiesToPrint" placeholder="1" v-model="label.userData.labelsToPrint">
      </div>
    </td>
  </tr>`,
  props: ['label'],
  data: { 
    label : LabelData
  },
});