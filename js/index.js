const video = document.querySelector("#video");
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

navigator.mediaDevices.getUserMedia({ video: true }).then((stream) => {
  video.srcObject = stream;
});

video.addEventListener("loadeddata", () => {
  canvas.width = video.videoWidth;
  canvas.height = video.videoHeight;

  chromaKey();
  setInterval(() => chromaKey(), 40);
});

function chromaKey() {
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height);

  const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const dataLength = imageData.data.length / 4;

  for (let i = 0; i < dataLength; i++) {
    const offset = i * 4;

    const red = imageData.data[offset + 0];
    const green = imageData.data[offset + 1];
    const blue = imageData.data[offset + 2];

    if (green > 90 && green > red && green > blue) {
      imageData.data[offset + 3] = 0;
    }
  }

  ctx.putImageData(imageData, 0, 0);
}
