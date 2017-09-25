// Import frameworks
import Vue, { ComponentOptions } from "vue";

// Import necessary components
import PaginationComponent from "./../pagination/pagination-component";
import SelectFormComponent from "./select-form-component";

interface SelectPageComponent extends Vue {
  isValid : boolean;
}

let selectPageComponent = {
  template: `
  <div class="row page">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <header>
        <h2>Search order and line</h2>
      </header>
      
      <select-form-component ref="select"
                             :imported-orders="importedData"
                             v-on:order-number-changed="orderNumberChanged"
                             v-on:line-number-changed="lineNumberChanged"></select-form-component>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12">
      <pagination-component v-on:navigation-changed="pageChange"
                            :valid="isValid"></pagination-component>
    </div>
  </div>
  `,
  props: [
    'importedOrders'
  ],
  data: function() {
    return {
      importedData: this.$props.importedOrders,
      isValid: true,
    }
  },
  components: {
    PaginationComponent,
    SelectFormComponent
  },
  methods: {
    pageChange : function(currentPageIndex: number) {
      this.$emit("navigation-changed", currentPageIndex);
    },
    orderNumberChanged: function(newOrderNumber : number, newIsValid : boolean) {
      this.$emit("order-number-changed", newOrderNumber);
    },
    lineNumberChanged: function(newLineNumber : number, newIsValid : boolean) {
      
      this.$emit("line-number-changed", newLineNumber);
    },
  },
} as ComponentOptions<SelectPageComponent>;

export default selectPageComponent;