// Import frameworks
import Vue, { ComponentOptions } from "vue";

// Import data model and helper function
import { LabelData } from "../models/labeldata";
import { OrderLineData, generateOrderAndLineNumbers } from "../models/orderlinedata";

interface SelectFormComponent extends Vue {
  orders : OrderLineData[];
  selectedOrderNumber : Number;
  selectedLineNumber : Number;
}

export default {
  template: `
  <form novalidate>
    <div class="form-group">
      <label for="selectSalesOrder">Sales order:</label>
      <select class="form-control" id="selectSalesOrder" v-model="selectedOrderNumber" required>
        <option disabled value="">Please select one</option>      
        <option v-for="order in orders" :value="order.orderNumber">{{order.orderNumber}}</option>
      </select>
    </div>
    <div class="form-group">
      <label for="selectLineNumber">Line number:</label>
      <select class="form-control" id="selectLineNumber" v-model="selectedLineNumber" required>
        <option disabled value="">Please select one</option>
        <option v-for="lineNumber in selectedOrder.lineNumbers">{{lineNumber}}</option>
      </select>
      <div class="invalid-feedback">
        Please provide a valid line number.
      </div>
    </div>{{selectedOrderNumber}} // {{selectedLineNumber}}
  </form>
  `,
  props: [
    'importedOrders'
  ],
  data() {
    return {
      selectedOrderNumber: '',
      selectedLineNumber: '',
    }
  },
  computed: {
    orders: function() {
      return generateOrderAndLineNumbers(this.$props.importedOrders)
    },
    selectedOrder: function() {
      return this.orders.filter((orderline : OrderLineData) => {
        return orderline.orderNumber == this.selectedOrderNumber;
      })[0];
    }
  },
  watch: {
    selectedOrderNumber: function() {
      this.$emit("order-number-changed", this.selectedOrderNumber);
    },
    selectedLineNumber: function() {
      this.$emit("line-number-changed", this.selectedLineNumber);
    },
  },
} as ComponentOptions<SelectFormComponent>;