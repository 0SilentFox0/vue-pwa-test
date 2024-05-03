<template>
  <section
    v-if="isValid"
    class="video-cap-container">
    <div class="stream-container">
      <video
        ref="videoRec"
        class="camera"
        muted
        loop
        controls
        autoplay />

      <video
        v-show="newVideo"
        id="newVideo"
        muted
        loop
        controls
        autoplay />
      <template v-if="!isFinished">
        <button
          v-if="!isRecording"
          class="btn flex-center"
          @click="record">
          {{ recordBtnContent }}
        </button>
        <button
          v-else
          class="btn"
          @click="stop">
          <span style="font-size: 3em">{{ stopBtnContent }}</span>
        </button>
      </template>
    </div>
    <div
      v-if="isFinished && !isUploading && uploadUrl"
      class="controls">
      <button
        type="button"
        class="btn"
        @click.prevent="resetVideo">
        Cancel
      </button>
      <button
        type="button"
        class="btn"
        @click.prevent="done">
        Done
      </button>
    </div>
    <h1 class="error-video">
      {{ errText }}
    </h1>
  </section>
</template>

<!-- <script>
export default {
  name: 'VideoCapture',
  components: {},
  props: {
    uploadUrl: {
      default: null,
    },
    recordBtnContent: {
      default: 'Record',
    },
    stopBtnContent: {
      default: '◼',
    },
    cancelBtnContent: {
      default: 'Cancel',
    },
    doneBtnContent: {
      default: 'OK',
    },
  },
  data() {
    return {
      newVideo: false,
      errText: null,
      isValid: true,
      isUploading: false,
      isRecording: false, // recording mode identifier
      isFinished: false, // finished recording - action buttons indicator
      recorder: null, // component wide MediaRecorder
      connection: null, // component wide WebSocket
      videoUrl: null, // link to video - assigned when done writing video file
      stream: null,
    };
  },
  created() {
    if (!this.uploadUrl) this.errText = 'There is no upload url available';
    // this.getWebSocket(); // initialize connection to WebSocket
  },
  mounted() {
    this.resetVideo();
  },
  unmounted() {
    this.stream.getTracks().forEach(function (track) {
      track.stop();
    });
  },
  methods: {
    // reset video display with media device media stream
    resetVideo() {
      this.isFinished = false;
      this.isRecording = false;
      this.isLoading = true;
      this.$refs.videoRec.muted = true;
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: true,
        })
        .then(this.gotStream)
        .catch(() => (this.isValid = false));
    },
    // start recoording
    record() {
      if (!this.uploadUrl) return;
      this.recorder.start();
      this.isRecording = true;
    },
    // stop recording
    stop() {
      this.recorder.stop();
      this.isRecording = false;
      this.isFinished = true;
      // this.connection.send('DONE');
    },
    // reset video diaply and emit video file url
    done() {
      this.resetVideo();
    },
    // initialize MediaRecorder and video element source
    gotStream(mediaStream) {
      this.stream = mediaStream;
      this.recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
        audioBitsPerSecond: 128000,
      });
      this.recorder.ondataavailable = this.videoDataHandler;
      this.$refs.videoRec.src = null;
      this.$refs.videoRec.srcObject = mediaStream;
      this.toggleVideo();
    },
    // handle sending data for writing using the given WebSocket
    videoDataHandler(event) {
      this.isUploading = true;
      let reader = new FileReader();
      reader.readAsArrayBuffer(event.data);

      reader.onloadend = () => {
        const blob = new Blob([reader.result]);
        const video = document.getElementById('newVideo');
        video.src = URL.createObjectURL(blob);
        this.newVideo = true;
      };
    },
    // initialize WebSocket
    // getWebSocket() {
    //   const websocketEndpoint = 'wss://' + this.uploadUrl;
    //   this.connection = new WebSocket(websocketEndpoint);
    //   this.connection.binaryType = 'arraybuffer';
    //   this.connection.onmessage = message => {
    //     this.updateVideoFile(message.data);
    //     this.$refs.videoRec.muted = false;
    //   };
    // },
    // update video when file written
    updateVideoFile(fileName) {
      this.videoUrl = `https://${this.uploadUrl}/uploads/${fileName}.webm`;
      this.toggleVideo();
      this.$refs.videoRec.srcObject = null;
      this.$refs.videoRec.src = this.videoUrl;
      this.isUploading = false;
    },
    // toggle video display
    toggleVideo() {
      this.$refs.videoRec.loop = !this.$refs.videoRec.loop;
      this.$refs.videoRec.controls = !this.$refs.videoRec.controls;
    },
  },
};
</script> -->

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'VideoCapture',
  props: {
    uploadUrl: {
      default: null as string | null,
      type: String,
    },
    recordBtnContent: {
      default: 'Record',
      type: String,
    },
    stopBtnContent: {
      default: '◼',
      type: String,
    },
    doneBtnContent: {
      default: 'OK',
      type: String,
    },
  },
  setup(props) {
    const newVideo = ref(false);
    const errText = ref<string | null>(null);
    const isValid = ref(true);
    const isUploading = ref(false);
    const isRecording = ref(false);
    const isFinished = ref(false);
    let recorder: MediaRecorder | null = null;
    let connection: WebSocket | null = null;
    let videoUrl: string | null = null;
    let stream: MediaStream | null = null;

    const resetVideo = () => {
      isFinished.value = false;
      isRecording.value = false;
      // isLoading.value = true; // isLoading is not defined in the provided script
      navigator.mediaDevices
        .getUserMedia({
          video: {
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
          audio: true,
        })
        .then(gotStream)
        .catch(() => (isValid.value = false));
    };

    const record = () => {
      if (!props.uploadUrl) return;
      recorder?.start();
      isRecording.value = true;
    };

    const stop = () => {
      recorder?.stop();
      isRecording.value = false;
      isFinished.value = true;
      // connection.send('DONE');
    };

    const done = () => {
      resetVideo();
    };

    const gotStream = (mediaStream: MediaStream) => {
      stream = mediaStream;
      recorder = new MediaRecorder(mediaStream, {
        mimeType: 'video/webm',
        audioBitsPerSecond: 128000,
      });
      recorder.ondataavailable = videoDataHandler;
      const videoRec = document.querySelector('video') as HTMLVideoElement;
      videoRec.srcObject = mediaStream;
      toggleVideo(videoRec);
    };

    const videoDataHandler = (event: BlobEvent) => {
      isUploading.value = true;
      const reader = new FileReader();
      reader.readAsArrayBuffer(event.data);

      reader.onloadend = () => {
        const blob = new Blob([reader.result as ArrayBuffer]);
        const video = document.getElementById('newVideo') as HTMLVideoElement;
        video.src = URL.createObjectURL(blob);
        newVideo.value = true;
      };
    };

    const updateVideoFile = (fileName: string) => {
      videoUrl = `https://${props.uploadUrl}/uploads/${fileName}.webm`;
      toggleVideo();
      const videoRec = document.querySelector('video') as HTMLVideoElement;
      videoRec.srcObject = null;
      videoRec.src = videoUrl;
      isUploading.value = false;
    };

    const toggleVideo = (videoRec?: HTMLVideoElement) => {
      if (!videoRec)
        videoRec = document.querySelector('video') as HTMLVideoElement;
      videoRec.loop = !videoRec.loop;
      videoRec.controls = !videoRec.controls;
    };

    onMounted(() => {
      if (!props.uploadUrl) errText.value = 'There is no upload url available';
      resetVideo();
    });

    onUnmounted(() => {
      if (stream) {
        stream.getTracks().forEach((track) => {
          track.stop();
        });
      }
    });

    return {
      newVideo,
      errText,
      isValid,
      isUploading,
      isRecording,
      isFinished,
      record,
      stop,
      done,
      resetVideo,
    };
  },
});
</script>

<style scoped>
video {
  width: 100%;
}
</style>
