<template>
  <div>
    <h1>How to</h1>
    <card-w-modal 
      v-for="i in 4"
      :key="i"
      :header="`Step ${i}`"
      title="Title"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc."
      :modal="i % 2 !== 0"
      image="https://picsum.photos/300/200"
      modal_title="Modal title"
      :modal_text="`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc. ${i}`"
      code="console.log('Hello World')"
    />
  </div>
</template>

<script>
import CardWModal from '@/components/CardWModal'
export default {
  name: 'HowTo',
  components: {
    CardWModal
  }
}
</script>

<style>

</style>