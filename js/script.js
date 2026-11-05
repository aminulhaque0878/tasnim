// Menu
var burger=document.querySelector('.burger'),menu=document.getElementById('menu');
function setMenu(o){menu.classList.toggle('open',o);burger.setAttribute('aria-expanded',o);burger.setAttribute('aria-label',o?'মেনু বন্ধ করুন':'মেনু খুলুন')}
burger.onclick=function(){setMenu(!menu.classList.contains('open'))};
menu.addEventListener('click',function(e){if(e.target.tagName==='A')setMenu(false)});

// Slider
var track=document.getElementById('track'),n=track.children.length,i=0,dots=document.getElementById('dots'),timer;
for(var k=0;k<n;k++){(function(k){var b=document.createElement('button');b.setAttribute('aria-label','স্লাইড '+bd(k+1)+' দেখুন');b.onclick=function(){go(k);restart()};dots.appendChild(b)})(k)}
function go(x){i=(x+n)%n;track.style.transform='translateX(-'+i*100+'%)';[].forEach.call(dots.children,function(d,j){d.setAttribute('aria-current',j===i)})}
function restart(){clearInterval(timer);if(!matchMedia('(prefers-reduced-motion:reduce)').matches)timer=setInterval(function(){go(i+1)},4500)}
document.querySelector('.prev').onclick=function(){go(i-1);restart()};
document.querySelector('.next').onclick=function(){go(i+1);restart()};
var sx=null;track.addEventListener('touchstart',function(e){sx=e.touches[0].clientX},{passive:true});
track.addEventListener('touchend',function(e){if(sx===null)return;var d=e.changedTouches[0].clientX-sx;if(Math.abs(d)>40){go(i+(d<0?1:-1));restart()}sx=null});
go(0);restart();

// Gallery
var items=[['images/gallery/smiling-stairs.jpg','সিঁড়ির পাশে হাসিমুখ'],['images/gallery/south-point-wall.jpg','সাউথ পয়েন্টের দেয়ালের সামনে'],['images/gallery/cap-uniform.jpg','ক্যাপ পরে স্কুলের সাজ'],['images/gallery/penguin-pink-dress.jpg','পেঙ্গুইয়ের পাশে গোলাপি পোশাকে'],['images/gallery/hands-together.jpg','বন্ধুদের সাথে হাতে হাত'],['images/gallery/red-hearts.jpg','গালে আর হাতে লাল ছাপ'],['images/gallery/two-friends.jpg','দুই বন্ধু'],['images/gallery/gift-bag.jpg','উপহার হাতে'],['images/gallery/last-class-gifts.jpg','শেষ ক্লাসের উপহার'],['images/gallery/class-gifts.jpg','ক্লাসে সবার হাতে উপহার'],['images/gallery/classroom-friends.jpg','ক্লাসরুমে বন্ধুরা']];
var gal=document.getElementById('gal'),lb=document.getElementById('lb');
var lastFocus=null;
function openLb(src,cap){lastFocus=document.activeElement;var pic=document.getElementById('lbpic');pic.textContent='';var im=document.createElement('img');im.src=src;im.alt=cap;pic.appendChild(im);document.getElementById('lbcap').textContent=cap;lb.classList.add('on');document.getElementById('lbx').focus()}
function closeLb(){lb.classList.remove('on');if(lastFocus&&lastFocus.focus)lastFocus.focus()}
function add(src,cap){var b=document.createElement('button');b.type='button';b.className='tile';b.setAttribute('aria-label',cap+' বড় করে দেখুন');var im=document.createElement('img');im.src=src;im.alt=cap;im.loading='lazy';var c=document.createElement('span');c.className='tcap';c.textContent=cap;b.appendChild(im);b.appendChild(c);b.onclick=function(){openLb(src,cap)};gal.appendChild(b)}
items.forEach(function(x){add(x[0],x[1])});
document.getElementById('up').onchange=function(e){[].forEach.call(e.target.files,function(file){add(URL.createObjectURL(file),'আমার ছবি')})};
document.querySelector('label[for=up]').onkeydown=function(e){if(e.key==='Enter'||e.key===' '){e.preventDefault();document.getElementById('up').click()}};
document.getElementById('lbx').onclick=closeLb;
lb.onclick=function(e){if(e.target===lb)closeLb()};
document.addEventListener('keydown',function(e){if(e.key==='Escape'){closeLb();setMenu(false)}});

