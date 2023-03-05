<template>
  <CContainer>
    <CRow>
      <CCol>
        <h1>Settings</h1>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CForm>
          <div class="mb-3">
            <CFormLabel for="InputName1">Name</CFormLabel>
            <CFormInput
              :disabled="!enabled"
              type="text"
              id="InputName1"
              aria-describedby="NameHelp"
              name="name"
              v-model="name"
            />
            <CFormText id="NameHelp"
              >This could not be used for searching.</CFormText
            >
          </div>
          <div class="mb-3">
            <CFormLabel for="InputUsername1">Username</CFormLabel>
            <CFormInput
              :disabled="!enabled"
              type="text"
              id="InputUsername1"
              aria-describedby="UsernameHelp"
              name="username"
              v-model="username"
            />
            <CFormText id="UsernameHelp"
              >Your username must be unique.</CFormText
            >
          </div>
          <div class="mb-3">
            <CFormLabel for="InputEmail1">Email address</CFormLabel>
            <CFormInput
              :disabled="!enabled"
              type="email"
              id="InputEmail1"
              aria-describedby="emailHelp"
              name="email"
              v-model="email"
            />
            <CFormText id="emailHelp">Your email must be unique.</CFormText>
          </div>
        </CForm>
      </CCol>
    </CRow>
    <CAlert color="danger" v-if="error">
      {{ error }}
    </CAlert>
    <!-- Add edit and save buttons responsive width 100% -->
    <CRow class="mt-3">
      <CCol xs="12" sm="6" class="mb-2">
        <CButton
          color="primary"
          class="w-100 text-white"
          @click="modalVisible = true"
          :disabled="enabled"
        >
          Edit</CButton
        >
      </CCol>
      <CCol xs="12" sm="6" class="mb-2">
        <CButton
          v-if="!waiting"
          color="primary"
          class="w-100 text-white"
          :disabled="!enabled"
          @click="saveChanges"
        >
          Save</CButton
        >
        <CButton v-else color="primary" class="w-100 text-white" disabled>
          <CSpinner size="sm" />
        </CButton>
      </CCol>
    </CRow>
    <!-- <CButton color="primary" @click="() => { modalVisible = true }">Launch demo modal</CButton> -->
    <CModal
      :visible="modalVisible"
      @close="
        () => {
          modalVisible = false;
        }
      "
    >
      <CModalBody
        >Please enter your password to confirm the changes.</CModalBody
      >
      <CModalFooter>
        <CForm>
          <div class="mb-3">
            <CFormLabel for="InputPassword1">Password</CFormLabel>
            <CFormInput
              type="password"
              id="InputPassword1"
              aria-describedby="PasswordHelp"
              name="password"
              v-model="password"
            />
            <CFormText id="PasswordHelp"
              >Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.</CFormText
            >
          </div>
        </CForm>
        <!-- Error -->
        <CAlert v-if="error" color="danger" class="w-100">
          {{ error }}
        </CAlert>
        <CButton
          color="secondary"
          @click="
            () => {
              modalVisible = false;
            }
          "
        >
          Cancel
        </CButton>
        <CButton
          v-if="!waiting"
          color="primary"
          class="text-white"
          @click="enableFields"
          >Verify</CButton
        >
        <CButton
          v-else
          color="primary"
          class="text-white"
          @click="enableFields"
        >
          <CSpinner size="sm" /> Validating...
        </CButton>
      </CModalFooter>
    </CModal>
    <!-- Toast of saving changes -->
    <CToaster style="position: absolute; bottom: 5px; right: 5px; z-index: 9999" v-if="toastVisible">
      <CToast
        :show="toastVisible"
        autohide="true"
        fade="true"
        @hide="toastVisible = false"
      >
        <CToastHeader>
          <CIcon name="cil-check-circle" class="me-2" />
          Success
        </CToastHeader>
        <CToastBody>
          Your changes have been saved.
        </CToastBody>
      </CToast>
    </CToaster>
  </CContainer>
</template>

<script>
import verifyToken from "@/utils/verifyToken";
import axios from "axios";

export default {
  data() {
    return {
      screenWidth: window.innerWidth,
      enabled: false,
      waiting: false,
      name: "",
      username: "",
      email: "",
      password: "",
      modalVisible: false,
      error: "",
      toastVisible: false,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
    async enableFields() {
      this.waiting = true;
      console.log(`${this.$store.state.API_URL}/users`);
      try {
        if (this.password === "") {
          throw new Error("Password is required");
        }
        // get user data
        const response = await axios.get(`${this.$store.state.API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        // check if password is correct
        const password = await axios.post(
          `${this.$store.state.API_URL}/auth/login`,
          {
            username: response.data.username,
            password: this.password,
          }
        );
        if (password.data.token) {
          this.enabled = true;
          this.modalVisible = false;
          this.waiting = false;
          localStorage.setItem("token", password.data.token);

          this.name = response.data.name;
          this.username = response.data.username;
          this.email = response.data.email;
          this.password = "";
        } else {
          this.waiting = false;
          this.username = "";
          throw new Error("Password is incorrect");
        }

        // if password is correct enable fields
        this.enabled = true;
        this.modalVisible = false;
      } catch (error) {
        this.waiting = false;
        this.error = error.response
          ? error.response.data.message
          : error.message;
      }
    },
    async saveChanges() {
      try {
        this.waiting = true;
        if (this.name === "") {
          throw new Error("Name is required");
        }
        if (this.username === "") {
          throw new Error("Username is required");
        }
        if (this.email === "") {
          throw new Error("Email is required");
        }

        const previous_data = await axios.get(`${this.$store.state.API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        const new_data = {
          name: this.name,
          username: this.username,
          email: this.email,
        };

        if (previous_data.data.name === this.name) delete new_data.name;
        if (previous_data.data.username === this.username) delete new_data.username;
        if (previous_data.data.email === this.email) delete new_data.email;

        if (Object.keys(new_data).length === 0) throw new Error("No changes were made");

        const response = await axios.patch(`${this.$store.state.API_URL}/users`, new_data,
         {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        
        this.waiting = false;
        this.enabled = false;
        this.error = "";
        this.password = "";
        this.toastVisible = true;

        // FIXME: This is a temporary solution, then we will use websockets
        setTimeout(() => {
          location.reload();
        }, 3000);
    } catch (error) {
        this.waiting = false;
        this.error = error.response
          ? error.response.data.message
          : error.message;
      }
    },
  },
  beforeMount() {
    verifyToken();
  },
  async mounted() {
    const response = await axios.get(`${this.$store.state.API_URL}/users`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    this.name = response.data.name;
    this.username = response.data.username;
    this.email = response.data.email;
  },
};
</script>

<style scoped lang="scss">
.avatar {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}
</style>