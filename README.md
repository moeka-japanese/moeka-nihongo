# MOEKA NIHONGO

日本語学習サイト：[サイトを開く](https://moeka-japanese.github.io/moeka-nihongo/)

## ページ

- トップ：おすすめ動画1本と最新ニュース3件。
- 単語・文法：N5〜N1。横長のアコーディオン形式。意味・使い方と例文に英語・中国語を併記。音声再生あり。
- リスニング・スピーキング・発音：初級〜上級の動画枠。
- 文字：N5〜N1のサンプル。
- 五十音（ひらがな）：メニューの「文字」の下。PC（画面幅1024px以上）4列、タブレット2列、スマートフォン1列。各サムネイルをクリックするとYouTubeを埋め込み再生。
- 教材：N5〜N1の記事一覧と記事本文。初期教材としてN5「カフェで注文しよう」を収録。
- ニュース：記事一覧と本文。最新3件はトップにも表示。
- お問い合わせ：名前・メールアドレス・本文が必須。受信先アドレスは公開コードに含めません。送信サービス接続前は送信できない旨を表示します。
- YouTube、X、rednoteへのリンク。rednoteはプロフィール固有URLが未指定のため、ユーザー名の検索画面へのリンクです。

## 記事の投稿（コードの編集は不要）

GitHubに `moeka-japanese` でログインして投稿します。

- [教材を投稿する](https://github.com/moeka-japanese/moeka-nihongo/issues/new?template=material.yml)
- [ニュースを投稿する](https://github.com/moeka-japanese/moeka-nihongo/issues/new?template=news.yml)

1. フォームのタイトルに記事名を入力します。先頭の `[教材]` または `[ニュース]` は残します。
2. 教材は難易度を選びます。日本語本文、英語・中国語のタイトルと本文を入力します。
3. **Create** を押すと公開記事になります。サイトを再読み込みすると反映されます。
4. 編集はその記事の本文を編集します。非公開にするときは **Close issue** を押します。

`moeka-japanese` が作成したOpenの記事だけを掲載します。他の利用者が投稿したIssueやPRは掲載しません。下書きはタイトルを `[下書き]` で始め、公開するときに所定の接頭辞へ変更してください。

日本語の読みを付ける場合は `{日本語|にほんご}` と書きます。段落は空行で区切ってください。HTMLやMarkdownによる装飾は実行されず、本文として表示されます。日本語、英語、中国語の各欄はすべて必要です。

記事はGitHubの公開APIで取得します。通信障害やAPIの利用制限時は、記事取得エラーと再読み込みボタンを表示します。あらかじめ登録した記事は引き続き表示されます。公開APIの仕様：[GitHub Docs](https://docs.github.com/en/rest/issues/issues#list-repository-issues)

初期記事の編集・削除は `docs/articles.js` の `ARTICLES` で行います。GitHubへの記事投稿は実際の公開操作です。

## お問い合わせの送信を有効にする

GitHub Pagesだけでは、受信先アドレスを隠したままメールを送信できません。このサイトはFormspreeのフォームID方式に対応しています。

1. Formspreeでフォームを作り、指定の受信先アドレスをサービス側に登録・確認します。
2. 発行された `https://formspree.io/f/フォームID` を、`docs/articles.js` の `contactEndpoint` に設定します。
3. 受信先アドレス自体や秘密鍵はファイルに書かないでください。

現時点では接続先未設定のため、送信ボタンは無効です。設定後は名前・メールアドレス・本文をFormspreeへ送ります。通信成功時にだけ送信完了を表示し、失敗した場合は入力を保持します。受信テストのメールは送っていません。

公式説明：[Formspree HTML forms](https://formspree.io/html/)

## 動画・教材の編集

- おすすめ動画：`docs/articles.js` の `featuredVideoId`。
- 五十音の動画：`docs/content.js` の `VIDEOS.hiragana.all`。
- 単語・文法・文字：`docs/content.js` の `LESSONS`。
- 単語・文法の英中解説：`docs/explanations.js`。元の教材と同じ順序で記入します。
- SNS：`docs/articles.js` の `SITE_CONFIG`。

5本の五十音動画には英中タイトルを登録しています。歌詞本文が未確認のため、歌詞の英中字幕は未登録です。`captions` を設定するとサイト内に字幕テキストを表示できます。動画の再生時刻との自動同期はありません。

教材レベルは編集上の目安です。公式のJLPT出題語彙一覧ではなく、全範囲を網羅する教材でもありません。

## 音声・書体

音声はOS・ブラウザの日本語音声合成です。MOEKA本人の録音ではありません。「Slow / 慢速」はありません。

UD教科書体が端末にある場合は優先して使います。全端末で同じUD教科書体にするには、対象書体のWebフォント設定が必要です。端末用フォントは同梱していません。

## 公開

GitHub Pagesの設定：**Deploy from a branch → main → /docs**。

公開ファイルを変更したら `docs/index.html` の各CSS・JSの `?v=` を新しい値へ更新すると、以前のファイルのキャッシュを避けられます。
