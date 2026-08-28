/**
 * Mumbai sarvajanik Ganpati mandals with verified coordinates.
 * Coordinates are taken from published Plus Codes, OSM named streets/places
 * (Photon/Overpass), Wikipedia, Wikimapia, and official mandal pages — not guessed.
 *
 * Sources:
 * - https://www.treebo.com/blog/ganpati-pandals-in-mumbai/ (addresses + Plus Codes)
 * - https://en.wikipedia.org/wiki/Lalbaugcha_Raja
 * - https://lalbaugcharaja.com/en/
 * - https://gsbsevamandal.org/
 * - http://www.andhericharaja.com/contact/
 * - https://khetwadichaganraj.com/reach-us.htm
 * - https://fortchaicchapurtiganesh.com/donate-to-icchapurti-ganesh-mandal/
 * - https://yappe.in/maharashtra/mumbai/chinchbunder-dongri-sarvajanik-ganesh-utsav-mandal/1358659
 * - https://en.wikipedia.org/wiki/Maheshwari_Udyan,_Mumbai
 * - https://en.wikipedia.org/wiki/General_Post_Office,_Mumbai
 * - https://en.wikipedia.org/wiki/Azad_Nagar_metro_station
 * - https://en.wikipedia.org/wiki/Chinchpokli_railway_station
 * - https://en.wikipedia.org/wiki/Sandhurst_Road_railway_station
 * - https://en.wikipedia.org/wiki/Grant_Road_railway_station
 * - https://en.wikipedia.org/wiki/Charni_Road_railway_station
 * - https://en.wikipedia.org/wiki/Tilak_Nagar,_Mumbai
 * - https://en.wikipedia.org/wiki/Worli
 * - http://wikimapia.org/2657365/keshavji-naik-chawl-no-3
 * - https://hindupad.com/sahyadri-krida-mandal-tilak-nagar-chembur-mumbai/
 * - OpenStreetMap / Photon (komoot) named streets and places
 * - Open Location Code recover of published Plus Codes XRVP+C7G, XRXQ+XHR, 4RJP+4MM
 */

export type Area = "south" | "central" | "western" | "harbour";

export type Pandal = {
  id: string;
  name: string;
  nickname: string;
  neighbourhood: string;
  area: Area;
  yearFounded?: number;
  nearestStation: string;
  story: string;
  crowdNote: string;
  lat: number;
  lng: number;
  isKing: boolean;
};

