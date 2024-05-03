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
          Record
        </button>
        <button
          v-else
          class="btn"
          @click="stop">
          <span style="font-size: 3em">Stop</span>
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

<script lang="ts">
import { defineComponent, onMounted, onUnmounted, ref } from 'vue';

export default defineComponent({
  name: 'VideoCapture',
  props: {
    uploadUrl: {
      default: null as string | null,
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
