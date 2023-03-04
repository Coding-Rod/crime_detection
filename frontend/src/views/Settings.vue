<template>
  <CContainer>
    <CRow>
      <CCol>
        <h1>Settings</h1>
      </CCol>
    </CRow>
    <CRow>
      <CCol xs="12" md="3" class="d-flex justify-content-center">
        <img src="@/assets/images/avatars/2.jpg" class="avatar" alt="avatar" />
      </CCol>
      <CCol
        xs="12"
        md="9"
        :class="{
          'd-flex': screenWidth < 768,
          'justify-content-center': screenWidth < 768,
        }"
      >
        <CButtonGroup vertical class="mt-3">
          <CButton
            color="primary"
            class="text-white"
            :visible="modalVisible"
            @click="
              () => {
                modalVisible = true;
              }
            "
            >Show picture</CButton
          >
          <CButton color="primary" class="text-white">Edit Picture</CButton>
        </CButtonGroup>
      </CCol>
    </CRow>
    <CRow>
      <CCol>
        <CForm>
          <div class="mb-3">
            <CFormLabel for="InputName1">Name address</CFormLabel>
            <CFormInput
              type="text"
              id="InputName1"
              aria-describedby="NameHelp"
              name="name"
            />
            <CFormText id="NameHelp"
              >We'll never share your name with anyone else.</CFormText
            >
          </div>
          <div class="mb-3">
            <CFormLabel for="InputEmail1">Email address</CFormLabel>
            <CFormInput
              type="email"
              id="InputEmail1"
              aria-describedby="emailHelp"
            />
            <CFormText id="emailHelp"
              >We'll never share your email with anyone else.</CFormText
            >
          </div>
          <div class="mb-3">
            <CFormLabel for="inputPassword5">Password</CFormLabel>
            <CFormInput
              type="password"
              id="inputPassword5"
              aria-describedby="passwordHelpBlock"
            />
            <CFormText id="passwordHelpBlock">
              Your password must be 8-20 characters long, contain letters and
              numbers, and must not contain spaces, special characters, or
              emoji.
            </CFormText>
          </div>
        </CForm>
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
      <!-- FIXME: This modal is not working, image is not showing -->
      <CModalBody
        :style="{
          background: `url('${image}') cover center no-repeat`,
          height: '80vh',
        }"
        class="avatar-modal"
      />
    </CModal>
  </CContainer>
</template>

<script>
import verifyToken from "@/utils/verifyToken";

export default {
  data() {
    return {
      modalVisible: false,
      image:
        "https://pexels.com/photo/white-and-black-dog-lying-on-brown-wooden-floor-1108096/",
      screenWidth: window.innerWidth,
    };
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
  methods: {
    handleResize() {
      this.screenWidth = window.innerWidth;
    },
  },
  beforeMount() {
    verifyToken();
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