<template>
  <CSpinner color="primary" variant="grow" class="spinner" />
</template>

<script>
export default {};
</script>

<style scoped>
.spinner {
  position: relative;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  margin-top: 100px;
  margin-bottom: 100px;
}
</style>