const enc = (str,key)=>[...str.toUpperCase()].map(c=>{
    const code = c.charCodeAt(0) - 65;
    if(code < 0 || code > 25) return c;
    return String.fromCharCode(((code + key) % 26)+65);
     
}).join('');


const dec = (str,key)=>enc(str,(26-key));


const checkProbScore = str=>{

    const filteredStr = [...str.toUpperCase()].filter(c=>c.charCodeAt(0) >= 65 && c.charCodeAt(0) <= 65+26).join('')
    const strProbs = (new Array(26)).fill().map((a,i)=>{
       return ([...filteredStr].filter(c=>c.charCodeAt(0) === i+65).length) /filteredStr.length;
    });
    return strProbs.reduce((acc,curr,i)=>acc + (curr * probs[i]),0)
}

const doBruteForce = cipherText=>{
    const computed = (new Array(26)).fill().map((a,i)=>dec(cipherText,i)).map((s,i)=>({score:checkProbScore(s),key:i}))
    return dec(cipherText,computed.sort((a,b)=>(Math.abs(desired-a.score))-Math.abs(desired-b.score))[0].key)
}


const probs = [8.2, 1.5, 2.8, 4.3, 12.7, 2.2, 2.0, 6.1, 7.0, 0.2, 0.8, 4.0, 2.4, 6.7, 1.5, 1.9, 0.1, 6.0, 6.3, 9.1, 2.8, 1.0, 2.4, 0.2, 2.0, 0.1].map(a=>a/100)
const desired = 0.06;

const doCrack = ()=>{
	const cipherText = document.getElementById('cipherText').value;
	const plainText = doBruteForce(cipherText);
	document.getElementById('cipherText').value = plainText;
}
