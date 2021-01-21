import { build } from './src/app/daybreak-census-options';

let url = build({
  serviceId: 's:benjadorncalculator',
  format: 'json',
  verb: 'get',
  namespace: 'eq2',
  collection: 'guild',
  tree: [{ field: 'id', start: 'achievement_list' }],
  filter: [{ field: 'achievement_list.id', value: 2270131434 }],
  show: ['name', 'achievement_list'],
  limit: 10
}).toString();

// url = build({
//   serviceId: 's:benjadorncalculator',
//   format: 'json',
//   verb: 'get',
//   namespace: 'eq2',
//   collection: 'achievement',
//   filter: [
//     { field: 'category', value: 'Guild Raids' },
//     { field: 'subcategory', value: 'Reign of Shadows' },
//   ],
//   limit: 50,
// }).toString();
console.log(url);

// Echo Caverns
// 2270131434 = The Ancient Burrower Beast (Tier 1)
// 915224777 = Lhurzz (Tier 1)
// 1578027977 = Jerrek Amaw'Rosis (Tier 2)
// 2775203849 = Grieg Veneficus (Tier 3)

// Spiritweaver's Thicket
// 3398946219 = Nelon Ves (Tier 1)
// 4001261287 = The Eternal Cinder (Tier 1)
// 1187803900 = Fehdu, Rehdu, and Pehdu (Tier 2)
// 3622982097 = The Ancient Spirit (Tier 3)

// Vex Thal
// 1446166111 = Va Dyn Khar (Tier 3)
// 3975437458 = Xakra Fu'un (Tier 3)
// 949908588 = Betrayer I (Tier 3)
// 707517314 = Betrayer II (Tier 3)
// 2459417831 = Betrayer III (Tier 3)
// 2435060221 = Betrayer IV (Tier 4)
// 326405197 = Monstrous Shadows (Tier 4)
// 1209463812 = Zun Liako Ferun, Zun Diabo Xiun, and Zun Thall Heral (Tier 4)
// 823313119 = The Creator (Tier 5)

// Savage Weald
// 2743413289 = The Grimling Hero (Tier 5)