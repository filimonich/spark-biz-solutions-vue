<template>
  <div>
    <div class="page-title">
      <h3>История записей</h3>
    </div>

    <div class="history-chart">
      <canvas></canvas>
    </div>

    <Loader v-if="loading" />

    <p class="center" v-else-if="!records.length">
      Записей пока нет.
      <router-link to="/record">Добавьте первую</router-link>
    </p>

    <section v-else>
      <HistoryTable :records="items" />

      <VPagination
        v-model="page"
        :pages="pageCount"
        :range-size="1"
        active-color="#4CAF50"
        @update:model-value="pageChangeHandler"
      />
    </section>
  </div>
</template>

<script>
import VPagination from "@hennge/vue3-pagination";
import "@hennge/vue3-pagination/dist/vue3-pagination.css";
import paginationMixin from "@/mixins/pagination.mixin";
import HistoryTable from "@/components/HistoryTable";

export default {
  name: "history",
  mixins: [paginationMixin],
  data: () => ({
    loading: true,
    records: [],
  }),
  async mounted() {
    this.records = await this.$store.dispatch("fetchRecords");
    const categories = await this.$store.dispatch("fetchCategories");

    this.setupPagination(
      this.records.map(record => ({
        ...record,
        categoryName: categories.find(c => c.id === record.categoryId).title,
        typeClass: record.type === "income" ? "green" : "red",
        typeText: record.type === "income" ? "Доход" : "Расход",
      }))
    );
    this.loading = false;
  },
  components: {
    HistoryTable,
    VPagination, // Убедитесь, что включили компонент Pagination в разделе components
  },
};
</script>
