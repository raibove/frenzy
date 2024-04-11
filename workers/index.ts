import { Ai } from './vendor/@cloudflare/ai.js';


function extractTitles(input) {
  // Define a regular expression pattern to match the title values
  const pattern = /"title\d+":\s*"([^"]+)"/g;
  const titles: string[] = [];
  let match;

  // Loop through all matches of the pattern
  while ((match = pattern.exec(input)) !== null) {
     if(match && match.length>=1)
      titles.push(match[1] as string);
  }
  console.log('<< titles', titles)
  return titles;
}

function selectRandomTitle(titles) {
  const randomIndex = Math.floor(Math.random() * titles.length);
  return titles[randomIndex];
}

export default {
  async fetch(request, env) {
    const ai = new Ai(env.AI);
    let inp = 'cyberpunk cat';
    if (request.method === 'GET') {
      // Check if there's a message query parameter to display the AI response
      const url = new URL(request.url);
      const userMessage = url.searchParams.get('query');
      if(userMessage){
        inp = userMessage
      }
       }
    // const requestBody = await request.json();
    // console.log(requestBody)

    const chatInputs = {
      messages: [
      { role: "system", content: "You are a artistic assistant." },
      {
        role: "user",
        content: `Generate 4 random title for image related to life.
         Give the response as json with key as title1, title2 title3 and title4 example title0: A cat with skirt`
      },
    ]};
    
    let chatResponse = await ai.run('@cf/meta/llama-2-7b-chat-int8', chatInputs);
    console.log(chatResponse)
    const titles = extractTitles(chatResponse.response)
    console.log(titles)

    const randomTitle = selectRandomTitle(titles)
    console.log(randomTitle)
    const inputs = {
      prompt: randomTitle
    };

    const response = await ai.run(
      '@cf/stabilityai/stable-diffusion-xl-base-1.0',
      inputs
    );

    return new Response(response, {
      headers: {
        'content-type': 'image/png',
           "Access-Control-Allow-Origin": "http://localhost:5173",
            "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
           
      }
    });
  }
};
