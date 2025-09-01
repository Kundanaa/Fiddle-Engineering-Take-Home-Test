import axios from "axios";

const API_BASE = process.env.REACT_APP_API_URL || "http://localhost:5000";

export async function changeTone(text: string, toneX: number, toneY: number): Promise<string> {
  const res = await axios.post(`${API_BASE}/api/tone`, { text, toneX, toneY });
  return res.data.text;
}
