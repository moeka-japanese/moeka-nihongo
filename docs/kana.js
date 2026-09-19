'use strict';
// Kana learning UI. Stroke dataset attribution is displayed beside the practice area.
window.KanaPractice = (() => {
 const escape=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 let host,script='hiragana',group='basic',mode='learn',index=0;
 let speech=()=>{},cancelSpeech=()=>{},animations=[],cleanup=()=>{},mounted=null;
 const rows=['あいうえお','かきくけこ','さしすせそ','たちつてと','なにぬねの','はひふへほ','まみむめも','や ゆ よ','らりるれろ','わ   を','ん'];
 const voicedRows=['がぎぐげご','ざじずぜぞ','だぢづでど','ばびぶべぼ','ぱぴぷぺぽ'];
 const showKana=c=>script==='katakana'?[...c].map(letter=>String.fromCharCode(letter.charCodeAt(0)+96)).join(''):c;
 const entries=()=>window.KANA_LESSONS.slice(...(group==='basic'?[0,46]:group==='voiced'?[46,71]:[71,104]));
 const chartRows=()=>group==='yoon'?entries().reduce((all,item,i)=>{if(i%3===0)all.push([]);all.at(-1).push(item.kana);return all;},[]):(group==='basic'?rows:voicedRows).map(row=>[...row.padEnd(5,' ')]);
 const current=()=>entries()[index];
 const button=(label,action,extra='')=>`<button type="button" data-kana-action="${action}" ${extra}>${label}</button>`;
 const badge=(label,en,zh)=>`${label}<small lang="en">${en}</small><small lang="zh-Hans">${zh}</small>`;
 function halt(){animations.forEach(a=>a.cancel());animations=[];cleanup();cleanup=()=>{};}
 function destroy(){halt();if(mounted){mounted.removeEventListener('click',click);mounted=null;}host=null;}
 function mount(target,type,options){
  destroy();if(type!==script){script=type;index=0;group='basic';mode='learn';}
  host=target;speech=options.speak;cancelSpeech=options.stop;mounted=host;host.addEventListener('click',click);draw();replay();
 }
 function strokeSvg(char,active=false){
  const letters=[...char];
  const paths=letters.flatMap((letter,part)=>window.KANA_STROKES[letter.replace(/[ゃゅょャュョ]/g,c=>String.fromCharCode(c.charCodeAt(0)+1))].map(d=>({d,transform:letters.length===1?'':part===0?'translate(0 20) scale(.56)':'translate(65 44) scale(.36)'})));
  const markup=(path,i,kind)=>`<path class="kana-stroke-${kind}" ${kind==='active'?`data-stroke="${i}"`:''} d="${escape(path.d)}" transform="${path.transform}"/>`;
  return `<svg class="kana-strokes" viewBox="0 0 109 109" role="img" aria-label="${char}の書き順 / Stroke order / 笔顺"><path class="kana-guide-line" d="M54.5 0V109 M0 54.5H109"/>${paths.map((p,i)=>markup(p,i,'ghost')).join('')}${active?paths.map((p,i)=>markup(p,i,'active')).join(''):''}</svg>`;
 }
 function draw(){
  halt();const entry=current(),char=showKana(entry.kana),isKatakana=script==='katakana';
  const word=isKatakana?entry.katakanaWord:entry.word,en=isKatakana?entry.katakanaEn:entry.en,zh=isKatakana?entry.katakanaZh:entry.zh;
  host.className='grid kana-content';
  host.innerHTML=`<div class="kana-widget"><div class="kana-group-tabs" role="group" aria-label="文字の種類 / Character set / 假名类别">${button(badge('清音','Basic sounds','清音'),'basic',`aria-pressed="${group==='basic'}"`)}${button(badge('濁音・半濁音','Voiced sounds','浊音・半浊音'),'voiced',`aria-pressed="${group==='voiced'}"`)}${button(badge('拗音','Combined sounds','拗音'),'yoon',`aria-pressed="${group==='yoon'}"`)}</div><details class="kana-chart" open><summary>${isKatakana?'カタカナ':'ひらがな'}一覧 / Chart / 一览表</summary><div class="kana-chart-grid ${group==='yoon'?'kana-yoon-grid':''}">${(group==='yoon'?['ya','yu','yo']:['a','i','u','e','o']).map(v=>`<span class="kana-vowel">${v}</span>`).join('')}${chartRows().map(row=>row.map(c=>{const item=window.KANA_LESSONS.find(x=>x.kana===c);return item?button(`<span>${showKana(c)}</span><small>${item.romaji}</small>`,'select',`data-kana="${c}" aria-pressed="${c===entry.kana}" aria-label="${showKana(c)} ${item.romaji}"`):'<span aria-hidden="true"></span>';}).join('')).join('')}</div></details><section class="kana-study" aria-label="文字の練習 / Practice / 练习"><div class="kana-mode-tabs" role="group" aria-label="練習方法 / Practice mode / 练习方式">${button(badge('覚える','Learn','学习'),'learn',`aria-pressed="${mode==='learn'}"`)}${button(badge('書く','Write','书写'),'write',`aria-pressed="${mode==='write'}"`)}</div><div class="kana-progress">${index+1} / ${entries().length}</div><div class="kana-study-grid">${mode==='learn'?`<div class="kana-flashcard"><span class="kana-large">${char}</span><span class="kana-romaji">${escape(entry.romaji)}</span>${button('♪ 発音 / Listen / 听发音','listen')}<div class="kana-example">${group==='yoon'?'<p class="kana-example-note">例語（かなは読みの表記）<br><span lang="en">Example · kana shows the reading</span><br><span lang="zh-Hans">例词 · 假名表示读音</span></p>':''}<p class="kana-example-word">${escape(word)}</p><p lang="en">${escape(en)}</p><p lang="zh-Hans">${escape(zh)}</p>${button('♪ 単語 / Word / 单词','word')}</div></div>`:`<div class="kana-write-model"><h3>お手本 / Model / 示范</h3>${strokeSvg(char,true)}${button('▶ 書き順 / Replay / 重播','replay')}<p class="kana-stroke-count" aria-live="polite"></p></div>`}${mode==='learn'?`<div class="kana-write-model"><h3>書き順 / Stroke order / 笔顺</h3>${strokeSvg(char,true)}${button('▶ 再生 / Replay / 重播','replay')}<p class="kana-stroke-count" aria-live="polite"></p></div>`:`<div class="kana-drawing"><h3>なぞってみよう / Trace / 描一描</h3><div class="kana-canvas-wrap">${strokeSvg(char)}<canvas width="654" height="654" aria-label="${char}を指やマウスで書く / Draw with your finger or mouse / 用手指或鼠标书写"></canvas></div><div class="kana-drawing-actions">${button('戻す / Undo / 撤销','undo')}${button('消す / Clear / 清除','clear')}</div><p>指やマウスで書けます。<br><span lang="en">Draw with your finger or mouse.</span><br><span lang="zh-Hans">请用手指或鼠标书写。</span></p></div>`}</div><div class="kana-pager">${button('← 前へ / Back / 上一个','prev',index===0?'disabled':'')}${button('次へ / Next / 下一个 →','next',index===entries().length-1?'disabled':'')}</div><p class="kana-attribution">書き順データ / Stroke data / 笔顺数据：<a href="https://kanjivg.tagaini.net/" target="_blank" rel="noopener noreferrer">KanjiVG</a> © Ulrich Apel and contributors · <a href="https://creativecommons.org/licenses/by-sa/3.0/" target="_blank" rel="noopener noreferrer">CC BY-SA 3.0</a></p></section></div>`;
  if(mode==='write')setupCanvas();
 }
 function replay(){
  animations.forEach(a=>a.cancel());animations=[];
  const paths=[...host.querySelectorAll('.kana-stroke-active')];
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  paths.forEach((path,i)=>{
   const length=path.getTotalLength();path.style.strokeDasharray=length;path.style.strokeDashoffset=0;
   if(!reduced)animations.push(path.animate([{strokeDashoffset:length},{strokeDashoffset:0}],{duration:700,delay:i*1000,fill:'both',easing:'linear'}));
   const point=path.getPointAtLength(0),svg=path.ownerSVGElement;
   if(!svg.querySelector(`[data-stroke-number="${i}"]`)){const text=document.createElementNS('http://www.w3.org/2000/svg','text');text.setAttribute('x',Math.max(4,point.x-7));text.setAttribute('y',Math.max(8,point.y-4));text.setAttribute('data-stroke-number',i);text.setAttribute('transform',path.getAttribute('transform')||'');text.setAttribute('class','kana-stroke-number');text.textContent=i+1;svg.append(text);}
  });
  host.querySelector('.kana-stroke-count').textContent=`${paths.length}画 / ${paths.length} strokes / ${paths.length}画`;
 }
 let drawing=[],activeStroke=null,canvas=null,context=null;
 function redrawCanvas(){if(!context)return;context.clearRect(0,0,654,654);context.strokeStyle='#b33661';context.lineWidth=15;context.lineCap='round';context.lineJoin='round';drawing.forEach(points=>{context.beginPath();context.moveTo(...points[0]);if(points.length===1)context.lineTo(points[0][0]+.1,points[0][1]);else points.slice(1).forEach(p=>context.lineTo(...p));context.stroke();});}
 function setupCanvas(){
  canvas=host.querySelector('canvas');context=canvas.getContext('2d');drawing=[];activeStroke=null;
  const point=e=>{const rect=canvas.getBoundingClientRect();return [(e.clientX-rect.left)*654/rect.width,(e.clientY-rect.top)*654/rect.height];};
  let pointer=null;
  const down=e=>{if(pointer!==null||e.button>0)return;e.preventDefault();pointer=e.pointerId;canvas.setPointerCapture(pointer);activeStroke=[point(e)];drawing.push(activeStroke);redrawCanvas();};
  const move=e=>{if(pointer!==e.pointerId||!activeStroke)return;e.preventDefault();activeStroke.push(point(e));redrawCanvas();};
  const up=e=>{if(e.pointerId!==pointer)return;pointer=null;activeStroke=null;};
  canvas.addEventListener('pointerdown',down);canvas.addEventListener('pointermove',move);canvas.addEventListener('pointerup',up);canvas.addEventListener('pointercancel',up);canvas.addEventListener('lostpointercapture',up);
  cleanup=()=>{canvas.removeEventListener('pointerdown',down);canvas.removeEventListener('pointermove',move);canvas.removeEventListener('pointerup',up);canvas.removeEventListener('pointercancel',up);canvas.removeEventListener('lostpointercapture',up);context=null;};
 }
 function click(event){
  const b=event.target.closest('[data-kana-action]');if(!b||!host.contains(b))return;
  const action=b.dataset.kanaAction,entry=current();
  if(action==='listen'){speech(showKana(entry.kana));return;}
  if(action==='word'){speech(script==='katakana'?entry.katakanaWord:entry.word);return;}
  if(action==='replay'){replay();return;}
  if(action==='undo'){drawing.pop();redrawCanvas();return;}
  if(action==='clear'){drawing=[];redrawCanvas();return;}
  cancelSpeech();
  if(action==='select'){index=entries().findIndex(x=>x.kana===b.dataset.kana);mode='learn';}
  if(['basic','voiced','yoon'].includes(action)){group=action;index=0;}
  if(['learn','write'].includes(action))mode=action;
  if(action==='prev')index=Math.max(0,index-1);
  if(action==='next')index=Math.min(entries().length-1,index+1);
  draw();
  if(['select','next','prev','learn','write'].includes(action))replay();
  if(action==='select'){host.querySelector('.kana-study').scrollIntoView({block:'start',behavior:'auto'});speech(showKana(current().kana));}
  const focusAction=action==='select'?'listen':action;
  const focusTarget=host.querySelector(`[data-kana-action="${focusAction}"]:not(:disabled)`);
  focusTarget?.focus({preventScroll:true});
 }
 return {mount,destroy};
})();
