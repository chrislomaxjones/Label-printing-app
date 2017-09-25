// Import frameworks
import Vue, { ComponentOptions } from "vue";

// Import components
import PrintLotComponent from "./print-lot-component";
import PaginationComponent from "./../pagination/pagination-component";

import { LabelData } from "./../../models/labeldata";

interface PrintTableComponent extends Vue {
}

export default {
  template: `
  <div class="row page">
    <div class="col-lg-12 col-md-12 col-sm-12">
      <header>
        <h2>Select lots to print</h2>
      </header>

      <table class="table table-sm table-responsive table-hover table-bordered">
        <thead>
          <tr>
            <th class="top-row-header" colspan="7">
              Sales order: {{selectedOrderNumber}}<br>
              Line number: {{selectedLineNumber}}
            </th>
          </tr>
          <tr>
            <th>Serial no</th>
            <th>Customer part no</th>
            <th>Description 1</th>
            <th>Description 2</th>
            <th>Description 3</th>
            <th>Template</th>
            <th>Print?</th>
          </tr>
        </thead>
        <tbody>
        <tr v-for="label in filteredImportedData" is="print-lot-component" :label="label"></tr>        
        </tbody>
      </table>
    </div>
    
    <div class="col-lg-12 col-md-12 col-sm-12">
      <div v-bind:class="{ hidden : displayErrorMessage }" class="error-text">
        Please select at least one lot to print from the table above. <br>
        Select lots to print by ticking the box in the right-hand column of the lot.
      </div>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12">
      <pagination-component v-on:navigation-changed="pageChange"
                            :valid="isValid"></pagination-component>
    </div>
  </div>
  `,
  props : [
    'filteredImportedData', 'selectedOrderNumber', 'selectedLineNumber'
  ],
  data: function() {
    return {
      isValid: true,
    }
  },
  methods: {
    pageChange : function(currentPageIndex: number) {
      this.$emit("navigation-changed", currentPageIndex);
    },
  },
  components: {
    PrintLotComponent,
    PaginationComponent
  },
  computed: {
    displayErrorMessage: function() {
      return (this.$props.filteredImportedData as LabelData[]).some( (label : LabelData) => {
        return label.selectedForPrinting.valueOf();
      });
    },
  }
} as ComponentOptions<PrintTableComponent>;