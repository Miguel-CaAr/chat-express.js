import { logDark } from "naive-ui";
import { defineStore } from "pinia";
import { ref } from "vue";

export default defineStore("loginStore", () => {
  //---------Estados---------//
  const messagesRef = ref([]);
  const userAuth = ref({
    id: null,
    user: null,
    picture: "https://cdn-icons-png.flaticon.com/512/547/547413.png",
    password: null,
  });
  //----------Funciones----------//
  const assignUserID = () => {
    if (localStorage.getItem("userAuth")) {
      const user = JSON.parse(localStorage.getItem("userAuth"));
      userAuth.value.id = user.id;
    }
  };

  return {
    userAuth,
    messagesRef,
    //Funciones
    assignUserID,
  };
});
