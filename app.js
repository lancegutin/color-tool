
// console.log("id: " + id);
// console.log("sColor: " + sColor);
// console.log(elem);



function rgbToHex(R,G,B) { return toHex(R)+toHex(G)+toHex(B); }
function toHex(n) {
 n = parseInt(n,10);
 if (isNaN(n)) return "00";
 n = Math.max(0,Math.min(n,255));
 return "0123456789ABCDEF".charAt((n-n%16)/16)
      + "0123456789ABCDEF".charAt(n%16);
}

function cutHex(h) { return (h.charAt(0)=="#") ? h.substring(1,7) : h}
function hexToR(h) { return parseInt((cutHex(h)).substring(0,2),16) }
function hexToG(h) { return parseInt((cutHex(h)).substring(2,4),16) }
function hexToB(h) { return parseInt((cutHex(h)).substring(4,6),16) }

function setBgColorById(id,sColor) {
	var elem;
	elem=document.getElementById(id);
	elem.style.backgroundColor="#"+sColor;
	console.log("sColor: " + sColor);
	console.log("sNewColor: " + sNewColor);
	console.log("something: " + b.value);
}

function syncR(){
	g.value = r.value;
	b.value = r.value;
}

function syncG(){
	b.value = g.value;
	r.value = g.value;
}

function syncB(){
	g.value = b.value;
	r.value = b.value;
}

function syncR2(){
	g2.value = r2.value;
	b2.value = r2.value;
}

function syncG2(){
	b2.value = g2.value;
	r2.value = g2.value;
}

function syncB2(){
	g2.value = b2.value;
	r2.value = b2.value;
}

function calculate(){
	var add = Number(r.value) + Number(r2.value);
	console.log("add: " + add);
}

