# MOEKA NIHONGO

外国人学習者向けの日本語学習サイトです。名前は「MOEKA」＋日本語を意味する「NIHONGO」。短いローマ字表記で、YouTubeの活動名とも揃えています。

## 開く

`docs/index.html` をダブルクリックすると、Macでも確認できます。追加のインストールや有料APIは必要ありません。

## 入っているもの

- 五十音（ひらがな）：あ行・か行・さ行・た行・な行の動画5本を埋め込み。タイトルは英語・中国語併記。英中字幕の本文は、歌詞原文が未確認のため未登録。
- 単語：N5〜N1、24項目。カードをクリックすると説明・例文を開き、日本語音声を再生。
- 文法：N5〜N1、15項目。用法・接続・英中訳付き例文。
- 文字：N5〜N1、16項目。ひらがな・カタカナ・漢字のサンプル。
- リスニング・スピーキング・発音：初級・中級・上級の動画掲載枠。動画URLは未登録。
- 漢字／ひらがな切り替え、ふりがな表示／非表示。学習者の設定はその端末に保存。
- 英語・簡体字中国語の意味と例文。日本語の説明文。
- スマートフォン対応、キーボード操作、読み上げエラー表示。

教材は初期サンプルです。JLPTレベルは編集上の目安で、公式の出題語彙一覧ではありません。網羅教材ではありません。

## GitHub Pagesで公開

1. GitHubに `moeka-nihongo` という公開リポジトリを作成します。
2. このフォルダ内の `docs` フォルダと `README.md` をアップロードします。ZIPそのものではなく、中身をアップロードしてください。
3. リポジトリの **Settings → Pages** を開きます。
4. **Source: Deploy from a branch** を選びます。
5. **Branch: main / Folder: /docs** を選択して **Save** を押します。
6. Pages画面に表示された公開URLを開きます。

この構成は、リポジトリ名がURLに含まれるGitHub Pagesでも利用できます。外部ビルドやGitHub Actionsの設定は不要です。

公式手順：https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 教材を追加・編集

`docs/content.js` を編集します。各教材は次の順序です。

```js
['{朝|あさ}', 'morning', '早晨',
 'いちにちの、はじまりのころ。',
 '{朝|あさ}、{窓|まど}を{開|あ}けます。',
 'I open the window in the morning.', '早上，我打开窗户。',
 '名詞 · Noun']
```

`{漢字|ひらがな}` がふりがなと文字切り替えの元になります。漢字のある教材には読みを必ず入れます。ひらがなモードではカタカナもひらがなになります。意味・例文の英語と中国語は手動で記入する形式で、自動翻訳サービスは使いません。

文法の最後の欄は接続形式です。画面の操作ラベル、品詞ラベル、接続形式は切り替え対象外です。

## YouTubeを追加

`docs/content.js` の `VIDEOS` に動画を追加します。例：

五十音の動画は `VIDEOS.hiragana.all` に追加します。各動画の `captions` は、日本語・英語・中国語の順にプレイヤーの下に表示します（再生時刻との自動同期はありません）。

```js
listening: {
  beginner: [{
    title: '{朝|あさ}の{会話|かいわ}',
    en: 'Morning conversation',
    zh: '早晨的对话',
    youtubeId: '実際の11文字の動画ID',
    captions: [
      {at: 0, ja: 'おはよう。', en: 'Good morning.', zh: '早上好。'}
    ]
  }],
  intermediate: [],
  advanced: []
}
```

`https://www.youtube.com/watch?v=XXXXXXXXXXX` の `XXXXXXXXXXX` が動画IDです。動画はYouTubeで開きます。`captions` はサイト内で開く英中併記の字幕テキストです。動画に同期するカラオケ表示や自動字幕生成は含みません。動画プレイヤー内の字幕はYouTube側で設定してください。

## 音声

端末・ブラウザの日本語音声合成を使用します。MOEKA本人の録音ではありません。日本語音声がない端末には案内が表示されます。発音や利用可否はOS・ブラウザにより異なります。実際の音声出力は公開後にご自身の端末で確認してください。

## UD教科書体

CSSは `UD Digi Kyokasho N-R` / `UD Digi Kyokasho NP-R` / `UD デジタル 教科書体 N-R` を優先します。端末にない場合は游教科書体等にフォールバックします。

**現時点では、すべての端末でUD教科書体を表示する条件は満たしていません。** UD教科書体のWebフォント提供設定が必要です。モリサワのWebフォントサービス等で対象書体を設定し、指定されたCSS／スクリプトを `docs/index.html` に追加して、`style.css` の `--font` を指定されたフォント名に合わせてください。端末用フォントを無断でリポジトリに同梱する構成にはしていません。

TypeSquare：https://typesquare.com/

## 公開状況

サイトのソースはこのリポジトリの `docs` フォルダにあります。公開するには、Settings → Pages で `Deploy from a branch`、`main`、`/docs` を選択してください。

設定画面：https://github.com/moeka-japanese/moeka-nihongo/settings/pages

公開設定後のURL：https://moeka-japanese.github.io/moeka-nihongo/
