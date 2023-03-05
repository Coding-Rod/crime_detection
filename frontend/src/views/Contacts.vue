<template>
  <div>
    <h1>Contacts</h1>
    <CContainer>
        <CRow>
            <CCol xs="12" md="4">
                <CListGroup>
                    <CListGroupItem v-for="contact in alphabetized_contacts" :key="contact.id">
                        <CContainerFluid>
                            <CRow>
                                <CCol md="10" xs="8" class="d-flex align-items-center justify-content-start" height="100%">
                                    <CRow>
                                        <CCol>
                                            <h5 class="mb-0">{{ contact.name }}</h5>
                                            <p class="mb-0">{{ contact.username }}</p>
                                        </CCol>
                                    </CRow>
                                </CCol>
                                <CCol>
                                    <CButton class="float-end" color="primary" size="sm" @click="remove_contact(contact.id)">
                                        <CIcon name="cil-trash" class="text-white"/>
                                    </CButton>
                                </CCol>
                            </CRow>
                        </CContainerFluid>
                    </CListGroupItem>
                </CListGroup>
            </CCol>
            <CCol>
                <CCard>
                    <CCardHeader>
                        <CInputGroup class="mb-3">
                            <CFormInput placeholder="Enter a username or email of your emergency contact" aria-label="Recipient's username" aria-describedby="basic-addon2" type="search" v-model="search_text"/>
                            <CInputGroupText id="basic-addon2">
                                <CButton @click="search">
                                    <CIcon name="cil-magnifying-glass"/>
                                </CButton>
                            </CInputGroupText>
                        </CInputGroup>
                    </CCardHeader>
                    <CCardBody v-if="found_contact" class="user_card">
                        <div class="user_avatar">
                            <CAvatar :src="found_contact.avatar" size="lg" class="me-2"/>
                            <CCardText>{{ found_contact.username }}</CCardText>
                        </div>
                        <div class="user_info">
                            <CCardTitle>{{ found_contact.name }}</CCardTitle>
                            <CButton 
                                v-if="!found_contact.added"
                                color="primary" 
                                class="text-white"
                                @click="add_contact(found_contact.id)"
                            >Add to contacts
                            </CButton>
                            <CButton 
                                v-else
                                color="danger" 
                                class="text-white"
                                @click="remove_contact(found_contact.id)"
                            >Remove from contacts
                            </CButton>
                        </div>
                    </CCardBody>
                    <CCardBody v-else-if="contact_not_found">
                        <CCardTitle>Contact not found</CCardTitle>
                        <CCardText>Try searching again</CCardText>
                    </CCardBody>
                    <CCardBody v-else>
                        <CCardTitle>Search a new contact</CCardTitle>
                        <CCardText>You can add them to your emergency contacts so they will be notified when any of your nodes detect a harmful situation, you can add a total of 10 contacts</CCardText>
                    </CCardBody>
                </CCard>
            </CCol>                    
        </CRow>
    </CContainer>
  </div>
</template>

<script>
import verifyToken from '@/utils/verifyToken'
import axios from 'axios'

export default {
    name: "Contacts",
    data() {
        return {
            search_text: "",
            found_contact: null,
            contact_not_found: false,
            contacts: []
        };
    },
    methods: {
        search() {
            this.found_contact = this.contacts.find(contact => contact.username === this.search_text);
            this.contact_not_found = !this.found_contact;
        },
        add_contact(id) {
            this.contacts.find(contact => contact.id === id).added = true;
            this.contacts.push(this.contacts.find(contact => contact.id === id));
        },
        async remove_contact(id) {
            await axios.delete(`${this.$store.state.API_URL}/contacts/${id}`,{
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            this.contacts.filter(contact => contact.id !== id);
        }
    },
    computed: {
        contacts() {
            return this.contacts.filter(contact => contact.added);
        },
        contacts_usernames() {
            return this.contacts.map(contact => contact.username);
        },
        alphabetized_contacts() {
            return this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        }
    },
    watch: {
        search_text() {
            this.found_contact = null;
            this.contact_not_found = false;
        }
    },
    beforeMount() {
        verifyToken();
    },
    async mounted() {
        const response = await axios.get(`${this.$store.state.API_URL}/contacts/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
        this.contacts = response.data;
    }
}
</script>

<style scoped>
.user_card {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
}
.user_avatar {
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
}
.user_info {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
}

</style>