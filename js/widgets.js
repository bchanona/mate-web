/* Widgets interactivos: cada función monta su interfaz dentro de un contenedor. */
const espera = ms => new Promise(r => setTimeout(r, ms));
const fmt = n => n < 0 ? "−" + Math.abs(n) : String(n);
const gcd = (a,b) => b ? gcd(b,a%b) : a;
const lcm = (a,b) => Math.abs(a*b) / gcd(a,b);
const nEsc = s => String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

function cabeza(ico, titulo, hint){
  return `<div class="widget-head"><span class="ico">${ico}</span><h4>${titulo}</h4>${hint?`<span class="hint">${hint}</span>`:""}</div>`;
}

/* ---------- Recta numérica animada ---------- */
function rectaNumérica(el){
  const min=-20, max=20, step=1;
  el.innerHTML = `<div class="widget">${cabeza("↔","Recta numérica animada","Arrastra la ficha o usa los botones")}
    <div class="rn">
      <div class="rn-readout"><b id="rnVal">0</b><small>valor actual</small></div>
      <div class="rn-eq" id="rnEq"></div>
      <div class="rn-viewport" id="rnView">
        <div class="rn-line"></div><div class="rn-ticks" id="rnTicks"></div>
        <div class="rn-ghost" id="rnGhost"></div>
        <div class="rn-marker" id="rnMarker"><div class="rn-marker-inner"></div></div>
      </div>
      <div class="rn-controls">
        <button class="rn-btn" data-d="-5">−5</button>
        <button class="rn-btn" data-d="-1">−1</button>
        <button class="rn-btn acc" data-d="0">0</button>
        <button class="rn-btn" data-d="1">+1</button>
        <button class="rn-btn" data-d="5">+5</button>
      </div>
      <div class="rn-slider-wrap"><input class="rn-slider" id="rnSlider" type="range" min="${min}" max="${max}" step="${step}" value="0" aria-label="Valor en la recta"></div>
      <div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;margin-top:12px">
        <button class="btn sm" id="rnDemo1" type="button">▶ Buzo: −18 + 7</button>
        <button class="btn sm" id="rnDemo2" type="button">▶ Toluca: −3 + 15</button>
      </div>
      <p class="wdg-note">Los negativos están a la izquierda del cero. Al sumar avanzamos; al restar retrocedemos.</p>
    </div></div>`;

  const view=el.querySelector("#rnView"), marker=el.querySelector("#rnMarker"), valEl=el.querySelector("#rnVal");
  const eq=el.querySelector("#rnEq"), ghost=el.querySelector("#rnGhost"), slider=el.querySelector("#rnSlider");
  const ticks=el.querySelector("#rnTicks");
  let value=0, ocupado=false;

  const pct = v => (v-min)/(max-min)*100;
  for(let v=min; v<=max; v+=5){
    const t=document.createElement("div");
    t.className="rn-tick mayor"+(v===0?" cero":"");
    t.style.left=pct(v)+"%";
    t.innerHTML=`<span>${fmt(v)}</span>`;
    ticks.appendChild(t);
  }
  for(let v=min; v<=max; v++) if(v%5!==0){
    const t=document.createElement("div"); t.className="rn-tick"; t.style.left=pct(v)+"%"; ticks.appendChild(t);
  }

  function poner(v, saltar){
    value=Math.max(min,Math.min(max,v));
    marker.style.left=pct(value)+"%";
    slider.value=value;
    valEl.textContent=fmt(value);
    if(saltar){ marker.classList.remove("hop"); void marker.offsetWidth; marker.classList.add("hop"); }
  }
  poner(0);

  function desdePointer(ev){
    const r=view.getBoundingClientRect();
    const x=(ev.touches?ev.touches[0].clientX:ev.clientX)-r.left;
    return Math.round(min + Math.max(0,Math.min(1,x/r.width))*(max-min));
  }
  view.addEventListener("pointerdown",e=>{ if(ocupado)return; view.setPointerCapture(e.pointerId); poner(desdePointer(e),true); });
  view.addEventListener("pointermove",e=>{ if(ocupado||!view.hasPointerCapture(e.pointerId))return; poner(desdePointer(e)); });
  slider.addEventListener("input",e=>{ if(!ocupado) poner(+e.target.value); });
  el.querySelectorAll(".rn-btn").forEach(b=>b.addEventListener("click",()=>{
    if(ocupado)return; const d=+b.dataset.d; poner(d===0?0:value+d,true); eq.innerHTML="";
  }));

  async function viaje(inicio, delta, texto){
    if(ocupado||!el.isConnected)return;
    ocupado=true; el.querySelectorAll(".rn-btn").forEach(b=>b.disabled=true);
    eq.innerHTML=`${texto} <span class="res">…</span>`;
    poner(inicio); valEl.textContent=fmt(inicio);
    ghost.style.left=pct(inicio)+"%";
    ghost.classList.remove("volar"); void ghost.offsetWidth; ghost.classList.add("volar");
    await espera(180);
    const destino=inicio+delta, dur=Math.min(1900,Math.abs(delta)*105+260);
    marker.style.transition=`left ${dur}ms cubic-bezier(.33,.02,.2,1)`;
    void marker.offsetWidth;
    marker.classList.remove("hop"); void marker.offsetWidth; marker.classList.add("hop");
    const t0=performance.now();
    const paso=()=>{
      if(!el.isConnected)return;
      const p=Math.min(1,(performance.now()-t0)/dur);
      const v=Math.round(inicio+delta*p);
      valEl.textContent=fmt(v); slider.value=v;
      valEl.style.color=p<1?"var(--brand-2)":"var(--ok)";
      if(p<1) requestAnimationFrame(paso);
    };
    requestAnimationFrame(paso);
    poner(destino);
    await espera(dur+60);
    if(el.isConnected){
      marker.style.transition=""; valEl.style.color="";
      eq.innerHTML=`${texto} <span class="res">${fmt(destino)}</span>`;
    }
    ocupado=false; el.querySelectorAll(".rn-btn").forEach(b=>b.disabled=false);
  }
  el.querySelector("#rnDemo1").addEventListener("click",()=>viaje(-18,7,"−18 + 7 ="));
  el.querySelector("#rnDemo2").addEventListener("click",()=>viaje(-3,15,"−3 + 15 ="));
}

