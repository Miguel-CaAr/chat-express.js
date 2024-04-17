import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("loginStore", () => {
  //---------Estados---------//
  const userAuth = ref({
    user: null,
    picture: 'https://cdn-icons-png.flaticon.com/512/547/547413.png',
    password: null,
  });

  return {
    userAuth,
  };
});
