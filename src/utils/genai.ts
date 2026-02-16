// src/utils/genai.ts
import { GoogleGenAI } from '@google/genai';

const genAI = new GoogleGenAI({
  apiKey: process.env.REACT_APP_GOOGLE_API_KEY || "AIzaSyAPCr2YB4PdVLmMb0LhocHJDiYoMKtv2Tg",
});

export default genAI;
