<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <p class="text-medium-emphasis">Create your account</p>
                <p class="text-medium-emphasis small">Already have an account? <router-link to="login">Login</router-link></p>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-user" />
                  </CInputGroupText>
                  <CFormInput placeholder="Name" autocomplete="name" v-model="name" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-address-book" />
                  </CInputGroupText>
                  <CFormInput placeholder="Username" autocomplete="username" v-model="username" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>@</CInputGroupText>
                  <CFormInput placeholder="Email" autocomplete="email" v-model="email" />
                </CInputGroup>
                <CInputGroup class="mb-3">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Password"
                    autocomplete="new-password"
                    v-model="password"
                  />
                </CInputGroup>
                <CInputGroup class="mb-4">
                  <CInputGroupText>
                    <CIcon icon="cil-lock-locked" />
                  </CInputGroupText>
                  <CFormInput
                    type="password"
                    placeholder="Repeat password"
                    autocomplete="new-password"
                    v-model="password_confirmation"
                  />
                </CInputGroup>
                <CAlert color="danger" v-if="error">
                  {{ error }}
                </CAlert>
                <div class="d-grid">
                  <CButton color="primary" class="text-white" @click="register">Create Account</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: '',
    }
  },
  methods: {
    async register() {
      try {
        if (this.password !== this.password_confirmation) throw new Error('Passwords do not match')
        const response = await axios.post(`${this.$store.state.API_URL}/auth/register`, {
          name: this.name,
          username: this.username,
          email: this.email,
          password: this.password,
        })
        if (response.status === 201) {
          localStorage.setItem('token', response.data.token)
          this.$router.push({ name: 'Home'})
        } else {
          throw new Error(response.data.message)
        }        
      } catch (error) {
        this.error = error.response.data.message
      }
    }
  },
}
</script>
