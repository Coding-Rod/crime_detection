<template>
  <CContainer>
    <CRow>
      <CCol>
        <h1>Notifications</h1>
      </CCol>
    </CRow>
    <CTable>
      <CTableHead>
        <CTableRow color="dark">
          <CTableHeaderCell scope="col">#</CTableHeaderCell>
          <CTableHeaderCell scope="col">Message</CTableHeaderCell>
          <CTableHeaderCell scope="col">Owner</CTableHeaderCell>
          <CTableHeaderCell scope="col">Date</CTableHeaderCell>
        </CTableRow>
      </CTableHead>
      <CTableBody>
        <CTableRow
          v-for="(notification, index) in format_date_notification"
          :key="index"
          :color="colors[notification.type - 1]"
        >
          <CTableHeaderCell scope="row">{{ index + 1 }}</CTableHeaderCell>
          <CTableDataCell><CIcon :icon="icons[notification.type - 1]" size="lg" /> {{ notification.message }}</CTableDataCell>
          <CTableDataCell>{{ notification.name }}</CTableDataCell>
          <CTableDataCell>{{ notification.created_at }}</CTableDataCell>
        </CTableRow>
        <CTableRow color="light" v-if="more">
          <CTableDataCell colspan="3" class="text-center">
            <CButton @click="offset += 10" color="link" style="text-decoration: none">
              Load more
            </CButton>
          </CTableDataCell>
        </CTableRow>
      </CTableBody>
    </CTable>
    <span>{{format_date_notification}}</span>
  </CContainer>
</template>

<script>
import verifyToken from "@/utils/verifyToken";
import axios from "axios";

export default {
  data() {
    return {
      notifications: [],
      offset: 0,
      more: true,
      colors: ["primary", "secondary", "danger"],
      icons: [
        'cil-memory',
        'cil-user',
        'cil-warning',
        'cil-laptop',
      ],
    };
  },
  computed: {
    format_date_notification() {
      return this.notifications.map((notification) => {
        return {
          ...notification,
          created_at: new Date(notification.created_at).toLocaleString(
            "en-US",
            {
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            }
          ),
        };
      });
    },
  },
  watch: {
    offset() {
      this.getNotifications();
    },
  },
  methods: {
    async getNotifications() {
      axios
        .get(
          this.$store.state.API_URL +
            "/notifications?types=1,2,3&limit=11&offset=" +
            this.offset,
          {
            headers: {
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        )
        .then((response) => {
          this.more = response.data.length > 10;
          if (this.more) response.data.pop();
          this.notifications = this.notifications.concat(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },  
  beforeMount() {
    verifyToken();
  },
  mounted() {
    this.getNotifications();
  },
};
</script>

<style>
</style>