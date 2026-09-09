export const dynamic = "force-dynamic";

export async function GET() {
  const now = new Date().toLocaleTimeString("ar-LB");

  const html = `<!doctype html>
<html lang="ar" dir="rtl">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta http-equiv="Cache-Control" content="no-store">
<title>WASSAL AI Agent</title>

<style>
*{box-sizing:border-box}

html,body{
  margin:0;
  padding:0;
  width:100%;
  min-height:100%;
  background:#070b14;
  color:#fff;
  font-family:Arial,Helvetica,sans-serif
}

body{overflow-x:hidden}

.app{
  min-height:100dvh;
  display:flex;
  flex-direction:column
}

header{
  height:70px;
  flex-shrink:0;
  background:#0b101c;
  border-bottom:1px solid #20283a;
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:0 22px
}

.logo{
  font-size:22px;
  font-weight:800
}

.logo span{color:#5684ff}

.online{
  color:#63e4a0;
  font-size:12px
}

.dot{
  display:inline-block;
  width:8px;
  height:8px;
  background:#63e4a0;
  border-radius:50%;
  margin-left:7px
}

main{
  flex:1;
  display:flex;
  min-height:calc(100dvh - 70px)
}

.sidebar{
  width:230px;
  flex-shrink:0;
  background:#090e18;
  border-left:1px solid #20283a;
  padding:18px 12px
}

.nav-title{
  color:#687691;
  font-size:11px;
  margin:8px 10px 12px
}

.nav{
  display:block;
  width:100%;
  padding:12px;
  margin-bottom:5px;
  border-radius:9px;
  color:#aeb8ca;
  text-decoration:none
}

.nav:hover,
.nav.active{
  background:#16233d;
  color:#fff
}

.content{
  flex:1;
  min-width:0;
  padding:25px
}

.hero{
  background:linear-gradient(135deg,#101a30,#0c1220);
  border:1px solid #26344f;
  border-radius:16px;
  padding:25px;
  margin-bottom:18px
}

.hero h1{
  margin:0 0 8px;
  font-size:28px
}

.hero p{
  margin:0;
  color:#9eabc1;
  line-height:1.7
}

.grid{
  display:grid;
  grid-template-columns:1fr 1fr;
  gap:18px
}

.card{
  background:#0d1421;
  border:1px solid #202b40;
  border-radius:14px;
  padding:20px
}

.card h2{
  margin:0 0 14px;
  font-size:17px
}

.status{
  color:#63e4a0;
  font-size:13px
}

.calculator{
  margin-top:18px
}

.calc-input{
  width:100%;
  height:52px;
  background:#080d17;
  color:#fff;
  border:1px solid #293750;
  border-radius:10px;
  padding:0 15px;
  font-size:18px;
  outline:none;
  direction:ltr;
  text-align:left
}

.calc-input:focus{
  border-color:#5684ff
}

.calc-button{
  width:100%;
  height:50px;
  margin-top:10px;
  background:#315fd4;
  color:#fff;
  border:0;
  border-radius:10px;
  font-weight:bold;
  font-size:16px
}

.calc-result{
  margin-top:14px;
  padding:15px;
  background:#080d17;
  border:1px solid #202b40;
  border-radius:10px;
  min-height:52px;
  color:#dce5f5;
  font-size:18px
}

.chat{
  margin-top:18px
}

.messages{
  max-height:330px;
  overflow:auto;
  padding:4px
}

.msg{
  display:flex;
  gap:10px;
  margin-bottom:15px
}

.avatar{
  width:38px;
  height:38px;
  min-width:38px;
  border-radius:11px;
  background:#315fd4;
  display:grid;
  place-items:center;
  font-weight:bold
}

.bubble{
  background:#111827;
  border:1px solid #202b40;
  border-radius:13px;
  padding:11px 14px;
  max-width:700px
}

.bubble p{
  margin:5px 0;
  color:#ccd4e2;
  line-height:1.6
}

.composer{
  display:flex;
  gap:9px;
  margin-top:12px
}

.chat-input{
  flex:1;
  min-width:0;
  height:50px;
  background:#111827;
  border:1px solid #29364e;
  border-radius:10px;
  color:#fff;
  padding:0 15px;
  outline:0
}

.send{
  height:50px;
  background:#315fd4;
  border:0;
  border-radius:10px;
  color:#fff;
  font-weight:bold;
  padding:0 22px
}

.time{
  color:#687691;
  font-size:10px;
  margin-top:12px
}

@media(max-width:850px){
  .sidebar{display:none}
  .content{padding:15px}
  .grid{grid-template-columns:1fr}
  .hero h1{font-size:23px}
}
</style>
</head>

<body>

<div class="app">

<header>
  <div>
    <div class="logo">WASSAL <span>AI</span></div>
    <div style="font-size:10px;color:#69758d;margin-top:3px">
      Agent • ${now}
    </div>
  </div>

  <div class="online">
    <i class="dot"></i> ONLINE
  </div>
</header>

<main>

<aside class="sidebar">
  <div class="nav-title">WASSAL AI</div>

  <a class="nav" href="/">Dashboard</a>
  <a class="nav active" href="/agent">AI Agent</a>
  <a class="nav" href="/control">Control Center</a>
</aside>

<section class="content">

<div class="hero">
  <h1>WASSAL AI Agent</h1>
  <p>
    وكيل ذكاء اصطناعي لتنفيذ المهام والحسابات بسرعة.
  </p>
</div>

<div class="grid">

<div class="card">
  <h2>Agent Status</h2>
  <div class="status">● Agent Online</div>
  <p style="color:#8794aa">
    النظام جاهز لاستقبال الأوامر.
  </p>
</div>

<div class="card">
  <h2>Calculator</h2>

  <div class="calculator">

    <input
      id="calcInput"
      class="calc-input"
      type="text"
      placeholder="مثال: 50 * 1000"
      autocomplete="off"
    >

    <button id="calcButton" class="calc-button">
      احسب
    </button>

    <div id="calcResult" class="calc-result">
      النتيجة تظهر هنا
    </div>

  </div>
</div>

</div>

<div class="card chat">

<h2>Agent Chat</h2>

<div id="messages" class="messages">

<div class="msg">
  <div class="avatar">W</div>

  <div class="bubble">
    <b>WASSAL AI Agent</b>
    <p>مرحبًا 👋 أنا جاهز لتنفيذ المهام والحسابات.</p>
  </div>
</div>

</div>

<div class="composer">

<input
  id="chatInput"
  class="chat-input"
  type="text"
  placeholder="اكتب مهمة أو عملية حسابية..."
  autocomplete="off"
>

<button id="sendButton" class="send">
إرسال
</button>

</div>

<div class="time">
آخر تحميل للصفحة: ${now}
</div>

</div>

</section>
</main>

</div>

<script>
(function(){

  const calcInput = document.getElementById("calcInput");
  const calcButton = document.getElementById("calcButton");
  const calcResult = document.getElementById("calcResult");

  const chatInput = document.getElementById("chatInput");
  const sendButton = document.getElementById("sendButton");
  const messages = document.getElementById("messages");


  function arabicNumbers(text){

    const arabic = "٠١٢٣٤٥٦٧٨٩";
    const persian = "۰۱۲۳۴۵۶۷۸۹";

    return String(text)
      .replace(/[٠-٩]/g, function(ch){
        return arabic.indexOf(ch);
      })
      .replace(/[۰-۹]/g, function(ch){
        return persian.indexOf(ch);
      });
  }


  function calculate(raw){

    let text = arabicNumbers(raw)
      .toLowerCase()
      .trim();

    text = text
      .replace(/،/g, ".")
      .replace(/,/g, ".")
      .replace(/×/g, "*")
      .replace(/÷/g, "/");


    text = text
      .replace(/اضرب/g, "*")
      .replace(/ضرب/g, "*")
      .replace(/في/g, "*")
      .replace(/ب/g, "*")
      .replace(/زائد/g, "+")
      .replace(/جمع/g, "+")
      .replace(/ناقص/g, "-")
      .replace(/طرح/g, "-")
      .replace(/تقسيم/g, "/")
      .replace(/على/g, "/");


    text = text
      .replace(/احسب لي/g, "")
      .replace(/احسب/g, "")
      .replace(/كم يساوي/g, "")
      .replace(/يساوي/g, "")
      .trim();


    if(!/^[0-9+\\-*/().%\\s]+$/.test(text)){
      return "❌ لم أفهم العملية الحسابية";
    }

    try{

      const result = Function(
        '"use strict"; return (' + text + ')'
      )();

      if(!Number.isFinite(result)){
        return "❌ نتيجة غير صالحة";
      }

      return String(result);

    }catch(e){

      return "❌ عملية حسابية غير صحيحة";

    }
  }


  function doCalculate(){

    const value = calcInput.value.trim();

    if(!value){
      calcResult.textContent = "اكتب عملية حسابية أولًا";
      return;
    }

    calcResult.textContent = calculate(value);
  }


  calcButton.addEventListener("click", doCalculate);


  calcInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
      e.preventDefault();
      doCalculate();
    }

  });


  function addMessage(text, user){

    const row = document.createElement("div");
    row.className = "msg";

    const avatar = document.createElement("div");
    avatar.className = "avatar";
    avatar.textContent = user ? "U" : "W";

    const bubble = document.createElement("div");
    bubble.className = "bubble";

    if(!user){

      const title = document.createElement("b");
      title.textContent = "WASSAL AI Agent";
      bubble.appendChild(title);

    }

    const p = document.createElement("p");
    p.textContent = text;

    bubble.appendChild(p);
    row.appendChild(avatar);
    row.appendChild(bubble);

    messages.appendChild(row);

    messages.scrollTop = messages.scrollHeight;
  }


  function send(){

    const text = chatInput.value.trim();

    if(!text) return;

    addMessage(text, true);

    const result = calculate(text);

    if(
      result !== "❌ لم أفهم العملية الحسابية" &&
      result !== "❌ عملية حسابية غير صحيحة" &&
      result !== "❌ نتيجة غير صالحة"
    ){

      addMessage("🧮 النتيجة: " + result, false);

    }else{

      addMessage(
        "🤖 وصلت المهمة إلى WASSAL AI Agent.",
        false
      );

    }

    chatInput.value = "";
    chatInput.focus();
  }


  sendButton.addEventListener("click", send);


  chatInput.addEventListener("keydown", function(e){

    if(e.key === "Enter"){
      e.preventDefault();
      send();
    }

  });

})();
</script>

</body>
</html>`;

  return new Response(html, {
    status: 200,
    headers: {
      "Content-Type": "text/html; charset=utf-8; charset=utf-8",
      "Cache-Control": "no-store, no-cache, must-revalidate, proxy-revalidate",
      "Pragma": "no-cache",
      "Expires": "0",
    }
  });
}