/* ---------- Comparar en la recta ---------- */
function comparar(el){
  const puntos=[{v:-0.8,l:"−0.8"},{v:-0.5,l:"−1/2"},{v:0,l:"0"},{v:0.4,l:"0.4"},{v:0.6,l:"3/5"}];
  el.innerHTML=`<div class="widget">${cabeza("⋈","Comparar y ordenar","Toca cada punto para ver su decimal")}
    <div class="rn-viewport" id="cmpView" style="height:126px">
      <div class="rn-line"></div>
      <div class="rn-ticks" id="cmpTicks"></div>
      ${puntos.map((p,i)=>`<button class="rn-point" data-i="${i}" style="left:${(p.v+1)/2*100}%" title="${p.l}"><span>${p.l}</span></button>`).join("")}
    </div>
    <div class="rn-eq" id="cmpInfo" style="min-height:1.8em;margin-top:6px"></div>
    <div style="text-align:center"><button class="btn sm" id="cmpOrden" type="button">Ver orden de menor a mayor</button></div>
    <div class="orden-chips" id="cmpChips"></div>
    <p class="wdg-note">Entre negativos, el más cercano al cero es mayor.</p></div>`;
  const ticks=el.querySelector("#cmpTicks");
  [-1,-0.5,0,0.5,1].forEach(v=>{
    const t=document.createElement("div"); t.className="rn-tick mayor"+(v===0?" cero":"");
    t.style.left=(v+1)/2*100+"%"; t.innerHTML=`<span>${fmt(v)}</span>`; ticks.appendChild(t);
  });
  el.querySelectorAll(".rn-point").forEach(b=>b.addEventListener("click",()=>{
    const p=puntos[+b.dataset.i];
    el.querySelectorAll(".rn-point").forEach(x=>x.classList.remove("on")); b.classList.add("on");
    el.querySelector("#cmpInfo").innerHTML=`${p.l} = <b>${p.v.toFixed(2).replace(/\.?0+$/,"")}</b>`;
  }));
  el.querySelector("#cmpOrden").addEventListener("click",()=>{
    const c=el.querySelector("#cmpChips");
    if(c.children.length){ c.innerHTML=""; return; }
    c.innerHTML=puntos.slice().sort((a,b)=>a.v-b.v).map((p,i)=>`<span style="--i:${i}">${p.l}</span>`).join('<em>&lt;</em>');
  });
}

