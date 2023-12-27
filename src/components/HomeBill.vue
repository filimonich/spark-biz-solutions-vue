<template>
  <div class="col s12 m6 l4">
    <div class="card light-blue bill-card">
      <div class="card-content white-text">
        <span class="card-title">Счет в валюте</span>

        <p v-for="cur of currencies" :key="cur" class="currency-line">
          <span>
            {{ formatCurrency(getCurrency(cur), cur) }}
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["rates"],
  data() {
    return {
      currencies: ["RUB", "USD", "EUR"],
    };
  },
  methods: {
    base() {
      return (
        this.$store.getters.info.bill / (this.rates["RUB"] / this.rates["USD"])
      );
    },
    formatCurrency(value, currency) {
      return this.$filters.currency(value, currency);
    },
    getCurrency(currency) {
      const baseValue = this.base();
      const rate = this.rates[currency];
      return Math.floor(baseValue * rate);
    },
  },
};
</script>
