/* Lógica de gamificação partilhada (passaporte, XP, conquistas, ficha de missão). Usa os mesmos dados guardados que o mapa. */
const BYN=Object.fromEntries(D.map(d=>[d.n,d]));
const LIS=[-9.1,38.7],G=d=>[C[d.n][1],C[d.n][0]];
const hs=s=>[...s].reduce((a,c)=>(a*31+c.charCodeAt(0))>>>0,7);
let PASS=[],CREW="";
try{PASS=JSON.parse(localStorage.getItem("passaporte")||"[]").filter(n=>BYN[n]);CREW=localStorage.getItem("crew")||""}catch(e){}
const savePass=()=>{try{localStorage.setItem("passaporte",JSON.stringify(PASS))}catch(e){}};
const crew=()=>CREW.split(",").map(s=>s.trim()).filter(Boolean);
const esc=t=>t.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const km=g=>{const r=Math.PI/180,a=LIS,h=Math.sin((g[1]-a[1])*r/2)**2+Math.cos(a[1]*r)*Math.cos(g[1]*r)*Math.sin((g[0]-a[0])*r/2)**2;return Math.round(12742*Math.asin(Math.sqrt(h)))};
const fmtT=k=>{const m=Math.round((k/800+.5)*60);return Math.floor(m/60)+"h"+String(m%60).padStart(2,"0")};
const RANKS=[{x:0,e:"🛋️",t:"Turista de Sofá"},{x:300,e:"🎒",t:"Aventureiro de Fim de Semana"},{x:800,e:"🧭",t:"Mochileiro"},{x:1500,e:"🌍",t:"Explorador"},{x:2500,e:"👑",t:"Lenda do Check-in"},{x:4000,e:"🏆",t:"Mestre do Mundo"}];
const rankOf=x=>[...RANKS].reverse().find(k=>x>=k.x);
const stars=d=>{const k=km(G(d));let s=k<1500?1:k<4000?2:k<8000?3:k<12000?4:5;if("NSE".includes(d.t))s=Math.min(5,s+1);return s};
const totalXP=()=>PASS.reduce((a,n)=>a+stars(BYN[n])*100,0)+150*new Set(PASS.map(n=>BYN[n].c)).size;
const preview=d=>PASS.includes(d.n)?0:stars(d)*100+(PASS.some(n=>BYN[n].c===d.c)?0:150);
const ROLES=[["📸","Fotógrafo(a) oficial"],["🧭","Navegador(a)"],["💰","Tesoureiro(a)"],["🍽️","Chef de bordo"],["🗣️","Intérprete"],["🎉","Animador(a)"]];
const PT={P:["é o argumento perfeito contra as segundas-feiras.","é sal, sol e zero desculpas para ficar em casa.","vai fazer a tua vida parecer um postal."],C:["tem mais histórias por esquina do que o teu feed.","é daqueles sítios onde cada rua é uma aventura.","faz-te sentir turista de luxo com pés de explorador."],N:["é o botão de reset que a tua cabeça pede.","dá-te paisagens que nenhum ecrã consegue imitar.","vai deixar-te sem rede e com a alma cheia."],S:["é perfeito para trocar o escritório por neve fresca.","tem o cenário ideal para chocolate quente e fotos épicas.","promete quedas épicas e histórias ainda melhores."],K:["faz-te viajar no tempo sem sair do sítio.","é uma aula de história que vais querer repetir.","é daqueles sítios que se contam durante anos."],E:["é o tipo de viagem que muda a conversa à mesa.","fica longe, mas fica contigo para sempre.","dá-te histórias que mais ninguém do grupo tem."]};
const BD=[["✈️","Primeiro voo","1 carimbo",()=>PASS.length>=1],["🏖️","Rei da Praia","3 praias",c=>c("P")>=3],["🏙️","Citadino","3 cidades",c=>c("C")>=3],["🌿","Montanhista","3 de natureza",c=>c("N")>=3],["⛷️","Esquiador","2 de neve",c=>c("S")>=2],["🏛️","Culturista","3 de cultura",c=>c("K")>=3],["🌴","Aventureiro Exótico","3 exóticos",c=>c("E")>=3],["🇪🇺","Europeu convicto","5 na Europa",(c,r,e)=>e>=5],["🌍","Volta ao Mundo","as 5 regiões",(c,r)=>r.size>=5],["🛫","Longo Curso","a +10 000 km",()=>PASS.some(n=>km(G(BYN[n]))>10000)],["📚","Colecionador","10 carimbos",()=>PASS.length>=10],["🏆","Meio Centenário","50 carimbos",()=>PASS.length>=50]];
const badges=()=>{const c=t=>PASS.filter(n=>BYN[n].t===t).length,r=new Set(PASS.map(n=>BYN[n].r)),e=PASS.filter(n=>BYN[n].r==="E").length;return BD.map(([i,t,d,f])=>({e:i,t,d,ok:!!f(c,r,e)}))};
function ficha(d,gain,pend){const s=stars(d),k=km(G(d)),P=PT[d.t],cr=crew(),ro=[...ROLES].sort(()=>Math.random()-.5);
  const pt="Fica a "+k.toLocaleString("pt-PT")+" km de Lisboa ("+fmtT(k)+" de voo) e "+P[hs(d.n)%P.length];
  return `<div class="fm"><div class="fh"><span>NÍVEL ${s} ${"★".repeat(s)}${"☆".repeat(5-s)}</span><b>${gain?"+"+gain+" XP"+(pend?" ao aceitar":""):"sem XP (repetido)"}</b></div><p class="pt">${esc(pt)}</p><p class="ms">🎯 <b>Missão principal:</b> ${esc(MI[d.n]||"")}</p>${cr.length?`<div class="tm">${cr.map((c,i)=>`<span>${ro[i%ro.length][0]} ${esc(c)}: ${ro[i%ro.length][1]}</span>`).join("")}</div>`:""}</div>`}
