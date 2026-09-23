'use strict';
(() => {
 const entry = window.LESSONS.grammar.N5.find(e => e[0].replace(/[〜～]/g,'~') === '~は~です');
 if (entry) {
  entry[0]='AはBです';entry[1]='A is B';entry[2]='A是B';
  entry[3]='人やものが何であるかを、名詞を使って丁寧に説明します。';
  entry[4]='私は田中です。';entry[5]='I am Tanaka.';entry[6]='我叫田中。';
  entry[7]='名詞1＋は＋名詞2＋です';
 }
 const data = {
  "sentences": [
    [
      "彼は学生です。",
      "Kare wa gakusei desu.",
      "He is a student.",
      "他是学生。"
    ],
    [
      "彼は学生ではありません。",
      "Kare wa gakusei dewa arimasen.",
      "He is not a student.",
      "他不是学生。"
    ],
    [
      "彼は学生じゃありません。",
      "Kare wa gakusei ja arimasen.",
      "He is not a student.",
      "他不是学生。"
    ],
    [
      "彼は学生ですか。",
      "Kare wa gakusei desu ka.",
      "Is he a student?",
      "他是学生吗？"
    ],
    [
      "はい、そうです。",
      "Hai, sou desu.",
      "Yes, that is right.",
      "是的。"
    ],
    [
      "いいえ、違います。",
      "Iie, chigaimasu.",
      "No, that is not right.",
      "不，不是的。"
    ],
    [
      "私は田中です。",
      "Watashi wa Tanaka desu.",
      "I am Tanaka.",
      "我叫田中。"
    ],
    [
      "私は留学生です。",
      "Watashi wa ryuugakusei desu.",
      "I am an international student.",
      "我是留学生。"
    ],
    [
      "私は医者ではありません。",
      "Watashi wa isha dewa arimasen.",
      "I am not a doctor.",
      "我不是医生。"
    ],
    [
      "私は医者じゃありません。",
      "Watashi wa isha ja arimasen.",
      "I am not a doctor.",
      "我不是医生。"
    ],
    [
      "あなたは医者ですか。",
      "Anata wa isha desu ka.",
      "Are you a doctor?",
      "你是医生吗？"
    ],
    [
      "はい、医者です。",
      "Hai, isha desu.",
      "Yes, I am a doctor.",
      "是的，我是医生。"
    ],
    [
      "いいえ、医者ではありません。",
      "Iie, isha dewa arimasen.",
      "No, I am not a doctor.",
      "不，我不是医生。"
    ],
    [
      "彼は医者です。",
      "Kare wa isha desu.",
      "He is a doctor.",
      "他是医生。"
    ],
    [
      "鈴木さんは先生です。",
      "Suzuki-san wa sensei desu.",
      "Suzuki is a teacher.",
      "铃木是老师。"
    ],
    [
      "彼は医者ではありません。",
      "Kare wa isha dewa arimasen.",
      "He is not a doctor.",
      "他不是医生。"
    ],
    [
      "彼は医者じゃありません。",
      "Kare wa isha ja arimasen.",
      "He is not a doctor.",
      "他不是医生。"
    ],
    [
      "彼は医者ですか。",
      "Kare wa isha desu ka.",
      "Is he a doctor?",
      "他是医生吗？"
    ],
    [
      "田中さんは先生ですか。",
      "Tanaka-san wa sensei desu ka.",
      "Is Tanaka a teacher?",
      "田中是老师吗？"
    ],
    [
      "はい、田中さんは先生です。",
      "Hai, Tanaka-san wa sensei desu.",
      "Yes, Tanaka is a teacher.",
      "是的，田中是老师。"
    ],
    [
      "いいえ、田中さんは先生ではありません。",
      "Iie, Tanaka-san wa sensei dewa arimasen.",
      "No, Tanaka is not a teacher.",
      "不，田中不是老师。"
    ],
    [
      "彼女は日本人です。",
      "Kanojo wa nihonjin desu.",
      "She is Japanese.",
      "她是日本人。"
    ],
    [
      "私は中国人です。",
      "Watashi wa chuugokujin desu.",
      "I am Chinese.",
      "我是中国人。"
    ],
    [
      "鈴木さんは留学生じゃありません。",
      "Suzuki-san wa ryuugakusei ja arimasen.",
      "Suzuki is not an international student.",
      "铃木不是留学生。"
    ],
    [
      "あなたは学生ですか。",
      "Anata wa gakusei desu ka.",
      "Are you a student?",
      "你是学生吗？"
    ],
    [
      "はい、学生です。",
      "Hai, gakusei desu.",
      "Yes, I am a student.",
      "是的，我是学生。"
    ],
    [
      "いいえ、学生ではありません。",
      "Iie, gakusei dewa arimasen.",
      "No, I am not a student.",
      "不，我不是学生。"
    ],
    [
      "あなたの先生は誰ですか。",
      "Anata no sensei wa dare desu ka.",
      "Who is your teacher?",
      "你的老师是谁？"
    ],
    [
      "私の先生は鈴木さんです。",
      "Watashi no sensei wa Suzuki-san desu.",
      "My teacher is Suzuki.",
      "我的老师是铃木。"
    ],
    [
      "これは何ですか。",
      "Kore wa nan desu ka.",
      "What is this?",
      "这是什么？"
    ],
    [
      "これは傘です。",
      "Kore wa kasa desu.",
      "This is an umbrella.",
      "这是伞。"
    ],
    [
      "今日は何曜日ですか。",
      "Kyou wa nanyoubi desu ka.",
      "What day of the week is it today?",
      "今天是星期几？"
    ],
    [
      "今日は火曜日です。",
      "Kyou wa kayoubi desu.",
      "Today is Tuesday.",
      "今天是星期二。"
    ],
    [
      "キムさんは医者です。",
      "Kimu-san wa isha desu.",
      "Kim is a doctor.",
      "金是医生。"
    ],
    [
      "田中さんは日本人です。",
      "Tanaka-san wa nihonjin desu.",
      "Tanaka is Japanese.",
      "田中是日本人。"
    ]
  ],
  "vocab": [
    [
      "私",
      "watashi",
      "I",
      "我"
    ],
    [
      "あなた",
      "anata",
      "you",
      "你"
    ],
    [
      "彼",
      "kare",
      "he",
      "他"
    ],
    [
      "彼女",
      "kanojo",
      "she",
      "她"
    ],
    [
      "先生",
      "sensei",
      "teacher",
      "老师"
    ],
    [
      "医者",
      "isha",
      "doctor",
      "医生"
    ],
    [
      "学生",
      "gakusei",
      "student",
      "学生"
    ],
    [
      "留学生",
      "ryuugakusei",
      "international student",
      "留学生"
    ],
    [
      "日本人",
      "nihonjin",
      "Japanese person",
      "日本人"
    ],
    [
      "〇〇人",
      "〇〇-jin",
      "person from 〇〇 (a country)",
      "〇〇人（填入国家名）"
    ],
    [
      "田中さん",
      "Tanaka-san",
      "Tanaka (with the honorific -san)",
      "田中（加敬称さん）"
    ],
    [
      "鈴木さん",
      "Suzuki-san",
      "Suzuki (with the honorific -san)",
      "铃木（加敬称さん）"
    ]
  ],
  "explanations": [
    [
      "「は」は、文の話題を示す助詞です。「Aについて話します」という合図になります。助詞の「は」は「わ」と発音します。",
      "“Wa” wa, bun no wadai o shimesu joshi desu. “A ni tsuite hanashimasu” to iu aizu ni narimasu. Joshi no “wa” wa “wa” to hatsuon shimasu.",
      "The particle は marks the topic: “I am going to talk about A.” As a particle, は is pronounced wa.",
      "助词「は」表示句子的话题，相当于提示“接下来谈谈A”。作助词时，「は」读作wa。"
    ],
    [
      "「です」は、Aが何であるか、どの種類に属するかを丁寧に述べる文末表現です。この文型では、AとBに名詞を入れます。",
      "“Desu” wa, A ga nan de aru ka, dono shurui ni zokusuru ka o teinei ni noberu bunmatsu hyougen desu. Kono bunkei dewa, A to B ni meishi o iremasu.",
      "です is a polite sentence ending (a copula) that identifies A or states its category. In this pattern, A and B are nouns.",
      "「です」是礼貌的句末表达（系词），说明A是什么或属于哪一类。在这个句型中，A和B都填入名词。"
    ],
    [
      "Aは、話し手と聞き手がすでに知っているもの、または今から話題にする人やものです。Bは、Aが何であるかを説明する情報です。",
      "A wa, hanashite to kikite ga sudeni shitte iru mono, mata wa ima kara wadai ni suru hito ya mono desu. B wa, A ga nan de aru ka o setsumei suru jouhou desu.",
      "A is something already known to the speaker and listener, or a person or thing being introduced as the topic. B provides information about what A is.",
      "A是说话人和听话人已知的事物，或即将作为话题的人、物。B是说明A是什么的信息。"
    ],
    [
      "基本の語順は「AはBです」です。会話では「Bです、Aは」のような倒置もありますが、まずは基本の語順で練習しましょう。",
      "Kihon no gojun wa “A wa B desu” desu. Kaiwa dewa “B desu, A wa” no you na touchi mo arimasu ga, mazu wa kihon no gojun de renshuu shimashou.",
      "The basic word order is AはBです. Inverted order such as Bです、Aは can occur in conversation, but practice the basic order first.",
      "基本语序是「AはBです」。口语中也有「Bです、Aは」这样的倒装，但请先练习基本语序。"
    ],
    [
      "「ではありません」は改まった言い方で、会話でも文章でも使えます。「じゃありません」は「では」を「じゃ」に縮めた、会話でよく使う言い方です。",
      "“Dewa arimasen” wa aratamatta iikata de, kaiwa demo bunshou demo tsukaemasu. “Ja arimasen” wa “dewa” o “ja” ni chijimeta, kaiwa de yoku tsukau iikata desu.",
      "ではありません is more formal and can be used in speech as well as writing. じゃありません contracts では to じゃ and is common in conversation.",
      "「ではありません」较正式，口语和书面语都可以用。「じゃありません」把「では」缩约为「じゃ」，常用于会话。"
    ],
    [
      "「さん」は人の名前に付ける敬称です。自分の名前には付けません。「あなた」を繰り返すより、相手の名前が分かるときは「田中さん」などと呼ぶほうが自然なことがあります。",
      "“San” wa hito no namae ni tsukeru keishou desu. Jibun no namae ni wa tsukemasen. “Anata” o kurikaesu yori, aite no namae ga wakaru toki wa “Tanaka-san” nado to yobu hou ga shizen na koto ga arimasu.",
      "さん is an honorific attached to another person's name, not your own. If you know someone's name, using it with さん can be more natural than repeatedly saying あなた.",
      "「さん」是加在他人姓名后的敬称，不用于自己的名字。知道对方姓名时，用「田中さん」等称呼往往比反复说「あなた」更自然。"
    ]
  ]
};
 const readings = {'留学生':'りゅうがくせい','日本人':'にほんじん','中国人':'ちゅうごくじん','田中':'たなか','鈴木':'すずき','彼女':'かのじょ','先生':'せんせい','医者':'いしゃ','学生':'がくせい','私':'わたし','彼':'かれ','違います':'ちがいます','誰':'だれ','何曜日':'なんようび','火曜日':'かようび','今日':'きょう','何ですか':'なんですか','傘':'かさ','文型':'ぶんけい','話題':'わだい','助詞':'じょし','発音':'はつおん','種類':'しゅるい','属する':'ぞくする','丁寧':'ていねい','述べる':'のべる','文末':'ぶんまつ','表現':'ひょうげん','名詞':'めいし','入れます':'いれます','話し手':'はなして','聞き手':'ききて','知っている':'しっている','今':'いま','人':'ひと','説明':'せつめい','情報':'じょうほう','基本':'きほん','語順':'ごじゅん','会話':'かいわ','倒置':'とうち','練習':'れんしゅう','改まった':'あらたまった','言い方':'いいかた','文章':'ぶんしょう','使えます':'つかえます','使う':'つかう','縮めた':'ちぢめた','名前':'なまえ','付ける':'つける','敬称':'けいしょう','自分':'じぶん','付けません':'つけません','繰り返す':'くりかえす','相手':'あいて','分かる':'わかる','呼ぶ':'よぶ','自然':'しぜん','国':'くに','質問':'しつもん','答え':'こたえ','声':'こえ','出して':'だして','文':'ぶん','示す':'しめす','話します':'はなします','合図':'あいず','何で':'なんで','時':'とき'};
 const pattern = new RegExp(Object.keys(readings).sort((a,b)=>b.length-a.length).join('|'),'g');
 const annotate = s => s.replace(pattern, word => '{'+word+'|'+readings[word]+'}');
 const esc = s => String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const selected = new Map();
 let speech = [];
 let renderJapanese = esc;
 const quizzes = [
  {prompt:'私は（　）です。',hint:['外国から来て、日本で勉強しています。','I came from another country to study in Japan.','我从国外来到日本学习。'],answer:0,sentence:7,reason:['外国で学ぶ学生を「留学生」といいます。「私は留学生です」で自分の立場を説明します。','留学生 means a student studying abroad. 私は留学生です identifies the speaker as an international student.','「留学生」指在国外学习的学生。「私は留学生です」说明自己的身份。']},
  {prompt:'キムさんは（　）です。',hint:['キムさんの仕事は、病院で患者を診察することです。','Kim examines patients at a hospital as a job.','金的工作是在医院给患者看病。'],answer:1,sentence:33,reason:['病院で患者を診察する職業は「医者」です。「キムさんは医者です」で職業を説明します。','医者 means doctor. キムさんは医者です states Kim’s occupation.','「医者」是医生。「キムさんは医者です」说明金的职业。']},
  {prompt:'これは（　）です。',hint:['雨の日に、頭の上に広げて使うものです。','This is an object you open above your head when it rains.','这是下雨时在头顶撑开使用的物品。'],answer:4,sentence:30,reason:['雨の日に広げて使うものは「傘」です。「これは傘です」で物が何かを説明します。','傘 means umbrella. これは傘です identifies the object.','「傘」是伞。「これは傘です」说明物品是什么。']},
  {prompt:'田中さんは（　）です。',hint:['田中さんの国籍は日本です。','Tanaka’s nationality is Japanese.','田中的国籍是日本。'],answer:2,sentence:34,reason:['日本の国籍を持つ人は「日本人」です。「田中さんは日本人です」で国籍を説明します。','日本人 means a Japanese person. 田中さんは日本人です states Tanaka’s nationality.','「日本人」指日本人。「田中さんは日本人です」说明田中的国籍。']}
 ];
 const choices = ['留学生','医者','日本人','火曜日','傘'];
 function audio(text) {
  const id=speech.push(text)-1;
  return '<button type="button" class="play-button secondary" data-basic-audio="'+id+'" aria-label="'+esc(text)+'：音声を再生">♪ Listen / 听发音</button>';
 }
 function block(row, example = false) {
  return '<div class="basic-line"><div class="basic-line-heading"><p class="japanese" lang="ja">'+renderJapanese(annotate(row[0]))+'</p>'+(example === true ? audio(row[4]||row[0]) : '')+'</div><p class="basic-romaji" lang="ja-Latn">'+esc(row[1])+'</p><p lang="en">'+esc(row[2])+'</p><p lang="zh-Hans">'+esc(row[3])+'</p></div>';
 }
 const line = index => block(data.sentences[index], true);
 const heading = (ja,en,zh) => '<h3>'+esc(ja)+'<small><span lang="en">'+esc(en)+'</span> / <span lang="zh-Hans">'+esc(zh)+'</span></small></h3>';
 function feedback(q,index,answer) {
  return '<p class="basic-result"><strong>'+(answer===q.answer?'正解です。':'正解を確認しましょう。')+' 正解：'+esc(choices[q.answer])+'</strong></p>'+
   '<p lang="ja">'+renderJapanese(annotate(q.reason[0]))+'</p><p lang="en">'+esc(q.reason[1])+'</p><p lang="zh-Hans">'+esc(q.reason[2])+'</p>'+line(q.sentence);
 }
 function renderQuiz(q,index) {
  const answer=selected.get(index);
  return '<article class="basic-quiz" data-basic-question="'+index+'"><h4 id="basic-q-'+index+'">Q'+(index+1)+' '+renderJapanese(annotate(q.prompt))+'</h4><div class="basic-hint"><p>ヒント：'+renderJapanese(annotate(q.hint[0]))+'</p><p lang="en">'+esc(q.hint[1])+'</p><p lang="zh-Hans">'+esc(q.hint[2])+'</p></div><div class="basic-choices" role="group" aria-labelledby="basic-q-'+index+'">'+choices.map((choice,i)=>'<button type="button" data-basic-quiz="'+index+'" data-basic-choice="'+i+'" aria-controls="basic-feedback-'+index+'" aria-pressed="'+(answer===i)+'" class="'+(answer!==undefined&&i===q.answer?'is-correct':answer===i?'is-incorrect':'')+'">'+renderJapanese(annotate(choice))+'</button>').join('')+'</div><div id="basic-feedback-'+index+'" class="basic-feedback" role="status" aria-live="polite" '+(answer===undefined?'hidden':'')+'>'+(answer===undefined?'':feedback(q,index,answer))+'</div></article>';
 }
 window.BasicPattern = {
  render(jp) {
   renderJapanese=jp;speech=[];
   return '<div class="lesson-body basic-pattern">'+
    '<section>'+heading('1．文型','Sentence patterns','句型')+
    block(['AはBです。','A wa B desu.','A is B.','A是B。','エーはビーです。'])+
    '<p>名詞1 ＋ は ＋ 名詞2 ＋ です<br><span lang="en">Noun 1 + wa + noun 2 + desu</span><br><span lang="zh-Hans">名词1 ＋ は ＋ 名词2 ＋ です</span></p>'+
    '<p>A＝話題になるもの・人　B＝Aについての説明<br><span lang="en">A = the topic (a person or thing); B = information about A.</span><br><span lang="zh-Hans">A＝话题中的人或物；B＝关于A的说明。</span></p>'+
    '<h4>肯定文 <small>Affirmative / 肯定句</small></h4>'+line(0)+
    '<h4>否定文／書面語 <small>Formal negative / 正式否定句</small></h4>'+
    block(['AはBではありません。','A wa B dewa arimasen.','A is not B.','A不是B。','エーはビーではありません。'])+line(1)+
    '<h4>否定文／口語 <small>Conversational negative / 口语否定句</small></h4>'+
    block(['AはBじゃありません。','A wa B ja arimasen.','A is not B.','A不是B。','エーはビーじゃありません。'])+line(2)+
    '<h4>疑問文 <small>Question / 疑问句</small></h4>'+
    block(['AはBですか。','A wa B desu ka.','Is A B?','A是B吗？','エーはビーですか。'])+line(3)+line(4)+line(5)+'</section>'+
    '<section>'+heading('2．解説','Explanation','解说')+data.explanations.slice(0,5).map(block).join('')+'</section>'+
    '<section>'+heading('3．口頭練習','Speaking practice','口头练习')+
    '<h4>単語 <small>Vocabulary / 单词</small></h4><div class="basic-vocabulary">'+data.vocab.map(block).join('')+'</div>'+
    block(data.explanations[5])+
    '<p>〇〇には自分の国を入れます。例：中国 → 中国人<br><span lang="en">Replace 〇〇 with your country. Example: China → Chinese.</span><br><span lang="zh-Hans">在〇〇处填入自己的国家名。例如：中国 → 中国人。</span></p>'+
    '<h4>口頭練習 <small>Speaking practice / 口头练习</small></h4><p>声に出して、質問に答えましょう。<br><span lang="en">Read aloud and answer the questions.</span><br><span lang="zh-Hans">请出声朗读并回答问题。</span></p>'+[6,7,8,9,10,11,12].map(line).join('')+
    '<h5>肯定文 / Affirmative / 肯定句</h5>'+[13,14,21,22].map(line).join('')+
    '<h5>否定文（書面語） / Formal negative / 正式否定句</h5>'+line(15)+
    '<h5>否定文（口語） / Conversational negative / 口语否定句</h5>'+[16,23].map(line).join('')+
    '<h5>疑問文 / Question / 疑问句</h5>'+line(17)+
    '<h5>疑問文の答え / Answers / 疑问句的回答</h5>'+
    ''+line(4)+line(5)+'</section>'+
    '<section>'+heading('4．文型に対する答え方','How to answer','回答方式')+
    block(['AはBですか。','A wa B desu ka.','Is A B?','A是B吗？','エーはビーですか。'])+
    block(['はい、AはBです。','Hai, A wa B desu.','Yes, A is B.','是的，A是B。','はい、エーはビーです。'])+
    block(['いいえ、AはBではありません。','Iie, A wa B dewa arimasen.','No, A is not B.','不，A不是B。','いいえ、エーはビーではありません。'])+
    [18,19,20].map(line).join('')+
    '<p>話題が分かるときは、答えの「Aは」を省略できます。<br><span lang="en">When the topic is clear, you can omit Aは in your answer.</span><br><span lang="zh-Hans">话题明确时，回答中可以省略「Aは」。</span></p></section>'+
    '<section>'+heading('5．問題','Quiz','练习题')+
    '<p>ヒントを読んで、空欄に入る単語を選びましょう。押すと正解と解説が表示されます。<br><span lang="en">Read each hint and choose the word for the blank. Tap to see the answer and explanation.</span><br><span lang="zh-Hans">阅读提示，选择填入空格的单词。点击后显示答案和解说。</span></p>'+
    quizzes.map(renderQuiz).join('')+
    '<h4>口頭練習 <small>Speaking practice / 口头练习</small></h4>'+
    '<p>答えは例です。自分に合わせて変えてください。<br><span lang="en">These are model answers. Adapt them to your own situation.</span><br><span lang="zh-Hans">以下为示范回答，请根据自己的情况修改。</span></p>'+
    [24,25,26,27,28,29,30,31,32].map(line).join('')+'</section>'+
    '<button type="button" class="play-button secondary" data-basic-stop>■ 停止 / Stop / 停止</button></div>';
  },
  handle(button,speak,stop) {
   if(button.hasAttribute('data-basic-stop')){stop();return;}
   if(button.dataset.basicAudio!==undefined){const text=speech[Number(button.dataset.basicAudio)];if(text)speak(text);return;}
   if(button.dataset.basicQuiz===undefined)return;
   const index=Number(button.dataset.basicQuiz),answer=Number(button.dataset.basicChoice),q=quizzes[index];
   if(!q||!Number.isInteger(answer)||answer<0||answer>=choices.length)return;
   selected.set(index,answer);
   const card=button.closest('.basic-quiz');
   card.querySelectorAll('[data-basic-choice]').forEach((b,i)=>{b.setAttribute('aria-pressed',String(i===answer));b.classList.toggle('is-correct',i===q.answer);b.classList.toggle('is-incorrect',i===answer&&i!==q.answer);});
   const panel=card.querySelector('.basic-feedback');panel.hidden=false;panel.innerHTML=feedback(q,index,answer);
  }
 };
})();
