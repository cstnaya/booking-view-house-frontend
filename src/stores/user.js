import { defineStore } from "pinia";
import { api } from "../api.js";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: {},
  }),
  actions: {
    async auth() {
      await api.get("/sanctum/csrf-cookie");

      api
        .get("/api/user")
        .then((res) => {
          this.user = res.data;
        })
        .catch((err) => {
          this.user = { name: "guest" };
        });
    },
  },
});
