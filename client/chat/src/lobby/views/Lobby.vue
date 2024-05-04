<template>
  <NCard class="w-1/4 h-1/2">
    <ul ref="messages"></ul>
    <NForm>
      <NInput
        type="text"
        id="input"
        placeholder="Escribe un mensaje"
        v-model:value="input"
      />
      <NButton @click="setMessage(input)"> Enviar </NButton>
    </NForm>
  </NCard>
</template>

<script setup>
//----------Utils----------//
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
//----------Components----------//
import { NCard, NForm, NInput, NButton } from "naive-ui";
//----------Composables----------//
import useLobby from "../composables/Lobby";
import useLogin from "../../login/composables/useLogin";
//----------Stores----------//
import useLoginStore from "../../login/store/LoginStore";
//----------Estados----------//
const messages = ref(null);
const input = ref("");
//----------Config----------//
const { getMessages, setMessage } = useLobby;
const { isUser } = useLogin;
const { assignUserID } = useLoginStore();
const router = useRouter();
//----------Funciones----------//
onMounted(() => {
  getMessages(messages);
  assignUserID();
  isUser(router);
});
</script>

<style scoped></style>
