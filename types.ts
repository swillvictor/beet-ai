
export interface ScriptData {
  companyName: string;
  productDescription: string;
  sellingPoints: string;
  targetAudience: string;
  callToAction: string;
  tagline: string;
  duration: string;
}

export type ScriptLineType = 'NARRATOR' | 'MUSIC' | 'SFX';

export interface ScriptLine {
  type: ScriptLineType;
  content: string;
}

export interface GeneratedScript {
  title: string;
  script: ScriptLine[];
}
