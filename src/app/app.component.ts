import { Component, EnvironmentInjector, OnInit } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import type { QuestStatusRouteData } from './quest-status-page/quest-status.page';

export const ROUTES: Routes = [
  { path: '', redirectTo: 'settings', pathMatch: 'full' },
  {
    path: 'adornments',
    loadComponent: () => import('./adornments/adornments.page'),
  },
  {
    path: 'blood-of-luclin',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Blood of Luclin',
      query: {
        'Ley of the Land': {
          'The Blinding': { type: 'quest', id: 2233296293 },
          'Aurelian Coast': { type: 'quest', id: 471086111 },
          'Sanctus Seru': { type: 'quest', id: 1796408457 },
          'Fordel Midst': { type: 'quest', id: 4118253866 },
          Wracklands: { type: 'quest', id: 2188419516 },
          'Hallowed Halls': { type: 'quest', id: 460976134 },
          Challenge: { type: 'quest', id: 1820246160 },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'boz-flawless',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Ballads of Zimara Flawless',
      query: {
        'Vaashkaani, Alcazar of Zimara: Chromatic Chamber': {
          'Chromon, Titan of Colors (T1)': {
            type: 'achievement',
            id: 3147450800,
          },
          'Krayte, Titan of Colors (T1)': {
            type: 'achievement',
            id: 2329210861,
          },
          'Aurous the Judged (T1)': { type: 'achievement', id: 333811466 },
        },
        'Zimara Breadth: Crested Expanse': {
          'Chohnki (T2)': { type: 'achievement', id: 3885879144 },
          'Chohnkasaurus (T2)': { type: 'achievement', id: 1033257332 },
          'Chohnkanon (T3)': { type: 'achievement', id: 951427459 },
        },
        'Aether Wroughtlands: The Delves': {
          'Mezkhuur (T2)': { type: 'achievement', id: 2593562561 },
          "Tuer'el of the Delves (T2)": { type: 'achievement', id: 3663359251 },
          'Rouk the Lustrous (T3)': { type: 'achievement', id: 668371720 },
          'Rouk the Ironclad (T3)': { type: 'achievement', id: 329352271 },
          "Feri'tal the Immesurableb (T4)": {
            type: 'achievement',
            id: 297406013,
          },
        },
        'Vaashkaani, Alcazar of Zimara: Sovereign Summons': {
          'Galeistria the Polished (T2)': {
            type: 'achievement',
            id: 2966400657,
          },
          'Chaltieu, Mirrored Sentry (T3)': {
            type: 'achievement',
            id: 3207553441,
          },
          'Ikal-tam the Pensive (T3)': {
            type: 'achievement',
            id: 1029353763,
          },
          "Sti'Vyrn the Persecutor (T4)": {
            type: 'achievement',
            id: 503863540,
          },
          'Zakir-Sar-Ussur (T5)': { type: 'achievement', id: 2976812362 },
          'Monstrous Azure-Leafed Maneater (T3)': {
            type: 'achievement',
            id: 425573603,
          },
          'Monstrous Crimson-Leafed Maneater (T3)': {
            type: 'achievement',
            id: 497577182,
          },
          'Monstrous Emerald-Leafed Maneater (T3)': {
            type: 'achievement',
            id: 4067035104,
          },
          'Monstrous Indigo-Leafed Maneater (T3)': {
            type: 'achievement',
            id: 4285822887,
          },
          'Smee the Iron Sprite (T3)': { type: 'achievement', id: 3781809254 },
          'Smol the Golden Sprite (T3)': { type: 'achievement', id: 377858165 },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'planes-of-prophecy',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Planes of Prophecy Flawless',
      query: {
        'Plane of Innovation: The Wasteyards': {
          'Manaetic Prototype IX (T1)': { type: 'achievement', id: 1907461613 },
          'Manaetic Prototype XI (T1)': { type: 'achievement', id: 2902072953 },
          'Tin Overseer Alpha (T1)': { type: 'achievement', id: 1678272255 },
          'Tin Overseer Omega (T1)': { type: 'achievement', id: 995556385 },
          'Karnah of the Source (T2)': { type: 'achievement', id: 2398832940 },
          'Construct Automaton (T2)': { type: 'achievement', id: 647369654 },
          'Gearbox the Energy Siphon (T2)': {
            type: 'achievement',
            id: 858460839,
          },
          'The Junk Beast (T2)': { type: 'achievement', id: 2737087936 },
          'Meldrath the Mechanized (T2)': {
            type: 'achievement',
            id: 2520638812,
          },
          'Meldrath the Malignant (T3)': {
            type: 'achievement',
            id: 1396195631,
          },
          'Junkyard Mawg (T3)': { type: 'achievement', id: 1229123830 },
          'Operator Figl (T3)': { type: 'achievement', id: 3426269162 },
          'The Manaetic Behemoth (T4)': { type: 'achievement', id: 611942787 },
        },
        'Plane of Disease: Virulent Insurrection': {
          'Dysperitia (T1)': { type: 'achievement', id: 1410201382 },
          'Resnake and Rythrak (T1)': { type: 'achievement', id: 891901180 },
          'Rankle (T1)': { type: 'achievement', id: 3993512186 },
          'Plaguen the Piper (T2)': { type: 'achievement', id: 553409976 },
          'Corpulus (T2)': { type: 'achievement', id: 1540902217 },
          'Wretch (T2)': { type: 'achievement', id: 1854689738 },
          'Nightlure the Fleshfeaster (T3)': {
            type: 'achievement',
            id: 290033981,
          },
          'Pox (T3)': { type: 'achievement', id: 1993720173 },
          'Grummus (T3)': { type: 'achievement', id: 2412770847 },
          "Skal'sli the Wretched (T3)": { type: 'achievement', id: 3044659179 },
          'Bertoxxulous (T4)': { type: 'achievement', id: 1107945888 },
        },
        'Torden, Bastion of Thunder: Storm Surge': {
          'Valbrand and Thanbrand (T1)': {
            type: 'achievement',
            id: 3893474000,
          },
          'Wybjorn (T1)': { type: 'achievement', id: 4168784669 },
          'Eindride Icestorm (T2)': { type: 'achievement', id: 3032312480 },
          'Thunderclap and Skyfury (T2)': {
            type: 'achievement',
            id: 3543709875,
          },
          'Erech Eyford (T2)': { type: 'achievement', id: 3819890458 },
          'Sandstorm, Stellthorn, Sutherland, and Stormseer (T2)': {
            type: 'achievement',
            id: 531969117,
          },
          'Kuanbyr Hailstorm (T3)': { type: 'achievement', id: 445873788 },
          'Stormtide and Sandstorm (T3)': {
            type: 'achievement',
            id: 3241773308,
          },
          'Wavecrasher and Firestorm (T3)': {
            type: 'achievement',
            id: 1413408815,
          },
          'Thundercall and Cyclone (T3)': {
            type: 'achievement',
            id: 2802698072,
          },
          'Agnarr the Storm Lord (T4)': { type: 'achievement', id: 793363251 },
        },
        'Brackish Vaults: Realm of the Triumvirate': {
          "Dyronis, Harbinger of E'ci (T3)": {
            type: 'achievement',
            id: 3107883309,
          },
          'Rheumus, Harbinger of Tarew Marr (T3)': {
            type: 'achievement',
            id: 1804925641,
          },
          'Eurold, Harbinger of Povar (T3)': {
            type: 'achievement',
            id: 2499347325,
          },
        },
        "Solusek Ro's Tower: Citadel of the Sun": {
          'Ferris (T1)': { type: 'achievement', id: 518709793 },
          'Veleroth and Zrexul (T1)': { type: 'achievement', id: 551560483 },
          'Bling (T1)': { type: 'achievement', id: 3854273865 },
          'Guardian and Protector of Dresolik (T2)': {
            type: 'achievement',
            id: 637835300,
          },
          'Brundin of the Guard (T2)': { type: 'achievement', id: 2228633573 },
          'Amohn (T2)': { type: 'achievement', id: 2055522817 },
          'Arlyxir (T3)': { type: 'achievement', id: 2786296772 },
          'Rizlona (T3)': { type: 'achievement', id: 4199050345 },
          'Feridus Emberblaze (T4)': { type: 'achievement', id: 3735656700 },
          'Gerzou (T4)': { type: 'achievement', id: 3806337217 },
          'Solusek Ro (T4)': { type: 'achievement', id: 2464252762 },
        },
        'Shard of Hate: Reignited Hatred (Round 1)': {
          'The Deathrot Knight (T1)': { type: 'achievement', id: 637848167 },
          'The Culler of Bones (T1)': { type: 'achievement', id: 3016601088 },
          'The Arch Bonefiend (T1)': { type: 'achievement', id: 2882741806 },
          'The Lord of Decay (T1)': { type: 'achievement', id: 2500163944 },
        },
        'Shard of Hate: Reignited Hatred (Round 2)': {
          'The Mistress of Scorn (T1)': { type: 'achievement', id: 943992612 },
          'The Lord of Loathing (T1)': { type: 'achievement', id: 2825330142 },
          'The Lord of Ire (T1)': { type: 'achievement', id: 855835012 },
          'The Master of Spite (T2)': { type: 'achievement', id: 1735660121 },
        },
        'Shard of Hate: Reignited Hatred (Round 3)': {
          "The Hoarder P'Lewt (T1)": { type: 'achievement', id: 1339018976 },
          'The Phantom Wraith (T1)': { type: 'achievement', id: 1893595057 },
          'The Bleeder of Ire (T2)': { type: 'achievement', id: 942131495 },
          "The Master P'Tasa (T2)": { type: 'achievement', id: 3995152265 },
        },
        'Shard of Hate: Reignited Hatred (Round 4)': {
          "High Priest M'kari (T1)": { type: 'achievement', id: 1132325801 },
          'Tha Hand of Maestro (T2)': { type: 'achievement', id: 1396352827 },
          'Demetrius Crane (T2)': { type: 'achievement', id: 1282023409 },
          "The Deathspinner K'dora (T2)": {
            type: 'achievement',
            id: 2194354002,
          },
        },
        'Shard of Hate: Reignited Hatred (Round 5)': {
          "Coercer T'vala (T1)": { type: 'achievement', id: 2063877403 },
          "Dreadlord D'Somni (T2)": { type: 'achievement', id: 1812106951 },
          "Grandmaster R'Tal (T2)": { type: 'achievement', id: 3043264006 },
          'The Avatar of Abhorrence (T3)': {
            type: 'achievement',
            id: 2336092784,
          },
        },
        'Shard of Hate: Reignited Hatred (Round 6)': {
          'The Ashenbone Broodmaster (T3)': {
            type: 'achievement',
            id: 2249472210,
          },
          'The Avatar of Bone (T3)': { type: 'achievement', id: 1044351417 },
          "Kpul D'Vngur, Maestro of Rancor (T3)": {
            type: 'achievement',
            id: 918257925,
          },
          'Byzola (T3)': { type: 'achievement', id: 1547974772 },
        },
        'Shard of Hate: Reignited Hatred (Round 7)': {
          'Innoruuk, God of Hate': { type: 'achievement', id: 1709297961 },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'reign-of-shadows',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Reign of Shadows',
      query: {
        'Reign of Shadows': {
          'Echo Caverns': { type: 'quest', id: 1004769891 },
          "Shadeweaver's Thicket": { type: 'quest', id: 2733294553 },
          'Vex Thal 1': { type: 'quest', id: 3589141327 },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'renewal-of-ro',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Renewal of Ro',
      query: {
        "Raj'Dur Plateaus: The Hunt": {
          "Raj'Dur Foreman Yato (T1)": { type: 'achievement', id: 2131401295 },
          "Raj'Dur Leader Mamu (T2)": { type: 'achievement', id: 2905591652 },
          'Avenging Desert Spirit (T2)': {
            type: 'achievement',
            id: 2996794950,
          },
          'Poacher Paol (T2)': { type: 'achievement', id: 2971222468 },
          'Scythe Rotgut (T2)': { type: 'achievement', id: 2272671587 },
          'Slither Rattlebones (T3)': { type: 'achievement', id: 249389644 },
        },
        'Sandstone Delta: The Standing Storm': {
          'Embodiment of Fright (T1)': { type: 'achievement', id: 113694900 },
          'Tsmang Blightswarm Broodmaster (T2)': {
            type: 'achievement',
            id: 3288304938,
          },
          'Malformed Prophet (T2)': { type: 'achievement', id: 319658448 },
          'Lockmaw (T2)': { type: 'achievement', id: 2181493241 },
          'Mad Zealot (T3)': { type: 'achievement', id: 3197774793 },
          "Rath'Mana High Priest (T3)": { type: 'achievement', id: 2420168081 },
          'Kandti (Bonus T1)': { type: 'achievement', id: 1181594448 },
          'Monkey Business': { type: 'achievement', id: 1230060842 },
        },
        'Takish Badlands: The Boundless Gulf': {
          'Humuhngus Fuhngus Amuhngus (T3)': {
            type: 'achievement',
            id: 879966643,
          },
          'Desert Wildcat Matron (T3)': { type: 'achievement', id: 3925248132 },
          'Mhyt-moo Migmu (T3)': { type: 'achievement', id: 3718951237 },
          'Jellyfisher Ancient (T3)': { type: 'achievement', id: 2664506833 },
          'Ragtag the Despoiler (T3)': { type: 'achievement', id: 3519946954 },
          'Nirag the Boundless (T4)': { type: 'achievement', id: 3742132927 },
        },
        "Buried Takish'Hiz: Emergence from Stone": {
          'Stonesong (T4)': { type: 'achievement', id: 1583785797 },
          'Rugrat (T4)': { type: 'achievement', id: 2264084208 },
          'Monument of Stone (T4)': { type: 'achievement', id: 51800976 },
          'Them Bones (T4)': { type: 'achievement', id: 3301162796 },
          'Veagth (T4)': { type: 'achievement', id: 2090739578 },
          'Uruk the Unbound (T4)': { type: 'achievement', id: 4053290568 },
          'Terrene Tyrant (T4)': { type: 'achievement', id: 2420885133 },
          'Sanum Ordast the Cursed Scholar (T5)': {
            type: 'achievement',
            id: 3970772687,
          },
        },
        "Sultan's Mahala: Daggers Drawn": {
          'Poacher Paol the Persistent (T5)': {
            type: 'achievement',
            id: 4105828768,
          },
          "Raaijs Viruniq, Rath'Mana Incarnate (T5)": {
            type: 'achievement',
            id: 2851735631,
          },
          'Nirag, Boundless Titan (T5)': {
            type: 'achievement',
            id: 1619000230,
          },
          "Stonesong, Death's Throes (T5)": {
            type: 'achievement',
            id: 2703840774,
          },
          'Veagth the Unnatural (T5)': {
            type: 'achievement',
            id: 1605097831,
          },
          'Aldys, Sultan of Daggers (T5)': {
            type: 'achievement',
            id: 2090690546,
          },
        },
        "Buried Takish'Hiz: Empire of Antiquity [Contested]": {
          'Titanious, Essence of Reviviscence': {
            type: 'achievement',
            id: 2164457779,
          },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'ror-flawless',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Renewal of Ro Flawless',
      query: {
        "Raj'Dur Plateaus: The Hunt": {
          "Raj'Dur Foreman Yato (T1)": { type: 'achievement', id: 2436751900 },
          "Raj'Dur Leader Mamu (T2)": { type: 'achievement', id: 2486612070 },
          'Avenging Desert Spirit (T2)': {
            type: 'achievement',
            id: 3215905276,
          },
          'Poacher Paol (T2)': { type: 'achievement', id: 3156797054 },
          'Scythe Rotgut (T2)': { type: 'achievement', id: 2319945945 },
          'Slither Rattlebones (T3)': { type: 'achievement', id: 1988899731 },
        },
        'Sandstone Delta: The Standing Storm': {
          'Embodiment of Fright (T1)': { type: 'achievement', id: 2997614861 },
          'Tsmang Blightswarm Broodmaster (T2)': {
            type: 'achievement',
            id: 3130080488,
          },
          'Malformed Prophet (T2)': { type: 'achievement', id: 2327359242 },
          'Lockmaw (T2)': { type: 'achievement', id: 464766755 },
          'Mad Zealot (T3)': { type: 'achievement', id: 50154442 },
          "Rath'Mana High Priest (T3)": { type: 'achievement', id: 3951641559 },
          'Kandti (Bonus T1)': { type: 'achievement', id: 2138360914 },
        },
        'Takish Badlands: The Boundless Gulf': {
          'Humuhngus Fuhngus Amuhngus (T3)': {
            type: 'achievement',
            id: 3299196680,
          },
          'Desert Wildcat Matron (T3)': { type: 'achievement', id: 710132845 },
          'Mhyt-moo Migmu (T3)': { type: 'achievement', id: 504364460 },
          'Jellyfisher Ancient (T3)': { type: 'achievement', id: 2637923425 },
          'Ragtag the Despoiler (T3)': { type: 'achievement', id: 2014079031 },
          'Nirag the Boundless (T4)': { type: 'achievement', id: 1993220674 },
        },
        "Buried Takish'Hiz: Emergence from Stone": {
          'Stonesong (T4)': { type: 'achievement', id: 3248145070 },
          'Rugrat (T4)': { type: 'achievement', id: 2567665079 },
          'Monument of Stone (T4)': { type: 'achievement', id: 1083647446 },
          'Them Bones (T4)': { type: 'achievement', id: 1530911431 },
          'Veagth (T4)': { type: 'achievement', id: 1667660861 },
          'Uruk the Unbound (T4)': { type: 'achievement', id: 3544213403 },
          'Terrene Tyrant (T4)': { type: 'achievement', id: 2028792549 },
          'Sanum Ordast the Cursed Scholar (T5)': {
            type: 'achievement',
            id: 4116104017,
          },
        },
        "Sultan's Mahala: Daggers Drawn": {
          'Poacher Paol the Persistent (T5)': {
            type: 'achievement',
            id: 201504146,
          },
          "Raaijs Viruniq, Rath'Mana Incarnate (T5)": {
            type: 'achievement',
            id: 3598858928,
          },
          'Nirag, Boundless Titan (T5)': {
            type: 'achievement',
            id: 2134019457,
          },
          "Stonesong, Death's Throes (T5)": {
            type: 'achievement',
            id: 859043703,
          },
          'Veagth the Unnatural (T5)': {
            type: 'achievement',
            id: 2252964538,
          },
          'Aldys, Sultan of Daggers (T5)': {
            type: 'achievement',
            id: 3949473313,
          },
        },
        "Buried Takish'Hiz: Empire of Antiquity [Contested]": {
          'Titanious, Essence of Reviviscence': {
            type: 'achievement',
            id: 2999159680,
          },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'ros-flawless',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Reign of Shadows Flawless',
      query: {
        'Echo Caverns': {
          'The Ancient Burrower Beast': { type: 'achievement', id: 983088361 },
          'Lhurz the Nibbler': { type: 'achievement', id: 1781623804 },
          "Jerrek Amaw'Rosis": { type: 'achievement', id: 3548829345 },
          'Grieg Veneficus': { type: 'achievement', id: 3061320400 },
        },
        "Shadeweaver's Thicket": {
          'Nelon Hes': { type: 'achievement', id: 1348749755 },
          'Hoggith the Eternal Cinder': { type: 'achievement', id: 2253932959 },
          "Fenirek'tal": { type: 'achievement', id: 1319033136 },
          'Khati Sha the Twisted': { type: 'achievement', id: 745459971 },
        },
        "Shadow's Hold": {
          'Greta Gnitrat': { type: 'achievement', id: 760470014 },
          'Beast from Beyond': { type: 'achievement', id: 517383268 },
          'Shadowcaster Grimlock': { type: 'achievement', id: 1384602904 },
          'Colossus of Crystallized Shadow': {
            type: 'achievement',
            id: 1251582723,
          },
        },
        'Vex Thal 1': {
          'Va Dyn Khar': { type: 'achievement', id: 3373501509 },
          "Xakra Fu'un": { type: 'achievement', id: 1914889172 },
          'Betrayer 1': { type: 'achievement', id: 2814330486 },
          'Betrayer 2': { type: 'achievement', id: 3037391256 },
          'Betrayer 3': { type: 'achievement', id: 230067965 },
          'Betrayer 4': { type: 'achievement', id: 235217895 },
          'Zun, Zun, and Zun': { type: 'achievement', id: 2450032467 },
          'Kaas Thox Xi Aten Ha Ra': { type: 'achievement', id: 2707319114 },
          'The Creator': { type: 'achievement', id: 233108436 },
        },
        'Vex Thal 2': {
          'Diabo Xi Va': { type: 'achievement', id: 3188430906 },
          'Thall Xundrax Diabo': { type: 'achievement', id: 1606158253 },
          'Thall Va Xakra Fer': { type: 'achievement', id: 3948433922 },
          'Akhessa Va Liako Vess': { type: 'achievement', id: 1732565854 },
          'High Priest Verrkara': { type: 'achievement', id: 2042129110 },
          'Emperor Ssraeshza': { type: 'achievement', id: 2098276653 },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'settings',
    loadComponent: () => import('./settings/settings.page'),
  },
  {
    path: 'soluseks-eye',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: "Solusek's Eye: The Calling",
      query: {
        "Solusek's Eye: The Calling": {
          'Triumph: Answer the Call': { type: 'achievement', id: 4101718547 },
          'Volcanic Threats': { type: 'quest', id: 179143310 },
          'The Fire Within (Collection)': {
            type: 'collection',
            id: 2997731257,
          },
          'The Fire Within: Winding Descent': { type: 'quest', id: 384548791 },
          'The Fire Within: Indispensable Components': {
            type: 'quest',
            id: 2414013965,
          },
          'The Fire Within: Formula for Success': {
            type: 'quest',
            id: 4175814299,
          },
        },
      },
    } satisfies QuestStatusRouteData,
  },
  {
    path: 'vov-flawless',
    loadComponent: () => import('./quest-status-page/quest-status.page'),
    data: {
      title: 'Visions of Vetrovia "Flawless"',
      query: {
        'Non-Raid Achievements': {
          'Heroic I': { type: 'achievement', id: 4162523446 },
          'Heroic II': { type: 'achievement', id: 1628586124 },
          'Master of Vetrovia': { type: 'achievement', id: 2681141655 },
        },
        'Karuupa Jungle: The Fading Light': {
          'Quilliclaw (T1)': { type: 'achievement', id: 2030210416 },
          'Gluar Xrzin (T1)': { type: 'achievement', id: 2689579559 },
          'The Vetrovian Mantrap (T1)': { type: 'achievement', id: 1329913557 },
          'Behemothrus and Gargantaur (T2)': {
            type: 'achievement',
            id: 472440227,
          },
          'The Guardian of the Plumage (T2)': {
            type: 'achievement',
            id: 2764300147,
          },
        },
        'Mahngavi Wastes: The Engulfing Night': {
          'Cewtie (T1)': { type: 'achievement', id: 3507765080 },
          'Cliff Dweller Gadsin (T1)': { type: 'achievement', id: 4188149928 },
          'Persepherator (T1)': { type: 'achievement', id: 4287567854 },
          'Cewtie? (T2)': { type: 'achievement', id: 2897939876 },
          'The Legion Lords (T2)': { type: 'achievement', id: 3341839889 },
        },
        'Forlorn Gist: Emerging Deceit': {
          'Envoy to Bloodrite (T2)': { type: 'achievement', id: 56755689 },
          "G'dalt Spirit-stitcher (T2)": {
            type: 'achievement',
            id: 1387611581,
          },
          'The Hand of Lithania (T3)': { type: 'achievement', id: 1326012009 },
          'The Reanimated Horror (T3)': { type: 'achievement', id: 1316189009 },
          'Lithania Dyrmelia (T3)': { type: 'achievement', id: 417986812 },
        },
        'Castle Vacrul: Thirst for Power': {
          'The Lady of the Lute (T3)': { type: 'achievement', id: 2646401724 },
          'Legion Captain Bloodrite (T3)': {
            type: 'achievement',
            id: 1902962868,
          },
          'The Bloodtender and Gidget (T4)': {
            type: 'achievement',
            id: 1387471891,
          },
          'The Heir Apparent (T4)': { type: 'achievement', id: 151001061 },
          'The Thirstborn (T4)': { type: 'achievement', id: 818960137 },
        },
        'Castle Vacrul: Haunting Presence': {
          'The Butcher (T4)': { type: 'achievement', id: 4157760058 },
          'The Returned Foe of Legend (T4)': {
            type: 'achievement',
            id: 4058713937,
          },
          'The Vampire Queen (T4)': { type: 'achievement', id: 3562627241 },
          'Poppet the Thrasher (T4)': { type: 'achievement', id: 4281222609 },
          'The Lord of the Castle (T4)': {
            type: 'achievement',
            id: 1405493614,
          },
        },
      },
    } satisfies QuestStatusRouteData,
  },
];

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [IonicModule, RouterModule],
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private readonly storage: Storage,
    public environmentInjector: EnvironmentInjector
  ) {}

  async ngOnInit(): Promise<void> {
    await this.storage.create();
  }
}
