<template>
  <div>
    <Loader v-if="loading" />
    <div v-else-if="record">
      <div class="breadcrumb-wrap">
        <router-link to="/history" class="breadcrumb">История</router-link>
        <a @click.prevent class="breadcrumb">
          {{ record.type === "income" ? "Доход" : "Расход" }}
        </a>
      </div>
      <div class="row">
        <div class="col s12 m6">
          <div
            class="card"
            :class="{
              red: record.type === 'outcome',
              green: record.type === 'income',
            }"
          >
            <div class="card-content white-text">
              <p>Описание: {{ record.description }}</p>
              <p>Сумма: {{ formatAmount(record.amount) }}</p>
              <p>Категория: {{ record.categoryName }}</p>

              <small>{{ formatDate(record.date) }}</small>
            </div>
          </div>
        </div>
      </div>
    </div>
    <p class="center" v-else>Запись с id={{ $route.params.id }} не найдена</p>
  </div>
</template>

<script>
export default {
  name: "detail",
  head() {
    return {
      title: this.$title("Detail_Title"),
    };
  },
  data: () => ({
    record: null,
    loading: true,
  }),
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleString();
    },
    formatAmount(amount) {
      const formatter = new Intl.NumberFormat("ru-RU", {
        style: "currency",
        currency: "RUB",
        minimumFractionDigits: 2,
      });
      return formatter.format(amount);
    },
  },
  async mounted() {
    const id = this.$route.params.id;
    const record = await this.$store.dispatch("fetchRecordById", id);
    const category = await this.$store.dispatch(
      "fetchCategoryById",
      record.categoryId
    );

    this.record = {
      ...record,
      categoryName: category.title,
    };

    this.loading = false;
  },
};
</script>
