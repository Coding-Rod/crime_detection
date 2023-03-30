<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm>
                  <h1>Login</h1>
                  <p class="text-medium-emphasis">Sign In to your account</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput
                      placeholder="Username"
                      autocomplete="username"
                      v-model="username"
                    />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Password"
                      autocomplete="current-password"
                      v-model="password"
                    />
                  </CInputGroup>
                  <CAlert color="danger" v-if="error">
                    {{ error }}
                  </CAlert>
                  <CRow>
                    <CCol :xs="6">
                      <CButton
                        v-if="!waiting"
                        color="primary"
                        class="px-4 text-white"
                        @click="login"
                      >
                        Login
                      </CButton>
                      <CButton
                        v-else
                        color="primary"
                        class="px-4 text-white"
                        disabled
                      >
                        <CSpinner size="sm" />
                      </CButton>
                    </CCol>
                    <!-- <CCol :xs="6" class="text-right">
                      <CButton color="link" class="px-0">
                        Forgot password?
                      </CButton>
                    </CCol> -->
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5">
              <CCardBody class="text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit,
                    sed do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua.
                  </p>
                  <CButton
                    color="light"
                    variant="outline"
                    class="mt-3"
                    @click="
                      () => {
                        this.$router.push('register');
                      }
                    "
                  >
                    Register Now!
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <span>Message: {{ server_message }}</span>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      error: '',
      waiting: false,
      server_message: '',
    };
  },
  methods: {
    async login() {
      try {
        this.waiting = true;
        const response = await axios.post(
          `${this.$store.state.API_URL}/auth/login`,
          {
            username: this.username,
            password: this.password,
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id", response.data.id);
        this.waiting = false;
        this.$router.push("/");
      } catch (error) {
        this.waiting = false;
        this.error = error.response.data.message;
      }
    },
  },
  async beforeMount() {
    try {
      const response = await axios.get(`${this.$store.state.API_URL}/`);
      this.server_message = response;
    } catch (error) {
      this.server_message = error;
    }
  },
};
</script>
