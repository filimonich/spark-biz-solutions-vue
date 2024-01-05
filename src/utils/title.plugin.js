import localizeFilter from "@/filters/localize.filter";

export default {
  install(app) {
    app.config.globalProperties.$title = function (titleKey) {
      const appName = process.env.VUE_APP_TITLE;
      return `${localizeFilter(titleKey)} | ${appName}`;
    };
  },
};
