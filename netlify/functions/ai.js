<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>curio.paper — From curiosity to research</title>
<script src="https://cdn.tailwindcss.com"></script>
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,700;1,9..144,700&family=Instrument+Serif:ital@0;1&family=Inter+Tight:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
<style>
:root{--paper:#FFFCF5;--ink:#12100D;--line:#EDE5D1;--line2:#F3EDD6}
body{background:var(--paper);color:var(--ink);font-family:'Inter Tight',sans-serif;overflow-x:hidden;position:relative}
.serif{font-family:'Fraunces',serif;letter-spacing:-0.04em;line-height:.86}
.serif-i{font-family:'Instrument Serif',serif}
.mono{font-family:'JetBrains Mono',monospace}
.sunset-top{height:6px;width:100%;background:linear-gradient(90deg,#FF1E0F 0%,#FF6B1A 22%,#FFB91A 52%,#FFE86A 80%,#FFF4C2 100%);position:sticky;top:0;z-index:50}
.blob{position:fixed;z-index:-2;filter:blur(38px);pointer-events:none}
.blob-left{left:-180px;top:-60px;width:680px;height:900px;background:radial-gradient(60% 55% at 45% 35%,#FF3E0F 0%,#FF7A1E 18%,#FFC11E 38%,#FFE86A 58%,transparent 72%);opacity:.92}
.blob-right{right:-220px;top:320px;width:520px;height:520px;background:radial-gradient(60% at 50% 50%,#FFF0A8 0%,#FFE0A0 35%,transparent 70%);opacity:.55}
.card{border:1.5px solid var(--line);background:rgba(255,255,255,.92);backdrop-filter:blur(14px);border-radius:22px;box-shadow:0 12px 32px rgba(18,16,13,.06),0 1px 0 rgba(255,255,255,.9) inset;transition:.25s}
.card:hover{transform:translateY(-2px);box-shadow:0 18px 44px rgba(18,16,13,.09)}
.inp{width:100%;background:#FFFFFF;border:1.5px solid var(--line);border-radius:9999px;padding:13px 18px;font-size:13.5px;outline:none;transition:.18s}
.inp:focus{border-color:var(--ink);box-shadow:0 0 0 3px rgba(18,16,13,.07)}
.inp-area{border-radius:18px!important}
.btn-b{background:var(--ink);color:#FFFCF5;border-radius:9999px;padding:12px 20px;font-weight:700;font-size:13px;letter-spacing:-0.01em;transition:.2s}
.btn-b:hover{background:#000;transform:translateY(-1px)}
.btn-o{border:1.5px solid var(--ink);border-radius:9999px;padding:11px 18px;font-weight:700;font-size:13px;background:#fff}
.folder{border:1.5px solid var(--line);border-radius:9999px;padding:12px 18px;display:flex;justify-content:space-between;align-items:center;background:#fff;cursor:pointer;transition:.2s}
.folder:hover{background:var(--ink);color:#FFFCF5}
.kbd{border:1.5px solid var(--ink);border-bottom-width:3.5px;border-radius:9999px;padding:6px 14px;font-size:10px;font-weight:700;letter-spacing:.14em}
.slab{border-top:1.5px solid var(--line)}
</style>
</head>
<body>
<div class="sunset-top"></div>
<div class="blob blob-left"></div><div class="blob blob-right"></div>

<div class="max-w-[1280px] mx-auto px-5 md:px-8 py-6">

<!-- HEADER -->
<div class="flex justify-between items-center">
<div class="flex items-center gap-3"><div class="w-9 h-9 rounded-full bg-[#12100D] text-white grid place-items-center serif text-[19px] font-bold">c</div><div><div class="serif text-[26px] font-bold leading-none">curio.paper</div><div class="mono text-[9px] tracking-[.2em] opacity-50 -mt-1">FROM CURIOSITY TO RESEARCH</div></div></div>
<div class="hidden md:flex items-center gap-2"><span class="kbd mono">JSR • REAL JOURNAL</span><span class="kbd mono">SPRINGER NATURE • REAL</span><button onclick="document.getElementById('how').scrollIntoView({behavior:'smooth'})" class="mono text-[10px] underline opacity-60">How it works</button></div>
</div>

<!-- HERO + ENGINE — MATCHING YOUR VIDEO TEMPLATE -->
<div class="grid md:grid-cols-[1.08fr_.92fr] gap-6 mt-7 items-start">

<!-- LEFT -->
<div class="space-y-6">
<div class="card p-7 md:p-[36px] relative overflow-hidden">
<div class="mono text-[10px] tracking-[.22em] opacity-50">THE ATELIER • V1 — NO COPY-PASTE</div>
<h1 class="serif text-[48px] md:text-[68px] font-bold mt-4 leading-[.84]">From<br><span class="serif-i italic font-normal">curiosity</span> to<br>research.</h1>
<div class="mt-6 max-w-[44ch] text-[14.5px] leading-[1.6] opacity-70">Turn a question into a paper you can publish. AI gives roadmap only — you do the work. 100% your words, real journals.</div>

<div class="mt-6" id="how">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold mb-3">WHAT ARE YOU CURIOUS ABOUT?</div>
<div class="grid grid-cols-2 gap-3">
<input id="k1" class="inp" placeholder="Keywords: e.g., sleep, scrolling">
<input id="k2" class="inp" placeholder="Question: e.g., does late scroll affect sleep?">
</div>
<button onclick="gen()" class="btn-b mt-3 w-full">Generate roadmap + template →</button>
<div id="outA" class="hidden mt-4 p-4 rounded-[16px] bg-[#FFFEF8] border border-[#EDE5D1] text-[12.5px] leading-[1.6] whitespace-pre-wrap"></div>
<div class="mono text-[10px] opacity-40 mt-2">⚠️ Just template structure — not to copy-paste.</div>
</div>

<div class="slab mt-7 pt-5 grid grid-cols-3 gap-4">
<div><div class="serif text-[28px] font-bold leading-none">100%</div><div class="mono text-[9px] tracking-[.14em] opacity-50 mt-1">ORIGINAL, YOURS</div></div>
<div><div class="serif text-[28px] font-bold leading-none">2</div><div class="mono text-[9px] tracking-[.14em] opacity-50 mt-1">REAL JOURNALS: JSR + SPRINGER</div></div>
<div><div class="serif text-[28px] font-bold leading-none">HS</div><div class="mono text-[9px] tracking-[.14em] opacity-50 mt-1">BUILT FOR STUDENTS</div></div>
</div>
</div>

<!-- 4 BEST RESEARCHES -->
<div class="card p-6">
<div class="flex justify-between items-baseline"><div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">BEST RESEARCHS — EDITOR PICK • 4</div><span class="mono text-[9px] opacity-40">Real examples</span></div>
<div class="mt-4 grid grid-cols-1 gap-[1px] bg-[#EDE5D1] border border-[#EDE5D1] rounded-[16px] overflow-hidden">
<a href="https://share.google/u4mpGyEGDS036z91H" target="_blank" class="bg-white p-4 flex justify-between hover:bg-black hover:text-white transition"><span class="serif text-[16px] font-bold leading-[1.1]">How to Structure Abstract & Methods</span><span class="mono text-[10px] opacity-40">01 ↗</span></a>
<a href="https://share.google/97ALZtaotz5npH3v2" target="_blank" class="bg-white p-4 flex justify-between hover:bg-black hover:text-white transition"><span class="serif text-[16px] font-bold leading-[1.1]">Award-Winning Student Paper</span><span class="mono text-[10px] opacity-40">02 ↗</span></a>
<a href="https://share.google/DJSDh0FirG3CGAFBJ" target="_blank" class="bg-white p-4 flex justify-between hover:bg-black hover:text-white transition"><span class="serif text-[16px] font-bold leading-[1.1]">From Idea to Publication</span><span class="mono text-[10px] opacity-40">03 ↗</span></a>
<a href="https://share.google/7jo7QJTqLQAAoNtXu" target="_blank" class="bg-white p-4 flex justify-between hover:bg-black hover:text-white transition"><span class="serif text-[16px] font-bold leading-[1.1]">Most Cited Template</span><span class="mono text-[10px] opacity-40">04 ↗</span></a>
</div>
</div>
</div>

<!-- RIGHT — STACKED PANELS LIKE YOUR VIDEO -->
<div class="space-y-6">

<!-- MAKE ARGUMENT CLEARER + AI DETECT -->
<div class="card bg-[#12100D]!text-[#FFFCF5] p-6">
<div class="mono text-[10px] tracking-[.2em] text-[#FFE55A] font-bold">C — MAKE ARGUMENT CLEARER + AI MENTOR</div>
<div class="serif text-[22px] font-bold leading-[.95] mt-2">Paste research — fix +<br><span class="serif-i italic font-normal text-[#FFE55A]">AI detect</span></div>
<textarea id="research" oninput="checkAI()" placeholder="Paste your full research here..." class="mt-4 w-full h-[170px] p-4 rounded-[16px] bg-[#1E1C19] border border-[#2A2825] text-[12.5px] text-white placeholder:opacity-40 outline-none"></textarea>
<div class="flex flex-wrap gap-2 mt-3">
<button onclick="fix('fix-grammar')" class="px-3 py-2 bg-white text-black rounded-full text-[11px] font-bold">Fix grammar</button>
<button onclick="fix('weakness')" class="px-3 py-2 bg-white text-black rounded-full text-[11px] font-bold">Weakness</button>
<button onclick="fix('rephrase')" class="px-3 py-2 bg-white text-black rounded-full text-[11px] font-bold">Rephrase</button>
<button onclick="fix('detect-ai')" class="px-3 py-2 bg-[#FFE55A] text-black rounded-full text-[11px] font-bold">AI Detect</button>
</div>
<div class="mt-4 p-3 rounded-[12px] bg-[#1E1C19] border border-[#2A2825]">
<div class="flex justify-between"><span class="mono text-[9px] tracking-[.18em]">AI DETECTION BAR</span><span id="aiBarText" class="mono text-[9px] opacity-70">12% AI risk</span></div>
<div class="w-full h-[6px] bg-[#2A2825] rounded-full mt-2 overflow-hidden"><div id="aiBar" class="h-full bg-[#FFE55A] w-[12%]" style="transition:.5s"></div></div>
</div>
<pre id="outC" class="hidden mt-4 p-4 rounded-[14px] bg-[#1E1C19] border border-[#2A2825] text-[12px] whitespace-pre-wrap"></pre>
</div>

<!-- PUBLISH + JSR/SPRINGER -->
<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">D — FIND RIGHT AUDIENCE + PUBLISH</div>
<div class="serif text-[22px] font-bold leading-[.9] mt-1">Where should this live?</div>
<input id="based" placeholder="What is it based upon?" class="inp mt-4">
<input id="q" placeholder="What question are you answering?" class="inp mt-2">
<input id="refs" placeholder="References / proof" class="inp mt-2">
<input id="aud" placeholder="Target audience?" class="inp mt-2">
<input id="authorEmail" placeholder="Your email (for curator)" class="inp mt-2">
<button onclick="publish()" class="btn-b mt-3 w-full">Publish + Track →</button>
<div id="outD" class="hidden mt-3 p-4 rounded-[16px] bg-[#FFFEF2] border text-[12px]"></div>
<div class="mt-4 grid grid-cols-2 gap-2">
<a href="https://www.jsr.org/index.php/path/user/register" target="_blank" class="btn-b text-center!bg-black">Publish on JSR →</a>
<a href="https://www.springernature.com/gp/authors/campaign/writing-a-manuscript" target="_blank" class="btn-o text-center">Publish on Springer Nature →</a>
</div>
<div class="mono text-[9px] opacity-40 mt-3 leading-[1.4]">JSR = real high-school journal with DOI. Springer Nature = real publisher portal. You must submit there to be public.</div>
</div>

</div>
</div>

<!-- FIELDS — 11 x 3 -->
<div class="mt-10">
<div class="flex items-baseline gap-3"><h2 class="serif text-[28px] font-bold">Fields</h2><span class="mono text-[11px] opacity-40">11 fields • 3 articles each • click to open</span></div>
<p class="serif-i italic text-[15px] opacity-50 mt-1">“ You don’t need permission to ask a big question. ”</p>
<div id="fields" class="mt-5 space-y-3"></div>
</div>

<!-- VIDEO LIBRARY — FOLDERS -->
<div class="mt-12 grid md:grid-cols-[1.1fr_.9fr] gap-6 items-start">
<div class="card p-6">
<div class="flex justify-between"><div><div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">VIDEO LIBRARY • 5 VIDEOS IN FOLDERS</div><div class="serif text-[26px] font-bold mt-1">Understand work behind</div></div><span class="mono text-[10px] opacity-40">Research Process • Methods • Inspiration</span></div>

<div class="mt-6 space-y-4">
<div>
<div onclick="toggleF('f-research')" class="folder"><span class="text-[14px] font-bold serif">📁 Research Process</span><span class="mono text-[10px] bg-black text-white px-2 py-1 rounded-full">2 videos</span></div>
<div id="f-research" class="mt-3 grid md:grid-cols-2 gap-3">
<div class="rounded-[14px] overflow-hidden border bg-white"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/UY7sVKJPTMA" allowfullscreen></iframe><div class="p-3 serif font-bold text-[13px] leading-[1.1]">How to Write a Paper in a Weekend</div></div>
<div class="rounded-[14px] overflow-hidden border bg-white"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/WVv2jWXW0K4" allowfullscreen></iframe><div class="p-3 serif font-bold text-[13px] leading-[1.1]">How To Read Research Papers Effectively</div></div>
</div>
</div>

<div>
<div onclick="toggleF('f-methods')" class="folder"><span class="text-[14px] font-bold serif">📁 Methods & Inspiration</span><span class="mono text-[10px] bg-black text-white px-2 py-1 rounded-full">3 videos</span></div>
<div id="f-methods" class="hidden mt-3 grid md:grid-cols-1 gap-3">
<div class="rounded-[14px] overflow-hidden border bg-white"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/yRxFwMHS_A8" allowfullscreen></iframe><div class="p-3 serif font-bold text-[13px]">Methods & Experiment Design</div></div>
<div class="rounded-[14px] overflow-hidden border bg-white"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/QBMk2Bfs4Fs" allowfullscreen></iframe><div class="p-3 serif font-bold text-[13px]">Finding Research Gaps</div></div>
<div class="rounded-[14px] overflow-hidden border bg-white"><iframe class="w-full aspect-video" src="https://www.youtube.com/embed/7gGi1-g2Hek" allowfullscreen></iframe><div class="p-3 serif font-bold text-[13px]">Inspiration — Idea to Published</div></div>
</div>
</div>
</div>
</div>

<!-- PROGRESS + REVIEW BAR -->
<div class="space-y-6">
<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">MY PRIVATE PROGRESS • REVIEW BAR</div>
<div class="serif text-[22px] font-bold mt-1 leading-[.9]">Track yourself —<br><span class="serif-i italic font-normal">be first</span></div>
<div class="mt-4 grid grid-cols-3 gap-2">
<button onclick="step('search')" id="b-search" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Search</div></button>
<button onclick="step('reading')" id="b-reading" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Reading</div></button>
<button onclick="step('idea')" id="b-idea" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Idea</div></button>
<button onclick="step('data')" id="b-data" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Data</div></button>
<button onclick="step('draft')" id="b-draft" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Draft</div></button>
<button onclick="step('submitted')" id="b-submitted" class="bg-[#F5F1D5] rounded-[14px] p-3 text-left border"><div class="mono text-[11px]">☐</div><div class="text-[12px] font-bold mt-1">Submitted</div></button>
</div>
<div class="mt-4 h-[4px] w-full bg-black/10 rounded-full overflow-hidden"><div id="bar" class="h-full w-0 transition-all" style="background:linear-gradient(90deg,#FF1E0F,#FFB91A)"></div></div>
<div id="barT" class="mt-2 mono text-[11px] font-bold">0% — Start</div>
<div id="reviewBar" class="mt-4 space-y-2"></div>
</div>

<div class="card p-6">
<div class="mono text-[10px] tracking-[.2em] opacity-40 font-bold">WHAT STUDENTS SAY AFTER PUBLISHING</div>
<div class="flex gap-2 mt-4"><input id="rname" placeholder="Your name" class="inp flex-1"><button onclick="rev()" class="btn-b">Submit</button></div>
<textarea id="rtext" placeholder="Write your review..." class="inp inp-area mt-2 h-[80px]"></textarea>
<div id="rstat" class="hidden mt-2 mono text-[11px] text-center"></div>
<div id="revList" class="mt-4 space-y-2 max-h-[320px] overflow-auto"></div>
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
 fieldsEl.innerHTML+=`<div class="card overflow-hidden"><div onclick="toggleF('${id}')" class="folder"><span class="serif text-[15px] font-bold">${String(i+1).padStart(2,'0')} — ${name}</span><span class="mono text-[10px] bg-black text-white px-2 py-1 rounded-full">${papers.length} papers</span></div><div id="${id}" class="${i===0?'':'hidden'} p-2 bg-[#FFFEF2] space-y-2">${papers.map(p=>`<a href="${p.u}" target="_blank" class="block bg-white border rounded-[12px] p-3 hover:bg-black hover:text-white transition"><div class="text-[12px] font-bold leading-tight">${p.t}</div><div class="mono text-[9px] opacity-60 truncate mt-1">${p.u}</div></a>`).join('')}</div></div>`;
});
function toggleF(id){document.getElementById(id).classList.toggle('hidden')}
let steps={search:false,reading:false,idea:false,data:false,draft:false,submitted:false};
const s=localStorage.getItem('curio_tracker'); if(s) steps=JSON.parse(s);
function updateBar(){
 localStorage.setItem('curio_tracker',JSON.stringify(steps));
 let d=Object.values(steps).filter(Boolean).length,p=Math.round(d/6*100);
 document.getElementById('bar').style.width=p+'%';
 document.getElementById('barT').innerText=p+'% — '+(p==0?'Start':p==100?'Submitted!':'Keep going');
 Object.keys(steps).forEach(k=>{const b=document.getElementById('b-'+k); if(steps[k]){b.classList.add('!bg-black','!text-white');}else{b.classList.remove('!bg-black','!text-white');}});
 document.getElementById('reviewBar').innerHTML=Object.entries(steps).map(([k,v])=>`<div class="flex justify-between mono text-[10px]"><span>${k.toUpperCase()}</span><span class="${v?'text-green-600':''}">${v?'● DONE':'○ TODO'}</span></div>`).join('');
}
function step(k){steps[k]=!steps[k];updateBar()} updateBar();

function checkAI(){
 const txt=document.getElementById('research').value;
 let score=Math.min(85, Math.floor(txt.length/18)+(txt.split('Moreover').length*6)+(txt.includes('As an AI')?30:0));
 if(txt.length<40) score=12;
 const bar=document.getElementById('aiBar'),txtEl=document.getElementById('aiBarText');
 bar.style.width=score+'%'; bar.style.background=score>60?'#FF3B30':score>35?'#FF9500':'#FFE55A';
 txtEl.innerText=score+'% AI risk — '+(score>60?'Rewrite!':score>35?'Add personal voice':'Human');
}

async function gen(){
 const k1=document.getElementById('k1').value,k2=document.getElementById('k2').value,o=document.getElementById('outA');
 if(!k1||!k2){alert('Enter keywords + question');return;}
 o.classList.remove('hidden');o.innerText='⏳ Generating roadmap...';
 try{
  const r=await fetch('/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:'roadmap',text:`Keywords:${k1} Q:${k2}`})});
  const j=await r.json();o.innerText=j.result+"\n\n⚠️ Just template — write your own words.";
 }catch(e){o.innerText='Error: '+e.message}
}
async function fix(a){
 const t=document.getElementById('research').value,o=document.getElementById('outC');
 if(!t){alert('Paste research');return;}
 o.classList.remove('hidden');o.innerText='⏳ Running '+a+'...';
 try{
  const r=await fetch('/.netlify/functions/ai',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({action:a,text:t})});
  const j=await r.json();o.innerText=j.result;
 }catch(e){o.innerText='Error: '+e.message}
}
async function publish(){
 const data={based:document.getElementById('based').value,question:document.getElementById('q').value,refs:document.getElementById('refs').value,audience:document.getElementById('aud').value,research:document.getElementById('research').value,authorEmail:document.getElementById('authorEmail').value};
 const o=document.getElementById('outD');o.classList.remove('hidden');o.innerText='⏳ Publishing + tracking...';
 try{
  const r=await fetch('/.netlify/functions/publish',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(data)});
  const j=await r.json();o.innerText=j.message+" Now use JSR + Springer buttons below to make it PUBLIC.";
  step('submitted');
 }catch(e){o.innerText='Error: '+e.message}
}
async function rev(){
 const n=document.getElementById('rname').value||'Anonymous',t=document.getElementById('rtext').value;
 if(!t){alert('Write review');return;}
 const b=document.getElementById('rstat');b.classList.remove('hidden');b.innerText='Sending...';
 try{await fetch('/.netlify/functions/review',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:n,text:t,progress:steps})});b.innerText='✅ Submitted!';fetchRev();}catch(e){b.innerText='Error'}
}
async function fetchRev(){
 try{
  const r=await fetch('/.netlify/functions/review');const d=await r.json();
  document.getElementById('revList').innerHTML=(d.reviews||[]).map(x=>`<div class="p-3 border rounded-[12px] bg-white"><b class="text-[13px]">${x.name}</b> <span class="mono text-[9px] opacity-50">${new Date(x.time).toLocaleDateString()}</span><div class="text-[12px] opacity-80 mt-1 leading-[1.4]">${x.text}</div></div>`).join('')||'<div class="mono text-[10px] opacity-40">No reviews yet — be first</div>';
 }catch(e){}
}
fetchRev();
</script>
</body>
</html>