/* ---------- Ley de los signos ---------- */
function signos(el){
  let a=1,b=-1,op="×";
  el.innerHTML=`<div class="widget">${cabeza("±","Ley de los signos","Cambia los signos y observa")}
    <div class="signos">
      <div><div class="factor" id="sA">( −3 )</div><div class="sign-toggle" data-q="a"><button data-v="1">+</button><button data-v="-1" class="on">−</button></div></div>
      <div class="op" id="sOp">×</div>
      <div><div class="factor" id="sB">( −5 )</div><div class="sign-toggle" data-q="b"><button data-v="1">+</button><button data-v="-1" class="on">−</button></div></div>
      <div class="op">=</div>
      <div class="res-signo" id="sRes">+</div>
    </div>
    <div class="flags" id="sFlags"></div>
    <div style="text-align:center;margin-top:12px"><button class="btn sm" id="sOpBtn" type="button">Cambiar a división</button></div>
    <p class="wdg-note" id="sNote">Signos iguales dan positivo.</p></div>`;
  function pintar(){
    const positivo=a===b;
    el.querySelector("#sA").textContent=a>0?"( +3 )":"( −3 )";
    el.querySelector("#sB").textContent=b>0?"( +5 )":"( −5 )";
    el.querySelector("#sOp").textContent=op;
    const r=el.querySelector("#sRes");
    r.textContent=positivo?"+":"−"; r.classList.toggle("neg",!positivo);
    r.classList.remove("anim"); void r.offsetWidth; r.classList.add("anim");
    const neg= [a,b].filter(x=>x<0).length;
    el.querySelector("#sFlags").innerHTML=`<span class="flag">${neg} signo${neg===1?"":"s"} negativo${neg===1?"":"s"}</span><span class="flag">${neg%2===0?"cantidad par → +":"cantidad impar → −"}</span>`;
    el.querySelector("#sNote").textContent=positivo?"Signos iguales dan positivo.":"Signos diferentes dan negativo. Vale igual para sumar, multiplicar y dividir.";
  }
  el.querySelectorAll(".sign-toggle button").forEach(btn=>btn.addEventListener("click",()=>{
    const q=btn.parentElement.dataset.q; if(q==="a")a=+btn.dataset.v; else b=+btn.dataset.v;
    btn.parentElement.querySelectorAll("button").forEach(x=>x.classList.remove("on")); btn.classList.add("on"); pintar();
  }));
  el.querySelector("#sOpBtn").addEventListener("click",e=>{ op=op==="×"?"÷":"×"; e.target.textContent=op==="×"?"Cambiar a división":"Cambiar a multiplicación"; pintar(); });
  pintar();
}

