<template>
  <div>
    <h1>How to</h1>
    <card-w-image-or-code
      v-for="i in 4"
      :key="i"
      :header="`Step ${i}`"
      title="Title"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc."
      :image="i % 2 === 0 ? 'https://picsum.photos/300/200' : ''"
      :small_text="i<3 ? 'Last updated 3 mins ago' : ''"
      :code="i==4 ? `console.log('Hello World')` : ''"
    />
  </div>
</template>

<script>
import CardWImageOrCode from '@/components/CardWImageOrCode'
import verifyToken from '@/utils/verifyToken'

export default {
  name: 'HowTo',
  components: {
    CardWImageOrCode
  },
  beforeMount() {
    verifyToken()
  }
}
</script>

<style>

</style>