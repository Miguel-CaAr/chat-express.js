//---------Service----------//
import { socket } from "../../services/webSocket.Client";
//----------Utils----------//
import { createDiscreteApi } from "naive-ui";
import { ObjError } from "../../helpers/errorHandler";
//---------Store---------//
import LoginStore from "../store/LoginStore";
//---------Config---------//
const { userAuth } = LoginStore();
const { notification, message } = createDiscreteApi(
  ["notification", "message"],
  {
    notificationProviderProps: {
      max: 5,
      keepAliveOnHover: true,
    },
    messageProviderProps: {
      max: 5,
      keepAliveOnHover: true,
    },
  }
);
//----------Functions----------//
const isUser = (router) => {
  if (localStorage.getItem("userAuth") != null) {
    router.push("/home");
  }
};

const login = (router) => {
  try {
    validateRequiredData();
    socket.emit("create user", userAuth.user, userAuth.password, userAuth.picture);
    localStorage.setItem("userAuth", JSON.stringify(userAuth));
    router.push("/home");
  } catch (error) {
    if (error.type) {
      notification.create({
        title: error.name,
        content: error.message,
        type: error.type,
        description: error.naiveDesc,
        duration: error.naiveDuration,
      });
    } else {
      console.error(error);
    }
  }
};

const validateRequiredData = () => {
  if (Object.values(userAuth).includes(null)) {
    throw ObjError({
      mensaje: `Los input son requeridos`,
      type: "warning",
      nameError: "Input requeridos",
      naiveDesc: "Favor de llenar los campos",
      naiveDuration: 2000,
    });
  }
};

export default {
  login,
  isUser,
};
