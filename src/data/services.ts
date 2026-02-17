export type ServiceId =
  | "backbone-longhaul"
  | "data-center"
  | "ftth-fttp"
  | "aerial"
  | "underground"
  | "splicing-testing"
  | "restoration-closeout";

export interface Service {
  id: ServiceId;
  title: string;
  image: string;
  shortDescription: string;
  scope: string[];
  methods: string[];
  deliverables: string[];
  typicalClients: string[];
  slug: string;
}

export const services: Service[] = [
  {
    id: "backbone-longhaul",
    slug: "backbone-longhaul",
    title: "Backbone & Long-Haul",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
    shortDescription:
      "Middle-mile and long-haul fiber routes for carriers and regional networks.",
    scope: [
      "Long-haul and middle-mile route design support",
      "Conduit placement and fiber placement",
      "Handhole and vault installation",
      "Cross-county and regional backbone builds",
    ],
    methods: [
      "Plowed and trenched conduit",
      "HDD for road and water crossings",
      "Aerial where permitted",
      "Coordination with existing ROW and utilities",
    ],
    deliverables: [
      "As-built documentation",
      "Fiber test packs (OTDR, loss)",
      "Closeout packages per client spec",
    ],
    typicalClients: ["Tier-1 and regional carriers", "Municipalities", "GCs"],
  },
  {
    id: "data-center",
    slug: "data-center",
    title: "Data Center Connectivity",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    shortDescription:
      "Fiber links to and between data centers, including campus and metro rings.",
    scope: [
      "Data center to data center links",
      "Campus and metro ring builds",
      "Meet-me room and riser work",
      "Duct and conduit infrastructure",
    ],
    methods: [
      "Underground duct and conduit",
      "HDD for crossings",
      "Indoor/outdoor cable placement",
      "Splicing and testing to client spec",
    ],
    deliverables: [
      "Test packs and OTDR traces",
      "As-builts and splice records",
      "Closeout documentation",
    ],
    typicalClients: [
      "Hyperscale data center operators",
      "Carriers",
      "Enterprise and colocation providers",
    ],
  },
  {
    id: "ftth-fttp",
    slug: "ftth-fttp",
    title: "FTTH/FTTP & Last-Mile",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    shortDescription:
      "Fiber to the home and premises; last-mile distribution and drop deployment.",
    scope: [
      "FTTH/FTTP distribution network design support",
      "Feeder and distribution fiber placement",
      "Drop installation to premises",
      "PED and cabinet installation",
    ],
    methods: [
      "Underground plow and trench",
      "Aerial strand and lasher",
      "Micro-trenching where specified",
      "HDD for street crossings",
    ],
    deliverables: [
      "As-builts and splice documentation",
      "Test results per client matrix",
      "Closeout packages",
    ],
    typicalClients: [
      "Municipal broadband",
      "Regional ISPs",
      "Carriers and GCs",
    ],
  },
  {
    id: "aerial",
    slug: "aerial",
    title: "Aerial Construction",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    shortDescription:
      "Pole-line and strand construction; lasher and OSP aerial placement.",
    scope: [
      "Pole attachment and strand installation",
      "Aerial fiber placement (lasher)",
      "Make-ready and pole loading support",
      "ROW and permit coordination",
    ],
    methods: [
      "Strand and lashing",
      "Pole inspection and make-ready",
      "Traffic control for lane closures",
      "Compliance with pole owner specs",
    ],
    deliverables: [
      "As-built pole and strand records",
      "Test packs",
      "Closeout documentation",
    ],
    typicalClients: ["Carriers", "Municipalities", "Electric cooperatives"],
  },
  {
    id: "underground",
    slug: "underground",
    title: "Underground Construction",
    image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800",
    shortDescription:
      "Trench, plow, HDD, and conduit placement for OSP underground.",
    scope: [
      "Conduit and duct placement",
      "Trench and plow installation",
      "HDD for road, river, and obstacle crossings",
      "Handhole and vault installation",
    ],
    methods: [
      "Open trench and plow",
      "Horizontal directional drilling (HDD)",
      "811 locate coordination",
      "Restoration per municipal and client spec",
    ],
    deliverables: [
      "As-builts and conduit records",
      "Fiber test packs",
      "Restoration documentation",
    ],
    typicalClients: [
      "Carriers",
      "Municipalities",
      "Data centers",
      "GCs",
    ],
  },
  {
    id: "splicing-testing",
    slug: "splicing-testing",
    title: "Splicing, Testing & Turn-Up",
    image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800",
    shortDescription:
      "Fusion splicing, OTDR and loss testing, and circuit turn-up support.",
    scope: [
      "Fusion splicing per design",
      "OTDR and loss testing",
      "Circuit turn-up and acceptance support",
      "Troubleshooting and restoration splicing",
    ],
    methods: [
      "Single-mode and multimode splicing",
      "OTDR and power meter testing",
      "Client-specified test matrices",
      "Documentation and test pack delivery",
    ],
    deliverables: [
      "OTDR traces and loss data",
      "Splice records and as-builts",
      "Test packs and acceptance documentation",
    ],
    typicalClients: [
      "Carriers",
      "Data centers",
      "Municipalities",
      "GCs",
    ],
  },
  {
    id: "restoration-closeout",
    slug: "restoration-closeout",
    title: "Restoration & Closeout",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=800",
    shortDescription:
      "Restoration of ROW and pavement; closeout packages and documentation.",
    scope: [
      "ROW and pavement restoration",
      "As-built and redline documentation",
      "Closeout package assembly",
      "Client-specified punch and warranty support",
    ],
    methods: [
      "Restoration per municipal and client spec",
      "As-built collection and delivery",
      "Test pack and splice record integration",
      "Final acceptance documentation",
    ],
    deliverables: [
      "Complete closeout packages",
      "As-builts and test packs",
      "Restoration documentation",
    ],
    typicalClients: ["Carriers", "Municipalities", "GCs", "Data centers"],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export function getServiceById(id: ServiceId): Service | undefined {
  return services.find((s) => s.id === id);
}
