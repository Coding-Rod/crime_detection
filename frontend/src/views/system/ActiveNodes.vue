<template>
  <div>
    <h1 class="h3 mb-3 text-center">Active Nodes</h1>
    <!-- for with accordions -->
    <template v-if="nodes.length > 0">
    <CAccordion v-for="node in nodes" :key="node.id">
      <CAccordionItem :item-key="node.id">
        <CAccordionHeader> {{ node.name }} </CAccordionHeader>
        <CAccordionBody>
          <CContainer>
            <CRow>
              <CCol>
                <h1 class="h4 mb-3 text-center">Node ID: {{ node.id }}</h1>
              </CCol>
            </CRow>
            <CRow>
              <CCol md="3" xs="12">
                <p class="text mb-3">Node Name: {{ node.name }}</p>
                <p class="text mb-3">Node location: {{ node.location }}</p>
                <p class="text mb-3">Node status: {{ node.status ? "Active 🟢" : "Inactive 🔴" }}</p>
              </CCol>
              <CCol md="9" xs="12">
                <img :src="node.video" alt="node image" class="img-fluid" />
              </CCol>
            </CRow>
            <CRow>
              <CCol class="d-grid gap-2 mt-3">
                <CButton
                  color="danger"
                  :class="{ 'ms-auto': screenwidth > 768, 'text-white': true }"
                  type="button"
                  >Record
                </CButton>
              </CCol>
            </CRow>
          </CContainer>
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
    </template>
    <template v-else-if="error">
      <p class="text-center">No active nodes</p>
    </template>
    <Loader v-else />
  </div>
</template>
0 auto
<script>
import axios from "axios";
import Loader from "@/components/Loader.vue";
import verifyToken from "@/utils/verifyToken.js";

export default {
  name: "ActiveNodes",
  data() {
    return {
      screenwidth: window.innerWidth,
      nodes : [],
      error: null,
    };
  },
  components: {
    Loader,
  },
  methods: {
    handleResize() {
      this.screenwidth = window.innerWidth;
    },
  },
  async mounted() {
    window.addEventListener("resize", this.handleResize);
    console.log(`${this.$store.state.API_URL}/nodes/`);
    try {
      const response = await axios.get(
        `${this.$store.state.API_URL}/nodes/`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      console.log(response.data);
      this.nodes = response.data;
    } catch (error) {
      this.error = error;
    }
  },
  beforeMount() {
    verifyToken();
  },
};
</script>

<style slot="sass">
</style>