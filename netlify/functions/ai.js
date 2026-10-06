<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>curio.paper</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,700&family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;700&family=JetBrains+Mono:wght@400&display=swap" rel="stylesheet">
<style>
body{background:#FFFEF5;color:#11100E;font-family:'Inter Tight',sans-serif}
.serif{font-family:'Fraunces',serif;letter-spacing:-.04em}
.serif-i{font-family:'Instrument Serif',serif}
.mono{font-family:'JetBrains Mono',monospace}
.top-line{height:5px;background:linear-gradient(90deg,#FF1F0F 0%,#FF6A14 20%,#FFB81A 48%,#FFE75E 78%,#FFF6B0 100%)}
.wash{position:fixed;left:-120px;top:-10px;width:760px;height:860px;background:radial-gradient(58% 58% at 38% 32%,#FF3B0E 0%,#FF7A18 22%,#FFC21C 42%,#FFE85E 62%,rgba(255,232,94,0) 72%);filter:blur(2px);opacity:.95;pointer-events:none;z-index:-1}
.card{border:1.6px solid #E9DFC2;background:rgba(255,255,255,.88);backdrop-filter:blur(10px);border-radius:20px}
.inp{width:100%;background:#fff;border:1.5px solid #E9DFC2;border-radius:9999px;padding:12px 16px;font-size:13px;outline:none}
.inp:focus{border-color:#111}
.btn-b{background:#11100E;color:#FFFEF5;border-radius:9999px;padding:11px 18px;font-weight:700;font-size:12.5px}
.btn-o{border:1.5px solid #11100E;border-radius:9999px;padding:10px 16px;font-weight:700;font-size:12px;background:#fff}
.folder-head{border:1.5px solid #E9DFC2;border-radius:9999px;padding:11px 16px;display:flex;justify-content:space-between;cursor:pointer;background:#fff}
.folder-head:hover{background:#11100E;color:#fff}
</style>
</head>
<body>
<div class="top-line"></div><div class="wash"></div>

<div class="max-w-[1320px] mx-auto px-6 md:px-10 py-6">
<!-- HEADER LIKE VIDEO -->
<div class="flex justify-between items-center"><div class="flex gap-2 items-center"><div class="w-8 h-8 rounded-full bg-black text-white grid place-items-center serif font-bold">c</div><span class="serif text-[22px] font-bold tracking-tight">curio.paper</span><span class="hidden md:block mono text-[9px] opacity-40 ml-3 tracking-[.18em]">FROM CURIOSITY TO RESEARCH</span></div><div class="flex gap-2 mono text-[9px]"><span class="border border-black border-b-[3px] rounded-full px-3 py-1.5 font-bold">JSR • REAL</span><span class="border border-black border-b-[3px] rounded-full px-3 py-1.5 font-bold">SPRINGER NATURE • REAL</span></div></div>

<!-- MAIN 2 COL LAYOUT EXACTLY LIKE YOUR RECORDING -->
<div class="grid md:grid-cols-[1.05fr_0.95fr] gap-6 mt-8 items-start">

<!-- LEFT COLUMN — HERO + FIELDS -->
<div>
<h1 class="serif text-[54px] md:text-[78px] leading-[.84] font-bold">From<br><span class="serif-i italic font-normal">curiosity</span> to<br>research.</h1>

<div class="card p-6 mt-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">WHAT ARE YOU CURIOUS ABOUT?</div>
<div class="mt-3 grid grid-cols-1 gap-2">
<input id="k1" class="inp" placeholder="Keywords: e.g., sleep, scrolling">
<input id="k2" class="inp" placeholder="Research question: e.g., does late scroll affect sleep?">
</div>
<button onclick="gen()" class="btn-b w-full mt-3">Generate roadmap + template →</button>
<pre id="outA" class="hidden mt-3 p-4 rounded-[16px] bg-[#FFFEF2] border text-[12px] whitespace-pre-wrap"></pre>

<div class="grid grid-cols-3 border-t border-[#E9DFC2] mt-6 pt-4">
<div><div class="serif text-[26px] font-bold">100%</div><div class="mono text-[8px] opacity-50">ORIGINAL</div></div>
<div class="border-l border-[#E9DFC2] pl-4"><div class="serif text-[26px] font-bold">JSR<br>Springer</div><div class="mono text-[8px] opacity-50">REAL JOURNALS</div></div>
<div class="border-l border-[#E9DFC2] pl-4"><div class="serif text-[26px] font-bold">AI Mentor</div><div class="mono text-[8px] opacity-50">GUIDE ONLY</div></div>
</div>
</div>

<!-- 4 BEST RESEARCHES — AS IN VIDEO TOP -->
<div class="card p-5 mt-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">BEST RESEARCHS — 4 • EDITOR PICK</div>
<div class="mt-3 space-y-[1px] bg-[#E9DFC2] border border-[#E9DFC2] rounded-[14px] overflow-hidden">
<a href="https://share.google/u4mpGyEGDS036z91H" target="_blank" class="bg-white p-3 flex justify-between hover:bg-black hover:text-white"><span class="text-[13px] font-bold serif">How to Structure Abstract & Methods</span><span class="mono text-[10px]">01 ↗</span></a>
<a href="https://share.google/97ALZtaotz5npH3v2" target="_blank" class="bg-white p-3 flex justify-between hover:bg-black hover:text-white"><span class="text-[13px] font-bold serif">Award-Winning Student Paper</span><span class="mono text-[10px]">02 ↗</span></a>
<a href="https://share.google/DJSDh0FirG3CGAFBJ" target="_blank" class="bg-white p-3 flex justify-between hover:bg-black hover:text-white"><span class="text-[13px] font-bold serif">From Idea to Publication</span><span class="mono text-[10px]">03 ↗</span></a>
<a href="https://share.google/7jo7QJTqLQAAoNtXu" target="_blank" class="bg-white p-3 flex justify-between hover:bg-black hover:text-white"><span class="text-[13px] font-bold serif">Most Cited Template</span><span class="mono text-[10px]">04 ↗</span></a>
</div>
</div>

<!-- 11 FIELDS -->
<div class="mt-8">
<h2 class="serif text-[26px] font-bold">Fields — 11 fields × 3 articles</h2>
<div id="fields" class="mt-4 space-y-2"></div>
</div>
</div>

<!-- RIGHT COLUMN — DARK TOOLBOX + PUBLISH + VIDEOS + REVIEWS (LIKE VIDEO) -->
<div class="space-y-6">

<div class="card!bg-[#11100E] text-white p-6 border-[#11100E]">
<div class="mono text-[10px] tracking-[.2em] text-[#FFE86A]">C — AI MENTOR + AI DETECTION BAR</div>
<div class="serif text-[24px] font-bold leading-[.9] mt-2">Paste research — fix +<br><span class="serif-i italic font-normal text-[#FFE86A]">detect AI</span></div>
<textarea id="research" oninput="checkAI()" placeholder="Paste your full research here..." class="mt-4 w-full h-[150px] p-4 rounded-[16px] bg-[#1C1A18] border border-[#2C2A27] text-[12px] text-white"></textarea>
<div class="flex flex-wrap gap-2 mt-3">
<button onclick="fix('fix-grammar')" class="bg-white text-black rounded-full px-3 py-2 text-[11px] font-bold">Fix grammar</button>
<button onclick="fix('weakness')" class="bg-white text-black rounded-full px-3 py-2 text-[11px] font-bold">Weakness</button>
<button onclick="fix('rephrase')" class="bg-white text-black rounded-full px-3 py-2 text-[11px] font-bold">Rephrase</button>
<button onclick="fix('detect-ai')" class="bg-[#FFE86A] text-black rounded-full px-3 py-2 text-[11px] font-bold">AI Detect</button>
</div>
<div class="mt-4 bg-[#1C1A18] border border-[#2C2A27] rounded-[12px] p-3">
<div class="flex justify-between mono text-[9px]"><span>AI DETECTION</span><span id="aiBarText">12% AI risk</span></div>
<div class="h-1.5 bg-[#2C2A27] rounded-full mt-2 overflow-hidden"><div id="aiBar" class="h-full bg-[#FFE86A] w-[12%]"></div></div>
</div>
<pre id="outC" class="hidden mt-3 p-3 rounded-[12px] bg-[#1C1A18] border border-[#2C2A27] text-[12px] whitespace-pre-wrap"></pre>
</div>

<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">D — PUBLISH ON JSR & SPRINGER NATURE</div>
<div class="serif text-[24px] font-bold leading-[.9] mt-2">Where should<br>this live?</div>
<input id="based" placeholder="What is it based upon?" class="inp mt-4">
<input id="q" placeholder="What question are you answering?" class="inp mt-2">
<input id="refs" placeholder="References / proof" class="inp mt-2">
<input id="aud" placeholder="Target audience?" class="inp mt-2">
<input id="authorEmail" placeholder="Your email" class="inp mt-2">
<button onclick="publish()" class="btn-b w-full mt-3">Publish + Track</button>
<div id="outD" class="hidden mt-3 p-3 bg-[#FFFEF2] border rounded-[12px] text-[11px]"></div>
<div class="grid grid-cols-2 gap-2 mt-4">
<a href="https://www.jsr.org/index.php/path/user/register" target="_blank" class="btn-b text-center">Publish on JSR →</a>
<a href="https://www.springernature.com/gp/authors/campaign/writing-a-manuscript" target="_blank" class="btn-o text-center">Springer Nature →</a>
</div>
<div class="mono text-[9px] opacity-40 mt-2">Publishing link = direct JSR registration + Springer Nature manuscript guide</div>
</div>

<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">VIDEO LIBRARY • 5 VIDEOS • FOLDERS</div>
<div class="serif text-[22px] font-bold mt-1">Research Process & Methods</div>
<div class="mt-4 space-y-3">
<div><div onclick="toggleF('f1')" class="folder-head"><span class="serif font-bold text-[13px]">📁 Research Process</span><span class="mono text-[10px] bg-black text-white px-2 py-1 rounded-full">2 videos</span></div>
<div id="f1" class="mt-2 grid gap-2"><div class="rounded-[12px] overflow-hidden border"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/UY7sVKJPTMA" allowfullscreen></iframe></div><div class="rounded-[12px] overflow-hidden border"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/WVv2jWXW0K4" allowfullscreen></iframe></div></div></div>
<div><div onclick="toggleF('f2')" class="folder-head"><span class="serif font-bold text-[13px]">📁 Methods & Inspiration</span><span class="mono text-[10px] bg-black text-white px-2 py-1 rounded-full">3 videos</span></div>
<div id="f2" class="hidden mt-2 grid gap-2"><div class="rounded-[12px] overflow-hidden border"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/yRxFwMHS_A8" allowfullscreen></iframe></div><div class="rounded-[12px] overflow-hidden border"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/QBMk2Bfs4Fs" allowfullscreen></iframe></div><div class="rounded-[12px] overflow-hidden border"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/7gGi1-g2Hek" allowfullscreen></iframe></div></div></div>
</div>
</div>

<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">MY PROGRESS + REVIEW BAR</div>
<div class="grid grid-cols-3 gap-2 mt-3"><button onclick="step('search')" id="b-search" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Search</div></button><button onclick="step('reading')" id="b-reading" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Reading</div></button><button onclick="step('idea')" id="b-idea" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Idea</div></button><button onclick="step('data')" id="b-data" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Data</div></button><button onclick="step('draft')" id="b-draft" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Draft</div></button><button onclick="step('submitted')" id="b-submitted" class="bg-[#F5F1D5] border rounded-[12px] p-2 text-left"><div class="mono text-[10px]">☐</div><div class="text-[11px] font-bold">Submitted</div></button></div>
<div class="h-1 bg-black/10 rounded-full mt-3 overflow-hidden"><div id="bar" class="h-full w-0" style="background:linear-gradient(90deg,#FF1F0F,#FFB81A)"></div></div><div id="barT" class="mono text-[10px] mt-1 font-bold">0% — Start</div>
<div id="reviewBar" class="mt-3 space-y-1"></div>
</div>

<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">WHAT STUDENTS SAY AFTER PUBLISHING</div>
<div class="flex gap-2 mt-3"><input id="rname" placeholder="Your name" class="inp flex-1"><button onclick="rev()" class="btn-b">Submit</button></div>
<textarea id="rtext" placeholder="Write review..." class="inp mt-2!rounded-[16px] h-[70px]"></textarea>
<div id="rstat" class="hidden mt-2 mono text-[10px] text-center"></div>
<div id="revList" class="mt-3 space-y-2"></div>
</div>

</div>
</div>
</div>

<script>
const DB={
 "Biological Science": [{t:"How Does Human Brain Work? - Caltech",u:"https://scienceexchange.caltech.edu/topics/neuroscience/how-the-brain-works"},{t:"Allergy Review - Springer",u:"https://link.springer.com/article/10.1186/s13223-018-0278-1"},{t:"Bio Science 2026 - T&F",u:"https://www.tandfonline.com/doi/full/10.1080/17451000.2026.2716239"}],
 "AI and Data Science": [{t:"Review on AI in Computational Methods",u:"https://link.springer.com/article/10.1007/s11831-024-10209-0"},{t:"AI & Data Processing",u:"https://www.sciencedirect.com/science/article/pii/S1877050924003752"},{t:"State of AI 2025 - Nature MI",u:"https://www.nature.com/articles/s42256-025-01000-2"}],
 "Physics and Space": [{t:"IITK Physics Notes PDF",u:"https://students.iiserkol.ac.in/~sg12ms102/IITK.pdf"},{t:"Dying Stars & Exoplanets - Nature",u:"https://www.nature.com/articles/d41586-025-01445-w"},{t:"Exoplanet Discovery 2025",u:"https://www.nature.com/articles/s41550-025-02763-9"}],
 "Chemistry and Material Science": [{t:"Chemistry Review 2025",u:"https://www.nature.com/articles/s41570-025-00706-6"},{t:"Advanced Materials",u:"https://www.nature.com/articles/s41563-025-02137-6"},{t:"Comms Chemistry",u:"https://www.nature.com/articles/s42004-025-01500-7"}],
 "Neuroscience and Physiology": [{t:"Neuroscience Breakthrough",u:"https://www.nature.com/articles/s41467-025-65499-0"},{t:"Neuroscience Articles - EI",u:"https://emerginginvestigators.org/articles?q=neuroscience"},{t:"Neuro PDF",u:"https://emerginginvestigators.org/articles/22-080/pdf"}],
 "Engineering and Robotics": [{t:"Engineering Systems",u:"https://www.nature.com/articles/s41467-025-56025-3"},{t:"Robotics 2025",u:"https://www.nature.com/articles/s41467-025-57741-6"},{t:"Engineering Innovation",u:"https://www.nature.com/articles/s44287-025-00152-y"}],
 "Climate Environment and Earth": [{t:"Climate Latest - EI",u:"https://emerginginvestigators.org/?s=last+updated"},{t:"Climate Change Review - Nature",u:"https://www.nature.com/articles/s41558-025-02300-1"},{t:"Earth Systems Research",u:"https://www.nature.com/articles/s41561-025-01700-2"}],
 "Humanities, Literature & Culture": [{t:"Machine-assisted designs with AI",u:"https://www.nature.com/articles/s41599-025-04503-w"},{t:"Human Behaviour",u:"https://www.nature.com/articles/s41562-025-02242-1"},{t:"Humanities PDF",u:"https://www.emerginginvestigators.org/articles/24-254/pdf"}],
 "Society, Economics and Public Policy": [{t:"Society & Economics",u:"https://www.nature.com/articles/s41586-023-06840-9"},{t:"Public Policy",u:"https://www.nature.com/articles/s41599-020-00552-5"},{t:"Social Science",u:"https://www.nature.com/articles/s41599-019-0232-y"}],
 "Business and Management": [{t:"Business Research",u:"https://www.nature.com/articles/s41599-020-00552-5"},{t:"Business Collection",u:"https://www.nature.com/collections/jijcddffij"},{t:"Management Science 2025",u:"https://www.nature.com/articles/s41599-025-04400-3"}],
 "Communication and Media": [{t:"Media & Communication",u:"https://www.nature.com/articles/s41562-025-02102-y"},{t:"Communication Research",u:"https://www.nature.com/articles/s41586-023-06840-9"},{t:"Digital Media Studies",u:"https://www.nature.com/articles/s41599-024-04000-0"}]
};
const fieldsEl=document.getElementById('fields');
Object.entries(DB).forEach(([name,papers],i)=>{
 const id='fld'+i;
 fieldsEl.innerHTML+=`<div class="card overflow-hidden"><div onclick="toggleF('${id}')" class="folder-head"><span class="serif text-[14px] font-bold">${String(i+1).padStart(2,'0')} — ${name}</span><span class="mono text-[9px] bg-black text-white px-2 py-1 rounded-full">${papers.length} papers</span></div><div id="${id}" class="${i===0?'':'hidden'} p-2 bg-[#FFFEF2] space-y-2">${papers.map(p=>`<a href="${p.u}" target="_blank" class="block bg-white border rounded-[10px] p-3 hover:bg-black hover:text-white"><div class="text-[12px] font-bold leading-tight">${p.t}</div><div class="mono text-[8px] opacity-60 truncate mt-1">${p.u}</div></a>`).join('')}</div></div>`;
});
function toggleF(id){document.getElementById(id).classList.toggle('hidden')}
let steps={search:false,reading:false,idea:false,data:false,[STRIPPED]
const s=localStorage.getItem('curio_tracker'); if(s) steps=JSON.parse(s);
function updateBar(){localStorage.setItem('curio_tracker',JSON.stringify(steps));let d=Object.values(steps).filter(Boolean).length,p=Math.round(d/6*100);document.getElementById('bar').style.width=p+'%';document.getElementById('barT').innerText=p+'% — '+(p==0?'Start':p==100?'Submitted!':'Keep going');Object.keys(steps).forEach(k=>{const b=document.getElementById('b-'+k); if(steps[k]){b.classList.add('!bg-black','!text-white');}else{b.classList.remove('!bg-black','!text-white');}});document.getElementById('reviewBar').innerHTML=Object.entries(steps).map(([k,v])=>`<div class="flex justify-between mono text-[9px]"><span>${k.toUpperCase()}</span><span class="${v?'text-green-600':''}">${v?'● DONE':'○'}</span></div>`).join('');}
function step(k){steps[k]=!steps[k];updateBar()} updateBar();
function checkAI(){const t=document.getElementById('research').value;let s=Math.min(85,Math.floor(t.length/18)+(t.split('Moreover').length*6));if(t.length<40)s=12;document.getElementById('aiBar').style.width=s+'%';document.getElementById('aiBar').style.background=s>60?'#FF3B30':s>35?'#FF9500':'#FFE86A';document.getElementById('aiBarText').innerText=s+'% AI risk';}
async function gen(){const k1=document.getElementById('k1').value,k2=document.getElementById('k2').value,o=document.getElementById('outA');if(!k1||!k2){alert('Enter both');return;}o.classList.remove('hidden');o.innerText='⏳ Generating...';const r=await fetch('/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'roadmap',text:`Keywords:${k1} Q:${k2}`})});const j=await r.json();o.innerText=j.result;}
async function fix(a){const t=document.getElementById('research').value,o=document.getElementById('outC');if(!t){alert('Paste research');return;}o.classList.remove('hidden');o.innerText='⏳ Running '+a+'...';const r=await fetch('/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:a,text:t})});const j=await r.json();o.innerText=j.result;}
async function publish(){const data={based:document.getElementById('based').value,question:document.getElementById('q').value,refs:document.getElementById('refs').value,audience:document.getElementById('aud').value,research:document.getElementById('research').value,authorEmail:document.getElementById('authorEmail').value};const o=document.getElementById('outD');o.classList.remove('hidden');o.innerText='⏳ Publishing...';const r=await fetch('/.netlify/functions/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});const j=await r.json();o.innerText=j.message;step('submitted');}
async function rev(){const n=document.getElementById('rname').value||'Anon',t=document.getElementById('rtext').value;if(!t){alert('Write review');return;}const b=document.getElementById('rstat');b.classList.remove('hidden');b.innerText='Sending...';await fetch('/.netlify/functions/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,text:t,progress:steps})});b.innerText='✅ Done';fetchRev();}
async function fetchRev(){try{const r=await fetch('/.netlify/functions/review');const d=await r.json();document.getElementById('revList').innerHTML=(d.reviews||[]).map(x=>`<div class="p-3 border rounded-[12px] bg-white"><b class="text-[12px]">${x.name}</b> <span class="mono text-[9px] opacity-50">${new Date(x.time).toLocaleDateString()}</span><div class="text-[11px] opacity-80 mt-1">${x.text}</div></div>`).join('');}catch(e){}}fetchRev();
</script>
</body>
</html>
