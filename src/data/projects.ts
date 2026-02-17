export type ProjectType = "Backbone" | "Data Center" | "FTTH" | "Municipal";

export interface Project {
  id: string;
  title: string;
  clientType: string;
  projectType: ProjectType;
  location: string;
  image: string;
  shortDescription: string;
  overview: string;
  scope: string[];
  approach: string[];
  deliverables: string[];
  safety: string[];
  timeline: { phase: string; description: string }[];
  slug: string;
}

export const projects: Project[] = [
  {
    id: "1",
    slug: "regional-backbone-expansion",
    title: "Regional Backbone Expansion",
    clientType: "Tier-1 Carrier",
    projectType: "Backbone",
    location: "North Texas",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800",
    shortDescription:
      "Middle-mile backbone expansion across multiple counties for a Tier-1 carrier.",
    overview:
      "Full OSP construction for a regional backbone expansion is delivered with conduit placement, HDD crossings, and fiber placement with splicing and testing. Such work is completed with full 811 coordination, ROW compliance, and closeout documentation.",
    scope: [
      "Conduit and duct placement along the route",
      "HDD at road and water crossings",
      "Fiber placement and splicing",
      "OTDR and loss testing per carrier spec",
    ],
    approach: [
      "Phased construction by segment with client QC checkpoints",
      "811 and ROW coordination ahead of construction",
      "Traffic control plans for all lane closures",
      "Daily production and safety reporting",
    ],
    deliverables: [
      "As-built documentation",
      "OTDR and loss test packs",
      "Closeout package per carrier requirements",
    ],
    safety: [
      "OSHA-compliant site setup",
      "811 locates before any excavation",
      "TCP for all lane closures",
      "Daily tailgate and incident reporting",
    ],
    timeline: [
      { phase: "Mobilization & planning", description: "811, ROW verification, first segment conduit" },
      { phase: "Construction", description: "Conduit and HDD completion, fiber placement, splicing" },
      { phase: "Testing & closeout", description: "OTDR testing, as-builts, restoration, closeout package" },
    ],
  },
  {
    id: "2",
    slug: "hyperscale-data-center-ring",
    title: "Hyperscale Data Center Metro Ring",
    clientType: "Hyperscale Data Center",
    projectType: "Data Center",
    location: "DFW Metro",
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800",
    shortDescription:
      "Metro fiber ring connecting multiple data center campuses.",
    overview:
      "A metro fiber ring linking multiple data center campuses is built with underground duct, HDD crossings, and indoor/outdoor splicing and testing to client acceptance criteria. Staged construction minimizes campus disruption and documentation is aligned with client closeout standards.",
    scope: [
      "Duct and conduit along the ring route",
      "HDD at major road crossings",
      "Fiber placement and splicing",
      "Acceptance testing per client matrix",
    ],
    approach: [
      "Staged construction to minimize campus disruption",
      "Coordination with facility teams for delivery and testing",
      "Documentation aligned with client closeout standards",
    ],
    deliverables: [
      "Test packs and OTDR traces",
      "Splice records and as-builts",
      "Closeout documentation",
    ],
    safety: [
      "Site-specific safety orientation",
      "811 and private locate coordination",
      "TCP and lane closure permits",
    ],
    timeline: [
      { phase: "Mobilization", description: "Conduit segments along ring route" },
      { phase: "Construction", description: "Remaining conduit, HDD, fiber placement, splicing" },
      { phase: "Testing & closeout", description: "Acceptance testing, as-builts, closeout" },
    ],
  },
  {
    id: "3",
    slug: "municipal-ftth-phase",
    title: "Municipal FTTH Phase 1",
    clientType: "Municipality",
    projectType: "FTTH",
    location: "Texas Municipality",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    shortDescription:
      "First phase of municipal FTTH build: backbone and distribution.",
    overview:
      "A municipal FTTH first phase is delivered with backbone and distribution construction, drop installation support, and full closeout documentation in line with municipal and grant requirements. Work is phased by neighborhood with 811 and municipal ROW coordination.",
    scope: [
      "Backbone and distribution fiber placement",
      "Underground and aerial segments",
      "PED and cabinet installation support",
      "Drop installation to premises",
    ],
    approach: [
      "811 and municipal ROW coordination",
      "Phased by neighborhood with resident notification",
      "Restoration per municipal standards",
    ],
    deliverables: [
      "As-builts and splice documentation",
      "Test results",
      "Closeout package for grant compliance",
    ],
    safety: [
      "Municipal ROW and permit compliance",
      "811 locates and TCP where required",
      "Daily safety and production reporting",
    ],
    timeline: [
      { phase: "Mobilization & backbone", description: "Backbone segment, first distribution area" },
      { phase: "Distribution", description: "Distribution and drop installation, splicing" },
      { phase: "Testing & closeout", description: "Testing, as-builts, restoration, closeout" },
    ],
  },
  {
    id: "4",
    slug: "regional-isp-last-mile",
    title: "Regional ISP Last-Mile Build",
    clientType: "Regional ISP",
    projectType: "FTTH",
    location: "Texas",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
    shortDescription:
      "Last-mile FTTH build for a regional ISP in multiple communities.",
    overview:
      "Last-mile FTTH construction for a regional ISP is executed with plow and aerial construction, drop installation, and splicing and testing to the ISP's specifications. Crews are deployed by community with local permits and closeout follows ISP documentation requirements.",
    scope: [
      "Feeder and distribution fiber",
      "Plow and aerial placement",
      "Drop installation",
      "Splicing and testing",
    ],
    approach: [
      "Crew deployment by community with local permits",
      "Coordination with ISP design and QC teams",
      "Closeout per ISP documentation requirements",
    ],
    deliverables: [
      "As-builts and splice records",
      "Test packs",
      "Closeout documentation",
    ],
    safety: [
      "811 and ROW compliance",
      "TCP for lane and road work",
      "OSHA and client safety requirements",
    ],
    timeline: [
      { phase: "Mobilization", description: "First community feeder and distribution" },
      { phase: "Construction", description: "Additional communities, drops, splicing" },
      { phase: "Testing & closeout", description: "Testing, as-builts, closeout" },
    ],
  },
  {
    id: "5",
    slug: "carrier-aerial-replacement",
    title: "Carrier Aerial Fiber Replacement",
    clientType: "Tier-1 Carrier",
    projectType: "Backbone",
    location: "DFW",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=800",
    shortDescription:
      "Aerial fiber replacement and strand build for a Tier-1 carrier.",
    overview:
      "Aerial strand and fiber replacement along an existing carrier route is performed with make-ready support, new strand and lashing, and splicing and testing with full documentation. Pole-by-pole coordination with the pole owner and phased construction by segment support acceptance.",
    scope: [
      "Strand and lasher placement",
      "Make-ready and pole loading support",
      "Fiber placement and splicing",
      "OTDR and loss testing",
    ],
    approach: [
      "Pole-by-pole coordination with pole owner",
      "Traffic control for lane closures",
      "Phased by segment for acceptance",
    ],
    deliverables: [
      "Pole and strand as-builts",
      "Test packs",
      "Closeout documentation",
    ],
    safety: [
      "Aerial safety and PPE",
      "TCP for all lane closures",
      "811 where underground work is required",
    ],
    timeline: [
      { phase: "Mobilization & make-ready", description: "First segment strand and fiber" },
      { phase: "Construction", description: "Remaining segments, splicing" },
      { phase: "Testing & closeout", description: "Testing, as-builts, closeout" },
    ],
  },
  {
    id: "6",
    slug: "municipal-backbone-extension",
    title: "Municipal Backbone Extension",
    clientType: "Municipality",
    projectType: "Municipal",
    location: "Texas",
    image: "/images/municipal-backbone-extension.svg",
    shortDescription:
      "Municipal backbone extension to support future FTTH and municipal services.",
    overview:
      "A municipal backbone extension to support future FTTH and municipal services is built with underground conduit, HDD at crossings, and fiber placement with full municipal ROW and grant documentation. Restoration follows municipal standards and documentation supports grant and audit compliance.",
    scope: [
      "Conduit placement along the extension route",
      "HDD at road and utility crossings",
      "Fiber placement and splicing",
      "Testing and documentation",
    ],
    approach: [
      "Municipal ROW and 811 coordination",
      "Restoration per municipal standards",
      "Documentation for grant and audit compliance",
    ],
    deliverables: [
      "As-builts and splice records",
      "Test packs",
      "Closeout package for municipal and grant requirements",
    ],
    safety: [
      "Municipal ROW compliance",
      "811 and TCP",
      "Daily reporting to municipal project manager",
    ],
    timeline: [
      { phase: "Mobilization", description: "811, first conduit segment" },
      { phase: "Construction", description: "Conduit completion, HDD, fiber, splicing" },
      { phase: "Testing & closeout", description: "Testing, restoration, as-builts, closeout" },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export const projectTypes: ProjectType[] = [
  "Backbone",
  "Data Center",
  "FTTH",
  "Municipal",
];
