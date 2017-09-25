// Import frameworks
import Vue, { ComponentOptions } from "vue";

// Import components
import UserLotComponent from "./user-lot-component";
import PaginationComponent from "./../pagination/pagination-component";

interface UserTablePageComponent extends Vue {
}

export default {
  template: `
  <div class="row page">

    <div class="col-lg-12 col-md-12 col-sm-12">
      <header>
        <h2>Add information to labels</h2>
      </header>

      <table class="table table-sm table-responsive table-hover table-bordered">             
        <thead>
          <th class="top-row-header" colspan="9">
                Sales order: {{selectedOrderNumber}}<br>
                Line number: {{selectedLineNumber}}
          </th>
          <tr>
            <th>Serial no</th>
            <th>Customer part no</th>
            <th>Description 1</th>
            <th>Description 2</th>
            <th>Description 3</th>
            <th>Template</th>
            <th>Spec no</th>
            <th>Box quantity</th>
            <th>Copies to print</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="label in selectedFilteredImportedData" is="user-lot-component" :label="label"></tr>
        </tbody>
      </table>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12">
      <div class="error-text">
        Sample error text.
      </div>
    </div>

    <div class="col-lg-12 col-md-12 col-sm-12">
      <pagination-component v-on:navigation-changed="pageChange"
                            :valid="isValid"></pagination-component>
    </div>
  </div>
  `,
  props : [
    'selectedOrderNumber', 'selectedLineNumber', 'selectedFilteredImportedData'
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
    UserLotComponent,
    PaginationComponent
  },
} as ComponentOptions<UserTablePageComponent>;