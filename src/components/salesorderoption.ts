// Import Vue framework
import Vue, { ComponentOptions } from "vue";
import { LabelData } from "../labeldata";

export default Vue.extend({
  template: `
    <option></option>
  `,
  props: ['label'],
  data() {
    return {
      label : LabelData
    } 
  },
  methods: { },
  computed: { },
});