// main.js

let p5tCube = null; // 接続されたToioキューブのインスタンス
let currentQuestionIndex = 0;

// 効果音のAudioオブジェクトをグローバルで定義
let correctSound;
let incorrectSound;

// quizQuestions 配列の例（既存の問題に続けて、カンマで区切って追加します）
let quizQuestions = [
    // 既存の問題 1
    {
        question: "日本の首都はどこ？",
        choices: {
            topLeft: "大阪",
            topRight: "東京",
            bottomLeft: "福岡",
            bottomRight: "札幌"
        },
        correctDirection: "topRight"
    },
    // 既存の問題 2
    {
        question: "世界で一番高い山は？",
        choices: {
            topLeft: "K2",
            topRight: "マッターホルン",
            bottomLeft: "モンブラン",
            bottomRight: "エベレスト"
        },
        correctDirection: "bottomRight"
    },
    // --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "岐阜協立大学で開講されていない授業はどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "災害支援論",
            topRight: "ネットワーク経営",
            bottomLeft: "現代企業論",
            bottomRight: "西濃地域研究"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomRight" // 例: "topRight"
    },
    // --- 別の問題を追加したい場合は、上記のテンプレートをコピーして、この下に貼り付けてください ---
    // --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "岐阜県で存在している市町村はどれ？。",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "瑞穂町",
            topRight: "御嶽町",
            bottomLeft: "富加町",
            bottomRight: "大和市"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "今何問目？(2進数で回答)",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "101",
            topRight: "111",
            bottomLeft: "100",
            bottomRight: "110"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "映画「千と千尋の神隠し」の監督は誰？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "押井守",
            topRight: "新海誠",
            bottomLeft: "宮崎駿",
            bottomRight: "細田守"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "サッカーの試合は1試合何分？（前後半合計）",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "90分",
            topRight: "100分",
            bottomLeft: "80分",
            bottomRight: "120分"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "東京都に含まれている島はどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "西表島",
            topRight: "国後島",
            bottomLeft: "隠岐島",
            bottomRight: "三宅島"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: " 『ドラゴンボール』で孫悟空が初めて変身する超サイヤ人は何編？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "サイヤ人編",
            topRight: "フリーザ編",
            bottomLeft: "セル編",
            bottomRight: "魔人ブウ編"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "人工知能「AI」の意味は何の略？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: " Artificial Intelligence",
            topRight: "Automated Intelligence",
            bottomLeft: "Advanced Internet",
            bottomRight: "apple intelligence"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "名刺交換のマナーとして正しいのはどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "相手の名刺にメモをすぐ書き込む",
            topRight: "相手より先に名刺を差し出す",
            bottomLeft: "自分の名刺を両手で渡す",
            bottomRight: "机の上に置いて交換する"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "「KPI」とは何を意味する略語？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "Knowledge Process Integration",
            topRight: "Key Price Indicator",
            bottomLeft: "Key Position Index",
            bottomRight: "Key Performance Indicator"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "人間の体で、最も大きい臓器はどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "肝臓",
            topRight: "心臓",
            bottomLeft: "腎臓",
            bottomRight: "脳"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "日本の紙幣に使われていない人物は誰？（2024年現在）",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "野口英世",
            topRight: "夏目漱石",
            bottomLeft: "福沢諭吉",
            bottomRight: "渋沢栄一"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "インボイス制度は、主に何に関する制度？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "医療制度",
            topRight: "税務処理（消費税）",
            bottomLeft: "労働契約",
            bottomRight: "年金の受給"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "地震の規模を表す単位は？"
        question: "地震の規模を表す単位は？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "震度",
            topRight: "マグニチュード",
            bottomLeft: "加速度",
            bottomRight: "長周期地震動"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "世界三大宗教に含まれないのはどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "ヒンドゥー教",
            topRight: "キリスト教",
            bottomLeft: "イスラム教",
            bottomRight: "仏教"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "「PDCAサイクル」の「C」は何を意味する？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "charge",
            topRight: "Change",
            bottomLeft: "challenge",
            bottomRight: "Check"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "日本の法律で「労働基準法」が定める、1日の法定労働時間は何時間？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "6時間",
            topRight: "7時間",
            bottomLeft: "8時間",
            bottomRight: "12時間"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomLeft" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "次のうち「二十四節気」に含まれないのはどれ？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "小寒",
            topRight: " 彼岸",
            bottomLeft: "大暑",
            bottomRight: "霜降"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "topRight" // 例: "topRight"
    },// --- ここから新しい問題を追加する際のテンプレート ---
    {
        // 'question': ここにクイズの「問題文」を記述します。
        // 例: "日本の国鳥は何？"
        question: "以下の中で最も電気をよく通す金属は？",

        // 'choices': 画面に表示される4つの「選択肢」を記述します。
        // それぞれのキー (topLeft, topRight, bottomLeft, bottomRight) が、画面上の選択肢の位置に対応します。
        choices: {
            topLeft: "金",
            topRight: "銅",
            bottomLeft: "アルミニウム",
            bottomRight: "銀"
        },

        // 'correctDirection': 上で定義した4つの選択肢の中から、
        // 「正解の選択肢」のキーを正確に記述します。
        // 指定できる値: "topLeft", "topRight", "bottomLeft", "bottomRight" のいずれか
        // 例: "topRight" (もし右上の選択肢が正解の場合)
        correctDirection: "bottomRight" // 正解は銀
    },
    {
        // 2問目のテンプレート例
        question: "上司が部下に使ってはいけない敬語は？",
        choices: {
            topLeft: "ご苦労さまです",
            topRight: "お疲れさまです",
            bottomLeft: "お先に失礼します",
            bottomRight: "お手数ですが"
        },
        correctDirection: "topLeft" // 2問目の正解
    }
    // 配列の最後にはカンマを付けないように注意してください（次の問題が続く場合は必要です）
];