/* ---------- Distributiva con áreas ---------- */
function area(el){
  let x=7,p=100,q=2,resta=true;
  el.innerHTML=`<div class="widget">${cabeza("▦","Distributiva como área","Ajusta los lados del rectángulo")}
    <div class="frac-display" id="arEq"></div>
    <div class="barra" id="arBarra" style="height:86px"></div>
    <div class="stepper"><button data-s="x" data-d="-1">−</button><output id="arX"></output><button data-s="x" data-d="1">+</button><span style="color:var(--muted)">alto</span></div>
    <div class="stepper"><button data-s="p" data-d="-10">−</button><output id="arP"></output><button data-s="p" data-d="10">+</button><span style="color:var(--muted)">parte 1</span></div>
    <div class="stepper"><button data-s="q" data-d="-1">−</button><output id="arQ"></output><button data-s="q" data-d="1">+</button><span style="color:var(--muted)">parte 2</span></div>
    <div style="text-align:center;margin-top:10px"><button class="btn sm" id="arOp" type="button">Modo: resta (b − c)</button></div>
    <p class="wdg-note">El área total es el alto por la base completa, o la suma de las dos áreas pequeñas.</p></div>`;
  function pintar(){
    const base=resta?p-q:p+q, total=x*base;
    el.querySelector("#arX").textContent=x;
    el.querySelector("#arP").textContent=p;
    el.querySelector("#arQ").textContent=q;
    el.querySelector("#arOp").textContent=resta?"Modo: resta (b − c)":"Modo: suma (b + c)";
    el.querySelector("#arEq").innerHTML=`${x}(${p} ${resta?"−":"+"} ${q}) = <b>${total}</b>`;
    const w1=p/(p+q)*100, w2=q/(p+q)*100;
    const txt=(s,w)=>w>=8?`<b style="display:grid;place-items:center;height:100%;font-size:.78rem">${s}</b>`:"";
    el.querySelector("#arBarra").innerHTML=`<div class="parte on" style="flex:none;width:${w1}%">${txt(`${x}×${p}`,w1)}</div>`+
      (resta?`<div class="parte off" style="flex:none;width:${w2}%">${txt(`−${x*q}`,w2)}</div>`:
      `<div class="parte" style="flex:none;width:${w2}%;background:color-mix(in srgb,var(--accent) 45%,transparent)">${txt(`+${x*q}`,w2)}</div>`);
  }
  el.querySelectorAll(".stepper button").forEach(b=>b.addEventListener("click",()=>{
    const s=b.dataset.s,d=+b.dataset.d,obj={x,p,q};
    obj[s]=Math.max(s==="x"?1:0,obj[s]+d); if(s==="p")p=obj.p; if(s==="q")q=obj.q; if(s==="x")x=obj.x; pintar();
  }));
  el.querySelector("#arOp").addEventListener("click",()=>{resta=!resta;pintar();});
  pintar();
}

/* ---------- MCM y MCD visuales ---------- */
function mcm(el){
  let a=24,b=36;
  el.innerHTML=`<div class="widget">${cabeza("⋮","MCM y MCD coincidentes","Los números cambian al ajustar")}
    <div class="stepper"><button data-s="a" data-d="-1">−</button><output id="mcA"></output><button data-s="a" data-d="1">+</button><span style="color:var(--muted)">primer número</span></div>
    <div class="stepper"><button data-s="b" data-d="-1">−</button><output id="mcB"></output><button data-s="b" data-d="1">+</button><span style="color:var(--muted)">segundo número</span></div>
    <div class="multi"><div class="multi-col"><h5>Múltiplos de <span id="mcLa"></span></h5><div class="nums" id="mcNa"></div></div><div class="multi-col"><h5>Múltiplos de <span id="mcLb"></span></h5><div class="nums" id="mcNb"></div></div></div>
    <div class="result-cards" id="mcRes"></div>
    <p class="wdg-note">El primero que coincida es el MCM. El MCD es el mayor divisor común.</p></div>`;
  function pintar(){
    a=Math.max(1,a); b=Math.max(1,b);
    const M=lcm(a,b),D=gcd(a,b);
    el.querySelector("#mcA").textContent=a; el.querySelector("#mcB").textContent=b;
    el.querySelector("#mcLa").textContent=a; el.querySelector("#mcLb").textContent=b;
    const lista=n=>Array.from({length:Math.min(8,Math.ceil(M/n)+1)},(_,i)=>(i+1)*n);
    const A=lista(a),B=lista(b);
    el.querySelector("#mcNa").innerHTML=A.map(v=>`<span class="${v===M?"common":""}">${v}</span>`).join("");
    el.querySelector("#mcNb").innerHTML=B.map(v=>`<span class="${v===M?"common":""}">${v}</span>`).join("");
    el.querySelector("#mcRes").innerHTML=`<div><small>MCM</small><b>${M}</b></div><div><small>MCD</small><b>${D}</b></div><div><small>MCD × MCM</small><b>${D*M}</b></div><div><small>a × b</small><b>${a*b}</b></div>`;
  }
  el.querySelectorAll(".stepper button").forEach(btn=>btn.addEventListener("click",()=>{
    const s=btn.dataset.s,d=+btn.dataset.d;
    if(s==="a")a=Math.max(1,a+d); else b=Math.max(1,b+d); pintar();
  }));
  pintar();
}

