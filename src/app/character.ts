export interface Character {
	id: number;
	name: string;
	blinding: QuestStatus;
	aurelianCoast: QuestStatus;
	sanctusSeru: QuestStatus;
	fordelMidst: QuestStatus;
	wracklands: QuestStatus;
	hallowedHalls: QuestStatus;
}

export interface QuestStatus {
	icon?: string;
	color?: string;
	tooltip: string;
}