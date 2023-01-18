<template>
  <div>
    <h1 class="h3 mb-3 text-center">Recorded Videos</h1>
    <!-- Search bar -->
    <CContainer>
      <CRow>
        <CCol>
          <CInputGroup class="mb-3">
            <CFormInput
              placeholder="Search bar"
              aria-label="Recipient's username"
              aria-describedby="basic-addon2"
              v-model="search"
            />
          </CInputGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol
          v-for="video in videosOnPage"
          :key="video.id"
          class="mb-3"
          md="6"
          xs="12"
        >
          <CListGroup>
            <CListGroupItem
              class="d-flex justify-content-between"
            >
              <div class="ms-2 me-auto d-flex flex-column justify-content-center">
                <img
                  :src="video.video"
                  alt="node image"
                  class="img-fluid"
                  style="width: 100%; max-height: 300px;"
                />
                <div class="fw-bold ">{{ video.name }}</div>
                <p class="mb-3 ms-auto">{{ video.location }} - {{ video.date.getHours() }}:{{ video.date.getMinutes() }} {{ video.date.getDate() }}/{{ video.date.getMonth() }}/{{ video.date.getFullYear() }}</p>
              </div>
            </CListGroupItem>
          </CListGroup>
        </CCol>
      </CRow>
      <!-- Pagination -->
      <CRow>
        <CCol class="d-flex justify-content-center">
          <CPagination align="center" aria-label="Page navigation example">
            <CPaginationItem 
              :disabled="page === 1"
              @click="page=page===1?page:page-1"
              style="user-select: none"
              >Previous</CPaginationItem>
            <CPaginationItem 
              v-for="i in pages" 
              :key="i" 
              :active="i === page"
              @click="page=i"
              style="user-select: none"
              >
              {{ i }}
            </CPaginationItem>
            <CPaginationItem 
              :disabled="page === pages"
              @click="page=page===pages?page:page+1"
              style="user-select: none"
            >Next</CPaginationItem>
          </CPagination>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "RecordedVideos",
  data() {
    return {
      search: "",
      screenwidth: window.innerWidth,
      page: 1,
    };
  },
  computed: {
    ...mapState(["videos"]),
    filteredVideos() {
      return this.videos.filter((video) => {
        return video.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
    videosOnPage() {
      return this.filteredVideos.slice((this.page - 1) * 10, this.page * 10);
    },
    pages() {
      return Math.ceil(this.filteredVideos.length / 10);
    },
  },
  created() {
    this.$store.dispatch("getVideos");
  },
  methods: {
    handleResize() {
      this.screenwidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
  },
};
</script>

<style>
</style>