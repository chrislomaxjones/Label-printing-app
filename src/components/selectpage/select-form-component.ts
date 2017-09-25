// Import frameworks
import Vue, { ComponentOptions } from "vue";

// Import data model and helper function
import { LabelData } from "../../models/labeldata";
import { OrderLineData, generateOrderAndLineNumbers } from "../../models/orderlinedata";

interface SelectFormComponent extends Vue {
  orders : OrderLineData[];
  selectedOrderNumber : Number;
  selectedLineNumber : Number;
}

function checkValidity() : boolean {

  let isOrderValid = (document.getElementById('selectSalesOrder') as HTMLSelectElement).checkValidity();
  if (isOrderValid) {
    $('.orders-feedback').addClass('hidden');
  } else {
    $('.orders-feedback').removeClass('hidden');
  }

  let isLineValid = (document.getElementById('selectLineNumber') as HTMLSelectElement).checkValidity();
  if (isLineValid) {
    $('.lines-feedback').addClass('hidden');
  } else {
    $('.lines-feedback').removeClass('hidden');
  }

  return isOrderValid && isLineValid;
}

export default {
  template: `
  <form novalidate class="was-validated"> 
    <div class="form-group">
      <label for="selectSalesOrder">Sales order:</label>
      <select class="form-control" id="selectSalesOrder" v-model="selectedOrderNumber" required>
        <option disabled value="">Please select one</option>      
        <option v-for="order in orders" :value="order.orderNumber">{{order.orderNumber}}</option>
      </select>
      <div class="orders-feedback invalid-feedback">
        Please select a valid order number from the dropdown above.
      </div>
    </div>
    <div class="form-group">
      <label for="selectLineNumber">Line number:</label>
      <select class="form-control" id="selectLineNumber" v-model="selectedLineNumber" required>
        <option disabled value="">Please select one</option>
        <option v-for="lineNumber in selectedOrder.lineNumbers">{{lineNumber}}</option>
      </select>
      <div class="lines-feedback invalid-feedback">
        Please select a valid line number from the dropdown above.
      </div>
    </div>
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
      this.$emit("order-number-changed", this.selectedOrderNumber, checkValidity());
    },
    selectedLineNumber: function() {
      this.$emit("line-number-changed", this.selectedLineNumber, checkValidity());
    },
  }
} as ComponentOptions<SelectFormComponent>;