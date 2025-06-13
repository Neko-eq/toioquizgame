import { CoreCube } from "./index.js"; // 自分の階層に合わせてパス調整

let cube;
let virtualX = 180;
let virtualY = 180;

function updateToioIcon() {
  const toioElem = document.getElementById("toio");
  toioElem.style.left = virtualX + "px";
  toioElem.style.top = virtualY + "px";
}

document.getElementById("connect").addEventListener("click", async () => {
  try {
    cube = new CoreCube();
    await cube.connect();

    alert("toioに接続しました");

    // 接続後、イベントリスナーを登録
    cube.onButtonPress(() => {
      console.log("ボタンが押されました");
      virtualY -= 10;
      updateToioIcon();
    });

  } catch (e) {
    console.error("接続エラー", e);
    alert("toioとの接続に失敗しました");
  }
});
