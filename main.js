// main.js
let cubeEl = document.getElementById("cube");

document.getElementById("connect").addEventListener("click", async () => {
  alert("仮想toioに接続！（実機toioとの接続は今は省略）");
  // toioのBluetooth接続コードを書くならここ
});

document.getElementById("answer").addEventListener("click", () => {
  // 正解で仮想toioを移動させる例
  moveCubeTo(200, 150);
  document.getElementById("question").innerText = "正解です！次の問題へ";
});

function moveCubeTo(x, y) {
  cubeEl.style.left = `${x}px`;
  cubeEl.style.top = `${y}px`;
}
