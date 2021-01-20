export interface Character {
  id: number;
  name: string;
  weekly: QuestStatus;
  blinding: QuestStatus;
  aurelianCoast: QuestStatus;
  sanctusSeru: QuestStatus;
  fordelMidst: QuestStatus;
  wracklands: QuestStatus;
  hallowedHalls: QuestStatus;
  bolChallenge: QuestStatus;
  answerTheCall: QuestStatus;
  volcanicThreats: QuestStatus;
  theFireWithin: QuestStatus;
  windingDescent: QuestStatus;
  indispensableComponents: QuestStatus;
  formulaForSuccess: QuestStatus;
}

export interface QuestStatus {
  text?: string;
  status: 'in-progress' | 'complete' | 'not-started' | 'unknown';
}
