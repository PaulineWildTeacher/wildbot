import { apiKey } from "./../constants/apiKey";

const headers = {
    "Authorization": `Bearer ${apiKey}`,
    "Content-Type": "application/json"
};

const chatgptUrl = "https://api.openai.com/v1/chat/completions";
const dalleUrl = "https://api.openai.com/v1/images/generations";


export const apiCallFunction = (prompt, messages) => {
    return fetch(chatgptUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages: [
                {
                    role: 'user',
                    content: `Does this message want to generate an AI picture, image, art or anything similar? ${prompt} . Simply answer with a yes or no.`
                }
            ]
        })
    })
    .then(response => response.json())
    .then(data => {
        // console.log('data', data?.choices[0])

        let isArt = data?.choices[0]?.message?.content;
        isArt = isArt.trim();

        if (isArt.toLowerCase().includes('yes')) {
            // console.log('dall e api call')
            return dallEApiCall(prompt, messages || [])
        } else {
            // console.log('chat gpt api call');
            return chatGptApiCall(prompt, messages || [])
        }
    })
    .catch(err => {
        // console.log('error', err);
        return {success: false, msg: err.message}
    })
}

const chatGptApiCall = (prompt, messages) => {
    return fetch(chatgptUrl, {
        method: 'POST', 
        headers: headers, 
        body: JSON.stringify({
            model: "gpt-3.5-turbo",
            messages
        })
    })
    .then(response => response.json())
    .then(data => {
        let answer = data?.choices[0]?.message?.content;
        messages.push({role: "assistant", content: answer.trim()});
        console.log('got chat GPT response', answer);
        return {success: true, data: messages}
    })
}

const dallEApiCall = (prompt, messages) => {
    return fetch(dalleUrl, {
        method: 'POST',
        headers: headers,
        body: JSON.stringify({
            prompt, 
            n: 1,
            size: "512x512"
        })
    })
    .then(response => response.json())
    .then(data => {
        let url = data?.data[0]?.url;
        console.log("URL", url)
        messages.push({role: "assistant", content: url});
        return {success: true, data: messages}
    })
    .catch(err => {
        // console.log('error', err);
        return {success: false, msg: err.message}
    })
}
