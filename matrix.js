(function(window,factory){if(typeof define==="function"&&define.amd){define(factory)}else{if(typeof module==="object"&&module.exports){module.exports=factory()}else{window.martrix=factory()}}}(typeof window!=="undefined"?window:this,function(){var martrix=function(selector,userOptions){var options={cW:1368,cH:600,wordColor:"#33ff33",fontSize:16,speed:0.13,words:"0123456789qwertyuiopasdfghjklzxcvbnm,./;'[]QWERTYUIOP{}ASDFGHJHJKL:ZXCVBBNM<>?"};var canvas,ctx,W,H,clumns,wordsArr,drops=[];var mergeOptions=function(userOptions,options){Object.keys(userOptions).forEach(function(key){options[key]=userOptions[key]})};var draw=function(){ctx.save();ctx.fillStyle=options.wordColor;ctx.font=options.fontSize+"px arial";ctx.fontWeight=options.fontWeight;for(var i=0;i<drops.length;i++){var text=wordsArr[Math.floor(Math.random()*wordsArr.length)];ctx.fillText(text,i*options.fontSize,drops[i]*options.fontSize);if(drops[i]*options.fontSize>H&&Math.random()>0.98){drops[i]=0}drops[i]++}ctx.restore()};var initSetup=function(selector,userOptions){mergeOptions(userOptions,options);canvas=document.getElementById(selector);ctx=canvas.getContext("2d");canvas.height=H=options.cH;canvas.width=W=options.cW;clumns=options.cW/options.fontSize;wordsArr=options.words.split("");for(var i=0;i<clumns;i++){drops[i]=1}(function drawFrame(){window.requestAnimationFrame(drawFrame);ctx.fillStyle="rgba(0,0,0,"+options.speed+")";ctx.fillRect(0,0,W,H);draw()}())};initSetup(selector,userOptions)};return martrix}));


//instance
 martrix('matrix', {
           cW: 2000,
           cH: 700,
           wordColor: '#00FF41',
           fontSize: 15,
           speed: 0.13,
});
    