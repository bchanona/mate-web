const KEY = "mat-progreso-v2";
let S = cargar();
let ruta = { v:"home", tema:0, modo:"flash", filtro:0 };
let fs = { i:0, flipped:false, pool:[], filtro:null };
let qs = { i:0, pool:[], elegida:null, filtro:null };

function cargar(){
  try { return Object.assign({read:{},ex:{},done:[],notas:{},quiz:{aciertas:0,total:0},tema:null}, JSON.parse(localStorage.getItem(KEY))||{}); }
  catch(e){ return {read:{},ex:{},done:[],notas:{},quiz:{aciertas:0,total:0},tema:null}; }
}
function guardar(){ try { localStorage.setItem(KEY, JSON.stringify(S)); } catch(e){} }
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const hecho = i => S.done.includes(TEMAS[i].id);
const abierto = i => i===0 || hecho(i-1);
const leidas = i => (S.read[TEMAS[i].id]||[]).filter(Boolean).length;
const listo = i => leidas(i)===TEMAS[i].secciones.length && !!S.ex[TEMAS[i].id];
const avanceTema = i => Math.round(((leidas(i)/TEMAS[i].secciones.length)*0.75 + (S.ex[TEMAS[i].id]?0.15:0) + (hecho(i)?0.10:0))*100);
const yt = q => "https://www.youtube.com/results?search_query="+encodeURIComponent(q);
const prefiereOscuro = () => !!(window.matchMedia && matchMedia("(prefers-color-scheme:dark)").matches);

function aplicarTema(){
  if(S.tema) document.documentElement.dataset.tema=S.tema;
  $("#tema-btn").textContent = document.documentElement.dataset.tema==="oscuro" || (!S.tema && prefiereOscuro()) ? "☀" : "☾";
}

function nav(){
  $("#chips").innerHTML = `<button class="chip ${ruta.v==="home"?"on":""}" data-v="home"><span class="dot"></span>Inicio</button>`+
    `<button class="chip ${ruta.v==="estudiar"?"on":""}" data-v="estudiar"><span class="dot"></span>Estudiar</button>`+
    TEMAS.map((t,i)=>`<button class="chip ${ruta.v==="tema"&&ruta.tema===i?"on":""} ${hecho(i)?"ok":""}" data-tema="${i}" ${abierto(i)?"":"disabled"}>${hecho(i)?"✓":abierto(i)?"":"🔒"} Tema ${t.id}</button>`).join("");
  const p=S.done.length/TEMAS.length, anillo=$("#ringFg");
  anillo.style.strokeDashoffset = 113*(1-p);
  $("#progressText").textContent = `${S.done.length}/${TEMAS.length}`;
  $("#progressPill").title = `${Math.round(p*100)}% del curso`;
}

function ir(v, tema){
  if(tema!==undefined){ if(!abierto(tema))return; ruta.tema=tema; }
  ruta.v=v; nav(); render(); scrollTo(0,0);
}

function render(){
  const v=$("#vista");
  if(ruta.v==="home") v.innerHTML=homeView();
  else if(ruta.v==="tema") v.innerHTML=temaView(ruta.tema);
  else v.innerHTML=estudiarView();
  montarWidgets(v);
  if(ruta.v==="tema"){
    const ta=$("#notasTexto"); if(ta) ta.value=S.notas[TEMAS[ruta.tema].id]||"";
  }
}

