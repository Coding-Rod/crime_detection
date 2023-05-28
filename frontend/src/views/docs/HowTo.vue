<template>
  <div>
    <h1>How to</h1>
    <card-w-image-or-code
      v-for="(value, index) in instructions"
      :key="index"
      :header="`Step ${index + 1}`"
      :title="value.title"
      :text="value.text??''"
      :image="value.image"
      :small_text="value.small_text"
      :code="value.code ?? ''"
    />
  </div>
</template>

<script>
import CardWImageOrCode from '@/components/CardWImageOrCode'
import verifyToken from '@/utils/verifyToken'

// Steps:
// 1. Clone github repo
// 2. Install dependencies
// 3. Create config.yml file
// 4. Run docker server
// 5. Run flask server
// 6. Sign in
// 7. Set node data
// 8. Check Active Nodes page for your node

export default {
  name: 'HowTo',
  data() {
    return {
      instructions: [
        {
          title: 'Clone github repository',
          text: 'Clone the github repo to Jetson Nano',
          small_text: 'You can also download the zip file and unzip it',
          code: 'git clone -b controller https://github.com/Rod5919/crime_detection.git'
        },
        {
          title: 'Install dependencies',
          text: 'Install the dependencies for the project',
          small_text: 'This file is located in the root of the project',
          code: 'bash installer.sh'
        },
        {
          title: 'Create config.yml file',
          text: 'Create a config.yml file in the root of the project',
          small_text: 'This file is located in the config folder',
          code: 'touch config.yml'
        },
        {
          title: 'Run docker server',
          text: 'Run the docker server',
          small_text: 'This file is located in the src folder',
          code: 'bash docker.sh'
        },
        {
          title: 'Start flask server',
          text: 'Start model and flask server',
          small_text: 'If file is not executable, run chmod +x start.sh or execute the commands manually',
          code: 'bash start.sh'
        },
        {
          title: 'Sign in',
          text: 'Once the flask server is running, sign in to the web app with the cli',
          small_text: 'The username and password are the same as this account',
        },
        {
          title: 'Set node data',
          text: 'Set the node data in the web app',
          small_text: 'Don\'t forget to open the URL in a browser',
          image: require('@/assets/images/flask.jpeg')
        },
        {
          title: 'Check Active Nodes page for your node',
          text: 'Check the Active Nodes page for your node',
          image: require('@/assets/images/Active_nodes.png')
        }
      ]
    }
  },
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