<template>
  <CHeader position="sticky" class="mb-4">
    <CContainer fluid>
      <CHeaderToggler class="ps-1" @click="$store.commit('toggleSidebar')">
        <CIcon icon="cil-menu" size="lg" />
      </CHeaderToggler>
      <CHeaderBrand class="mx-auto d-lg-none" to="/">
        <CIcon :icon="logo" height="48" alt="Logo" />
      </CHeaderBrand>
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
          <CButton type="button">
            <CIcon class="mx-2" icon="cil-settings" size="lg" />
          </CButton>
        </CNavItem>
        <CNavItem>
          <CButton type="button">
            <CIcon class="mx-2" icon="cil-exit-to-app" size="lg" />
            Log out
          </CButton>
        </CNavItem>
      </CHeaderNav>
    </CContainer>
  </CHeader>
</template>

<script>
import AppBreadcrumb from './AppBreadcrumb'
import { logo } from '@/assets/brand/logo'
export default {
  name: 'AppHeader',
  components: {
    AppBreadcrumb,
  },
  setup() {
    return {
      logo,
    }
  },
}
</script>
