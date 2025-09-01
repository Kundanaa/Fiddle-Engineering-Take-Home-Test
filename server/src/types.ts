export interface ToneRequest {
text: string;
// 3x3 grid coordinates (0,0) top-left; (2,2) bottom-right
row: number; // 0..2 (formality axis: 0=formal → 2=casual)
col: number; // 0..2 (warmth axis: 0=neutral → 2=warm/friendly)
}


export interface ToneResponse {
ok: boolean;
text?: string;
cached?: boolean;
error?: string;
}