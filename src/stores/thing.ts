import { defineStore } from "pinia";
import { axiosInstance } from "@/http-common";

export const useThingStore = defineStore({
  id: "thing",
  state: () => ({
    things: [],
    loading: false,
    error: null,
  }),
  getters: {},
  actions: {
    async fetchThings() {
      this.things = [];
      this.loading = true;
      try {
        this.things = await axiosInstance
          .get("things")
          .then((response) => response.data);
      } catch (error: any) {
        this.error = error;
      } finally {
        this.loading = false;
      }
    },

    async createThing(name: string) {
      await axiosInstance.post("things", { name });
    },
    async deleteThing(id: string) {
      await axiosInstance.delete("things/" + id);
    },
  },
});
