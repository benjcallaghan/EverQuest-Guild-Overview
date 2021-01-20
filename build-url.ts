import { build } from './src/app/daybreak-census-options';

let url = build({
  serviceId: 's:benjadorncalculator',
  format: 'json',
  verb: 'get',
  namespace: 'eq2',
  collection: 'guild',
  tree: [{ field: 'id', start: 'achievement_list' }],
  // filter: [
  //   {
  //     field: 'achievement_list.2270131434.completedtimestamp',
  //     value: 0,
  //     match: 'greaterThan',
  //   },
  // ],
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

// 2270131434 = The Ancient Burrower Beast
// 915224777 = Lhurzz
// 1578027977 = Jerrek Amaw'Rosis
// 2775203849 = Grieg Veneficus

// 3398946219 = Nelon Ves
// 4001261287 = The Eternal Cinder
// 1187803900 = Fehdu, Rehdu, and Pehdu
// 3622982097 = The Ancient Spirit

// 1446166111 = Va Dyn Khar
// 3975437458 = Xakra Fu'un
// 949908588 = Betrayer I
// 707517314 = Betrayer II
// 2459417831 = Betrayer III
// 2435060221 = Betrayer IV
// 326405197 = Monstrous Shadows
// 823313119 = The Creator
// 1209463812 = Zun Liako Ferun, Zun Diabo Xiun, and Zun Thall Heral
