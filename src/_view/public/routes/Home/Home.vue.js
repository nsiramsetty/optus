import ApiService from "../../../../_services/Api.service";
import store from '../../../../_store'
import {CONSTANTS_CONFIG} from "../../../../_config/Constants.config";

export default {
  name: 'home',
  props: [],
  data: function () {
    return {
      api: new ApiService(),
      api_response: store.getters['api_response'] ? store.getters['api_response'] : null,
      error: null,
      controllers: {
        "selectedBar": 0
      }
    };
  },
  created: function () {
    this.loadAPIResponse();
  },
  methods: {
    loadAPIResponse: function () {
      this.api.doApiRequest("getButtonsConfig", {}, '', true).then((response) => {
        store.dispatch('UPDATE_API_RESPONSE', response);
        this.$toastr.s("API Response Loaded Successfully.", CONSTANTS_CONFIG.SUCCESS_HEADING);
      }).catch((err) => {
        this.$set(this, "error", err);
        this.$toastr.e(err.toString(), CONSTANTS_CONFIG.ERROR_HEADING);
      });
    },

    changeBarValues: function (buttonValue) {
      let oldValue = this.api_response.bars[this.controllers.selectedBar];
      let newValue = oldValue + buttonValue;
      if (newValue < 0) {
        newValue = 0;
      }
      this.$set(this.api_response.bars, this.controllers.selectedBar, newValue);
    }
  },
  computed: {},
  components: {}
}
