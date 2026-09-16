'use strict';
(() => {
const categories={
 home:{ja:'トップ',en:'Home',zh:'首页',icon:'⌂'},
 grammar:{ja:'{文法|ぶんぽう}',en:'Grammar',zh:'语法',icon:'文'},
 vocabulary:{ja:'{単語|たんご}',en:'Vocabulary',zh:'单词',icon:'あ'},
 listening:{ja:'リスニング',en:'Listening',zh:'听力',icon:'◎'},
 speaking:{ja:'スピーキング',en:'Speaking',zh:'口语',icon:'◌'},
 materials:{ja:'{教材|きょうざい}',en:'Materials',zh:'教材',icon:'本'},
 pronunciation:{ja:'{発音|はつおん}',en:'Pronunciation',zh:'发音',icon:'声'},
 characters:{ja:'{漢字|かんじ}',en:'Kanji',zh:'汉字',icon:'字'},
 hiragana:{ja:'{五十音|ごじゅうおん}（ひらがな）',en:'Hiragana',zh:'平假名',icon:'あ'},
 news:{ja:'ニュース',en:'News',zh:'最新消息',icon:'新'},
 contact:{ja:'お{問|と}い{合|あ}わせ',en:'Contact',zh:'联系我们',icon:'✉'}
};
const levelLabels={N5:'N5',N4:'N4',N3:'N3',N2:'N2',N1:'N1',ondoku:'音読 / Read aloud / 朗读',beginner:'初級 · Beginner',intermediate:'中級 · Intermediate',advanced:'上級 · Advanced',all:'All / 全部'};
const $=id=>document.getElementById(id), config=window.SITE_CONFIG;
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>String(s??'').replace(/\{([^|{}]+)\|([^{}]+)\}/g,'$1');
const kana=s=>String(s??'').replace(/\{([^|{}]+)\|([^{}]+)\}/g,'$2').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
let prefs={script:'kanji',furigana:true,vocabSort:'pos'};
try{const p=JSON.parse(localStorage.getItem('moeka-reading')||'{}');if(['kanji','hiragana'].includes(p.script))prefs.script=p.script;if(typeof p.furigana==='boolean')prefs.furigana=p.furigana;if(['pos','kana'].includes(p.vocabSort))prefs.vocabSort=p.vocabSort;}catch{}
let category='home',level='all',articleId='',selected=null,utterance=null,audioToken=0,timer,postsStatus='idle',loadPromise=null,submitPending=false;
let articles=JSON.parse(JSON.stringify(window.ARTICLES));
function jp(s){return prefs.script==='hiragana'?esc(kana(s)):esc(s).replace(/\{([^|{}]+)\|([^{}]+)\}/g,'<ruby>$1<rt>$2</rt></ruby>');}
const tr=(en,zh)=>`<div class="translations"><span lang="en">${esc(en)}</span><span lang="zh-Hans">${esc(zh)}</span></div>`;
function notify(s){$('status').textContent=s;clearTimeout(timer);timer=setTimeout(()=>$('status').textContent='',6000);}
function stop(){audioToken++;if('speechSynthesis'in window)window.speechSynthesis.cancel();utterance=null;}
function speak(text){stop();if(!('speechSynthesis'in window)){notify('Audio is unavailable. / 此浏览器不支持语音。');return;}
 const voices=window.speechSynthesis.getVoices(),voice=voices.find(v=>/^ja(?:-|_)/i.test(v.lang));
 if(voices.length&&!voice){notify('Please add a Japanese voice on your device. / 请在设备中添加日语语音。');return;}
 const token=audioToken;utterance=new SpeechSynthesisUtterance(plain(text));utterance.lang='ja-JP';utterance.rate=.85;if(voice)utterance.voice=voice;
 utterance.onerror=e=>{if(token===audioToken&&!['interrupted','canceled'].includes(e.error))notify('Could not play audio. / 播放失败，请重试。');};window.speechSynthesis.speak(utterance);
}
function levelsFor(c){if(c==='materials')return ['N5','N4','N3','N2','N1','ondoku'];if(window.LESSONS[c])return Object.keys(window.LESSONS[c]);if(window.VIDEOS[c])return Object.keys(window.VIDEOS[c]);return ['all'];}
function readHash(){const [c,l,id]=location.hash.slice(1).split('/');category=Object.hasOwn(categories,c)?c:'home';level=levelsFor(category).includes(l)?l:levelsFor(category)[0];articleId=id||'';}
function navigate(c,l,id=''){if(!Object.hasOwn(categories,c)||!levelsFor(c).includes(l))throw Error('Invalid category or level');stop();$('detail').close();selected=null;category=c;level=l;articleId=id;history.replaceState(null,'',`#${c}${l==='all'&&!id?'':'/'+l}${id?'/'+id:''}`);render();}
function setPrefs(key,value){prefs[key]=value;try{localStorage.setItem('moeka-reading',JSON.stringify(prefs));}catch{}render();}
function validVideoId(id){return typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);}
function featuredVideos(){return config.featuredVideoIds.map((youtubeId,i)=>({youtubeId,title:`おすすめ動画 ${i+1}`}));}
function videoThumbnail(e,index){return validVideoId(e.youtubeId)?`<div class="video-media"><button class="video-thumbnail" type="button" data-play-video="${esc(index)}" aria-label="Play ${esc(plain(e.title))} / 播放"><span class="thumbnail-fallback" aria-hidden="true">${String(index).startsWith('featured-')?'':jp(e.title)}</span><img src="https://i.ytimg.com/vi/${encodeURIComponent(e.youtubeId)}/hqdefault.jpg" alt="${esc(plain(e.title))}" width="480" height="360" loading="${String(index).startsWith('featured-')?'eager':'lazy'}"><span class="thumbnail-play" aria-hidden="true">▶</span></button></div>`:'<p>Video unavailable / 视频暂不可用</p>';}
function playVideo(button){const e=button.dataset.playVideo.startsWith('featured-')?featuredVideos()[Number(button.dataset.playVideo.slice(9))]:window.VIDEOS[category]?.[level]?.[Number(button.dataset.playVideo)];if(!e||!validVideoId(e.youtubeId))return;const host=button.parentElement;host.innerHTML=`<iframe class="youtube-player" src="https://www.youtube.com/embed/${encodeURIComponent(e.youtubeId)}?autoplay=1&playsinline=1&rel=0" title="${esc(plain(e.title))}" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;host.querySelector('iframe').focus();}
function videoCard(e,i){return `<article class="video-card">${videoThumbnail(e,i)}<div><h3>${jp(e.title)}</h3>${tr(e.en,e.zh)}<a href="https://www.youtube.com/watch?v=${encodeURIComponent(e.youtubeId)}" target="_blank" rel="noopener noreferrer">YouTube ↗</a>${e.captions?.length?`<details class="video-transcript"><summary>字幕 / Transcript / 双语字幕</summary>${e.captions.map(line=>`<div class="caption-line"><p class="japanese">${jp(line.ja)}</p>${tr(line.en,line.zh)}</div>`).join('')}</details>`:''}</div></article>`;}
function renderVideos(){const entries=window.VIDEOS[category][level];$('count').textContent=`${entries.length} videos / 个视频`;$('hint').textContent='Click a thumbnail to play / 点击缩略图播放';$('content').innerHTML=entries.length?entries.map(videoCard).join(''):`<div class="video-empty"><span class="big-kana" aria-hidden="true">${categories[category].icon}</span><h3>動画は準備中です</h3><p>Videos are coming soon.<br>视频正在准备中。</p><a class="channel-link" href="${esc(config.youtubeChannel)}" target="_blank" rel="noopener noreferrer">MOEKA on YouTube ↗</a></div>`;}
const partsOfSpeech={
 '名詞':{ja:'{名詞|めいし}',en:'Noun',zh:'名词'},
 '動詞':{ja:'{動詞|どうし}',en:'Verb',zh:'动词'},
 'い形容詞':{ja:'い{形容詞|けいようし}',en:'i-adjective',zh:'い形容词'},
 'な形容詞':{ja:'な{形容詞|けいようし}',en:'na-adjective',zh:'な形容词'},
 '副詞':{ja:'{副詞|ふくし}',en:'Adverb',zh:'副词'},
 '連体詞':{ja:'{連体詞|れんたいし}',en:'Adnominal',zh:'连体词'},
 '接続詞':{ja:'{接続詞|せつぞくし}',en:'Conjunction',zh:'接续词'},
 '感動詞':{ja:'{感動詞|かんどうし}',en:'Interjection',zh:'感叹词'},
 '助詞':{ja:'{助詞|じょし}',en:'Particle',zh:'助词'},
 '助動詞':{ja:'{助動詞|じょどうし}',en:'Auxiliary',zh:'助动词'}
};
const posOrder=Object.keys(partsOfSpeech),kanaCollator=new Intl.Collator('ja',{usage:'sort',sensitivity:'variant',numeric:true});
function partOfSpeech(e){return String(e[7]||'').split('·')[0].trim();}
function vocabularyBadge(e){const key=partOfSpeech(e),pos=partsOfSpeech[key];return `<span class="word-pos">${pos?`${jp(pos.ja)} <span lang="en">/ ${esc(pos.en)}</span> <span lang="zh-Hans">/ ${esc(pos.zh)}</span>`:esc(key)}</span>`;}
function sortedVocabulary(entries){
 const rank=e=>{const i=posOrder.indexOf(partOfSpeech(e));return i<0?posOrder.length:i;};
 return entries.map((e,i)=>({e,i})).sort((a,b)=>(prefs.vocabSort==='pos'?rank(a.e)-rank(b.e):0)||kanaCollator.compare(kana(a.e[0]).normalize('NFKC'),kana(b.e[0]).normalize('NFKC'))||a.i-b.i);
}
function lessonBody(e,i){return `<div class="lesson-body">${category==='vocabulary'?'':`<div class="detail-block"><h3>意味・使い方 / Meaning & usage / 含义与用法</h3><p class="japanese">${jp(e[3])}</p>${e[8]&&e[9]?tr(e[8],e[9]):''}${category==='grammar'?`<p class="grammar-pattern">${esc(e[7])}</p>`:''}</div>`}<div class="detail-block"><h3>例文 / Example / 例句</h3><p class="japanese">${jp(e[4])}</p>${tr(e[5],e[6])}</div><div class="detail-actions">${category==='characters'?`<button type="button" class="play-button" data-listen="${i}" data-part="word">♪ Listen / 听发音</button>`:''}<button type="button" class="play-button secondary" data-listen="${i}" data-part="example">♪ Example / 听例句</button></div></div>`;}
function kanjiReadings(readings,kind){
 const title=kind==='on'?`${jp('{音読|おんよ}み')} / On’yomi / 音读`:`${jp('{訓読|くんよ}み')} / Kun’yomi / 训读`;
 return `<section class="kanji-reading-section"><h4>${title}</h4><div class="kanji-reading-buttons">${readings.length?readings.map(reading=>{const sound=kana(reading).replace(/\./g,'');const label=(prefs.script==='hiragana'?kana(reading):reading).replace(/\./g,'');return `<button type="button" class="kanji-reading-button" data-kanji-reading="${esc(sound)}" aria-label="${esc(label)}：再生 / Play / 播放"><span lang="ja">${esc(label)}</span><span aria-hidden="true">♪</span></button>`;}).join(''):'<span class="kanji-no-reading">— / None / 无</span>'}</div></section>`;
}
function renderKanjiGroups(){
 const groups=window.KANJI_GROUPS[level];
 $('content').className='grid kanji-groups';
 $('count').textContent=`${groups.reduce((n,g)=>n+g.items.length,0)} kanji / 字`;
 $('hint').textContent='＋で開く・読みを押して聞く / Expand, then tap a reading / 展开后点击读音';
 $('content').innerHTML=groups.map((group,index)=>`<section class="kanji-group" aria-labelledby="kanji-group-${index}"><h3 id="kanji-group-${index}">${jp(group.title)}<small><span lang="en">${esc(group.en)}</span> / <span lang="zh-Hans">${esc(group.zh)}</span></small></h3><div class="kanji-card-grid">${group.items.map(entry=>`<details class="kanji-card"><summary aria-label="${esc(entry.kanji)}：音読み・訓読み / Readings / 读音"><span class="kanji-glyph" lang="ja">${esc(entry.kanji)}</span><span class="kanji-expand" aria-hidden="true">＋</span></summary><div class="kanji-card-body">${tr(entry.en,entry.zh)}${kanjiReadings(entry.on,'on')}${kanjiReadings(entry.kun,'kun')}</div></details>`).join('')}</div></section>`).join('')+`<p class="kanji-reading-note">主な音読み・訓読みを掲載しています。<br>Main on’yomi and kun’yomi readings. / 列出主要音读和训读。<br><a href="https://www.bunka.go.jp/kokugo_nihongo/sisaku/joho/joho/kijun/naikaku/kanji/" target="_blank" rel="noopener noreferrer">音訓の参考：文化庁「常用漢字表」 / Reading reference</a></p>`;
}
function renderLessons(){if(category==='characters'&&window.KANJI_GROUPS?.[level]){renderKanjiGroups();return;}const entries=window.LESSONS[category][level];$('count').textContent=`${entries.length} lessons / 项`;$('hint').textContent=category==='characters'?'Click a card to listen / 点击卡片听发音':'Click to expand / 点击展开';
 if(category==='characters'){$('content').innerHTML=entries.map((e,i)=>`<button class="word-card" type="button" data-entry="${i}" aria-label="${esc(plain(e[0]))}"><span class="card-top"><span class="tag">${esc(e[7])}</span><span class="sound-icon" aria-hidden="true">♪</span></span><span class="word">${jp(e[0])}</span>${tr(e[1],e[2])}</button>`).join('');return;}
 $('content').innerHTML=(category==='vocabulary'?sortedVocabulary(entries):entries.map((e,i)=>({e,i}))).map(({e,i})=>`<details class="lesson-accordion" name="lesson-${category}"><summary><span class="lesson-heading"><span class="lesson-word">${jp(e[0])}</span>${category==='vocabulary'?vocabularyBadge(e):''}</span><span class="lesson-translation"><span lang="en">${esc(e[1])}</span><span lang="zh-Hans">${esc(e[2])}</span></span><span class="lesson-summary-actions"><button type="button" class="play-button lesson-listen" data-listen="${i}" data-part="word" aria-label="${esc(plain(e[0]))}: Listen / 听发音">♪ Listen / 听发音</button><span class="accordion-mark" aria-hidden="true">＋</span></span></summary>${lessonBody(e,i)}</details>`).join('');
}
function showCharacter(i){const e=window.LESSONS.characters[level]?.[i];if(!e)return;selected=i;$('detail-content').innerHTML=`<span class="tag">${esc(level)} · Kanji</span><h2 class="detail-word" id="detail-title">${jp(e[0])}</h2>${tr(e[1],e[2])}${lessonBody(e,i)}`;$('detail').showModal();speak(e[0]);}
function articleCard(a,kind){const href=kind==='materials'?`#materials/${a.level}/${a.id}`:`#news/all/${a.id}`;return `<a class="article-card${kind==='materials'?' material-card':''}" href="${esc(href)}"><div class="article-meta"><time datetime="${esc(a.date)}">${esc(a.date)}</time>${a.level?`<span class="tag">${esc(a.level)}</span>`:''}</div><h3>${jp(a.title)}</h3>${tr(a.enTitle,a.zhTitle)}<span class="article-read">読む / Read / 阅读 →</span></a>`;}
function paragraphs(text,lang){return String(text||'').trim().split(/\n\s*\n/).filter(Boolean).map(p=>`<p lang="${lang}" class="article-paragraph">${lang==='ja'?jp(p):esc(p)}</p>`).join('');}
function articleBody(a,kind){return `<article class="article-full"><a class="back-link" href="#${kind}${kind==='materials'?'/'+a.level:''}">← 一覧 / All articles / 返回列表</a><div class="article-meta"><time datetime="${esc(a.date)}">${esc(a.date)}</time>${a.level?`<span class="tag">${esc(a.level)}</span>`:''}</div><h2>${jp(a.title)}</h2>${tr(a.enTitle,a.zhTitle)}<section class="article-language"><h3>日本語</h3>${paragraphs(a.ja,'ja')}</section>${kind==='materials'?articleTranslations(a):`<section class="article-language"><h3>English</h3>${paragraphs(a.en,'en')}</section><section class="article-language"><h3>中文</h3>${paragraphs(a.zh,'zh-Hans')}</section>`}</article>`;}
function articleTranslations(a,id='article'){const prefix=esc(id);return `<div class="article-translations"><div class="article-translation-buttons" role="group" aria-label="翻訳 / Translations / 翻译"><button type="button" id="${prefix}-translation-en-button" class="translation-button" data-article-translation="en" aria-expanded="false" aria-controls="${prefix}-translation-en" lang="en">English <span aria-hidden="true">＋</span></button><button type="button" id="${prefix}-translation-zh-button" class="translation-button" data-article-translation="zh" aria-expanded="false" aria-controls="${prefix}-translation-zh" lang="zh-Hans">中文 <span aria-hidden="true">＋</span></button></div><section id="${prefix}-translation-en" class="article-language translation-panel" aria-labelledby="${prefix}-translation-en-button" hidden>${paragraphs(a.en,'en')}</section><section id="${prefix}-translation-zh" class="article-language translation-panel" aria-labelledby="${prefix}-translation-zh-button" hidden>${paragraphs(a.zh,'zh-Hans')}</section></div>`;}
function toggleArticleTranslation(button){
 const group=button.closest('.article-translations');
 if(!group)return;
 const open=button.getAttribute('aria-expanded')!=='true';
 group.querySelectorAll('[data-article-translation]').forEach(control=>{
  const active=control===button&&open;
  control.setAttribute('aria-expanded',String(active));
  control.querySelector('span').textContent=active?'−':'＋';
  $(control.getAttribute('aria-controls')).hidden=!active;
 });
}
function remoteStatus(){return postsStatus==='error'?'<p class="load-notice" role="status">最新の記事を取得できませんでした。<br>Could not load the latest posts. / 暂时无法获取最新文章。 <button type="button" data-retry-posts>再読み込み / Retry / 重试</button></p>':postsStatus==='loading'?'<p class="load-notice" role="status">Loading latest posts… / 正在读取最新文章…</p>':'';}
function renderReadAloud(){
 const lessons=window.READ_ALOUD;
 $('content').className='grid read-aloud-list';
 $('count').textContent=`${lessons.length} topics / テーマ / 个主题`;
 $('section-title').innerHTML=`${jp('{初級|しょきゅう}')} / Beginner / 初级`;
 $('hint').textContent='＋で教材を開く / Expand to read / 点击展开教材';
 $('content').innerHTML=`<div class="read-aloud-intro"><h3>${jp('{自己紹介|じこしょうかい}をしてみよう')}</h3>${tr('Let’s introduce ourselves.','试着做自我介绍吧。')}<p>${jp('{名前|なまえ}や{内容|ないよう}を{自分|じぶん}に{合|あ}わせて、{声|こえ}に{出|だ}して{読|よ}みましょう。')}</p>${tr('These are model texts. Adapt the details to yourself and read aloud.','以下是示范短文。请根据自己的情况修改内容，并朗读出来。')}</div>`+lessons.map((lesson,i)=>`<details class="reading-lesson" name="read-aloud-lessons"><summary><span class="reading-lesson-title">${jp(lesson.title)}</span><span class="reading-expand" aria-hidden="true">＋</span></summary><div class="reading-lesson-body"><section class="reading-text"><h4>本文 / Text / 正文</h4>${paragraphs(lesson.ja,'ja')}</section>${articleTranslations({en:lesson.enTitle+'\n\n'+lesson.en,zh:lesson.zhTitle+'\n\n'+lesson.zh},'ondoku-'+lesson.id)}<section class="reading-vocabulary"><h4>${jp('{単語|たんご}')} / Vocabulary / 单词</h4><table><caption class="visually-hidden">${esc(plain(lesson.title))} — Vocabulary / 单词</caption><thead><tr><th scope="col">日本語</th><th scope="col" lang="en">English</th><th scope="col" lang="zh-Hans">中文</th></tr></thead><tbody>${lesson.vocabulary.map(word=>`<tr><th scope="row" lang="ja">${jp(word.word)}</th><td lang="en">${esc(word.en)}</td><td lang="zh-Hans">${esc(word.zh)}</td></tr>`).join('')}</tbody></table></section></div></details>`).join('');
}
function isPostPage(){return ['home','news'].includes(category)||(category==='materials'&&level!=='ondoku');}
function renderArticles(kind){if(kind==='materials'&&level==='ondoku'){renderReadAloud();return;}const items=articles[kind].filter(a=>kind!=='materials'||a.level===level);$('count').textContent=`${items.length} articles / 篇`;$('hint').textContent='';
 if(articleId){const a=articles[kind].find(a=>a.id===articleId&&(kind!=='materials'||a.level===level));$('content').innerHTML=a?articleBody(a,kind):`<div class="video-empty"><p>${postsStatus==='loading'?'Loading article… / 正在读取文章…':'記事が見つかりません。 / Article not found. / 未找到文章。'}</p></div>${remoteStatus()}`;return;}
 $('content').innerHTML=`${remoteStatus()}${items.length?items.map(a=>articleCard(a,kind)).join(''):'<div class="video-empty"><p>記事は準備中です。<br>Articles are coming soon. / 文章正在准备中。</p></div>'}`;
}
function renderHome(){const videos=featuredVideos();$('content').innerHTML=`<section class="home-featured" aria-label="Recommended videos"><div class="home-section-title"><h2>おすすめの動画</h2><span>Featured videos / 推荐视频</span></div><div class="home-video-grid">${videos.map((e,i)=>videoThumbnail(e,`featured-${i}`)).join('')}</div></section><section class="home-news"><div class="home-section-title"><h2>ニュース</h2><a href="#news">すべて見る / View all / 查看全部 →</a></div>${remoteStatus()}<div class="news-list">${articles.news.slice(0,3).map(a=>articleCard(a,'news')).join('')||'<p>ニュースは準備中です。 / News is coming soon. / 最新消息正在准备中。</p>'}</div></section>`;}
function formEndpoint(){return /^https:\/\/formspree\.io\/f\/[a-zA-Z0-9]+$/.test(config.contactEndpoint||'')?config.contactEndpoint:'';}
function renderContact(){const ready=Boolean(formEndpoint());$('content').innerHTML=`<div class="contact-panel"><p>お名前・メールアドレス・お問い合わせ内容を入力してください。</p>${tr('Please enter your name, email address and message.','请填写您的姓名、电子邮箱和咨询内容。')}${!ready?'<p class="contact-unavailable" role="status">フォームは準備中のため、まだ送信できません。<br>This form is not accepting messages yet. / 表单尚未开放，暂时无法发送。</p>':''}<form id="contact-form"><label for="contact-name">お名前 / Name / 姓名 <span class="required">必須 / Required</span></label><input id="contact-name" name="name" autocomplete="name" required maxlength="100"><label for="contact-email">メールアドレス / Email / 电子邮箱 <span class="required">必須 / Required</span></label><input id="contact-email" name="email" type="email" autocomplete="email" required maxlength="254"><label for="contact-message">お問い合わせ内容 / Message / 咨询内容 <span class="required">必須 / Required</span></label><textarea id="contact-message" name="message" required rows="7" maxlength="5000"></textarea><div class="honeypot" aria-hidden="true"><label>Leave empty<input name="_gotcha" tabindex="-1" autocomplete="off"></label></div><p class="contact-note">いただいた情報は、お問い合わせへの返信に使用します。<br>Your details will be used to reply to your message.<br>您提供的信息将用于回复咨询。</p><button class="play-button" type="submit" ${!ready?'disabled':''}>送信 / Send / 发送</button><p id="contact-result" role="status" aria-live="polite"></p></form></div>`;}
async function submitContact(form){if(submitPending)return;if(!form.reportValidity())return;for(const name of ['name','message']){const input=form.elements.namedItem(name);if(!input.value.trim()){input.setCustomValidity('Please complete this field. / 请输入内容。');input.reportValidity();return;}}
 const endpoint=formEndpoint();if(!endpoint){$('contact-result').textContent='現在、送信できません。 / Sending is unavailable. / 暂时无法发送。';return;}
 const data=new FormData(form);if(data.get('_gotcha'))return;const button=form.querySelector('[type=submit]'),result=$('contact-result');submitPending=true;button.disabled=true;result.textContent='送信中… / Sending… / 正在发送…';
 try{const res=await fetch(endpoint,{method:'POST',body:data,headers:{Accept:'application/json'},credentials:'omit',signal:AbortSignal.timeout(20000)});if(!res.ok)throw Error('Submission rejected');form.reset();result.textContent='送信しました。 / Your message was sent. / 已发送。';}
 catch{result.textContent='送信できませんでした。内容は残っています。時間をおいて再度お試しください。 / Sending failed. Please try again later. / 发送失败，请稍后重试。';}
 finally{submitPending=false;button.disabled=false;}
}
function parseIssue(issue){if(issue.pull_request||issue.state!=='open'||issue.user?.login?.toLowerCase()!==config.articleAuthor.toLowerCase())return null;const match=/^\[(教材|ニュース)\]\s*(.+)$/.exec(issue.title||'');if(!match)return null;
 const fields={};const pattern=/^### (.+)\r?\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm;let m;while((m=pattern.exec(issue.body||'')))fields[m[1].trim()]=m[2].trim();
 const kind=match[1]==='教材'?'materials':'news';if(kind==='materials'&&!/^N[1-5]$/.test(fields['難易度']||''))return null;
 const values=['English title','中文标题','日本語本文','English text','中文正文'];if(values.some(k=>!fields[k]||fields[k]==='_No response_'))return null;
 return {kind,id:'issue-'+issue.number,title:match[2],level:kind==='materials'?fields['難易度']:undefined,date:String(issue.created_at).slice(0,10),enTitle:fields['English title'],zhTitle:fields['中文标题'],ja:fields['日本語本文'],en:fields['English text'],zh:fields['中文正文']};
}
async function loadPosts(force=false){if(loadPromise)return loadPromise;if(!force&&postsStatus==='loaded')return;postsStatus='loading';if(isPostPage())render(false);
 loadPromise=(async()=>{try{const collected=[];for(let page=1;;page++){const url=`https://api.github.com/repos/${config.repository}/issues?state=open&creator=${encodeURIComponent(config.articleAuthor)}&per_page=100&sort=created&direction=desc&page=${page}`;const res=await fetch(url,{headers:{Accept:'application/vnd.github+json'},credentials:'omit',signal:AbortSignal.timeout(15000)});if(!res.ok)throw Error('Posts unavailable');const list=await res.json();if(!Array.isArray(list))throw Error('Invalid posts');collected.push(...list.map(parseIssue).filter(Boolean));if(list.length<100)break;}
 const next=JSON.parse(JSON.stringify(window.ARTICLES));for(const a of collected)next[a.kind].push(a);for(const list of Object.values(next))list.sort((a,b)=>b.date.localeCompare(a.date)||b.id.localeCompare(a.id));articles=next;postsStatus='loaded';}
 catch{postsStatus='error';}
 finally{loadPromise=null;if(isPostPage())render(false);}})();return loadPromise;
}
let navigationKey='';
function alignMobileNavigation(){
 const nav=$('mobile-nav');
 if(!nav.clientWidth)return;
 const active=nav.querySelector('[aria-current="page"]');
 if(active)nav.scrollTo({left:Math.max(0,active.offsetLeft-(nav.clientWidth-active.offsetWidth)/2),behavior:'instant'});
}
function renderNavigation(){
 const key=[category,prefs.script,prefs.furigana].join(':');
 if(key===navigationKey)return;
 navigationKey=key;
 const markup=Object.entries(categories).map(([id,c])=>`<a class="nav-item ${id===category?'active':''}" href="#${id}${id==='hiragana'?'/all':''}" ${id===category?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${c.icon}</span><span class="nav-label"><strong>${jp(c.ja)}</strong><small><span lang="en">${c.en}</span><span class="nav-language-divider" aria-hidden="true"> / </span><span lang="zh-Hans">${c.zh}</span></small></span></a>`).join('');
 $('nav').innerHTML=markup;
 $('mobile-nav').innerHTML=markup;
 alignMobileNavigation();
}
window.addEventListener('resize',alignMobileNavigation);
function render(load=true){const c=categories[category];document.body.classList.toggle('hide-ruby',!prefs.furigana);$('kanji').setAttribute('aria-pressed',String(prefs.script==='kanji'));$('hiragana').setAttribute('aria-pressed',String(prefs.script==='hiragana'));$('furigana').checked=prefs.furigana;$('furigana').disabled=prefs.script==='hiragana';
 $('reading-tools').hidden=!['vocabulary','grammar','characters','materials'].includes(category);
 $('vocabulary-tools').hidden=category!=='vocabulary';document.querySelectorAll('[data-vocab-sort]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.vocabSort===prefs.vocabSort)));
 renderNavigation();
 $('page-title').innerHTML=category==='home'?'MOEKA NIHONGO':`${jp(c.ja)}<span lang="en">${c.en}</span>`;
 $('page-subtitle').textContent=category==='home'?'いっしょに、日本語。 / Learn Japanese together. / 一起学日语。':`${c.en} / ${c.zh}`;
 const ls=levelsFor(category);$('levels').innerHTML=ls.length>1?ls.map(l=>`<button type="button" class="level" data-level="${l}" aria-pressed="${l===level}">${esc(levelLabels[l])}</button>`).join(''):'';$('levels').hidden=ls.length<=1;
 $('level-row').hidden=['home','contact'].includes(category);$('section-caption').hidden=['home','contact'].includes(category);$('section-title').innerHTML=ls.length>1?`${esc(levelLabels[level])} / ${jp(c.ja)}`:jp(c.ja);$('count').textContent='';$('hint').textContent='';
 $('content').className='grid'+(['vocabulary','grammar'].includes(category)?' accordion-list':category==='hiragana'?' hiragana-videos':['home','contact'].includes(category)?' page-stack':['materials','news'].includes(category)?(articleId?' page-stack':category==='materials'?' materials-list':' article-grid'):'');
 if(category==='home')renderHome();else if(category==='contact')renderContact();else if(['materials','news'].includes(category))renderArticles(category);else if(window.VIDEOS[category])renderVideos();else renderLessons();
 if(load&&isPostPage()&&postsStatus==='idle')loadPosts();
}
window.addEventListener('hashchange',()=>{stop();$('detail').close();selected=null;readHash();render();});
document.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;if(['pos','kana'].includes(b.dataset.vocabSort)){stop();setPrefs('vocabSort',b.dataset.vocabSort);}if(b.dataset.articleTranslation!==undefined)toggleArticleTranslation(b);if(b.dataset.level)navigate(category,b.dataset.level);if(b.dataset.playVideo!==undefined)playVideo(b);if(b.dataset.entry!==undefined)showCharacter(Number(b.dataset.entry));if(b.dataset.kanjiReading!==undefined&&category==='characters'){e.preventDefault();speak(b.dataset.kanjiReading);}if(b.dataset.listen!==undefined){e.preventDefault();const entry=window.LESSONS[category]?.[level]?.[Number(b.dataset.listen)];if(entry)speak(entry[b.dataset.part==='example'?4:0]);}if(b.hasAttribute('data-retry-posts')){loadPosts(true);render(false);}});
document.addEventListener('submit',e=>{if(e.target.id==='contact-form'){e.preventDefault();submitContact(e.target);}});
document.addEventListener('input',e=>{if(e.target.closest('#contact-form'))e.target.setCustomValidity('');});
document.addEventListener('error',e=>{if(e.target.matches?.('.video-thumbnail img'))e.target.hidden=true;},true);
$('kanji').addEventListener('click',()=>setPrefs('script','kanji'));$('hiragana').addEventListener('click',()=>setPrefs('script','hiragana'));$('furigana').addEventListener('change',e=>setPrefs('furigana',e.target.checked));
$('detail').querySelector('.close').addEventListener('click',()=>$('detail').close());$('detail').addEventListener('close',()=>{selected=null;stop();});
$('detail').addEventListener('click',e=>{if(e.target===$('detail')){const r=$('detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('detail').close();}});
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
$('social-links').innerHTML=`<a href="${esc(config.youtubeChannel)}" target="_blank" rel="noopener noreferrer">YouTube @moeka_japanese ↗</a><a href="${esc(config.xUrl)}" target="_blank" rel="noopener noreferrer">X @moeka_happy_ ↗</a><a href="${esc(config.rednoteUrl)}" target="_blank" rel="noopener noreferrer" title="Search moeka_japanese on rednote">rednote（小红书）@moeka_japanese ↗</a>`;
readHash();render();
if(document.modelContext?.registerTool){const life=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'navigate_japanese_lessons',title:'Choose Japanese lessons',description:'Open a site section and level without playing audio.',inputSchema:{type:'object',properties:{category:{type:'string',enum:Object.keys(categories)},level:{type:'string',enum:Object.keys(levelLabels)}},required:['category','level'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.category!=='string'||typeof input.level!=='string')throw Error('Category and level are required');navigate(input.category,input.level);return{category,level};}},{signal:life.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>life.abort(),{once:true});}
})();