/* ---------- Inicio ---------- */
function homeView(){
  const sig=TEMAS.findIndex((_,i)=>!hecho(i)); const destino=sig<0?TEMAS.length-1:sig;
  const secs=TEMAS.reduce((a,t)=>a+leidas(TEMAS.indexOf(t)),0);
  const totalSecs=TEMAS.reduce((a,t)=>a+t.secciones.length,0);
  const cards=TEMAS.map((t,i)=>{
    const p=avanceTema(i), tag=hecho(i)?"Listo":abierto(i)?"En curso":"Bloqueado";
    return `<button class="topic-card" style="--i:${i+3}" data-tema="${i}" ${abierto(i)?"":"disabled"}>
      <span class="num">${t.id}</span><span class="tag ${hecho(i)?"done":""}">${hecho(i)?"✓ ":""}${tag}</span>
      <h3>${esc(t.titulo)}</h3><p>${esc(t.intro)}</p>
      <div class="mini-bar"><i style="width:${p}%"></i></div>
      <div class="meta">${leidas(i)}/${t.secciones.length} secciones${S.ex[t.id]?" · ejercicios listos":""}</div>
    </button>`;
  }).join("");
  return `<div class="view stagger">
    <section class="hero" style="--i:0">
      <span class="hero-badge">✦ Tu ruta de aprendizaje</span>
      <h1>Matemáticas que <em>se ven</em> y se entienden.</h1>
      <p>Cinco temas con recta numérica animada, ejemplos visuales, ejercicios con respuesta y repaso con tarjetas y quiz. Avanza a tu ritmo.</p>
      <div class="hero-actions">
        <button class="btn primary" data-accion="continuar" type="button">${S.done.length===TEMAS.length?"Ver el último tema":"Continuar con el tema "+(destino+1)} →</button>
        <button class="btn ghost" data-accion="tarjetas" type="button">Repasar tarjetas</button>
      </div>
    </section>
    <div class="stats" style="--i:1">
      <div class="stat"><b>${S.done.length}</b><span>de ${TEMAS.length} temas</span></div>
      <div class="stat"><b>${secs}</b><span>de ${totalSecs} secciones</span></div>
      <div class="stat"><b>${S.quiz.total?Math.round(S.quiz.aciertas/S.quiz.total*100):0}%</b><span>en el quiz</span></div>
    </div>
    <div class="sec-head" style="--i:2"><h2>Tus temas</h2><small>Se desbloquean al terminar el anterior</small></div>
    <div class="topic-grid">${cards}</div>
  </div>`;
}

/* ---------- Tema ---------- */
function temaView(i){
  const t=TEMAS[i], r=S.read[t.id]||[];
  const secciones=t.secciones.map((s,k)=>`<details class="acc ${r[k]?"leida":""}" data-k="${k}">
    <summary>${esc(s.t)}<span class="leida">✓ leída</span></summary>
    <div class="c">${s.c}${s.w?`<div data-widget="${s.w}"></div>`:""}
      <label class="chk"><input type="checkbox" data-k="${k}" ${r[k]?"checked":""}> Lo entendí</label>
    </div></details>`).join("");
  const ejercicios=t.ejercicios.map((e,k)=>`<details class="acc ej"><summary>${k+1}. <span class="enunciado">${esc(e[0])}</span></summary>
    <div class="c"><details class="resp"><summary>Ver respuesta</summary><div class="c">${e[1]}</div></details></div></details>`).join("");
  const videos=t.videos.map(v=>`<a class="vid" target="_blank" rel="noopener" href="${v[2]||yt(v[1])}"><span class="play">▶</span><span>${esc(v[0])}<small>Se abre en YouTube</small></span></a>`).join("");
  const anterior=i>0?`<button class="btn ghost" data-accion="prev" type="button">← Tema ${i}</button>`:"<span></span>";
  const siguiente=i<TEMAS.length-1&&abierto(i+1)?`<button class="btn ghost" data-accion="next" type="button">Tema ${i+2} →</button>`:"<span></span>";
  return `<div class="view">
    <div class="breadcrumb"><button type="button" data-accion="home">Inicio</button><span>›</span><span>Tema ${t.id}</span></div>
    <div class="titulo-tema"><span class="num">${t.id}</span><div><h2>${esc(t.titulo)}</h2></div></div>
    <p class="intro">${esc(t.intro)}</p>
    ${secciones}
    <h3 style="margin:26px 0 12px">Videos recomendados</h3>${videos}
    <h3 style="margin:26px 0 12px">Ejercicios de práctica</h3>${ejercicios}
    <label class="chk"><input type="checkbox" id="ex" ${S.ex[t.id]?"checked":""}> Resolví los ejercicios</label>
    <div class="notas"><h3>Mis apuntes</h3><p>Escribe aquí tus dudas, atajos o ejemplos. Se guardan en este dispositivo.</p>
      <textarea id="notasTexto" placeholder="Ej.: recordar que −1/2 > −3/4 porque está más cerca del cero…"></textarea>
      <span class="guardado" id="guardado">✓ Guardado</span>
    </div>
    <div class="tema-nav">${anterior}${siguiente}</div>
    <div class="fin-wrap">
      <button class="fin" id="fin" type="button" ${!listo(i)&&!hecho(i)?"disabled":""}></button>
      <p class="nota" id="nota"></p>
    </div>
  </div>`;
}

