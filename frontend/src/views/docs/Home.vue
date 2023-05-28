<template>
  <div>
    <h1 class="h3 mb-3">Information</h1>
    <CardWImage
      v-for="(value, index) in content"
      :key="index"
      :title="value.title"
      :subtitle="value.subtitle"
      :image="value.image"
      :text="value.text"
      :reverse="index % 2 === 0"
      :img-size="value.imgSize"
    />
  </div>
</template>

<script>
import CardWImage from '@/components/CardWImage'
import verifyToken from '@/utils/verifyToken'

export default {
  name: 'Home',
  data() {
    return {
      content: [
        {
          title: 'Problem',
          subtitle: 'Inadequate Video Surveillance Systems',
          image: require('@/assets/images/gun.jpg'),
          text:
            "Currently, the use of weapons to commit robberies and assaults has become increasingly recurrent, generating a growing sense of insecurity among the population. These weapons represent a threat both to people's physical integrity and to their lives. Current video surveillance systems are not capable of generating rapid responses to these types of criminal situations. In order to achieve early action to avoid possible tragedies, these passive video surveillance systems must be constantly monitored, which implies considerable monthly costs for the hiring of security personnel.",
        },
        {
          title: 'Objective',
          subtitle: 'Detect Weapons in Real Time',
          image: require('@/assets/images/Detection.png'),
          text:
            'Develop an IoT weapon detection system based on artificial vision and deep learning capable of sending notifications to smart devices about the possible presence of individuals with weapons in homes or businesses.',
        },
        {
          title: 'Software',
          subtitle: 'How is the software architecture?',
          image: require('@/assets/images/Software_Diagram.png'),
          text:
            'In this project, the software is divided into three main groups: Mobile, Server and IoT Node. In the Mobile section, Ionic and Android are used to develop hybrid mobile applications. The Server, hosted on Digital Ocean droplets, uses Node.js, Vue.js and PostgreSQL to receive notifications, store information and display it in user interfaces. Finally, the IoT Node, on a Jetson Nano, uses Docker and Flask to run a weapon detection model, receive camera images and send information to the server. Together, these technologies enable the integral operation of the project in the areas of Mobile, Server and IoT Node.',
          imgSize: 5
        },
        {
          title: 'Hardware',
          subtitle: 'How is the hardware build?',
          image: require('@/assets/images/Hardware_Diagram.png'),
          text:
            "The IoT node is based on a Jetson Nano that runs the weapon detection model and controls the main components. This includes a camera to capture images, a motion sensor to trigger the model's inference, a wireless The system status indicators are as follows: the blue color indicates that the system is in an idle state, the light blue color indicates that the system is searching for weapons, the red color indicates that the alarm is sounding, the magenta color indicates that a notification has been sent, the green color indicates that the system is starting up and if the LED is off, it means that the system is not on. These colors visually identify the status of the weapon detection system.",
            imgSize: 5
        }
      ]
    }
  },
  components: {
    CardWImage
  },
  beforeMount() {
    verifyToken()
  }
}

</script>
