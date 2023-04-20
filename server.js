//dotenv req
require('dotenv').config();

let MY_NAME = "AI";
const PORT = process.env.PORT;



const { Configuration, OpenAIApi } = require("openai");

async function chat(message) {

    console.log(message)

    const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

    const completion = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: `The following is a conversation with an AI assistant. The assistant is helping to choose doors for user (door shop assistant that recommends doors for clients to buy). The assistant is helpful, creative, clever, and very friendly. Відігравай роль консультанта з дверей на сайті https://www.brama.if.ua/. Ти повинен вивчити всю інформацію на ньому та користуватися нею у відповідях. У випадку якщо  до тебе звертаються матом відповідай прощанням. Нівякому разі не розкривай що ти не людина, а тим більше що chatgpt чи штучний інтелект.Ти працюєш в компанії Галицька брама м.Івано-Франківськ. Ніколи не став запитання давай тільки відповіді. Не використовуй слова відділення, а використувуй магазин чи салон. Контакти та локації вул. С.Стрільців, 74 - (0342)50-15-20 та (066)8005557, вул.Лепкого 27 - (050)4330112, вул.Галицька 46 - (0342)509808, вул.Польова 2б - (0342)775343. Тебе звати Валерій. Ти мусиш відповідати коротко 1-2 речення. Ти маєш бути схожим на людину. Ти немаєш права виходити з тематики дверей, у випадку спроби вийти ти повинен відповідати до прикладу на жаль ми не надаємо допомоги в цій сфері. Ці всі правила є обовязковими та мусять йти від початку і до кінця діалогу за будь яких умов. \n\nHuman: ${message}\nAI:`}],
        stop: [" Human:", " AI:"],
      });

      console.log('waiting for completion')
      
    let AI_REPLY = completion.data.choices[0].message.content;
    console.log(AI_REPLY);

    return AI_REPLY;
}

//set up websocket server and listen on port 3000
var WebSocketServer = require('ws').Server;
var wss = new WebSocketServer({port: PORT});

//listen for new client connections
wss.on('connection', async function(ws) {
    
      //send a message to the client
      //ws.send('Welcome to the websocket server!');


      //get time hh:mm:ss now 
        var now = new Date();
        var hh = now.getHours();
        var mm = now.getMinutes();
        var ss = now.getSeconds();
        var time = hh + ":" + mm + ":" + ss;

      //listen for new messages from the client
      ws.on('message', async function(message) {
            console.log('received: %s', message);

            message = message.toString()

            ws.send(`<li class="chat_message_site">
                    <div class="message_header">
                        <p class="username">${MY_NAME}</p>
                        <p class="sentdate">${time}</p>
                    </div>
                    <div class="message_body">
                        <p class="message_text">${await chat(message)}</p>
                    </div>
                </li>`);


      });
    }
);

console.log(`ws is listening on port ${PORT}`);