// UI要素の取得
const connectButton = document.getElementById('connectButton');
const statusText = document.getElementById('status');
const quizArea = document.getElementById('quizArea');
const questionText = document.getElementById('question');
const choiceTopLeft = document.getElementById('choice-topLeft');
const choiceTopRight = document.getElementById('choice-topRight');
const choiceBottomLeft = document.getElementById('choice-bottomLeft');
const choiceBottomRight = document.getElementById('choice-bottomRight');
const resultText = document.getElementById('result');
const debugRoll = document.getElementById('debugRoll'); // debugRollはShakeを表示
const debugPitch = document.getElementById('debugPitch'); // debugPitchはButtonを表示
const debugSelectedDirection = document.getElementById('debugSelectedDirection');

// 選択中の選択肢を保持する変数
let selectedDirection = null; // 現在確定している選択肢（確定前はnull）
let isProcessingSelection = false; // 選択処理中フラグ

// 振る動作の閾値 (ToioのshakeLevelの変動を見て調整してください)
// まずは低い値でテストし、動作を確認しながら調整してください。
const SHAKE_THRESHOLD = 2; // 初期値として5を推奨

// p5.js の設定
function setup() {
    createCanvas(1, 1).parent(document.body);
    noCanvas(); // キャンバスは非表示に

    // ★追加: 効果音ファイルをロード
    correctSound = new Audio('sound/correct.mp3');
    incorrectSound = new Audio('sound/incorrect.mp3');
    // 必要に応じて音量を調整 (0.0から1.0の範囲)
    correctSound.volume = 0.5;
    incorrectSound.volume = 0.5;
}

// グローバル変数として、Toioが接続されたかどうかのフラグと、現在のセンサーデータを保持
let g_isToioConnected = false;
let g_lastShakeLevel = 0; // 前回のシェイクレベル
let g_lastButtonPressed = false; // 前回のボタン状態

// 選択肢切り替えのための変数
let g_currentHighlightedChoiceIndex = 0;
const g_choices = [
    'topLeft', 'topRight', 'bottomLeft', 'bottomRight'
];

// p5.js のドロー関数 (毎フレーム実行される)
function draw() {
    if (g_isToioConnected && p5tCube) {
        const currentShakeLevel = p5tCube.shakeLevel;
        const currentButtonPressed = p5tCube.buttonPressed;

        // デバッグ表示の更新
        debugRoll.innerText = `Shake: ${currentShakeLevel !== undefined && currentShakeLevel !== null ? currentShakeLevel : "N/A"}`;
        debugPitch.innerText = `Button: ${currentButtonPressed ? "Pressed" : "Released"}`;

        // --- 追加デバッグ：生のShakeLevel値を常にコンソールに出力 ---
        console.log("Current Shake Level:", currentShakeLevel);

        // 振られた場合の処理 (シェイクレベルの変化を検知)
        if (!isProcessingSelection) { // 選択処理中でない場合のみ

            // --- ここでShake検知の条件を確認するログを追加 ---
            console.log(`Shake Check: current=${currentShakeLevel}, last=${g_lastShakeLevel}, threshold=${SHAKE_THRESHOLD}`);

            if (currentShakeLevel > SHAKE_THRESHOLD && g_lastShakeLevel <= SHAKE_THRESHOLD) {
                // 検知したことをログに出力
                console.log(`--- SHAKE DETECTED! current=${currentShakeLevel}, last=${g_lastShakeLevel} ---`);

                g_currentHighlightedChoiceIndex = (g_currentHighlightedChoiceIndex + 1) % g_choices.length;
                const direction = g_choices[g_currentHighlightedChoiceIndex];
                highlightChoice(direction);
                debugSelectedDirection.innerText = direction + " (Shaking)";
                console.log("Shaking detected. Highlighted:", direction);
            }
            // シェイクレベルを更新するタイミングを、判定後に設定
            g_lastShakeLevel = currentShakeLevel;
        }

        // ボタンが押された場合の処理 (ボタンの状態変化を検知)
        if (currentButtonPressed && !g_lastButtonPressed) { // ボタンが押された瞬間に検知
            if (!isProcessingSelection) { // 選択処理中でない場合のみ
                const selectedDirection = g_choices[g_currentHighlightedChoiceIndex];
                console.log("Button pressed. Confirming selection:", selectedDirection);
                processSelection(selectedDirection);
            }
        }
        g_lastButtonPressed = currentButtonPressed; // 前回のボタン状態を更新
    }
}

