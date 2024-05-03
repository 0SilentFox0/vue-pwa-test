declare let self: DedicatedWorkerGlobalScope;
export {};

let counter = 1;

self.onmessage = (e) => {
  if (e.data === 'ping') {
    self.postMessage({ msg: `pong ${counter}` });
    counter++;
  } else if (e.data === 'clear') {
    counter = 1;

    self.postMessage({ msg: null, mode: null });
  }
};
