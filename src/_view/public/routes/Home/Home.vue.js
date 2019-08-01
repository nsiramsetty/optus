import ApiService from "../../../../_services/Api.service";
import store from '../../../../_store';
import {CONSTANTS_CONFIG} from "../../../../_config/Constants.config";

export default {
  name: 'home',
  props: [],
  data: function () {
    return {
      api: new ApiService(),
      api_response: null,
      error: null,
      controllers: {
        "selectedBar": 0
      },
      isAPILoading : false
    };
  },
  created: function () {
    this.loadAPIResponse();
  },
  methods: {
    loadAPIResponse: function () {
      this.$set(this,"isAPILoading", true);
      this.api.doApiRequest("getButtonsConfig", {}, '', true).then((response) => {
        //Store API Response in Local Storage, Just for Visibility
        store.dispatch('UPDATE_API_RESPONSE', response);
        this.$set(this,"api_response",response);
        this.$toastr.s("API Response Loaded Successfully.", CONSTANTS_CONFIG.SUCCESS_HEADING);
        this.$set(this,"isAPILoading", false);
      }).catch((err) => {
        this.$set(this, "error", err);
        this.$toastr.e(err.toString(), CONSTANTS_CONFIG.ERROR_HEADING);
        this.$set(this,"isAPILoading", false);
      });
    },

    changeBarValues: function (buttonValue) {
      let oldValue = this.api_response.bars[this.controllers.selectedBar];
      let newValue = oldValue + buttonValue;
      newValue = newValue < 0 ? 0 : newValue;
      this.$set(this.api_response.bars, this.controllers.selectedBar, newValue);
    }
  },
  computed: {},
  components: {}
}
