<template>
  <div>
    <h1 class="h3 mb-3">Information</h1>
    <CardWImage
      v-for="i in 3"
      :key="i"
      title="Title"
      subtitle="Lorem ipsum dolor sit amet, consectetur adipiscing elit"
      image="https://picsum.photos/300/200"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc. Sed euismod, nisl vel tincidunt aliquam, nunc nisl aliquam tortor, eget aliquam nunc nisl sit amet nunc."
      :reverse="i % 2 === 0"
    />
  </div>
</template>

<script>
import CardWImage from '@/components/CardWImage'
import verifyToken from '@/utils/verifyToken'

export default {
  name: 'Home',
  components: {
    CardWImage
  },
  beforeMount() {
    verifyToken()
  }
}

</script>