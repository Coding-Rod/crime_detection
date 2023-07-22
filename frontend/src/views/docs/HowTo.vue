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
          code: 'git clone https://github.com/Rod5919/Weapon-detector.git'
        },
        {
          title: 'Install dependencies',
          text: 'Install the dependencies for the project',
          small_text: 'If you are not using a Jetson Nano, just install python dependencies from requirements.txt',
          code: 'bash installer.sh'
        },
        {
          title: 'Start docker server (optional)',
          text: 'This step is only necessary if you are not using a Jetson Nano',
          small_text: 'All instructions are in the docker.txt file',
        },
        {
          title: 'Start flask server',
          text: 'Start model and flask server',
          small_text: 'If file is not executable, run chmod +x start.sh or execute the commands manually',
          code: './start.sh'
        },
        {
          title: 'Sign in',
          text: 'Once the flask server is running, sign in to the web app with the cli',
          small_text: 'The username and password are the same as this account',
          code: "Welcome to the crime detection system controller\nPlease your username and password to start the system\nUsername:\nPassword:"
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
        },
        {
          title: 'EXTRA: Calibrate and configure config file',
          text: 'You can calibralibrate parameters of your hardware in config/config.yml file or use the calibrate.py script to configure brightness, contrast and image size',
          small_text: 'If you are not using a Jetson Nano, just change the camera if necessary and the image parameters',
          code: '#file path: config/config.yml\npython3 calibrate.py'
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
