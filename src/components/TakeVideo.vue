<template>
  <div>
    <div>
      <div
        v-show="
          screenState === ScreenState.Initializing ||
          screenState === ScreenState.InPreview
        ">
        <div class="absolute top-0 right-0 left-0 bottom-0 bg-black">
          <div class="canvas">
            <canvas
              ref="canvasRef"
              :width="data.canvasSize.width"
              :height="data.canvasSize.height" />
          </div>

          <video
            ref="videoRef"
            class="camera absolute top-10 right-0 left-0 bottom-40 z-10"
            muted
            loop
            controls
            playsinline
            autoplay />

          <div class="absolute right-0 left-0 bottom-0 z-20 h-40">
            <img
              v-if="!isRecording"
              src="/take-photo.svg?t=2"
              alt="Foto nemen"
              class="camera-button rounded-full absolute z-20 bottom-10 m-auto left-0 right-0 center w-12 h-12"
              @click.prevent="startRecording" />
            <img
              v-else
              src="/stop-photo.svg?t=2"
              alt="Foto nemen"
              class="camera-button rounded-full absolute z-20 bottom-10 m-auto left-0 right-0 center w-12 h-12"
              @click.prevent="stopRecording" />
            <img
              src="/flip-camera.svg"
              alt="Camera draaien"
              class="flip-camera-button rounded-full absolute z-20 right-10"
              @click="flipCamera" />
            <span
              class="back-camera-button absolute z-20 left-10 w-32"
              @click.prevent="$router.push('/')">
              Terug
            </span>
          </div>

          <div class="absolute right-0 left-0 bottom-40 z-20 h-20">
            <button
              v-if="!isRecording"
              class="btn btn-primary"
              @click="startRecording">
              Start Recording
            </button>
            <button
              v-if="isRecording"
              class="btn btn-danger"
              @click="stopRecording">
              Stop Recording
            </button>
          </div>
        </div>
      </div>

      <div v-show="screenState === ScreenState.Captured">
        <h1>Result</h1>
        <p>The captured image is visible below</p>
        <div class="captured-image">
          <a
            ref="capturedImageLinkRef"
            :href="data.imageUrl"
            download="photo"
            title="photo">
            <img
              ref="capturedImageRef"
              :src="data.imageUrl"
              alt="picture" />
          </a>
        </div>

        <button
          class="btn btn-primary"
          @click.prevent="retry">
          Try again.
        </button>
      </div>

      <div v-show="screenState === ScreenState.VideoCaptured">
        <h1>Video Result</h1>
        <p>The captured video is visible below</p>
        <div class="captured-video">
          <video
            ref="capturedVideoRef"
            controls
            :src="data.videoUrl" />
        </div>
        <a
          ref="capturedVideoLinkRef"
          :href="data.videoUrl"
          download="video.mp4"
          class="btn btn-primary"
          >Download Video</a
        >
        <button
          class="btn btn-primary"
          @click.prevent="retry">
          Try again.
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, reactive, Ref, ref, watch } from 'vue';

enum ScreenState {
  Start = 0,
  Initializing,
  InPreview,
  Captured,
  VideoCaptured,
}

const screenState: Ref<ScreenState> = ref(ScreenState.Start);
const videoRef: Ref<HTMLVideoElement | null> = ref(null);
const canvasRef: Ref<HTMLCanvasElement | null> = ref(null);
const capturedImageRef: Ref<HTMLImageElement | null> = ref(null);
const capturedImageLinkRef: Ref<HTMLAnchorElement | null> = ref(null);
const capturedVideoRef: Ref<HTMLVideoElement | null> = ref(null);
const capturedVideoLinkRef: Ref<HTMLAnchorElement | null> = ref(null);

const data = reactive({
  videoSize: { width: 0, height: 0 },
  canvasSize: { width: 0, height: 0 },
  imageUrl: '',
  videoUrl: '',
});
const stream = ref({} as MediaStream);
const mediaRecorder = ref({} as MediaRecorder);
const recordedChunks = ref([] as Blob[]);

const shouldFaceUser = ref(false);
const isRecording = ref(false);

