import { Ai } from './vendor/@cloudflare/ai.js';

async function handleOptionsRequest(ai, inp) {
    const chatInputs = {
        messages: [
            { role: "system", content: "You are a artistic assistant." },
            {
                role: "user",
                content: `Generate 4 random title for image related to ${inp}.
           Give the response as json with key as title1, title2 title3 and title4 example title0: A cat with skirt`
            },
        ]
    };

    let chatResponse = await ai.run('@cf/meta/llama-2-7b-chat-int8', chatInputs);

    if (chatResponse && chatResponse.response) {
        return Response.json({
            text: chatResponse.response
        }, {
          headers: {
              'content-type': 'application/json',
              "Access-Control-Allow-Origin": "http://localhost:5173",
              "Access-Control-Allow-Methods": "GET",
          }
      })
    }

    return new Response('Error in generating options', { status: 500 });
}

const handleImageRequest = async (ai, imagePrompt) => {
    const inputs = {
        prompt: imagePrompt
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

export default {
    async fetch(request, env) {
        const ai = new Ai(env.AI);

        if (request.method === 'GET') {
            let inp = 'life';
            let imagePrompt = 'Boy singing'
            const url = new URL(request.url);

            const optionsQuery = url.searchParams.get('query');
            if (optionsQuery) {
                inp = optionsQuery;
            }

            const imageQuery = url.searchParams.get('title');
            if(imageQuery){
                imagePrompt = imageQuery;
            }

            const endpoint = url.pathname;
            switch (endpoint) {
                case '/options':
                    return handleOptionsRequest(ai, inp);
                case '/image':
                    return handleImageRequest(ai, imagePrompt);
                default:
                    return new Response('Endpoint Not Found', { status: 404 });
            }
        }

        return new Response('Request Not Valid', { status: 404 });
    }
};
