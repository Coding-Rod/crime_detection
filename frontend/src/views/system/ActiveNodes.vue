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
                <p class="text mb-3">Node status: {{ node.status }}</p>
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
    <CSpinner color="primary" v-else variant="grow" style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); z-index: 9999;" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "ActiveNodes",
  data() {
    return {
      screenwidth: window.innerWidth,
      nodes : [],
      error: null,
    };
  },
  methods: {
    handleResize() {
      this.screenwidth = window.innerWidth;
    },
  },
  mounted() {
    window.addEventListener("resize", this.handleResize);
    axios
      .get("http://127.0.0.1:3000/api/v1/nodes")
      .then((response) => {
        console.log(response);
        this.nodes = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style slot="sass">
</style>