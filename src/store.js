import Vue from "vue";
import Vuex from "vuex";
import { db } from "@/firebase";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    hotels: [],
    pictures: [],
  },
  mutations: {
    SET_HOTELS(state, data) {
      state.hotels = data;
    },
    SET_PICTURES(state, data) {
      state.pictures = data;
    }
  },
  actions: {
    GET_HOTELS(ctx) {
      return new Promise((resolve, reject) => {
        db.child("/tambohotels")
          .once("value")
          .then(snapshot => {
            const hotels = [];
            const data = snapshot.val();

            for (const key in data) {
              hotels.push({ key, ...data[key] });
            }

            ctx.commit("SET_HOTELS", hotels);
            resolve();
          })
          .catch(e => reject(e));
      });
    }
  },
});

export default store;