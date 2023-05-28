<template>
  <CRow class="mb-4">
    <CCol>
      <CCard style="border-radius: 30px;">
        <CCardBody style="padding: 0;">
          <CRow :class="reverse ? 'card_inside_reverse' : 'card_inside'">
            <CCol :md="12-imgSize" class="mt-4 mb-4 pe-4 ps-4">
              <h2>{{ title }}</h2>
              <p class="text-medium-emphasis h4">{{ subtitle }}</p>
              <p class="content-text">{{ text }}</p>
            </CCol>
            <CCol :md="imgSize" >
              <img v-if="cover" :src="image" class="image_cover" alt="Image" />
              <img v-else :src="image" :class="reverse ? 'image_reverse' : 'image'" alt="Image" />
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
    imgSize: {
      type: Number,
      default: 4,
    },
    cover: {
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
  object-fit: contain;
  margin: 0;
  padding: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 0 30px 30px 0;
}
.image_cover {
  object-fit: cover;
  margin: 0;
  padding: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  border-radius: 30px 0 0 30px;
  flex-wrap: wrap-reverse;
}

.image_reverse {
  margin: 0;
  padding: 0;
  background-color: white;
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 30px 0 0 30px;
  flex-wrap: wrap-reverse;
}

.content-text {
  font-size: 1.1em;
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