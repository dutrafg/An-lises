/* EF77: equações originais puras; toda a interface gráfica foi removida. */
'use strict';
const log10=Math.log10||((x)=>Math.log(x)/Math.LN10);
const calculators={
  navy:function(sexo,h,pesc,cint,quad){
    if(!(h>0&&pesc>0&&cint>0))return null;var r;
    if(sexo==='F'){if(!(quad>0)||cint+quad-pesc<=0)return null;r=495/(1.29579-0.35004*log10(cint+quad-pesc)+0.221*log10(h))-450}
    else{if(cint-pesc<=0)return null;r=495/(1.0324-0.19077*log10(cint-pesc)+0.15456*log10(h))-450}
    return isFinite(r)&&r>=2&&r<=60?r:null},
  rfm:function(sexo,h,cint){if(!(h>0&&cint>0))return null;var raw=(sexo==='F'?76:64)-20*(h/cint);return Number.isFinite(raw)&&raw>=2&&raw<=60?raw:null},
  whtr:function(h,cint){return h>0&&cint>0?cint/h:null},
  bri:function(h,cint){if(!(h>0&&cint>0))return null;var a=(cint/100)/(2*Math.PI),b=0.5*(h/100);if(a>=b)return null;return 364.2-365.5*Math.sqrt(1-(a*a)/(b*b))},
  absi:function(h,peso,cint){if(!(h>0&&peso>0&&cint>0))return null;var hm=h/100,bmi=peso/(hm*hm);return(cint/100)/(Math.pow(bmi,2/3)*Math.sqrt(hm))},
  ffmi:function(h,peso,pg){if(!(h>0&&peso>0&&pg>0&&pg<100))return null;var hm=h/100,ffm=peso*(1-pg/100),v=ffm/(hm*hm);return{ffm:ffm,ffmi:v,norm:v+6.1*(1.8-hm)}},
  mifflin:function(sexo,peso,h,idade){if(!(peso>0&&h>0&&idade>0))return null;return 10*peso+6.25*h-5*idade+(sexo==='F'?-161:5)},
  harris:function(sexo,peso,h,idade){if(!(peso>0&&h>0&&idade>0))return null;return sexo==='F'?(447.593+9.247*peso+3.098*h-4.330*idade):(88.362+13.397*peso+4.799*h-5.677*idade)},
  harris1919:function(sexo,peso,h,idade){if(!(peso>0&&h>0&&idade>0))return null;return sexo==='F'?(655.0955+9.5634*peso+1.8496*h-4.6756*idade):(66.4730+13.7516*peso+5.0033*h-6.7550*idade)},
  act:function(sexo,peso,h,idade){if(!(peso>0&&h>0&&idade>0))return null;var v=sexo==='F'?(-2.097+0.1069*h+0.2466*peso):(2.447-0.09516*idade+0.1074*h+0.3362*peso);return isFinite(v)&&v>0?v:null},
  rcq:function(cint,quad){return(cint>0&&quad>0)?(cint/quad):null},
  katch:function(ffm){return ffm>0?370+21.6*ffm:null},
  fcmax:function(idade){return idade>0?208-0.7*idade:null},
  meta:function(peso,pg,alvo){if(!(peso>0&&pg>0&&alvo>0&&alvo<pg))return null;var mm=peso*(1-pg/100),pa=mm/(1-alvo/100);return{pesoAlvo:pa,delta:peso-pa,gorduraPerder:peso*pg/100-pa*alvo/100}}
};
module.exports=Object.freeze(calculators);
