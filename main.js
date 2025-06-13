// main.js
let cube;

document.getElementById("connect").addEventListener("click", async () => {
  cube = new CoreCube(); // グローバルに定義されている
  await cube.connect();
  alert("接続しました！");
});
