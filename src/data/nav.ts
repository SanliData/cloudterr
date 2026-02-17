export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/projects", label: "Projects" },
  { href: "/coverage", label: "Coverage" },
  { href: "/safety-quality", label: "Safety & Quality" },
  { href: "/international-cooperation", label: "International Cooperation" },
  { href: "/internet-world", label: "Internet World" },
  { href: "/glossary", label: "Glossary" },
  { href: "/careers", label: "Careers" },
  { href: "/contact", label: "Contact" },
] as const;

export const footerSections = [
  {
    title: "Services",
    links: [
      { href: "/services", label: "Overview" },
      { href: "/services/backbone-longhaul", label: "Backbone & Long-Haul" },
      { href: "/services/data-center", label: "Data Center" },
      { href: "/services/ftth-fttp", label: "FTTH/FTTP" },
      { href: "/services/aerial", label: "Aerial" },
      { href: "/services/underground", label: "Underground" },
      { href: "/services/splicing-testing", label: "Splicing & Testing" },
      { href: "/services/restoration-closeout", label: "Restoration & Closeout" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/projects", label: "Projects" },
      { href: "/coverage", label: "Coverage" },
      { href: "/safety-quality", label: "Safety & Quality" },
      { href: "/international-cooperation", label: "International Cooperation" },
      { href: "/internet-world", label: "Internet World" },
      { href: "/glossary", label: "Glossary" },
      { href: "/careers", label: "Careers" },
      { href: "/contact", label: "Contact" },
    ],
  },
] as const;
