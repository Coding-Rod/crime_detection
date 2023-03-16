<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderNav class="d-none d-md-flex me-auto">
        <AppBreadcrumb />
      </CHeaderNav>
      <CHeaderNav>
        <CNavItem>
          <CButton type="button">
            <CIcon class="mx-2" icon="cil-bell" size="lg" />
          </CButton>
        </CNavItem>
        <CNavItem>
          <CButton type="button" @click="$router.push('/settings')">
            <CIcon class="mx-2" icon="cil-settings" size="lg" />
          </CButton>
        </CNavItem>
        <CNavItem>
          <CButton type="button" @click="logout">
            <CIcon class="mx-2" icon="cil-exit-to-app" size="lg" />
            Log out
          </CButton>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from "./AppBreadcrumb";
export default {
  name: "AppHeader",
  components: {
    AppBreadcrumb,
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      location.reload();
    },
  },
  created() {
    // Websocket connection
    this.connection = new WebSocket(this.$store.state.SOCKET_URL);

    this.connection.onopen = () => {
      this.connection.onmessage = (e) => {
        const data = JSON.parse(e.data);
        try {
          if (data.data.type === 3 && localStorage.getItem("id") in data.data.users) {            
            console.log("New notification");
          }
        } catch (e) {
          console.log(data);
        }
      };
    };
  },
};
</script>
