const fs = require('fs');

const components = [];

const baseCss = `body { display:flex; justify-content:center; align-items:center; min-height:100vh; margin:0; background:#0a0a0a; font-family: system-ui, sans-serif; color:#fff; perspective: 1000px; }`;

const palettes = [
  ['#00ffff', '#ff00ff'], ['#ff0055', '#00ff99'], ['#ffaa00', '#aa00ff'],
  ['#00ffcc', '#ffff00'], ['#ff3300', '#3300ff'], ['#00ff00', '#ff00ff'],
  ['#ff8800', '#ff0088'], ['#0088ff', '#00ff88'], ['#8800ff', '#ff0088'],
  ['#ff0000', '#0000ff'], ['#ffff00', '#00ffff'], ['#00ff00', '#0000ff']
];

const animationTypes = [
  'pulse', 'bounce', 'spin', 'wiggle', 'flip', 'glitch', 'float', 'swing', 'tada', 'wobble',
  'jello', 'heartbeat', 'roll', 'hinge', 'jackInTheBox', 'pop', 'shimmer', 'slide', 'zoom', 'skew'
];

const styles = [
  'glass', 'neon', 'brutalist', 'gradient', 'wireframe', 
  'neumorphic', 'cyberpunk', 'retro', 'minimal', 'organic',
  'geometric', 'skeuomorphic', 'vaporwave', 'holographic', 'liquid'
];

function getRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateCSS(id, type, c1, c2, anim, category) {
  let css = '';
  let reactClass = '';
  
  if (type === 'glass') {
    css = `background: rgba(255,255,255,0.05); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.1); box-shadow: 0 8px 32px 0 rgba(0,0,0,0.37);`;
    reactClass = `bg-white/5 backdrop-blur-md border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]`;
  } else if (type === 'neon') {
    css = `background: transparent; border: 2px solid ${c1}; color: ${c1}; box-shadow: 0 0 10px ${c1}, inset 0 0 10px ${c1}; text-shadow: 0 0 5px ${c1};`;
    reactClass = `bg-transparent border-2 border-[${c1}] text-[${c1}] shadow-[0_0_10px_${c1},inset_0_0_10px_${c1}] drop-shadow-[0_0_5px_${c1}]`;
  } else if (type === 'brutalist') {
    css = `background: ${c1}; border: 4px solid #000; color: #000; box-shadow: 8px 8px 0px ${c2}; font-weight: 900; text-transform: uppercase;`;
    reactClass = `bg-[${c1}] border-4 border-black text-black shadow-[8px_8px_0px_${c2}] font-black uppercase`;
  } else if (type === 'gradient') {
    css = `background: linear-gradient(135deg, ${c1}, ${c2}); color: #fff; border: none; box-shadow: 0 10px 20px ${c1}66;`;
    reactClass = `bg-gradient-to-br from-[${c1}] to-[${c2}] text-white border-none shadow-[0_10px_20px_${c1}66]`;
  } else if (type === 'wireframe') {
    css = `background: transparent; border: 1px dashed ${c2}; color: ${c2};`;
    reactClass = `bg-transparent border border-dashed border-[${c2}] text-[${c2}]`;
  } else if (type === 'neumorphic') {
    css = `background: #0a0a0a; border: none; color: ${c1}; box-shadow: 5px 5px 10px #040404, -5px -5px 10px #101010;`;
    reactClass = `bg-[#0a0a0a] border-none text-[${c1}] shadow-[5px_5px_10px_#040404,-5px_-5px_10px_#101010]`;
  } else if (type === 'cyberpunk') {
    css = `background: #fcee0a; color: #000; border: none; clip-path: polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%); font-family: monospace; font-weight: bold;`;
    reactClass = `bg-[#fcee0a] text-black border-none font-mono font-bold [clip-path:polygon(10%_0,100%_0,100%_70%,90%_100%,0_100%,0_30%)]`;
  } else if (type === 'retro') {
    css = `background: ${c2}; color: #fff; border: 3px solid #fff; box-shadow: 4px 4px 0px #000; font-family: 'Courier New', Courier, monospace;`;
    reactClass = `bg-[${c2}] text-white border-3 border-white shadow-[4px_4px_0px_#000] font-mono`;
  } else if (type === 'minimal') {
    css = `background: transparent; color: #fff; border: 1px solid #333; transition: border-color 0.3s;`;
    reactClass = `bg-transparent text-white border border-[#333] transition-colors duration-300 hover:border-white`;
  } else if (type === 'organic') {
    css = `background: ${c1}; color: #fff; border: none; border-radius: 40% 60% 70% 30% / 40% 50% 60% 50%;`;
    reactClass = `bg-[${c1}] text-white border-none rounded-[40%_60%_70%_30%/40%_50%_60%_50%]`;
  } else if (type === 'geometric') {
    css = `background: conic-gradient(from 90deg at 50% 50%, ${c1}, ${c2}, ${c1}); color: #fff; border: none;`;
    reactClass = `bg-[conic-gradient(from_90deg_at_50%_50%,${c1},${c2},${c1})] text-white border-none`;
  } else if (type === 'skeuomorphic') {
    css = `background: linear-gradient(to bottom, #333, #111); color: ${c2}; border: 1px solid #444; box-shadow: inset 0 1px 0 #555, 0 4px 6px rgba(0,0,0,0.8); text-shadow: 0 -1px 0 #000;`;
    reactClass = `bg-gradient-to-b from-[#333] to-[#111] text-[${c2}] border border-[#444] shadow-[inset_0_1px_0_#555,0_4px_6px_rgba(0,0,0,0.8)] drop-shadow-[0_-1px_0_#000]`;
  } else if (type === 'vaporwave') {
    css = `background: linear-gradient(180deg, #ff71ce, #01cdfe, #05ffa1); color: #fff; border: 2px solid #b967ff; text-shadow: 2px 2px 0px #b967ff;`;
    reactClass = `bg-gradient-to-b from-[#ff71ce] via-[#01cdfe] to-[#05ffa1] text-white border-2 border-[#b967ff] drop-shadow-[2px_2px_0px_#b967ff]`;
  } else if (type === 'holographic') {
    css = `background: linear-gradient(124deg, #ff2400, #e81d1d, #e8b71d, #e3e81d, #1de840, #1ddde8, #2b1de8, #dd00f3, #dd00f3); background-size: 1800% 1800%; animation: rainbow 18s ease infinite; color: #fff; border: none; box-shadow: 0 0 20px rgba(255,255,255,0.5);`;
    reactClass = `bg-[linear-gradient(124deg,#ff2400,#e81d1d,#e8b71d,#e3e81d,#1de840,#1ddde8,#2b1de8,#dd00f3,#dd00f3)] bg-[length:1800%_1800%] animate-[rainbow_18s_ease_infinite] text-white border-none shadow-[0_0_20px_rgba(255,255,255,0.5)]`;
  } else if (type === 'liquid') {
    css = `background: ${c2}; color: #fff; border: none; filter: url('#goo');`;
    reactClass = `bg-[${c2}] text-white border-none [filter:url('#goo')]`;
  }

  let keyframes = '';
  if (anim === 'pulse') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: scale(1); } 50% { transform: scale(1.05); } 100% { transform: scale(1); } }`;
  } else if (anim === 'bounce') {
    keyframes = `@keyframes ${id}-anim { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-15px); } }`;
  } else if (anim === 'spin') {
    keyframes = `@keyframes ${id}-anim { 100% { transform: rotate(360deg); } }`;
  } else if (anim === 'wiggle') {
    keyframes = `@keyframes ${id}-anim { 0%, 100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }`;
  } else if (anim === 'flip') {
    keyframes = `@keyframes ${id}-anim { 100% { transform: rotateY(360deg); } }`;
  } else if (anim === 'glitch') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: translate(0); } 20% { transform: translate(-2px, 2px); } 40% { transform: translate(-2px, -2px); } 60% { transform: translate(2px, 2px); } 80% { transform: translate(2px, -2px); } 100% { transform: translate(0); } }`;
  } else if (anim === 'float') {
    keyframes = `@keyframes ${id}-anim { 0%, 100% { transform: translateY(0) rotate(0); } 50% { transform: translateY(-20px) rotate(2deg); } }`;
  } else if (anim === 'swing') {
    keyframes = `@keyframes ${id}-anim { 20% { transform: rotate3d(0, 0, 1, 15deg); } 40% { transform: rotate3d(0, 0, 1, -10deg); } 60% { transform: rotate3d(0, 0, 1, 5deg); } 80% { transform: rotate3d(0, 0, 1, -5deg); } 100% { transform: rotate3d(0, 0, 1, 0deg); } }`;
  } else if (anim === 'tada') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: scale3d(1, 1, 1); } 10%, 20% { transform: scale3d(0.9, 0.9, 0.9) rotate3d(0, 0, 1, -3deg); } 30%, 50%, 70%, 90% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, 3deg); } 40%, 60%, 80% { transform: scale3d(1.1, 1.1, 1.1) rotate3d(0, 0, 1, -3deg); } 100% { transform: scale3d(1, 1, 1); } }`;
  } else if (anim === 'wobble') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: translate3d(0, 0, 0); } 15% { transform: translate3d(-25%, 0, 0) rotate3d(0, 0, 1, -5deg); } 30% { transform: translate3d(20%, 0, 0) rotate3d(0, 0, 1, 3deg); } 45% { transform: translate3d(-15%, 0, 0) rotate3d(0, 0, 1, -3deg); } 60% { transform: translate3d(10%, 0, 0) rotate3d(0, 0, 1, 2deg); } 75% { transform: translate3d(-5%, 0, 0) rotate3d(0, 0, 1, -1deg); } 100% { transform: translate3d(0, 0, 0); } }`;
  } else if (anim === 'jello') {
    keyframes = `@keyframes ${id}-anim { 11.1% { transform: none; } 22.2% { transform: skewX(-12.5deg) skewY(-12.5deg); } 33.3% { transform: skewX(6.25deg) skewY(6.25deg); } 44.4% { transform: skewX(-3.125deg) skewY(-3.125deg); } 55.5% { transform: skewX(1.5625deg) skewY(1.5625deg); } 66.6% { transform: skewX(-0.78125deg) skewY(-0.78125deg); } 77.7% { transform: skewX(0.390625deg) skewY(0.390625deg); } 88.8% { transform: skewX(-0.1953125deg) skewY(-0.1953125deg); } 100% { transform: none; } }`;
  } else if (anim === 'heartbeat') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: scale(1); } 14% { transform: scale(1.3); } 28% { transform: scale(1); } 42% { transform: scale(1.3); } 70% { transform: scale(1); } }`;
  } else if (anim === 'roll') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: translateX(-100%) rotate(-120deg); opacity: 0; } 100% { transform: translateX(0) rotate(0deg); opacity: 1; } }`;
  } else if (anim === 'hinge') {
    keyframes = `@keyframes ${id}-anim { 0% { transform-origin: top left; animation-timing-function: ease-in-out; } 20%, 60% { transform: rotate3d(0, 0, 1, 80deg); transform-origin: top left; animation-timing-function: ease-in-out; } 40%, 80% { transform: rotate3d(0, 0, 1, 60deg); transform-origin: top left; animation-timing-function: ease-in-out; opacity: 1; } 100% { transform: translate3d(0, 700px, 0); opacity: 0; } }`;
  } else if (anim === 'jackInTheBox') {
    keyframes = `@keyframes ${id}-anim { 0% { opacity: 0; transform: scale(0.1) rotate(30deg); transform-origin: center bottom; } 50% { transform: rotate(-10deg); } 70% { transform: rotate(3deg); } 100% { opacity: 1; transform: scale(1); } }`;
  } else if (anim === 'pop') {
    keyframes = `@keyframes ${id}-anim { 0% { transform: scale(0.8); opacity: 0; } 100% { transform: scale(1); opacity: 1; } }`;
  } else if (anim === 'shimmer') {
    keyframes = `@keyframes ${id}-anim { 0% { background-position: -1000px 0; } 100% { background-position: 1000px 0; } }`;
    if (type !== 'holographic') {
      css += ` background-image: linear-gradient(to right, transparent 0%, rgba(255,255,255,0.2) 50%, transparent 100%); background-size: 1000px 100%; `;
      reactClass += ` bg-[linear-gradient(to_right,transparent_0%,rgba(255,255,255,0.2)_50%,transparent_100%)] bg-[length:1000px_100%]`;
    }
  } else {
    keyframes = `@keyframes ${id}-anim { 0% { opacity: 1; } 50% { opacity: 0.5; } 100% { opacity: 1; } }`;
  }

  if (type === 'holographic') {
    keyframes += ` @keyframes rainbow { 0%{background-position:0% 82%} 50%{background-position:100% 19%} 100%{background-position:0% 82%} }`;
  }

  return { css, reactClass, keyframes };
}