// Date and clock (Dhaka time)
var TZ='Asia/Dhaka',HIJRI_OFFSET=0,BM=['বৈশাখ','জ্যৈষ্ঠ','আষাঢ়','শ্রাবণ','ভাদ্র','আশ্বিন','কার্তিক','অগ্রহায়ণ','পৌষ','মাঘ','ফাল্গুন','চৈত্র'],HM=['মুহাররম','সফর','রবিউল আউয়াল','রবিউস সানি','জমাদিউল আউয়াল','জমাদিউস সানি','রজব','শাবান','রমজান','শাওয়াল','জিলকদ','জিলহজ'];
function bd(n){return n.toLocaleString('bn-BD',{useGrouping:false})}
function t2(n){return n.toLocaleString('bn-BD',{minimumIntegerDigits:2,useGrouping:false})}
function banglaDate(y,m,d){var sy=(m>4||(m===4&&d>=14))?y:y-1,off=Math.round((Date.UTC(y,m-1,d)-Date.UTC(sy,3,14))/864e5),ny=sy+1,leap=(ny%4===0&&ny%100!==0)||ny%400===0,L=[31,31,31,31,31,30,30,30,30,30,leap?30:29,30],mi=0;while(mi<11&&off>=L[mi]){off-=L[mi];mi++}return bd(off+1)+' '+BM[mi]+', '+bd(sy-593)+' বঙ্গাব্দ'}
function period(h){return h<4?'রাত':h<6?'ভোর':h<12?'সকাল':h<15?'দুপুর':h<18?'বিকেল':h<20?'সন্ধ্যা':'রাত'}
(function(){var NS='http://www.w3.org/2000/svg',g=document.getElementById('dial');for(var i=1;i<=12;i++){var a=i*Math.PI/6,s=Math.sin(a),c=-Math.cos(a);var l=document.createElementNS(NS,'line');l.setAttribute('class','tk');l.setAttribute('x1',100+s*78);l.setAttribute('y1',100+c*78);l.setAttribute('x2',100+s*84);l.setAttribute('y2',100+c*84);g.appendChild(l);var t=document.createElementNS(NS,'text');t.setAttribute('class','num');t.setAttribute('x',100+s*62);t.setAttribute('y',100+c*62);t.textContent=bd(i);g.appendChild(t)}})();
function tick(){try{var now=new Date(),p={};new Intl.DateTimeFormat('en-GB',{timeZone:TZ,year:'numeric',month:'numeric',day:'numeric',hour:'numeric',minute:'numeric',second:'numeric',hour12:false}).formatToParts(now).forEach(function(x){p[x.type]=+x.value});
var hr=p.hour%24,wd=now.toLocaleDateString('bn-BD',{timeZone:TZ,weekday:'long'}),mon=now.toLocaleDateString('bn-BD',{timeZone:TZ,month:'long'});
document.getElementById('bn').textContent=banglaDate(p.year,p.month,p.day);
var q={};new Intl.DateTimeFormat('en-u-ca-islamic-umalqura',{timeZone:TZ,day:'numeric',month:'numeric',year:'numeric'}).formatToParts(new Date(now.getTime()+HIJRI_OFFSET*864e5)).forEach(function(x){q[x.type]=parseInt(x.value,10)});
document.getElementById('ar').textContent=bd(q.day)+' '+HM[q.month-1]+', '+bd(q.year)+' হিজরি';
document.getElementById('en').textContent=wd+', '+bd(p.day)+' '+mon+', '+bd(p.year)+' খ্রিস্টাব্দ';
document.getElementById('dig').textContent=period(hr)+' '+t2(hr%12||12)+':'+t2(p.minute)+':'+t2(p.second);
function r(id,a){document.getElementById(id).setAttribute('transform','rotate('+a+' 100 100)')}
r('ss',p.second*6);r('mm',p.minute*6+p.second*.1);r('hh',(hr%12)*30+p.minute*.5)}catch(e){}}
tick();setInterval(tick,1000);
