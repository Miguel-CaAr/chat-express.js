<template>
  <NCard
    :bordered="false"
    class="login-container xl:w-1/6 lg:w-1/4 md:w-1/4 sm:w-1/2 bg-black rounded-lg">
    <header>
      <img src="../../assets/Blue-Space-Chat-Logo.webp" alt="logo" />
    </header>
    <main>
      <section>
        <NForm class="flex flex-col gap-y-4">
          <NInput
            show-count
            :maxlength="15"
            v-model:value="userAuth.user"
            placeholder="Usuario">
          </NInput>
          <NInput
            show-count
            :maxlength="20"
            @keypress.enter="login(router)"
            v-model:value="userAuth.password"
            placeholder="Contraseña"
            type="password">
          </NInput>
          <NButton @click="login(router)" class="rounded-lg" type="info">Entrar</NButton>
        </NForm>
      </section>
    </main>
    <footer></footer>
  </NCard>
</template>

<script setup>
//--------Components--------//
import { NCard, NForm, NInput, NButton } from "naive-ui";
//---------Store---------//
import LoginStore from "../store/LoginStore.js";
//---------Router--------//
import { useRouter } from "vue-router";
//---------Composables--------//
import UseLogin from "../composables/useLogin.js";
//----------Utils----------//
import { onBeforeMount } from "vue";
//---------Config---------//
const { userAuth } = LoginStore();
const { login, isUser } = UseLogin;
const router = useRouter();
//----------Functions----------//
onBeforeMount(() => {
  isUser(router);
})
</script>

<style scoped>
@media (width < 640px) {
  .login-container {
    width: 75vw;
  }
}

.login-container {
  box-shadow: 0px 0px 20px 3px rgba(255, 255, 255, 0.515);
}
</style>
