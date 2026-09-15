'use strict';
(() => {
const categories={
 hiragana:{ja:'{五十音|ごじゅうおん}（ひらがな）',en:'Hiragana',zh:'平假名',icon:'あ',hint:'Watch, listen and repeat / 看视频、听发音、跟着读'},
 vocabulary:{ja:'{単語|たんご}',en:'Vocabulary',zh:'单词',icon:'あ',hint:'Click a card to listen / 点击卡片听发音'},
 grammar:{ja:'{文法|ぶんぽう}',en:'Grammar',zh:'语法',icon:'文',hint:'Choose a pattern / 点击查看用法和例句'},
 listening:{ja:'リスニング',en:'Listening',zh:'听力',icon:'◎',hint:'Listen with MOEKA / 和 MOEKA 一起练听力'},
 speaking:{ja:'スピーキング',en:'Speaking',zh:'口语',icon:'◌',hint:'Practice speaking / 开口练习日语'},
 pronunciation:{ja:'{発音|はつおん}',en:'Pronunciation',zh:'发音',icon:'声',hint:'Listen and repeat / 听一听，跟着读'},
 characters:{ja:'{文字|もじ}',en:'Characters',zh:'文字',icon:'字',hint:'Hiragana, katakana & kanji / 平假名、片假名与汉字'}
};
const levels={N5:'N5',N4:'N4',N3:'N3',N2:'N2',N1:'N1',beginner:'初級 · Beginner',intermediate:'中級 · Intermediate',advanced:'上級 · Advanced',all:'ひらがな · Hiragana · 平假名'};
const $=id=>document.getElementById(id);
const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const plain=s=>s.replace(/\{([^|{}]+)\|([^{}]+)\}/g,'$1');
const kana=s=>s.replace(/\{([^|{}]+)\|([^{}]+)\}/g,'$2').replace(/[ァ-ヶ]/g,c=>String.fromCharCode(c.charCodeAt(0)-0x60));
let prefs={script:'kanji',furigana:true};
try{const saved=JSON.parse(localStorage.getItem('moeka-reading')||'{}');if(['kanji','hiragana'].includes(saved.script))prefs.script=saved.script;if(typeof saved.furigana==='boolean')prefs.furigana=saved.furigana;}catch{}
let category='vocabulary',level='N5',selected=null,utterance=null,audioToken=0,timer;
function jp(s){if(prefs.script==='hiragana')return escape(kana(s));return escape(s).replace(/\{([^|{}]+)\|([^{}]+)\}/g,'<ruby>$1<rt>$2</rt></ruby>');}
const tr=(en,zh)=>`<div class="translations"><span lang="en">${escape(en)}</span><span lang="zh-Hans">${escape(zh)}</span></div>`;
function notify(message){$('status').textContent=message;clearTimeout(timer);timer=setTimeout(()=>$('status').textContent='',6000);}
function stop(){audioToken++;if('speechSynthesis'in window)window.speechSynthesis.cancel();utterance=null;}
function speak(text,rate=0.85){
 stop();
 if(!('speechSynthesis'in window)){notify('Audio is unavailable in this browser. / 此浏览器不支持语音。');return;}
 const synth=window.speechSynthesis,voices=synth.getVoices(),voice=voices.find(v=>/^ja(?:-|_)/i.test(v.lang));
 if(voices.length&&!voice){notify('Please add a Japanese voice on your device. / 请在设备中添加日语语音。');return;}
 const currentToken=audioToken;
 utterance=new SpeechSynthesisUtterance(plain(text));utterance.lang='ja-JP';utterance.rate=rate;if(voice)utterance.voice=voice;
 utterance.onerror=e=>{if(currentToken===audioToken&&!['interrupted','canceled'].includes(e.error))notify('Could not play audio. Try again. / 播放失败，请重试。');};
 synth.speak(utterance);
}
function isVideo(){return Object.hasOwn(window.VIDEOS,category);}
function availableLevels(){return Object.keys(isVideo()?window.VIDEOS[category]:window.LESSONS[category]);}
function setHash(){history.replaceState(null,'',`#${category}/${level}`);}
function readHash(){const [c,l]=location.hash.slice(1).split('/');category=Object.hasOwn(categories,c)?c:'vocabulary';level=availableLevels().includes(l)?l:availableLevels()[0];}
function render(){
 const c=categories[category];
 document.body.classList.toggle('hide-ruby',!prefs.furigana);
 $('kanji').setAttribute('aria-pressed',String(prefs.script==='kanji'));$('hiragana').setAttribute('aria-pressed',String(prefs.script==='hiragana'));
 $('furigana').checked=prefs.furigana;$('furigana').disabled=prefs.script==='hiragana';
 $('nav').innerHTML=Object.entries(categories).map(([key,v])=>`<a class="nav-item ${key===category?'active':''}" href="#${key}" ${key===category?'aria-current="page"':''}><span class="nav-icon" aria-hidden="true">${v.icon}</span><span><strong>${jp(v.ja)}</strong><small lang="en">${v.en} / <span lang="zh-Hans">${v.zh}</span></small></span></a>`).join('');
 $('page-title').innerHTML=`${jp(c.ja)}<span lang="en">${c.en}</span>`;
 $('page-subtitle').innerHTML=isVideo()?'Learn with videos, at your own pace. / 通过视频，按自己的节奏学习。':'A little Japanese, every day. / 每天学一点，让日语更熟悉。';
 if(category==='hiragana')$('page-subtitle').innerHTML='Learn hiragana with MOEKA’s videos. / 和 MOEKA 一起通过视频学习平假名。';
 $('levels').hidden=category==='hiragana';
 $('content').classList.toggle('hiragana-videos',category==='hiragana');
 $('levels').innerHTML=availableLevels().map(l=>`<button class="level" type="button" data-level="${l}" aria-pressed="${l===level}">${escape(levels[l])}</button>`).join('');
 const entries=isVideo()?window.VIDEOS[category][level]:window.LESSONS[category][level];
 $('count').textContent=`${entries.length} ${isVideo()?'videos / 个视频':'lessons / 项'}`;
 $('section-title').innerHTML=isVideo()?escape(levels[level]):`${escape(level)} <span> / ${jp(c.ja)}</span>`;
 $('hint').textContent=c.hint;
 if(isVideo())renderVideos(entries);
 else $('content').innerHTML=entries.map((e,i)=>`<button class="word-card" type="button" data-entry="${i}" aria-label="${escape(plain(e[0]))} · ${escape(e[1])} · Listen and learn"><span class="card-top"><span class="tag">${escape(category==='grammar'?'文型 · Pattern':e[7])}</span><span class="sound-icon" aria-hidden="true">♪</span></span><span class="word">${jp(e[0])}</span>${tr(e[1],e[2])}</button>`).join('');
 if(selected)renderDetail(selected);
}
function validVideoId(s){return typeof s==='string'&&/^[A-Za-z0-9_-]{11}$/.test(s);}
function renderVideos(entries){
 if(category==='hiragana'){renderHiraganaVideos(entries);return;}
 if(!entries.length){$('content').innerHTML=`<div class="video-empty"><span class="big-kana" aria-hidden="true">${categories[category].icon}</span><h3>${jp('{動画|どうが}は{準備中|じゅんびちゅう}です')}</h3><p>Lessons for this level are coming soon.<br><span lang="zh-Hans">这个级别的视频课程正在准备中。</span></p><a class="channel-link" href="${escape(window.SITE_CONFIG.youtubeChannel)}" target="_blank" rel="noopener noreferrer">MOEKA on YouTube ↗</a></div>`;return;}
 $('content').innerHTML=entries.map((e,i)=>`<article class="video-card"><div class="video-poster" aria-hidden="true">▶</div><div><h3>${jp(e.title)}</h3>${tr(e.en,e.zh)}${validVideoId(e.youtubeId)?`<a href="https://www.youtube.com/watch?v=${encodeURIComponent(e.youtubeId)}" target="_blank" rel="noopener noreferrer">Watch on YouTube / 在 YouTube 观看 ↗</a>`:'<p>Video unavailable / 视频暂不可用</p>'}${e.captions?.length?`<p><button class="play-button secondary" data-transcript="${i}" type="button">Transcript / 双语字幕</button></p>`:''}</div></article>`).join('');
}
function renderHiraganaVideos(entries){
 if(!entries.length){$('content').innerHTML=`<div class="video-empty"><span class="big-kana" aria-hidden="true">あいうえお</span><h3>${jp('{五十音|ごじゅうおん}の{動画|どうが}は{準備中|じゅんびちゅう}です')}</h3><p>Hiragana videos are coming soon.<br><span lang="zh-Hans">平假名视频正在准备中。</span></p><a class="channel-link" href="${escape(window.SITE_CONFIG.youtubeChannel)}" target="_blank" rel="noopener noreferrer">MOEKA on YouTube ↗</a></div>`;return;}
 $('content').innerHTML=entries.map(e=>`<article class="video-card hiragana-video">${validVideoId(e.youtubeId)?`<iframe class="youtube-player" src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(e.youtubeId)}?playsinline=1" title="${escape(plain(e.title))}" loading="lazy" referrerpolicy="strict-origin-when-cross-origin" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`:'<p>Video unavailable / 视频暂不可用</p>'}<div><h3>${jp(e.title)}</h3>${tr(e.en,e.zh)}${validVideoId(e.youtubeId)?`<a href="https://www.youtube.com/watch?v=${encodeURIComponent(e.youtubeId)}" target="_blank" rel="noopener noreferrer">Watch on YouTube / 在 YouTube 观看 ↗</a>`:''}${e.captions?.length?`<section class="bilingual-captions" aria-label="Bilingual transcript / 双语字幕"><h4>${jp('{字幕|じまく}')} / Transcript / 双语字幕</h4>${e.captions.map(line=>`<div class="caption-line"><p class="japanese">${jp(line.ja)}</p>${tr(line.en,line.zh)}</div>`).join('')}</section>`:''}</div></article>`).join('');
}
function renderDetail(e){
 $('detail-content').innerHTML=`<span class="tag">${escape(level)} · ${escape(categories[category].en)}</span><h2 class="detail-word" id="detail-title">${jp(e[0])}</h2>${tr(e[1],e[2])}<div class="detail-actions"><button class="play-button" data-speak="word" type="button">♪ Listen / 听发音</button><button class="play-button secondary" data-speak="slow" type="button">Slow / 慢速</button></div><div class="detail-block"><h3>意味・使い方 / Meaning & usage / 含义与用法</h3><p class="japanese">${jp(e[3])}</p>${category==='grammar'?`<p class="translations">${escape(e[7])}</p>`:''}</div><div class="detail-block"><h3>例文 / Example / 例句</h3><p class="japanese">${jp(e[4])}</p>${tr(e[5],e[6])}<div class="detail-actions"><button class="play-button secondary" data-speak="example" type="button">♪ Listen to example / 听例句</button></div></div><p class="audio-note">Device-generated Japanese voice / 设备合成日语语音</p>`;
}
function openEntry(i){const entries=window.LESSONS[category]?.[level];if(!entries?.[i])return;selected=entries[i];renderDetail(selected);$('detail').showModal();speak(selected[0]);}
function openTranscript(i){const e=window.VIDEOS[category]?.[level]?.[i];if(!e)return;selected=null;$('detail-content').innerHTML=`<h2 id="detail-title">${jp(e.title)}</h2>${e.captions.map(line=>`<div class="detail-block"><p class="japanese">${jp(line.ja)}</p>${tr(line.en,line.zh)}</div>`).join('')}`;$('detail').showModal();}
function preference(key,value){prefs[key]=value;try{localStorage.setItem('moeka-reading',JSON.stringify(prefs));}catch{}render();}
function navigate(c,l){if(!Object.hasOwn(categories,c))throw Error('Unknown category');const list=Object.keys(window.VIDEOS[c]||window.LESSONS[c]);if(!list.includes(l))throw Error('Invalid level');stop();$('detail').close();selected=null;category=c;level=l;setHash();render();}
window.addEventListener('hashchange',()=>{stop();$('detail').close();selected=null;readHash();render();});
document.addEventListener('click',e=>{
 const b=e.target.closest('button');if(!b)return;
 if(b.dataset.level)navigate(category,b.dataset.level);
 if(b.dataset.entry!==undefined)openEntry(Number(b.dataset.entry));
 if(b.dataset.transcript!==undefined)openTranscript(Number(b.dataset.transcript));
 if(b.dataset.speak&&selected)speak(b.dataset.speak==='example'?selected[4]:selected[0],b.dataset.speak==='slow'?.65:.85);
});
 $('kanji').addEventListener('click',()=>preference('script','kanji'));$('hiragana').addEventListener('click',()=>preference('script','hiragana'));
 $('furigana').addEventListener('change',e=>preference('furigana',e.target.checked));
 $('detail').querySelector('.close').addEventListener('click',()=>$('detail').close());
 $('detail').addEventListener('close',()=>{selected=null;stop();});
 $('detail').addEventListener('click',e=>{if(e.target===$('detail')){const r=$('detail').getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)$('detail').close();}});
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop();});
 readHash();render();
 // Optional WebMCP support. The same navigation function drives UI and tool actions.
 if(document.modelContext?.registerTool){const lifecycle=new AbortController();try{Promise.resolve(document.modelContext.registerTool({name:'navigate_japanese_lessons',title:'Choose Japanese lessons',description:'Open a learning category and level. Does not play audio.',inputSchema:{type:'object',properties:{category:{type:'string',enum:Object.keys(categories)},level:{type:'string',enum:Object.keys(levels)}},required:['category','level'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(!input||typeof input.category!=='string'||typeof input.level!=='string')throw Error('Category and level are required');navigate(input.category,input.level);return{category,level,count:(window.VIDEOS[category]||window.LESSONS[category])[level].length};}},{signal:lifecycle.signal})).catch(()=>{});}catch{}window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});}
})();
