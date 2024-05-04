<template>
  <NCard class="w-1/5 h-1/2 rounded-lg">
    <section class="h-full overflow-hidden flex flex-col">
      <ul class="h-full flex flex-col justify-end items-end scroll-smooth overflow-hidden" ref="messages">
        <li v-for="message in messagesRef" class="border rounded-lg p-2 m-2 bg-blue-100">
          {{ message }}
        </li>
      </ul>
      <NForm class="flex gap-x-1 m-2">
        <NInput
          class="rounded-md"
          type="text"
          id="input"
          placeholder="Escribe un mensaje"
          v-model:value="input"
          :clearable="true"
          @keypress.enter="send"
        />
        <NButton class="rounded-md" @click="send"> Enviar </NButton>
      </NForm>
    </section>
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
const { assignUserID, messagesRef } = useLoginStore();
const router = useRouter();
//----------Funciones----------//
const send = () => {
  setMessage(input.value);
  input.value = "";
};

onMounted(() => {
  getMessages(messages);
  assignUserID();
  isUser(router);
});
</script>

<style scoped></style>
