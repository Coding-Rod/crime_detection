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
          <CDropdown inNav>
            <CDropdownToggle color="transparent">
              <CIcon class="mx-2" icon="cil-bell" size="lg" />
            </CDropdownToggle>
            <CDropdownMenu placement="bottom-end">
              <CDropdownItem 
                disabled
                v-for="notification in notifications"
                :key="notification.id"
                :style="{ backgroundColor: notification.type === 3 ? '#f8d7da' : ''}"
                class="text-dark"
                >
                <CIcon :icon="icons[notification.type - 1]" size="lg" />
                {{ notification.message }}
                <br />
                <small>{{ notification.created_at }}</small>
              </CDropdownItem>
              <CDropdownDivider />
              <CDropdownItem @click="$router.push('/notifications')">
                See all notifications
              </CDropdownItem>
            </CDropdownMenu>
          </CDropdown>
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
import axios from 'axios';
import AppBreadcrumb from "./AppBreadcrumb";

export default {
  name: "AppHeader",
  data() {
    return {
      icons: [
        'cil-memory',
        'cil-user',
        'cil-warning',
        'cil-laptop',
      ],
      notifications: [],
    };
  },
  components: {
    AppBreadcrumb,
  },
  methods: {
    async showNotification(message) {
      // Request permission to show notifications
      const permission = await Notification.requestPermission();
      
      // If the user granted permission, show the notification
      if (permission === "default" || permission === "granted") {
        new Notification("Weapon Detected!", {
          body: message,
          onClick: () => {
            window.focus();
          },
        });
      }
    },
    async getNotifications(){
      axios
        .get(this.$store.state.API_URL + "/notifications?limit=5", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        })
        .then((response) => {
          this.notifications = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    logout() {
      localStorage.removeItem("token");
      localStorage.removeItem("id");
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
            this.showNotification(data.data.message);
          }
        } catch (e) {
          console.log(data);
        }
      };
    };

  },
  async mounted() {
    // Get notifications
    await this.getNotifications();
  },
};
</script>
