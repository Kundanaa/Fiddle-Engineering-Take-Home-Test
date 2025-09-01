// client/src/utils/api.ts
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8787/api", // 👈 server endpoint
});

export async function changeTone(text: string, row: number, col: number) {
  const resp = await api.post("/tone", { text, row, col });
  return resp.data.text;
}

// export interface ToneChangeRequest {
//   text: string;
//   tone: { x: number; y: number }; // represents position in 3x3 matrix
// }

// // client/src/utils/api.ts

// export async function changeTone(text: string, x: number, y: number): Promise<string> {
//   try {
//     const response = await fetch("http://localhost:8787/api/change-tone", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ text, tone: { x, y } }),
//     });

//     if (!response.ok) {
//       throw new Error(`API error: ${response.statusText}`);
//     }

//     const data = await response.json();
//     return data.text; // backend returns { text: "transformed_text" }
//   } catch (err: any) {
//     console.error("Tone change failed:", err.message);
//     throw err;
//   }
// }

