<template>
  <CRow class="mb-4">
    <CCol>
      <CCard style="border-radius: 30px;">
        <CCardBody style="padding: 0;">
          <CRow :class="reverse ? 'card_inside_reverse' : 'card_inside'">
            <CCol md="8" class="mt-4 mb-4 pe-4 ps-4">
              <h2>{{ title }}</h2>
              <p class="text-medium-emphasis">{{ subtitle }}</p>
              <p>{{ text }}</p>
            </CCol>
            <CCol md="4" style="margin: 0; padding: 0; border: 0;">
              <img :src="image" :class="reverse ? 'image_reverse' : 'image'" alt="Image" />
            </CCol>
          </CRow>
        </CCardBody>
      </CCard>
    </CCol>
  </CRow>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Title",
    },
    subtitle: {
      type: String,
      default: "Subtitle",
    },
    image: {
      type: String,
      default: "https://picsum.photos/200/300",
    },
    text: {
      type: String,
      default: "Text",
    },
    reverse: {
      type: Boolean,
      default: false,
    },
  },
};
</script>

<style scoped>
.card_inside {
  display: flex;
  flex-direction: row;
}
.card_inside_reverse {
  display: flex;
  flex-direction: row-reverse;
}
.image {
  margin: 0;
  padding: 0 11px;
  border: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 0 30px 30px 0;
}
.image_reverse {
  margin: 0;
  padding: 0 11px;
  border: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 30px 0 0 30px;
  flex-wrap: wrap-reverse;
}

@media screen {
  @media (max-width: 768px) {
    .image,
    .image_reverse {
      border-radius: 0 0 30px 30px;
    }
  }
}
</style>