/* ---------- Suma de fracciones ---------- */
function fracciones(el){
  let n1=5,d1=6,n2=3,d2=4;
  const opciones=[2,3,4,5,6,8,12];
  el.innerHTML=`<div class="widget">${cabeza("½","Fracciones paso a paso","Mismo denominador antes de operar")}
    <div class="frac-display">
      <select data-f="n1">${Array.from({length:13},(_,i)=>`<option ${i===n1?"selected":""}>${i}</option>`).join("")}</select>
      <span class="frac"><b id="fN1"></b><i id="fD1"></i></span>
      <b>+</b>
      <select data-f="n2">${Array.from({length:13},(_,i)=>`<option ${i===n2?"selected":""}>${i}</option>`).join("")}</select>
      <span class="frac"><b id="fN2"></b><i id="fD2"></i></span>
      <b>=</b><span class="frac"><b id="fRN"></b><i id="fRD"></i></span>
    </div>
    <div class="multi-col" style="margin-bottom:10px"><h5>Denominadores</h5><div class="nums" id="fDen"></div></div>
    <div class="barra" id="fB1" style="height:44px"></div>
    <div class="barra" id="fB2" style="height:44px;margin-top:6px"></div>
    <p class="wdg-note" id="fNota"></p></div>`;
  el.querySelectorAll("select").forEach(s=>s.addEventListener("change",()=>{
    if(s.dataset.f==="n1")n1=+s.value; else n2=+s.value; pintar();
  }));
  el.querySelector("#fDen").innerHTML=opciones.map(d=>`<button class="rn-btn" data-d="${d}" style="min-width:36px">${d}</button>`).join("");
  function barras(id,n,d){
    return Array.from({length:d},(_,i)=>`<div class="parte ${i<n?"on":""}"></div>`).join("");
  }
  function pintar(){
    const m=lcm(d1,d2), a=n1*(m/d1), c=n2*(m/d2), sum=a+c, g=gcd(Math.abs(sum),m)||1;
    el.querySelector("#fN1").textContent=n1; el.querySelector("#fD1").textContent=d1;
    el.querySelector("#fN2").textContent=n2; el.querySelector("#fD2").textContent=d2;
    el.querySelector("#fRN").textContent=fmt(sum/g); el.querySelector("#fRD").textContent=m/g;
    el.querySelector("#fB1").innerHTML=barras("fB1",a,m);
    el.querySelector("#fB2").innerHTML=barras("fB2",c,m);
    el.querySelector("#fNota").innerHTML=`MCM(${d1}, ${d2}) = ${m} → ${fmt(n1)}/${d1} = ${fmt(a)}/${m} y ${fmt(n2)}/${d2} = ${fmt(c)}/${m}. Suma de numeradores: ${fmt(a)} + ${fmt(c)} = ${fmt(sum)}.`;
  }
  el.querySelectorAll("#fDen button").forEach(b=>b.addEventListener("click",()=>{
    const nuevoD=+b.dataset.d; if(nuevoD===d1)d2=nuevoD; else d1=nuevoD; pintar();
  }));
  pintar();
}

