import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import viHomepage from "./locales/vi/homepage.json";
import jpHomepage from "./locales/jp/homepage.json";
import viSidebar from "./locales/vi/sidebar.json";
import jpSidebar from "./locales/jp/sidebar.json";
import viSearch from "./locales/vi/search.json";
import jpSearch from "./locales/jp/search.json";

const stored =
  typeof window !== "undefined" ? localStorage.getItem("lang") : null;
const initialLng = stored || "vi";

i18n.use(initReactI18next).init({
  lng: initialLng,
  fallbackLng: "vi",
  debug: false,
  defaultNS: "homepage",
  ns: ["homepage", "sidebar", "search"],
  resources: {
    vi: { homepage: viHomepage, sidebar: viSidebar, search: viSearch },
    jp: { homepage: jpHomepage, sidebar: jpSidebar, search: jpSearch },
  },
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