export const pandals: Pandal[] = [
  {
    id: "lalbaugcha-raja",
    name: "Lalbaugcha Raja",
    nickname: "Navasacha Ganpati — the King of Lalbaug",
    neighbourhood: "Lalbaug Market, Parel",
    area: "central",
    yearFounded: 1934,
    nearestStation: "Chinchpokli / Currey Road (Central)",
    story:
      "Founded in 1934 at Lalbaug Market by Koli fisherfolk after a navas for a permanent marketplace, this 16–20 ft idol is Mumbai’s most visited public Ganpati. The Kambli family has sculpted him for eight decades; millions queue for mukh darshan and charan sparsh.",
    crowdNote:
      "The longest queues in the city. Mukh darshan often 2–4 hours; navas / charan sparsh can run overnight. Weeknights are kinder than weekends.",
    lat: 18.991424,
    lng: 72.836459,
    isKing: true,
  },
  {
    id: "tejukaya-cha-raja",
    name: "Tejukaya cha Raja",
    nickname: "Raja Tejukayacha",
    neighbourhood: "Tejukaya Mansion, Ganesh Gully",
    area: "central",
    nearestStation: "Currey Road (Central)",
    story:
      "One of Lalbaug’s three great public idols, seated at Tejukaya Mansion on Dr Babasaheb Ambedkar Road. Known for a vast, elephant-eared murti and a calmer darshan than the King across the way — many hop here after Lalbaugcha Raja.",
    crowdNote:
      "Usually 15 minutes to 90 minutes. A short walk from Lalbaugcha Raja; combine both in one visit.",
    lat: 18.993563,
    lng: 72.835703,
    isKing: false,
  },
  {
    id: "mumbaicha-raja",
    name: "Mumbaicha Raja",
    nickname: "Ganesh Galli cha Raja",
    neighbourhood: "Ganesh Galli, Lalbaug",
    area: "central",
    nearestStation: "Parel / Currey Road (Central)",
    story:
      "The public Ganpati of Ganesh Galli, a lane of lights and themed sets beside Lalbaug. Famous for temple-inspired pandals and social themes, he is a natural second stop on the Lalbaug heritage walk.",
    crowdNote:
      "30 minutes to 2 hours. The galli itself gets packed; walk from the King rather than driving.",
    lat: 18.989764,
    lng: 72.839747,
    isKing: false,
  },
  {
    id: "gsb-seva-mandal",
    name: "GSB Seva Mandal",
    nickname: "King’s Circle cha suvarna Ganpati",
    neighbourhood: "Shree Sukrateendra Nagar, King’s Circle",
    area: "central",
    yearFounded: 1951,
    nearestStation: "King’s Circle (Harbour) / Matunga (Central)",
    story:
      "Gowd Saraswat Brahman Seva Mandal has celebrated Ganeshotsav at King’s Circle since 1951, in the tradition of Kashi Math. The clay idol is dressed in gold and silver; sevas follow Rig Vedic practice, including tulabhar of rice, sugar and coconuts.",
    crowdNote:
      "20 minutes to 90 minutes. Early weekday mornings are the gentlest. 2026 dates at this venue: 14–18 September.",
    lat: 19.026871,
    lng: 72.855405,
    isKing: false,
  },
  {
    id: "andhericha-raja",
    name: "Andhericha Raja",
    nickname: "Navsala Pavnara Ganpati — King of Andheri",
    neighbourhood: "Ganesh Maidan, Azad Nagar, Veera Desai Road",
    area: "western",
    yearFounded: 1966,
    nearestStation: "Azad Nagar Metro (Line 1)",
    story:
      "Started in 1966 by mill and factory workers who had moved from Lalbaug to Azad Nagar. Immersion is uniquely held on Sankashti, five days after Anant Chaturdashi, and the visarjan winds through Andheri till dawn at Versova.",
    crowdNote:
      "15 minutes to 1 hour at the maidan; visarjan night is a street festival of its own. Well ventilated queues.",
    lat: 19.130338,
    lng: 72.836672,
    isKing: false,
  },
  {
    id: "chinchpokli-chintamani",
    name: "Chinchpokli cha Chintamani",
    nickname: "Chinchpoklicha Raja",
    neighbourhood: "Dattaram Lad Marg, Chinchpokli",
    area: "central",
    yearFounded: 1920,
    nearestStation: "Chinchpokli (Central)",
    story:
      "Among Mumbai’s oldest sarvajanik mandals, seated since 1920 on Dattaram Lad Marg. Chintamani — the jewel that lifts chinta, worry — is welcomed each year with a roaring Parel procession before taking his place in the pandal.",
    crowdNote:
      "30 minutes to 2 hours. Separate queues and strong volunteer presence. Combine with Lalbaug on foot.",
    lat: 18.98847,
    lng: 72.835825,
    isKing: false,
  },
  {
    id: "khetwadi-ganraj",
    name: "Khetwadi cha Ganraj",
    nickname: "Ganraj of the 12th lane",
    neighbourhood: "12th Khetwadi Lane, Girgaum",
    area: "south",
    yearFounded: 1959,
    nearestStation: "Grant Road (Western)",
    story:
      "Grant Road Khetwadi Back Road & 12th Lane Sarvajanik Ganeshotsav Mandal is the lane that made Khetwadi famous for towering murtis — sometimes 35–40 feet — and inventive, often eco-minded sets. Walk the twelve lanes; each has its own Bappa.",
    crowdNote:
      "Khetwadi lanes fill street-to-street. Some pandals charge a small entry. Wear shoes you can walk in.",
    lat: 18.960545,
    lng: 72.821199,
    isKing: false,
  },
  {
    id: "girgaoncha-raja",
    name: "Girgaoncha Raja",
    nickname: "King of eco-friendliness",
    neighbourhood: "Nikadwari Lane, Girgaon",
    area: "south",
    nearestStation: "Charni Road (Western)",
    story:
      "Nikadwari Lane Ganesh Utsav Mandal’s Girgaoncha Raja is loved as a shadu-clay, eco-friendly king in a traditional pheta. The mandal’s social work and green visarjan have made this South Mumbai galli a pilgrimage of conscience as well as bhakti.",
    crowdNote:
      "1–3 hours on peak evenings. Narrow lanes; leave bags light. Beautiful after a Chowpatty sunset.",
    lat: 18.954622,
    lng: 72.820993,
    isKing: false,
  },
  {
    id: "fortcha-raja",
    name: "Fortcha Raja",
    nickname: "Icchapurti Ganesh of Fort",
    neighbourhood: "Mint Road, opposite GPO, Fort",
    area: "south",
    yearFounded: 1956,
    nearestStation: "CSMT (Central / Harbour)",
    story:
      "Fort Vibhag Sarvajanik Ganeshotsav Mandal, born of the Samyukta Maharashtra years, seats a lucky nine-foot Icchapurti Ganesh opposite the GPO. Themes change yearly — palaces, pilgrimages, many Ganpatis — with painters often working both-handed on the ceiling.",
    crowdNote:
      "30 minutes to 2 hours. Fort is easier by train than by car. Pair with a Marine Drive walk after darshan.",
    lat: 18.938767,
    lng: 72.837039,
    isKing: false,
  },
  {
    id: "dongri-cha-raja",
    name: "Dongri cha Raja",
    nickname: "Chinch Bunder cha Raja",
    neighbourhood: "Ganesh Chowk, Dr Maheshwari Road, Dongri",
    area: "south",
    yearFounded: 1939,
    nearestStation: "Sandhurst Road (Central / Harbour)",
    story:
      "Chinch Bunder Dongri Sarvajanik Ganeshutsav Mandal has welcomed Bappa since 1939 in the old port neighbourhood of Dongri. Once titled Mumbai cha Raja in a milestone year, the mandal keeps morning abhishek and evening aarti for ten days of community utsav.",
    crowdNote:
      "Busy but local. Station (W) is the easiest approach; the chowk packs tight at aarti.",
    lat: 18.960924,
    lng: 72.839372,
    isKing: false,
  },
  {
    id: "keshavji-naik-chawl",
    name: "Keshavji Naik Chawl Ganpati",
    nickname: "Mumbai’s oldest sarvajanik Ganpati",
    neighbourhood: "Khadilkar Road, Girgaon",
    area: "south",
    yearFounded: 1893,
    nearestStation: "Charni Road / Grant Road (Western)",
    story:
      "Sarvajanik Ganeshutsav Sanstha, led by Rao Bahadur Limaye and Godse Shastri, seated Bappa at Keshavji Naik Chawl in 1893 — the city’s first public mandal in the Tilak tradition. He still arrives and leaves in a palanquin, without loudspeakers, as he did more than a century ago.",
    crowdNote:
      "Quieter, deeply traditional. A pause of grace between the big South Mumbai crowds.",
    lat: 18.953889,
    lng: 72.821667,
    isKing: false,
  },
  {
    id: "sahyadri-krida-mandal",
    name: "Sahyadri Krida Mandal",
    nickname: "Tilak Nagar cha decorative king",
    neighbourhood: "Tilak Nagar Municipal Ground, Chembur",
    area: "harbour",
    yearFounded: 1977,
    nearestStation: "Tilak Nagar (Harbour)",
    story:
      "A sports club that began a public utsav in 1977 and moved to the municipal ground in 1980. Harbour-suburb devotees come for cinematic sets — art directors from across India have dressed this ground — and for a mandal proud of its volunteer discipline.",
    crowdNote:
      "20 minutes to a few hours after 3 pm. Open around the clock during the festival. Note: this famous Sahyadri is in Chembur, not Dadar.",
    lat: 19.069258,
    lng: 72.897869,
    isKing: false,
  },
  {
    id: "parel-cha-raja",
    name: "Parel cha Raja",
    nickname: "Nare Park cha Raja",
    neighbourhood: "Nare Park, Parel",
    area: "central",
    nearestStation: "Parel (Central)",
    story:
      "Parelcha Raja sits by Nare Park Abhyasika, a family-friendly ground of food stalls and lights a short walk from Lalbaug. A natural last (or first) stop on the Parel–Lalbaug hopping route that also takes in Tejukaya and Ganesh Galli.",
    crowdNote:
      "20 minutes to 90 minutes. Easier with children than Lalbaug. Combine on foot.",
    lat: 18.999988,
    lng: 72.838891,
    isKing: false,
  },
  {
    id: "kalachowki-mahaganpati",
    name: "Kalachowkicha Mahaganpati",
    nickname: "Mahaganpati of Kalachowki",
    neighbourhood: "Dattaram Lad Marg, Kalachowki",
    area: "central",
    nearestStation: "Chinchpokli (Central)",
    story:
      "A smiling, colourful Mahaganpati reached through Kalachowki’s narrow lanes on Dattaram Lad Marg. The approach itself feels like a blessing — Bappa’s path squeezed between old Girangaon chawls — and the pandal has won a younger city’s love in recent years.",
    crowdNote:
      "30 minutes to 2 hours. Lanes are tight; skip if crowds make you uneasy, or go at dawn.",
    lat: 18.988292,
    lng: 72.838615,
    isKing: false,
  },
  {
    id: "bandra-west-sarvajanik",
    name: "Bandra West Sarvajanik Ganeshotsav Mandal",
    nickname: "Bandra Reclamation cha mandal",
    neighbourhood: "Bandra Reclamation, Bandra West",
    area: "western",
    nearestStation: "Bandra (Western)",
    story:
      "Known across Mumbai for full-scale temple replicas — Kedarnath, Mahakal, Shirdi, and in recent years Kashi Vishwanath — this Reclamation mandal turns a seaside neighbourhood into a pilgrimage set. Families of every faith come to walk the theme.",
    crowdNote:
      "Evenings are the spectacle. Reclamation roads clog; train to Bandra and a short ride is wiser.",
    lat: 19.051227,
    lng: 72.832601,
    isKing: false,
  },
  {
    id: "chembur-cha-raja",
    name: "Chembur cha Raja",
    nickname: "Shell Colony cha Raja",
    neighbourhood: "Shell Colony, Chembur",
    area: "harbour",
    nearestStation: "Chembur / Tilak Nagar (Harbour)",
    story:
      "Shell Colony’s Chembur cha Raja is the harbour suburb’s well-loved public king — grand, graceful, and run by disciplined volunteers. A fine pair with Sahyadri Krida Mandal a few lanes away in Tilak Nagar.",
    crowdNote:
      "Usually smoother than south Mumbai. Peak after office hours and on weekends.",
    lat: 19.065641,
    lng: 72.894193,
    isKing: false,
  },
  {
    id: "ghatkoparcha-maharaja",
    name: "Ghatkoparcha Maharaja",
    nickname: "Pant Nagar cha Maharaja",
    neighbourhood: "Pant Nagar, Ghatkopar East",
    area: "harbour",
    nearestStation: "Ghatkopar (Central / Metro Line 1)",
    story:
      "Pant Nagar’s Maharaja has become the heart of Ghatkopar East’s Ganeshotsav — a community-led eastern-suburb king where locals and visitors share aarti without the crush of Lalbaug. A good harbour-line darshan if you live east of the creek.",
    crowdNote:
      "Neighbourhood scale. Evenings are liveliest; Metro to Ghatkopar is the easy way in.",
    lat: 19.08333,
    lng: 72.911504,
    isKing: false,
  },
  {
    id: "dadarcha-raja",
    name: "Dadarcha Raja",
    nickname: "Vitthalwadi cha Raja",
    neighbourhood: "Opposite Veer Kotwal Udyan, near Plaza, Dadar",
    area: "central",
    nearestStation: "Dadar (Western / Central)",
    story:
      "Vitthalwadi Sarvajanik Ganeshotsav Mandal’s Dadarcha Raja sits down R.K. Vaidya Road, opposite the circular Kotwal garden near Plaza. A Marathi heartland stop — walkable from Dadar station — between the mill lands and Shivaji Park.",
    crowdNote:
      "Dadar is always busy; the garden side is easier on foot than by taxi during utsav.",
    lat: 19.020767,
    lng: 72.841662,
    isKing: false,
  },
  {
    id: "worli-janta-colony",
    name: "Janta Colony Sarvajanik Ganeshotsav Mandal",
    nickname: "Worli BPT Colony cha Ganpati",
    neighbourhood: "Janata Colony, BPT Colony, Worli",
    area: "western",
    nearestStation: "Mahalaxmi / Lower Parel (Western) · Worli / Acharya Atre Chowk Metro",
    story:
      "A community mandal in Worli’s Janata / BPT Colony, on the old island that faces the sea. Here Ganeshotsav still feels like a village utsav inside the city — Koli neighbourhood, sea breeze, and aarti that belongs to the colony.",
    crowdNote:
      "Local and warm. Pair with a Worli Seaface walk; parking is scarce on festival nights.",
    lat: 19.011739,
    lng: 72.817871,
    isKing: false,
  },
  {
    id: "khetwadi-morya",
    name: "Khetwadicha Morya",
    nickname: "7th Lane cha Morya",
    neighbourhood: "Khetwadi 7th Lane, Girgaum",
    area: "south",
    nearestStation: "Grant Road (Western)",
    story:
      "The seventh of Khetwadi’s celebrated lanes, Khetwadicha Morya is part of the dense, lantern-strung galli circuit that makes Girgaum unique. Hop lane to lane — Vighnaharta, Lambodara, Ganraj, Morya — and you have walked a city of kings.",
    crowdNote:
      "Share the crush with twelve other mandals. Best as a walking circuit from Grant Road.",
    lat: 18.958793,
    lng: 72.823302,
    isKing: false,
  },
  {
    id: "khetwadi-maharaja",
    name: "Mumbaicha Maharaja",
    nickname: "Khetwadi 11th Lane",
    neighbourhood: "Khetwadi 11th Lane, Girgaum",
    area: "south",
    nearestStation: "Grant Road (Western)",
    story:
      "11th Lane’s Mumbaicha Maharaja stands among Khetwadi’s award-winning idols, where each galli competes in height, humour and bhakti. Come for the lane, stay for the whole neighbourhood — this is South Mumbai Ganeshotsav at street scale.",
    crowdNote:
      "Tight lanes, high spirits. Keep to the walking circuit; do not bring a car into Khetwadi.",
    lat: 18.959628,
    lng: 72.82137,
    isKing: false,
  },
];

export const areaLabels: Record<Area | "all", string> = {
  all: "All",
  south: "South",
  central: "Central",
  western: "Western",
  harbour: "Harbour",
};

export function getPandal(id: string | null | undefined) {
  if (!id) return undefined;
  return pandals.find((p) => p.id === id);
}
