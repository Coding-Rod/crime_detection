import router from "@/router";

const verifyToken = () => {
  console.log("Verifying token...");
  if (!localStorage.getItem("token"))
    router.push({ name: "Login" });
}

export default verifyToken;