export type Certificate = {
  title: string;
  issuer: string;
  year: string;
  proofUrl?: string;
  badgeUrl?: string;
  image?: string; // put in /public/certificates/...
};

export const certificates: Certificate[] = [
  {
    title: "HackerRank | Frontend Developer (React)",
    issuer: "HackerRank",
    year: "2025",
    proofUrl: "https://www.hackerrank.com/certificates/iframe/f5aafb581da5",
    image: "https://res.cloudinary.com/dfejydorr/image/upload/v1768814402/frontend_developer_react_certificate_1_ixi4fx.webp",
  },
  {
    title: "HackerRank | SQL Basic",
    issuer: "HackerRank",
    year: "2025",
    proofUrl: "https://www.hackerrank.com/certificates/iframe/65a556597edd",
    image: "https://res.cloudinary.com/dfejydorr/image/upload/v1768814386/sql_basic_certificate_1_qur370.webp",
  },
  {
    title: "HackerRank | Software Engineer Intern",
    issuer: "HackerRank",
    year: "2025",
    proofUrl: "https://www.hackerrank.com/certificates/iframe/8432e24240f0",
    image: "https://res.cloudinary.com/dfejydorr/image/upload/v1768814381/software_engineer_intern_certificate_1_zblba9.webp",
  },
  {
    title: "Postman Student Expert",
    issuer: "Postman",
    year: "2025",
    proofUrl: "https://badgr.com/public/assertions/HHIRpNC3TxSVVH3NNpyiag?identity__email=isinduyuwaneka%40gmail.com",
    image: "https://res.cloudinary.com/dfejydorr/image/upload/v1768814407/1757319821334_bzehuh.jpg",
  },
];
