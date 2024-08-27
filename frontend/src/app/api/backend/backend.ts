import { z } from 'zod';

import client from './client';

const getStructuredAnswerRes = z.object({
  text: z.string(),
  additional_context: z.any(),
});

export async function getStructuredAnswer(
  persona: string,
  question: string,
  email:string
) {
  
  const { data } = await client.post('/chat', {
    persona,
    question,
    email
    // history
    
  });
  
  return getStructuredAnswerRes.parse(data);
}

export async function restartChat(email: string) {
  console.log(`in backend: restartChat() with email ${email}`)
  const { data } = await client.post('/restartchat', {email});
  return getStructuredAnswerRes.parse(data);
}

const speechToTextRes = z.object({
  text: z.string(),
});