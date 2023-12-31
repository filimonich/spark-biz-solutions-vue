import _ from "lodash";

export default {
  data() {
    return {
      pageSize: 5,
      allItems: [],
    };
  },
  computed: {
    page: {
      get() {
        return +this.$route.query.page || 1;
      },
      set(page) {
        this.pageChangeHandler(page);
      },
    },
    pageCount() {
      return Math.ceil(this.allItems.length / this.pageSize);
    },
    items() {
      const startIndex = (this.page - 1) * this.pageSize;
      return this.allItems.slice(startIndex, startIndex + this.pageSize);
    },
  },
  methods: {
    setupPagination(allItems) {
      this.allItems = allItems;
    },
    pageChangeHandler(page) {
      this.$router.push(`${this.$route.path}?page=${page}`);
    },
  },
};