function xray(d){const k=km(G(d)),B={P:85,C:55,N:50,S:25,K:60,E:70}[d.t],sol=Math.min(100,B+hs(d.n+"s")%16),caos=25+hs(d.n+"c")%75,eu=Math.max(1,Math.min(4,({E:2,A:2,M:3,F:2,O:4})[d.r]+hs(d.n+"e")%3-1));
  const bar=(l,v)=>`<div class="xr"><span>${l}</span><div class="bar"><i style="width:${v}%"></i></div><b>${v}%</b></div>`;
  return `<div class="xray"><div class="xt">✈️ ${k.toLocaleString("pt-PT")} km · ${fmtT(k)} de voo${k>9000?" (com escala e paciência)":""}</div>${bar("Sol garantido",sol)}${bar("Caos do grupo",caos)}<div class="xr"><span>Orçamento</span><span></span><b>${"€".repeat(eu)}<s>${"€".repeat(4-eu)}</s></b></div></div>`}
function award(d){const isNew=!PASS.includes(d.n),x0=totalXP(),b0=new Set(badges().filter(b=>b.ok).map(b=>b.t));if(isNew){PASS.unshift(d.n);savePass()}
  const x1=totalXP(),r0=rankOf(x0),r1=rankOf(x1);
  return badges().filter(b=>b.ok&&!b0.has(b.t)).map(b=>`<p class="stp">🏅 Nova conquista: ${b.e} ${b.t}!</p>`).join("")+(r1.t!==r0.t?`<p class="stp">⭐ Subiste a ${r1.e} ${r1.t}!</p>`:"")+`<p class="stp">${isNew?"🛂 Novo carimbo: +"+(x1-x0)+" XP!":"🛂 Já tinhas este carimbo (0 XP)."}</p>`}
function renderPass(){const x=totalXP(),r=rankOf(x),nx=RANKS.find(k=>k.x>x);
  $("#ps").textContent="🛂 "+r.e+" "+r.t+" · "+x+" XP · "+PASS.length+" carimbos";$("#pb").style.width=Math.max(2,nx?(x-r.x)/(nx.x-r.x)*100:100)+"%";
  $("#pn").textContent=nx?"Faltam "+(nx.x-x)+" XP para "+nx.e+" "+nx.t:"Nível máximo atingido!";
  $("#bg").innerHTML=badges().map(b=>`<div class="bd ${b.ok?"on":""}"><span>${b.ok?b.e:"🔒"}</span><b>${b.t}</b><small>${b.d}</small></div>`).join("");
  $("#pl").innerHTML=PASS.map(n=>`<span>${BYN[n].f} ${n}</span>`).join("")||"Ainda sem carimbos. Aceita uma missão! ✈️"}
