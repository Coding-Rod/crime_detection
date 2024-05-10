<template>
  <div class="bg-light min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="6">
          <div class="clearfix">
            <h1 class="float-start display-3 me-4">404</h1>
            <h4 class="pt-3">Oops! You're lost.</h4>
            <p class="text-medium-emphasis float-start">
              The page you are looking for was not found.
            </p>
            <!-- Go to home page button  -->
          </div>
        </CCol>
      </CRow>
      <CRow class="justify-content-center">
        <CCol md="6" class="text-center">
            <router-link to="/">
              <CButton color="primary" class="mt-3 text-white">
                <CIcon name="cil-home" />
                &nbsp; Go to home page
              </CButton>
            </router-link>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
export default {
  name: 'Page404',
}
</script>
