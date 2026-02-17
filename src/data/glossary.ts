export interface GlossaryTerm {
  term: string;
  definition: string;
}

export interface GlossaryCategory {
  id: string;
  title: string;
  terms: GlossaryTerm[];
}

export const glossaryCategories: GlossaryCategory[] = [
  {
    id: "core",
    title: "Core Network Architecture",
    terms: [
      {
        term: "OSP (Outside Plant)",
        definition:
          "All fiber infrastructure installed outside buildings, including underground and aerial systems.",
      },
      {
        term: "ISP (Inside Plant)",
        definition:
          "Fiber systems located inside buildings or facilities.",
      },
      {
        term: "Backbone Network",
        definition:
          "High-capacity fiber routes connecting cities, data centers, and major nodes.",
      },
      {
        term: "Metro Network",
        definition:
          "Fiber infrastructure within a metropolitan area.",
      },
      {
        term: "Middle-Mile",
        definition:
          "Segment connecting backbone networks to local access networks.",
      },
      {
        term: "Last-Mile",
        definition:
          "Final network segment delivering connectivity to homes or businesses.",
      },
      {
        term: "FTTH (Fiber to the Home)",
        definition:
          "Direct fiber connection to residential properties.",
      },
      {
        term: "FTTP (Fiber to the Premise)",
        definition:
          "Fiber connection to residential or commercial premises.",
      },
      {
        term: "FTTB (Fiber to the Building)",
        definition:
          "Fiber terminated at building level.",
      },
      {
        term: "FTTx",
        definition:
          "General term for fiber-based access architectures.",
      },
    ],
  },
  {
    id: "underground",
    title: "Underground Construction",
    terms: [
      {
        term: "HDD (Horizontal Directional Drilling)",
        definition:
          "Trenchless method for underground conduit installation.",
      },
      {
        term: "Bore",
        definition:
          "Directional drilling crossing under roads or utilities.",
      },
      {
        term: "Open Cut Trenching",
        definition:
          "Traditional excavation method for conduit placement.",
      },
      {
        term: "Plowing",
        definition:
          "Method of installing conduit using a plow blade without full trench excavation.",
      },
      {
        term: "Microtrenching",
        definition:
          "Shallow narrow trenching for urban fiber deployment.",
      },
      {
        term: "Conduit",
        definition:
          "Protective duct housing fiber cables.",
      },
      {
        term: "Innerduct",
        definition:
          "Smaller duct placed within conduit.",
      },
      {
        term: "HDPE Duct",
        definition:
          "High-density polyethylene conduit.",
      },
      {
        term: "Handhole",
        definition:
          "Underground access box for fiber maintenance.",
      },
      {
        term: "Vault",
        definition:
          "Large underground chamber for routing fiber.",
      },
      {
        term: "Manhole",
        definition:
          "Underground utility access structure.",
      },
      {
        term: "Pull Box",
        definition:
          "Access enclosure for cable pulling.",
      },
      {
        term: "Jetting",
        definition:
          "Blowing fiber through conduit using compressed air.",
      },
      {
        term: "Cable Pulling",
        definition:
          "Mechanical method for installing fiber cable.",
      },
      {
        term: "Tracer Wire",
        definition:
          "Wire installed to locate buried conduit.",
      },
    ],
  },
  {
    id: "aerial",
    title: "Aerial Construction",
    terms: [
      {
        term: "Strand",
        definition:
          "Steel cable supporting aerial fiber.",
      },
      {
        term: "Lashing",
        definition:
          "Attaching fiber cable to aerial strand.",
      },
      {
        term: "Make-Ready",
        definition:
          "Preparing utility poles for new cable attachment.",
      },
      {
        term: "Pole Transfer",
        definition:
          "Repositioning cables to accommodate new fiber.",
      },
      {
        term: "Down Guy",
        definition:
          "Support cable stabilizing utility pole.",
      },
      {
        term: "Messenger Wire",
        definition:
          "Supporting wire for aerial cable.",
      },
      {
        term: "NESC (National Electrical Safety Code)",
        definition:
          "Safety standard governing aerial installations.",
      },
    ],
  },
  {
    id: "fiber",
    title: "Fiber Components",
    terms: [
      {
        term: "Fiber Cable",
        definition:
          "Optical cable carrying light signals.",
      },
      {
        term: "Single-Mode Fiber (SMF)",
        definition:
          "Fiber for long-distance, high-capacity transmission.",
      },
      {
        term: "Multi-Mode Fiber (MMF)",
        definition:
          "Fiber used for shorter distances.",
      },
      {
        term: "Ribbon Fiber",
        definition:
          "Fiber organized in flat ribbon configuration.",
      },
      {
        term: "High-Count Fiber",
        definition:
          "Cable containing large numbers of strands.",
      },
      {
        term: "Dark Fiber",
        definition:
          "Unused fiber strands.",
      },
      {
        term: "Lit Fiber",
        definition:
          "Active fiber transmitting data.",
      },
      {
        term: "Buffer Tube",
        definition:
          "Protective tube housing fiber strands.",
      },
    ],
  },
  {
    id: "splicing",
    title: "Splicing & Testing",
    terms: [
      {
        term: "Fusion Splicing",
        definition:
          "Permanent joining of fiber strands.",
      },
      {
        term: "Mechanical Splicing",
        definition:
          "Non-fusion fiber joining method.",
      },
      {
        term: "OTDR (Optical Time Domain Reflectometer)",
        definition:
          "Device measuring fiber loss and faults.",
      },
      {
        term: "Power Meter Testing",
        definition:
          "Signal strength measurement method.",
      },
      {
        term: "Insertion Loss",
        definition:
          "Signal loss caused by splicing or connectors.",
      },
      {
        term: "Reflectance",
        definition:
          "Amount of light reflected back.",
      },
      {
        term: "Fiber Characterization",
        definition:
          "Advanced performance testing.",
      },
      {
        term: "Turn-Up",
        definition:
          "Final network activation.",
      },
      {
        term: "Splice Closure",
        definition:
          "Enclosure protecting fiber splices.",
      },
      {
        term: "Distribution Panel (ODF)",
        definition:
          "Fiber termination rack.",
      },
    ],
  },
  {
    id: "datacenter",
    title: "Data Center Terms",
    terms: [
      {
        term: "Entrance Facility",
        definition:
          "Building entry point for fiber.",
      },
      {
        term: "Meet-Me Room (MMR)",
        definition:
          "Interconnection room in data centers.",
      },
      {
        term: "Cross-Connect",
        definition:
          "Connection between network circuits.",
      },
      {
        term: "Diverse Path",
        definition:
          "Redundant fiber routing.",
      },
      {
        term: "Carrier Hotel",
        definition:
          "Facility housing multiple carriers.",
      },
    ],
  },
  {
    id: "compliance",
    title: "Compliance & Safety",
    terms: [
      {
        term: "OSHA",
        definition:
          "Federal workplace safety authority.",
      },
      {
        term: "811 Locate",
        definition:
          "Utility marking system before excavation.",
      },
      {
        term: "ROW (Right-of-Way)",
        definition:
          "Public land designated for utilities.",
      },
      {
        term: "TCP (Traffic Control Plan)",
        definition:
          "Traffic safety plan during construction.",
      },
      {
        term: "Permit",
        definition:
          "Official authorization for construction work.",
      },
      {
        term: "QC (Quality Control)",
        definition:
          "Inspection and compliance verification.",
      },
      {
        term: "As-Builts",
        definition:
          "Final documentation of installed network.",
      },
      {
        term: "Closeout Package",
        definition:
          "Project completion documentation set.",
      },
    ],
  },
  {
    id: "restoration",
    title: "Restoration & Project Delivery",
    terms: [
      {
        term: "Asphalt Restoration",
        definition:
          "Repair of roadway after excavation.",
      },
      {
        term: "Concrete Restoration",
        definition:
          "Sidewalk or slab repair.",
      },
      {
        term: "Landscape Restoration",
        definition:
          "Grass and soil repair.",
      },
      {
        term: "Demobilization",
        definition:
          "Removal of equipment from site.",
      },
      {
        term: "Punch List",
        definition:
          "Final correction items.",
      },
    ],
  },
  {
    id: "design",
    title: "Network Design Terms",
    terms: [
      {
        term: "Ring Topology",
        definition:
          "Redundant circular network design.",
      },
      {
        term: "Star Topology",
        definition:
          "Centralized network layout.",
      },
      {
        term: "Hub Site",
        definition:
          "Central distribution location.",
      },
      {
        term: "Cabinet",
        definition:
          "Above-ground distribution enclosure.",
      },
      {
        term: "Pedestal",
        definition:
          "Ground-level distribution housing.",
      },
      {
        term: "Splitter",
        definition:
          "Device dividing fiber signal.",
      },
      {
        term: "OLT (Optical Line Terminal)",
        definition:
          "Central office fiber distribution device.",
      },
      {
        term: "ONT (Optical Network Terminal)",
        definition:
          "Customer premises fiber device.",
      },
    ],
  },
  {
    id: "advanced",
    title: "Advanced & Specialized Terms",
    terms: [
      {
        term: "GPON (Gigabit Passive Optical Network)",
        definition:
          "Fiber access technology.",
      },
      {
        term: "XGS-PON",
        definition:
          "Next-generation 10G PON standard.",
      },
      {
        term: "DWDM (Dense Wavelength Division Multiplexing)",
        definition:
          "Technology increasing fiber capacity.",
      },
      {
        term: "Latency",
        definition:
          "Signal transmission delay.",
      },
      {
        term: "Bandwidth",
        definition:
          "Data transmission capacity.",
      },
      {
        term: "SLA (Service Level Agreement)",
        definition:
          "Performance contract terms.",
      },
      {
        term: "Network Hardening",
        definition:
          "Strengthening infrastructure resilience.",
      },
      {
        term: "Emergency Restoration",
        definition:
          "Rapid repair of damaged fiber.",
      },
      {
        term: "Backbone Diversification",
        definition:
          "Route redundancy strategy.",
      },
    ],
  },
];

// Flat list of all terms for search/filter and schema
export const allGlossaryTerms: { term: string; definition: string; category: string }[] =
  glossaryCategories.flatMap((cat) =>
    cat.terms.map((t) => ({
      term: t.term,
      definition: t.definition,
      category: cat.title,
    }))
  );
