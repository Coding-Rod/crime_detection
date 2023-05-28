<template>
  <div class="mb-4">
    <CCard v-if="image.length === 0 && code.length === 0">
      <CCardHeader component="h5">{{ header }}</CCardHeader>
      <CCardBody>
        <CCardTitle>{{ title }}</CCardTitle>
        <CCardText>
          {{ text }}
        </CCardText>
        <CCardText
          ><small class="text-muted"
            >{{ small_text }}</small
          ></CCardText
        >
      </CCardBody>
    </CCard>
    <!-- Card with code sample -->
    <CCard v-else-if="code">
      <CCardHeader component="h5">{{ header }}</CCardHeader>
      <CCardBody>
        <CCardTitle>{{ title }}</CCardTitle>
        <CCardText>
          {{ text }}
        </CCardText>
        <CCardText class="code">
          <pre><code>{{ code }}</code></pre>
        </CCardText>
        <CCardText
          ><small class="text-muted"
            >{{ small_text }}</small
          ></CCardText
        >
      </CCardBody>
    </CCard>
    <CCard v-else>
      <CRow class="g-0">
        <CCol :md="4">
          <CCardHeader component="h5">{{ header }}</CCardHeader>
          <CCardImage class="rounded-0" :src="image" alt="image" />
        </CCol>
        <CCol :md="8">
          <CCardBody>
            <CCardTitle>{{ title }}</CCardTitle>
            <CCardText
              >{{ text }}</CCardText
            >
            <CCardText
              ><small class="text-muted"
                >{{ small_text }}</small
              ></CCardText
            >
          </CCardBody>
        </CCol>
      </CRow>
    </CCard>
  </div>
</template>

<script>
export default {
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
    image: {
      type: String,
      default: '',
    },
    code: {
      type: String,
      default: "Code",
    },
    small_text: {
      type: String,
      default: "",
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
.code {
  background-color: #333435;
  color: #fff;
  border-radius: 0.25rem;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>
