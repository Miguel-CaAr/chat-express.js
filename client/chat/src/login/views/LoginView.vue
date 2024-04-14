<template>
    <NCard :bordered="false" class="login-container xl:w-1/6 lg:w-1/4 md:w-1/4 sm:w-1/2 bg-black rounded-lg">
      <header>
        <img src="../../assets/Blue-Space-Chat-Logo.webp" alt="logo">
      </header>
      <main >
        <section>
          <NForm class="flex flex-col gap-y-4">
            <NInput placeholder="Usuario"></NInput>
            <NInput placeholder="Contraseña" type="password"></NInput>
            <NButton class="rounded-lg" type="info">Entrar</NButton>
          </NForm>
        </section>
      </main>
      <footer></footer>
    </NCard>
</template>

<script setup>
import { NCard, NForm, NInput, NButton } from "naive-ui";
</script>

<style scoped>
@media(width < 640px){
  .login-container{
    width: 75vw;
  }
}

.login-container{
  box-shadow: 0px 0px 20px 3px rgba(255, 255, 255, 0.515);
}
</style>
