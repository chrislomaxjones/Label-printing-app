// Import Vue framework
import Vue, { ComponentOptions } from "vue";
import { LabelData } from "../labeldata";

export default Vue.extend({
  template: `
  <tr>
    <td>{{label.csvData.serialNumber}}</td>
    <td>{{label.csvData.customerPartNumber}}</td>
    <td>{{label.csvData.description1}}</td>
    <td>{{label.csvData.description2}}</td>
    <td>{{label.csvData.description3}}</td>
    <td>
      <div class="input-group table-input-container">
          <input type="text" class="form-control" id="inputSpecNo" placeholder="+0.35u" v-model="label.userData.specNo">
          <span class="input-group-addon" id="basic-addon2">&micro;</span>
      </div>
    </td>
    <td>
      <div class="table-input-container">
        <input type="number" class="form-control" id="inputBoxQuantity" placeholder="1000" v-model="label.userData.boxQuantity">
      </div>
    </td>
    <td>
      <div class="table-input-container">
        <input type="number" class="form-control" id="inputCopiesToPrint" placeholder="1" v-model="label.userData.labelsToPrint">
      </div>
    </td>
  </tr>`,
  props: ['label'],
  data: { 
    label : LabelData
  },
  methods: { },
  computed: { },
});