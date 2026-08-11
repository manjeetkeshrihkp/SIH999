const GEMINI_API_KEY = 'AQ.Ab8RN6KNk4MqIspOVW1d_BvQOp0mQAZqhs9m53RTbvvMtN8Zkw';
const prompt = 'test';
fetch(https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=\, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
})
.then(res => res.json())
.then(data => console.log(JSON.stringify(data, null, 2)))
.catch(err => console.error(err));