function generate(category, index) {
  const [c1, c2] = getRandom(palettes);
  const type = getRandom(styles);
  const anim = getRandom(animationTypes);
  const shape = type === 'organic' ? '40% 60% 70% 30% / 40% 50% 60% 50%' : getRandom(['0px', '4px', '8px', '16px', '32px', '50px', '50%']);
  const id = `${category.toLowerCase().replace(/[^a-z0-9]+/g, '-')}-${index}-${type}-${anim}`;
  
  const { css: styleCss, reactClass, keyframes } = generateCSS(id, type, c1, c2, anim, category);
  
  let html = '';
  let css = '';
  let react = '';
  
  if (category === 'buttons') {
    html = `<button class="${id}">Button ${index}</button>`;
    css = `.${id} { padding: 15px 30px; font-size: 1rem; border-radius: ${shape}; cursor: pointer; transition: 0.3s; ${styleCss} } .${id}:hover { animation: ${id}-anim 1s infinite; } ${keyframes}`;
    react = `export default function Btn() { return <button className="px-[30px] py-[15px] text-[1rem] rounded-[${shape}] cursor-pointer transition-all duration-300 ${reactClass} hover:animate-[${id}-anim_1s_infinite]"><style>{\`${keyframes}\`}</style>Button ${index}</button>; }`;
  } else if (category === 'checkboxes') {
    html = `<div class="${id}-wrapper"><input type="checkbox" id="${id}" class="hidden-cb"/><label for="${id}" class="cb-lbl"></label></div>`;
    css = `.${id}-wrapper .hidden-cb { display: none; } .${id}-wrapper .cb-lbl { display: inline-block; width: 24px; height: 24px; border: 2px solid #555; border-radius: ${shape}; cursor: pointer; transition: 0.3s; } .${id}-wrapper .hidden-cb:checked + .cb-lbl { ${styleCss} animation: ${id}-anim 0.5s forwards; } ${keyframes}`;
    react = `import { useState } from 'react'; export default function Cb() { const [c, setC] = useState(false); return <div onClick={()=>setC(!c)} className={\`w-[24px] h-[24px] border-2 cursor-pointer transition-all duration-300 rounded-[${shape}] \${c ? '${reactClass} animate-[${id}-anim_0.5s_forwards]' : 'border-[#555]'}\`}><style>{\`${keyframes}\`}</style></div>; }`;
  } else if (category === 'toggle-switches') {
    html = `<div class="${id}-wrapper"><input type="checkbox" id="${id}" class="hidden-tg"/><label for="${id}" class="tg-lbl"><div class="dot"></div></label></div>`;
    css = `.${id}-wrapper .hidden-tg { display: none; } .${id}-wrapper .tg-lbl { display: block; width: 60px; height: 30px; background: #333; border-radius: 15px; cursor: pointer; position: relative; transition: 0.3s; } .${id}-wrapper .dot { position: absolute; top: 2px; left: 2px; width: 26px; height: 26px; background: #fff; border-radius: 50%; transition: 0.3s; } .${id}-wrapper .hidden-tg:checked + .tg-lbl { ${styleCss} } .${id}-wrapper .hidden-tg:checked + .tg-lbl .dot { left: 32px; animation: ${id}-anim 0.5s forwards; } ${keyframes}`;
    react = `import { useState } from 'react'; export default function Tg() { const [c, setC] = useState(false); return <div onClick={()=>setC(!c)} className={\`w-[60px] h-[30px] rounded-[15px] cursor-pointer relative transition-all duration-300 \${c ? '${reactClass}' : 'bg-[#333]'}\`}><style>{\`${keyframes}\`}</style><div className={\`absolute top-[2px] w-[26px] h-[26px] bg-white rounded-full transition-all duration-300 \${c ? 'left-[32px] animate-[${id}-anim_0.5s_forwards]' : 'left-[2px]'}\`}></div></div>; }`;
  } else if (category === 'cards') {
    html = `<div class="${id}"><h3>Card ${index}</h3><p>Content</p></div>`;
    css = `.${id} { padding: 30px; width: 250px; border-radius: ${shape}; ${styleCss} transition: 0.3s; } .${id}:hover { animation: ${id}-anim 1s infinite; } ${keyframes}`;
    react = `export default function Card() { return <div className="p-[30px] w-[250px] rounded-[${shape}] transition-all duration-300 ${reactClass} hover:animate-[${id}-anim_1s_infinite]"><style>{\`${keyframes}\`}</style><h3 className="font-bold text-xl mb-2">Card ${index}</h3><p>Content</p></div>; }`;
  } else if (category === 'loaders') {
    html = `<div class="${id}"></div>`;
    css = `.${id} { width: 50px; height: 50px; border-radius: ${shape === '0px' ? '50%' : shape}; ${styleCss} animation: ${id}-anim 1.5s infinite linear; } ${keyframes}`;
    react = `export default function Loader() { return <div className="w-[50px] h-[50px] rounded-[${shape === '0px' ? 'full' : shape}] ${reactClass} animate-[${id}-anim_1.5s_infinite_linear]"><style>{\`${keyframes}\`}</style></div>; }`;
  } else if (category === 'inputs') {
    html = `<input type="text" class="${id}" placeholder="Input ${index}" />`;
    css = `.${id} { padding: 15px 20px; width: 250px; border-radius: ${shape}; outline: none; background: #111; border: 1px solid #333; color: #fff; transition: 0.3s; } .${id}:focus { ${styleCss} animation: ${id}-anim 2s infinite; } ${keyframes}`;
    react = `export default function Input() { return <><style>{\`${keyframes}\`}</style><input type="text" placeholder="Input ${index}" className="px-[20px] py-[15px] w-[250px] rounded-[${shape}] outline-none bg-[#111] border border-[#333] text-white transition-all duration-300 focus:animate-[${id}-anim_2s_infinite] focus:${reactClass.replace(/ /g, ' focus:')}" /></>; }`;
  } else if (category === 'radio-buttons') {
    html = `<div class="${id}-wrapper"><input type="radio" name="rad" id="${id}" class="hidden-rad"/><label for="${id}" class="rad-lbl"></label></div>`;
    css = `.${id}-wrapper .hidden-rad { display: none; } .${id}-wrapper .rad-lbl { display: inline-block; width: 20px; height: 20px; border: 2px solid #555; border-radius: 50%; cursor: pointer; position: relative; transition: 0.3s; } .${id}-wrapper .hidden-rad:checked + .rad-lbl { ${styleCss} animation: ${id}-anim 0.5s forwards; } ${keyframes}`;
    react = `import { useState } from 'react'; export default function Rad() { const [c, setC] = useState(false); return <div onClick={()=>setC(!c)} className={\`w-[20px] h-[20px] border-2 rounded-full cursor-pointer relative transition-all duration-300 \${c ? '${reactClass} animate-[${id}-anim_0.5s_forwards]' : 'border-[#555]'}\`}><style>{\`${keyframes}\`}</style></div>; }`;
  } else if (category === 'forms') {
    html = `<form class="${id}"><input placeholder="Email"/><button>Send</button></form>`;
    css = `.${id} { display: flex; flex-direction: column; gap: 15px; padding: 30px; border-radius: ${shape}; ${styleCss} } .${id} input { padding: 10px; background: #000; border: 1px solid #333; color: #fff; border-radius: 5px; } .${id} button { padding: 10px; background: ${c1}; color: #000; font-weight: bold; border: none; border-radius: 5px; cursor: pointer; } .${id}:hover { animation: ${id}-anim 2s infinite; } ${keyframes}`;
    react = `export default function Form() { return <form className="flex flex-col gap-[15px] p-[30px] rounded-[${shape}] ${reactClass} hover:animate-[${id}-anim_2s_infinite]"><style>{\`${keyframes}\`}</style><input placeholder="Email" className="p-[10px] bg-black border border-[#333] text-white rounded-[5px]" /><button className="p-[10px] bg-[${c1}] text-black font-bold border-none rounded-[5px] cursor-pointer">Send</button></form>; }`;
  } else if (category === 'tooltips') {
    html = `<div class="${id}">Hover<span class="tt">Tooltip</span></div>`;
    css = `.${id} { position: relative; display: inline-block; cursor: pointer; padding: 10px 20px; background: #222; border-radius: 5px; } .${id} .tt { visibility: hidden; width: 100px; text-align: center; padding: 5px; position: absolute; z-index: 1; bottom: 125%; left: 50%; margin-left: -50px; opacity: 0; transition: 0.3s; ${styleCss} border-radius: ${shape}; } .${id}:hover .tt { visibility: visible; opacity: 1; animation: ${id}-anim 0.5s forwards; } ${keyframes}`;
    react = `export default function Tooltip() { return <div className="relative inline-block cursor-pointer px-[20px] py-[10px] bg-[#222] rounded-[5px] group"><style>{\`${keyframes}\`}</style>Hover<span className="invisible w-[100px] text-center p-[5px] absolute z-10 bottom-[125%] left-1/2 -ml-[50px] opacity-0 transition-opacity duration-300 rounded-[${shape}] ${reactClass} group-hover:visible group-hover:opacity-100 group-hover:animate-[${id}-anim_0.5s_forwards]">Tooltip</span></div>; }`;
  } else if (category === 'spinners') {
    html = `<div class="${id}"></div>`;
    css = `.${id} { width: 40px; height: 40px; border: 4px solid transparent; border-top-color: ${c1}; border-bottom-color: ${c2}; border-radius: 50%; animation: spin 1s linear infinite; } @keyframes spin { to { transform: rotate(360deg); } }`;
    react = `export default function Spinner() { return <div className="w-[40px] h-[40px] border-4 border-transparent border-t-[${c1}] border-b-[${c2}] rounded-full animate-spin"></div>; }`;
  } else {
    html = `<div class="${id}">Misc ${index}</div>`;
    css = `.${id} { padding: 20px; border-radius: ${shape}; ${styleCss} transition: 0.3s; } .${id}:hover { animation: ${id}-anim 1s infinite; } ${keyframes}`;
    react = `export default function Misc() { return <div className="p-[20px] rounded-[${shape}] transition-all duration-300 ${reactClass} hover:animate-[${id}-anim_1s_infinite]"><style>{\`${keyframes}\`}</style>Misc ${index}</div>; }`;
  }

  components.push({
    id: id,
    name: `${category.slice(0, -1)} ${index} - ${type}`,
    category,
    tags: [type, anim, category.toLowerCase().slice(0, -1)],
    description: `A ${type} ${category.toLowerCase().slice(0, -1)} with ${anim} animation.`,
    html,
    css: baseCss + '\n' + css,
    js: '',
    react,
    createdAt: Date.now(),
    updatedAt: Date.now()
  });
}

const counts = {
  'buttons': 15,
  'checkboxes': 8,
  'toggle-switches': 8,
  'cards': 12,
  'loaders': 12,
  'inputs': 10,
  'radio-buttons': 6,
  'forms': 6,
  'tooltips': 5,
  'spinners': 6,
  'misc': 10
};

Object.entries(counts).forEach(([cat, count]) => {
  for (let i = 1; i <= count; i++) {
    generate(cat, i);
  }
});

// Add some extra to reach 130+
for (let i = 16; i <= 30; i++) generate('buttons', i);
for (let i = 13; i <= 20; i++) generate('cards', i);
for (let i = 13; i <= 20; i++) generate('loaders', i);
for (let i = 11; i <= 15; i++) generate('misc', i);

fs.writeFileSync('data/components.json', JSON.stringify(components, null, 2));
console.log(`Generated ${components.length} components.`);