/* ---------- Porcentajes ---------- */
function porcentaje(el){
  let total=260,pct=35;
  el.innerHTML=`<div class="widget">${cabeza("%","Barra de porcentaje","El 100% siempre es el total")}
    <div class="stepper"><button data-s="t" data-d="-20">−</button><output id="pT"></output><button data-s="t" data-d="20">+</button><span style="color:var(--muted)">total</span></div>
    <div class="stepper"><button data-s="p" data-d="-5">−</button><output id="pP"></output><button data-s="p" data-d="5">+</button><span style="color:var(--muted)">porcentaje</span></div>
    <div class="pct-chips" style="display:flex;gap:6px;justify-content:center;flex-wrap:wrap;margin:12px 0">${[10,25,50,75].map(v=>`<button class="rn-btn" data-p="${v}">${v}%</button>`).join("")}</div>
    <div class="pct-line"><i id="pFill"></i></div>
    <div class="rn-eq" id="pEq"></div>
    <p class="wdg-note">El 10% se obtiene moviendo el punto; el 5% es la mitad del 10%.</p></div>`;
  function pintar(){
    total=Math.max(0,total); pct=Math.max(0,Math.min(100,pct));
    el.querySelector("#pT").textContent=total; el.querySelector("#pP").textContent=pct+"%";
    el.querySelector("#pFill").style.width=pct+"%";
    el.querySelector("#pEq").innerHTML=`${pct}% de ${total} = <span class="res">${+(total*pct/100).toLocaleString("es-MX",{maximumFractionDigits:2})}</span>`;
  }
  el.querySelectorAll(".stepper button").forEach(b=>b.addEventListener("click",()=>{
    const s=b.dataset.s,d=+b.dataset.d; if(s==="t")total+=d; else pct+=d; pintar();
  }));
  el.querySelectorAll("[data-p]").forEach(b=>b.addEventListener("click",()=>{pct=+b.dataset.p;pintar();}));
  pintar();
}

/* ---------- Exponentes ---------- */
function exponentes(el){
  let n=5;
  el.innerHTML=`<div class="widget">${cabeza("²","Crecimiento exponencial","Cada paso duplica la cantidad")}
    <div class="frac-display" id="exEq"></div>
    <div class="exp-grid" id="exGrid"></div>
    <div class="stepper"><button id="exMenos">−</button><output id="exN"></output><button id="exMas">+</button><span style="color:var(--muted)">exponente</span></div>
    <p class="wdg-note">2ⁿ significa n factores de 2. Duplicar el exponente no duplica el resultado: lo multiplica por 2ⁿ.</p></div>`;
  function pintar(){
    n=Math.max(0,Math.min(10,n));
    const total=2**n;
    el.querySelector("#exN").textContent=n;
    el.querySelector("#exEq").innerHTML=`<b>2<sup>${n}</sup></b> = ${n?Array(n).fill("2").join("·"):"1"} = <span style="color:var(--ok)">${total}</span>`;
    el.querySelector("#exGrid").innerHTML=Array.from({length:Math.min(total,128)},(_,i)=>`<span style="animation-delay:${i*8}ms"></span>`).join("")+(total>128?`<small style="color:var(--muted)">…${total-128} más</small>`:"");
  }
  el.querySelector("#exMenos").addEventListener("click",()=>{n--;pintar();});
  el.querySelector("#exMas").addEventListener("click",()=>{n++;pintar();});
  pintar();
}

const WIDGETS={recta:rectaNumérica,comparar,signos,area,mcm,fracciones,porcentaje,exponentes};

function montarWidgets(root){
  root.querySelectorAll("[data-widget]").forEach(n=>{
    const f=WIDGETS[n.dataset.widget]; if(f) f(n);
  });
}