// Toio接続ボタンのイベントリスナー
connectButton.addEventListener('click', async () => {
    try {
        statusText.innerText = 'Toioに接続中...';
        p5tCube = await P5tCube.connectNewP5tCube();
        statusText.innerText = 'Toioに接続しました！';
        connectButton.style.display = 'none'; // 接続ボタンを非表示に

        g_isToioConnected = true;

        // 最初のクイズを表示
        displayQuestion(currentQuestionIndex); // この中でハイライトも初期化される
        quizArea.style.display = 'block'; // クイズエリアを表示
        
        // 接続時にシェイクレベルとボタン状態を初期化
        g_lastShakeLevel = p5tCube.shakeLevel;
        g_lastButtonPressed = p5tCube.buttonPressed;

    } catch (error) {
        console.error('Toio接続エラー:', error);
        statusText.innerText = `接続エラー: ${error.message}`;
    }
});

function startToioMotionSensor() {
    console.log("Toioのセンサーデータの監視を開始しました (draw()ループ経由)。");
}

function handleToioTilt(roll, pitch) {
    // この関数は傾きデータに依存していたため、現在は使用しません。
}

// 選択肢のハイライトを更新する関数
function highlightChoice(direction) {
    // 全ての選択肢のハイライトを解除
    [choiceTopLeft, choiceTopRight, choiceBottomLeft, choiceBottomRight].forEach(el => {
        el.classList.remove('highlighted');
    });

    // 選択された方向の選択肢をハイライト
    if (direction) {
        document.getElementById(`choice-${direction}`).classList.add('highlighted');
    }
}

// クイズの問題を表示する関数
function displayQuestion(index) {
    if (index >= quizQuestions.length) {
        questionText.innerText = "すべての問題が終了しました！";
        resultText.innerText = "お疲れ様でした！";
        if (p5tCube) {
            p5tCube.turnLightOff(); 
        }
        return;
    }

    const currentQuiz = quizQuestions[index];
    questionText.innerText = `問題 ${index + 1}: ${currentQuiz.question}`;

    // 選択肢のテキストを更新
    choiceTopLeft.innerText = currentQuiz.choices.topLeft;
    choiceTopRight.innerText = currentQuiz.choices.topRight;
    choiceBottomLeft.innerText = currentQuiz.choices.bottomLeft;
    choiceBottomRight.innerText = currentQuiz.choices.bottomRight;

    // 前回の正誤表示とハイライトをリセット
    resultText.innerText = "";
    [choiceTopLeft, choiceTopRight, choiceBottomLeft, choiceBottomRight].forEach(el => {
        el.classList.remove('correct', 'incorrect', 'highlighted');
    });

    isProcessingSelection = false; // 新しい問題が始まったら選択処理を許可
    
    // 新しい問題が表示されたら、最初の選択肢をハイライトし直す
    g_currentHighlightedChoiceIndex = 0; // インデックスをリセット
    highlightChoice(g_choices[g_currentHighlightedChoiceIndex]);
}

// 選択が確定した後の処理
async function processSelection(selected) {
    if (isProcessingSelection) return; // 二重処理防止
    isProcessingSelection = true; // 処理中フラグを立てる

    const currentQuiz = quizQuestions[currentQuestionIndex];
    let correctChoiceElement = document.getElementById(`choice-${currentQuiz.correctDirection}`);
    let selectedChoiceElement = document.getElementById(`choice-${selected}`);

    if (selected === currentQuiz.correctDirection) {
        resultText.innerText = "正解！";
        selectedChoiceElement.classList.add('correct');
        if (p5tCube) {
            await p5tCube.turnLightOn("green");
        }
        // ★追加: 正解音を再生
        correctSound.play();
    } else {
        resultText.innerText = "不正解...";
        selectedChoiceElement.classList.add('incorrect');
        correctChoiceElement.classList.add('correct'); // 正解の選択肢も表示
        if (p5tCube) {
            await p5tCube.turnLightOn("red");
        }
        // ★追加: 不正解音を再生
        incorrectSound.play();
    }

    // 次の問題へ進むための待機
    setTimeout(async () => {
        currentQuestionIndex++;
        displayQuestion(currentQuestionIndex); // この中でハイライトもリセットされる
        if (p5tCube) {
            p5tCube.turnLightOff(); 
        }
        selectedDirection = null; // 選択状態をリセット
    }, 2000); // 2秒後に次の問題へ
}