import router from "@/router";

const verifyToken = () => {
  if (!localStorage.getItem("token"))
    router.push({ name: "Login" });
}

export default verifyToken;