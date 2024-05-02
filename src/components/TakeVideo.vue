<template>
  <div>
    <div class="camera">
      <video ref="videoPlayer" playsinline autoplay class="feed" />
    </div>
    <div class="photo-information">
      <p>At least one video must be taken</p>
    </div>
    <div class="buttons">
      <button label="Change Camera Position" @click="toggleCameraPosition" />
      <button
        label="Start Recording"
        class="btnStart"
        @click="startRecording" />
      <button
        v-if="!videoData"
        class="btnStop"
        label="Stop Recording"
        @click="stopRecording" />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  data() {
    return {
      cameraPosition: 'face',
      stream: null,
      mediaRecorder: null as MediaRecorder | null,
      recordedChuncks: [] as Blob[],
      videoData: '',
    };
  },
  mounted() {
    this.init('face');
  },
  methods: {
    goBackToPreviousPage() {
      this.stopCamera();
    },
    startRecording() {
      const video = this.$refs.videoPlayer as HTMLVideoElement;
      const stream = video.srcObject as MediaStream;
      this.mediaRecorder = new MediaRecorder(stream);

      this.mediaRecorder.addEventListener('dataavailable', event => {
        if (event.data.size > 0) {
          this.recordedChuncks.push(event.data);
        }
      });

      this.mediaRecorder.start();

      navigator.serviceWorker.getRegistration().then(reg => {
        reg?.showNotification('Challenge 2: Make a video', {
          body: 'Recording has begun',
        });
      });

      this.mediaRecorder.addEventListener('stop', () => {
        const blob = new Blob(this.recordedChuncks, {
          type: 'video/mp4',
        });
        this.videoData = URL.createObjectURL(blob);

        localStorage.setItem('videoData', this.videoData);

        this.stopCamera();

        navigator.serviceWorker.getRegistration().then(reg => {
          reg?.showNotification('Challenge 2: Make a video', {
            body: 'Recording has stopped',
          });
        });
      });
    },
    stopRecording() {
      if (this.mediaRecorder && !this.videoData) {
        this.mediaRecorder.stop();
      }
    },
    toggleCameraPosition() {
      this.stopCamera();

      if (this.cameraPosition === 'face') {
        this.cameraPosition = 'environment';
      } else {
        this.cameraPosition = 'face';
      }
      this.init(this.cameraPosition);
    },
    init(cameraPosition: string) {
      const constraints = {
        video: { facingMode: cameraPosition },
        audio: true,
      };
      if (
        'mediaDevices' in navigator &&
        'getUserMedia' in navigator.mediaDevices
      ) {
        navigator.mediaDevices.getUserMedia(constraints).then(stream => {
          const videoPlayer = this.$refs.videoPlayer as HTMLVideoElement;
          videoPlayer.srcObject = stream;
          videoPlayer.play();
        });
      } else {
        alert('Cannot get media devices');
      }
    },
    takeVideo() {
      this.stopCamera();
    },
    stopCamera() {
      const videoPlayer = this.$refs.videoPlayer as HTMLVideoElement;
      const stream = videoPlayer.srcObject as MediaStream;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
      }
    },
  },
});
</script>

<style scoped>
.camera {
  display: flex;
  width: 100%;
  padding: 25px;
  box-sizing: border-box;
  justify-content: center;
}

.feed {
  display: block;
  width: auto;
  height: 450px;
  background-color: #171717;
  box-shadow: 4px 4px 12px 0px rgba(0, 0, 0, 0.35);
}

.photo-information,
.buttons {
  margin: 15px;
}

.photo-information {
  display: flex;
  align-items: center;
  justify-content: start;
  gap: 10px;
  background-color: orange;
  color: aliceblue;
  border-radius: 10px;
  padding: 10px;
}

.photo-information img {
  width: 25px;
}

.buttons {
  display: flex;
  justify-content: center;
  gap: 15px;
  padding-bottom: auto;
}

.btnStop {
  background-color: red;
}

.btnStart {
  background-color: green;
}
</style>