const initialize = async () => {
  const video = videoRef.value;
  const canvas = canvasRef.value;
  if (!video || !canvas) {
    throw new Error('Implementation error, reference is null');
  }

  const videoConstrains: MediaTrackConstraints = {
    facingMode: shouldFaceUser.value ? 'user' : 'environment',
  };
  stream.value = await navigator.mediaDevices.getUserMedia({
    video: videoConstrains,
    audio: true,
  });

  video.srcObject = stream.value;
  video.addEventListener('canplay', () => {
    if (screenState.value !== ScreenState.Initializing) {
      return;
    }

    const width = video.videoWidth;
    const height = video.videoHeight;
    data.canvasSize.width = width;
    data.canvasSize.height = height;

    data.videoSize.width = video.videoWidth;
    data.videoSize.height = video.videoHeight;

    screenState.value = ScreenState.InPreview;
  });
};

const flipCamera = async () => {
  shouldFaceUser.value = !shouldFaceUser.value;
  await initialize();
};

const retry = () => {
  if (
    screenState.value !== ScreenState.Captured &&
    screenState.value !== ScreenState.VideoCaptured
  ) {
    return;
  }

  const canvas = canvasRef.value;
  const capturedImage = capturedImageRef.value;
  const capturedVideo = capturedVideoRef.value;
  if (!canvas || !capturedImage || !capturedVideo) {
    throw new Error('Implementation error, reference is null');
  }
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to obtain the context from canvas');
  }

  context.fillStyle = '#000000';
  context.fillRect(0, 0, canvas.width, canvas.height);
  const data = canvas.toDataURL('image/png');
  capturedImage.setAttribute('src', data);

  screenState.value = ScreenState.InPreview;
};

const takePicture = () => {
  if (screenState.value !== ScreenState.InPreview) {
    return;
  }
  const video = videoRef.value;
  const canvas = canvasRef.value;
  const capturedImage = capturedImageRef.value;
  if (!video || !canvas || !capturedImage) {
    throw new Error('Implementation error, reference is null');
  }
  const context = canvas.getContext('2d');
  if (!context) {
    throw new Error('Failed to obtain the context from canvas');
  }

  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  data.imageUrl = canvas.toDataURL('image/jpeg');

  screenState.value = ScreenState.Captured;
};

const startRecording = () => {
  if (screenState.value !== ScreenState.InPreview) {
    return;
  }
  recordedChunks.value = [];
  mediaRecorder.value = new MediaRecorder(stream.value);

  mediaRecorder.value.ondataavailable = (event) => {
    if (event.data.size > 0) {
      recordedChunks.value.push(event.data);
    }
  };

  mediaRecorder.value.onstop = () => {
    const blob = new Blob(recordedChunks.value, { type: 'video/mp4' });
    data.videoUrl = URL.createObjectURL(blob);

    screenState.value = ScreenState.VideoCaptured;
  };

  mediaRecorder.value.start();
  isRecording.value = true;
};

const stopRecording = () => {
  if (!isRecording.value) {
    return;
  }
  mediaRecorder.value.stop();
  isRecording.value = false;
};

watch(screenState, async (state) => {
  if (state === ScreenState.Initializing) {
    await initialize();
    return;
  }
});

onMounted(() => {
  screenState.value = ScreenState.Initializing;
});

onBeforeUnmount(() => {
  const video = videoRef.value;
  stream.value.getTracks().forEach(function (track) {
    track.stop();
  });
  if (video) {
    video.pause();
    video.remove();
  }
});
</script>

<style scoped>
img.camera-button {
  height: 60px;
  width: 60px;
  -webkit-touch-callout: none;
}

img.flip-camera-button {
  height: 30px;
  width: 30px;
  bottom: 60px;
  color: white;
  -webkit-touch-callout: none;
}

span.back-camera-button {
  bottom: 60px;
  font-size: 20px;
  color: white;
}

div.overlay {
  bottom: 0;
  top: 0;
  width: 100%;
  padding: 0.2rem;
  color: #ffcc00;
  font-size: 12px;
}

div.control {
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 0.5rem 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
}

canvas {
  height: 0;
}

div.control > div {
  margin: 0 6px;
}

div.video {
  top: 0;
  left: 0;
  background-color: #111111;
  /* width: 100vw;
  height: 100vh; */
  display: flex;
  justify-content: center;
  align-items: center;
}

div.video > video {
  width: 100%;
  height: 100%;
}

div.canvas {
  top: 0;
  left: 0;
  visibility: hidden;
}

div.captured-image {
  top: 0;
  left: 0;
  background-color: #202020;
  display: flex;
  justify-content: center;
  align-items: center;
}

div.captured-image img {
  max-width: 100%;
  max-height: 100%;
}
</style>
