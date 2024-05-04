//---------Service----------//
import { socket } from "../../services/webSocket.Client";
//----------Utils----------//
import { createDiscreteApi } from "naive-ui";
import { ObjError } from "../../helpers/errorHandler";
//---------Store---------//
import LoginStore from "../store/LoginStore";
//---------Config---------//
const { userAuth, userID } = LoginStore();
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
    router.push("/lobby");
  } else {
    router.push("/");
  }
};

const login = (router) => {
  try {
    validateRequiredData();
    socket.emit("create user", userAuth.user, userAuth.password, userAuth.picture);
    socket.on("create user", (name, picture, id) => {
      userAuth.id = id;
      localStorage.setItem("userAuth", JSON.stringify(userAuth));
      router.push("/lobby");
    });
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
  const user = Object(userAuth);
  if (!user.user && !user.password) {
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
