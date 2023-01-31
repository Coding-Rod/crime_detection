<template>
  <div class="mb-4">
    <CCard>
      <CCardHeader component="h5">{{ header }}</CCardHeader>
      <CCardBody>
        <CCardTitle>{{ title }}</CCardTitle>
        <CCardText>{{ text }}</CCardText>
        <CButton
          v-if="modal"
          color="primary"
          class="text-white"
          @click="
            () => {
              visible = true;
            }
          "
          >More...</CButton
        >
      </CCardBody>
    </CCard>
    <CModal
      :visible="visible"
      @close="
        () => {
          visible = false;
        }
      "
    >
      <CModalHeader>
        <CModalTitle>{{ modal_title }}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CImage
          fluid
          :src="image"
          style="width: 100%; height: 100%; object-fit: cover"
        />
        <p v-if="modal_text">{{ modal_text }}</p>
      </CModalBody>
      <CModalFooter>
        <CButton
          @click="copyToClipboard()"
          color="primary"
          class="text-white"
          >Copy to clipboard</CButton
        >
      </CModalFooter>
    </CModal>
    <CToast v-if="showToast && code" style="position: absolute; bottom: 5px; right: 5px; z-index: 9999">
      <CToastHeader closeButton>
        <svg
          class="rounded me-2"
          width="20"
          height="20"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMid slice"
          focusable="false"
          role="img"
        >
          <rect width="100%" height="100%" fill="#007aff"></rect>
        </svg>
        <span class="me-auto fw-bold">Web Message</span>
        <small>Just now</small>
      </CToastHeader>
      <CToastBody>Copied to Clipboard</CToastBody>
    </CToast>
  </div>
</template>

<script>
export default {
  data() {
    return {
      visible: false,
      showToast: false,
    };
  },
  props: {
    header: {
      type: String,
      default: "Header",
    },
    title: {
      type: String,
      default: "Title",
    },
    text: {
      type: String,
      default: "Text",
    },
    modal: {
      type: Boolean,
      default: false,
    },
    image: {
      type: String,
      default: "https://picsum.photos/300/200",
    },
    text: {
      type: String,
      default: "Text",
    },
    modal_title: {
      type: String,
      default: "Modal title",
    },
    modal_text: {
      type: String,
      default: "Modal text",
    },
    code: {
      type: String,
      default: "Code",
    },
  },
  methods: {
    copyToClipboard() {
      navigator.clipboard.writeText(this.code);
      this.showToast = true;
      setTimeout(() => {
        this.showToast = false;
      }, 3000);
    },
  },
};
</script>

<style>
</style>