function estado(){
  if(ruta.v!=="tema")return;
  const i=ruta.tema,t=TEMAS[i],b=$("#fin"),u=i===TEMAS.length-1;
  b.disabled=!listo(i)&&!hecho(i);
  b.textContent=hecho(i)?(u?"¡Curso completo! 🎉":"Ir al siguiente tema"):(u?"Terminar curso":`Terminar tema ${t.id} y desbloquear el siguiente`);
  $("#nota").textContent=hecho(i)?"Tema completado. ¡Buen trabajo!":`Secciones: ${leidas(i)}/${t.secciones.length} · Ejercicios: ${S.ex[t.id]?"listos":"pendientes"}`;
}

/* ---------- Estudiar ---------- */
function poolFiltrado(){
  const base=ruta.modo==="flash"?CARDS:QUIZ;
  return ruta.filtro?base.filter(x=>x.t===ruta.filtro):base.slice();
}
function estudiarView(){
  const sel=`<select id="filtroEstudio" aria-label="Filtrar por tema" style="padding:8px 10px;border-radius:10px;border:1.5px solid var(--line);background:var(--surface);font-weight:600">
    <option value="0" ${ruta.filtro===0?"selected":""}>Todos los temas</option>
    ${TEMAS.map((t,i)=>`<option value="${i+1}" ${ruta.filtro===i+1?"selected":""}>Tema ${t.id}</option>`).join("")}</select>`;
  return `<div class="view">
    <div class="study-head"><h2>Modo estudio</h2>
      <div class="seg"><button data-modo="flash" class="${ruta.modo==="flash"?"on":""}">Tarjetas</button><button data-modo="quiz" class="${ruta.modo==="quiz"?"on":""}">Quiz</button></div>
    </div>
    <div style="display:flex;justify-content:center;margin-bottom:18px">${sel}</div>
    ${ruta.modo==="flash"?flashView():quizView()}
  </div>`;
}
function flashView(){
  if(fs.filtro!==ruta.filtro||!fs.pool.length) fs={i:0,flipped:false,pool:poolFiltrado(),filtro:ruta.filtro};
  const c=fs.pool[fs.i];
  if(!c)return `<div class="result"><h3>Sin tarjetas</h3><p>Elige otro tema.</p></div>`;
  return `<div class="flash">
    <div class="flash-card ${fs.flipped?"flipped":""}" id="flashCard" role="button" tabindex="0" aria-label="Voltear tarjeta">
      <span class="kicker">${fs.flipped?"Respuesta":"Pregunta"} · Tema ${c.t}</span>
      <div class="q">${esc(c.q)}</div><div class="a">${esc(c.a)}</div>
      <span class="pista">Toca la tarjeta para ${fs.flipped?"ver la pregunta":"descubrir la respuesta"}</span>
    </div>
    <div class="flash-actions">
      <button class="btn ghost sm" data-accion="flash-prev" type="button">← Anterior</button>
      <button class="btn primary sm" data-accion="flash-next" type="button">Siguiente →</button>
    </div>
    <div class="flash-progress">Tarjeta ${fs.i+1} de ${fs.pool.length}</div>
  </div>`;
}
function quizView(){
  if(qs.filtro!==ruta.filtro||!qs.pool.length) qs={i:0,pool:poolFiltrado(),elegida:null,filtro:ruta.filtro};
  const p=qs.pool[qs.i];
  if(!p) return `<div class="result">
    <div class="score">${S.quiz.total?Math.round(S.quiz.aciertas/S.quiz.total*100):0}%</div>
    <p>Aciertos acumulados: ${S.quiz.aciertas} de ${S.quiz.total} preguntas respondidas.</p>
    <div class="flash-actions"><button class="btn primary" data-accion="quiz-reset" type="button">Repetir quiz</button><button class="btn ghost" data-accion="home" type="button">Volver al inicio</button></div>
  </div>`;
  const letras="ABCD";
  const opts=p.o.map((o,k)=>`<button class="opt ${qs.elegida!==null?(k===p.c?"correct":k===qs.elegida?"wrong":""):""}" data-opt="${k}" ${qs.elegida!==null?"disabled":""}><span class="letra">${letras[k]}</span>${esc(o)}</button>`).join("");
  return `<div class="quiz-card">
    <div class="kicker">Pregunta ${qs.i+1} de ${qs.pool.length} · Tema ${p.t}</div>
    <h3>${esc(p.q)}</h3>${opts}
    ${qs.elegida!==null?`<div class="quiz-feedback ${qs.elegida===p.c?"":"bad"}"><b>${qs.elegida===p.c?"¡Correcto!":"Casi"}</b>${esc(p.e)}
      <div style="margin-top:11px"><button class="btn sm" data-accion="quiz-next" type="button">${qs.i===qs.pool.length-1?"Ver resultado":"Siguiente pregunta"} →</button></div></div>`:""}
  </div>`;
}
function responderQuiz(k){
  if(qs.elegida!==null||!qs.pool.length)return;
  const p=qs.pool[qs.i]; qs.elegida=k;
  S.quiz.total++; if(k===p.c)S.quiz.aciertas++; guardar();
  nav(); render();
}

/* ---------- Efectos ---------- */
function toast(msg){
  const t=$("#toast"); t.textContent=msg; t.classList.add("on");
  clearTimeout(toast.t); toast.t=setTimeout(()=>t.classList.remove("on"),2600);
}
function confetti(){
  const c=$("#confetti"), cols=["#4453ff","#7c3aed","#06b6a4","#e6930c","#e8495b"];
  c.innerHTML=Array.from({length:70},(_,i)=>`<i style="left:${Math.random()*100}%;background:${cols[i%cols.length]};animation-delay:${Math.random()*.7}s;animation-duration:${2+Math.random()*1.6}s;transform:rotate(${Math.random()*360}deg)"></i>`).join("");
  setTimeout(()=>{if(c)c.innerHTML=""},4200);
}

/* ---------- Eventos ---------- */
document.addEventListener("click",e=>{
  const chip=e.target.closest("#chips .chip");
  if(chip){ if(chip.dataset.v) ir(chip.dataset.v); else ir("tema",+chip.dataset.tema); return; }

  const card=e.target.closest(".topic-card");
  if(card&&!card.disabled){ ir("tema",+card.dataset.tema); return; }

  const acc=e.target.closest("[data-accion]");
  if(acc){
    const a=acc.dataset.accion;
    if(a==="home") ir("home");
    else if(a==="continuar"){ const sig=TEMAS.findIndex((_,i)=>!hecho(i)); ir("tema",sig<0?TEMAS.length-1:sig); }
    else if(a==="tarjetas"){ ruta.modo="flash"; ruta.filtro=0; fs={i:0,flipped:false,pool:[],filtro:null}; ir("estudiar"); }
    else if(a==="prev") ir("tema",ruta.tema-1);
    else if(a==="next") ir("tema",ruta.tema+1);
    else if(a==="flash-prev"){ fs.i=(fs.i-1+fs.pool.length)%fs.pool.length; fs.flipped=false; render(); }
    else if(a==="flash-next"){ fs.i=(fs.i+1)%fs.pool.length; fs.flipped=false; render(); }
    else if(a==="quiz-next"){ qs.i++; qs.elegida=null; render(); }
    else if(a==="quiz-reset"){ S.quiz={aciertas:0,total:0}; guardar(); qs={i:0,pool:poolFiltrado(),elegida:null,filtro:ruta.filtro}; nav(); render(); toast("Quiz reiniciado"); }
    return;
  }

  const modo=e.target.closest("[data-modo]");
  if(modo){
    ruta.modo=modo.dataset.modo;
    if(ruta.modo==="flash")fs={i:0,flipped:false,pool:poolFiltrado(),filtro:ruta.filtro}; else qs={i:0,pool:poolFiltrado(),elegida:null,filtro:ruta.filtro};
    render(); return;
  }
  const opt=e.target.closest("[data-opt]"); if(opt){ responderQuiz(+opt.dataset.opt); return; }
  if(e.target.closest("#flashCard")){ fs.flipped=!fs.flipped; render(); return; }

  if(e.target.id==="fin"){
    const i=ruta.tema,id=TEMAS[i].id,u=i===TEMAS.length-1;
    if(!hecho(i)&&listo(i)){
      S.done.push(id); guardar(); confetti(); toast("¡Tema terminado! Ya puedes seguir.");
      nav();
      if(u){ render(); estado(); toast("¡Curso completo! Eres una máquina."); }
      else ir("tema",i+1);
    } else if(hecho(i)&&!u) ir("tema",i+1);
    else estado();
    return;
  }
  if(e.target.id==="home") ir("home");
  if(e.target.id==="tema-btn"){
    const actual=document.documentElement.dataset.tema;
    const oscuro=actual==="oscuro"||(!actual&&prefiereOscuro());
    S.tema=oscuro?"claro":"oscuro"; guardar(); aplicarTema(); toast(S.tema==="oscuro"?"Modo oscuro activado":"Modo claro activado");
  }
  if(e.target.id==="reiniciar"&&confirm("¿Borrar todo tu progreso, notas y resultados?")){
    S={read:{},ex:{},done:[],notas:{},quiz:{aciertas:0,total:0},tema:S.tema}; guardar();
    ruta={v:"home",tema:0,modo:"flash",filtro:0}; fs={i:0,flipped:false,pool:[],filtro:null}; qs={i:0,pool:[],elegida:null,filtro:null};
    nav(); render(); toast("Progreso reiniciado");
  }
});

document.addEventListener("change",e=>{
  const id=TEMAS[ruta.tema]?.id;
  if(e.target.dataset.k!==undefined&&ruta.v==="tema"){
    (S.read[id]=S.read[id]||[])[+e.target.dataset.k]=e.target.checked;
    e.target.closest(".acc").classList.toggle("leida",e.target.checked);
    guardar(); estado(); return;
  }
  if(e.target.id==="ex"&&ruta.v==="tema"){ S.ex[id]=e.target.checked; guardar(); estado(); return; }
  if(e.target.id==="filtroEstudio"){
    ruta.filtro=+e.target.value;
    if(ruta.modo==="flash")fs={i:0,flipped:false,pool:poolFiltrado(),filtro:ruta.filtro}; else qs={i:0,pool:poolFiltrado(),elegida:null,filtro:ruta.filtro};
    render();
  }
});

let guardarNotas;
document.addEventListener("input",e=>{
  if(e.target.id!=="notasTexto")return;
  const id=TEMAS[ruta.tema].id;
  S.notas[id]=e.target.value; guardar();
  const g=$("#guardado"); if(g){ g.classList.add("on"); clearTimeout(guardarNotas); guardarNotas=setTimeout(()=>g.classList.remove("on"),1200); }
});

document.addEventListener("keydown",e=>{
  if(/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName))return;
  if(e.key==="Escape"&&ruta.v!=="home") ir("home");
  if(e.key==="t"){
    const destino=(ruta.tema+1)%TEMAS.length; if(abierto(destino)) ir("tema",destino);
  }
  if(ruta.v==="estudiar"&&ruta.modo==="flash"){
    if(e.key===" "){e.preventDefault();fs.flipped=!fs.flipped;render();}
    if(e.key==="ArrowRight"){fs.i=(fs.i+1)%fs.pool.length;fs.flipped=false;render();}
    if(e.key==="ArrowLeft"){fs.i=(fs.i-1+fs.pool.length)%fs.pool.length;fs.flipped=false;render();}
  }
});

aplicarTema();
nav();
render();
if(ruta.v==="tema") estado();
