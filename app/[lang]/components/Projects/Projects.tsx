import styles from "./Skills.module.css";

type ProjectsArr = {
  title: string;
  techStack: string[];
  description: React.ReactNode;
};

// this looks terrible :)))) but I think for multilanguage support I would need to use
// something like i18n and then I would have to move the description content to
// separate files, so for now I will just hardcode the english version here
const projectsData: ProjectsArr[] = [
  {
    title: "Circula",
    techStack: [
      "React",
      "Next.js",
      "Jest",
      "Enzyme",
      "Node.js",
      "Vercel",
      "Sanity",
    ],
    description: (
      <p>
        When I joined Circula, the company’s website had been developed by
        external contractors using a headless CMS called Sanity. Back then the
        website was a nightmare for the marketing team, with a confusing CMS
        editor, images that rendered blurry on Macbooks, and long German words
        that caused layout shifts when toggling languages. Despite the fact I
        never had worked with Sanity before, I was hired to figure out what the
        issues were and make the marketing team happy. I went through Sanity's
        SDK and realized the problems were architectural rather than inherent to
        the system.
        <br />
        Key responsibilities: - Interviewed the marketing team and mapped the
        most critical issues, such as image quality, responsive layout and error
        handling - Implemented a staged rollout to release the new versions,
        that included fixes such as using Next.js Image for proper retina
        support and a universal error‑display component that surfaced validation
        warnings directly in the CMS editor - After greatly improving the
        internal website, I transitioned the product team, where I had the
        pleasure to work with talented engineers in an agile environment, with
        daily meetups and frequent code reviews - Interviewed and participated
        of the hiring of senior engineers
      </p>
    ),
  },
  {
    title: "Moss",
    techStack: [
      "React",
      "Next.js",
      "Jest",
      "Enzyme",
      "Node.js",
      "Typescript",
      "Redux",
      "Storybook",
      "API integrations",
    ],
    description: (
      <p>
        When it comes to Germany's businesses' spend management solutions, Moss
        is one of the lead players. I was hired during a expansion phase in
        which the fintech grew from less than 100 employees to about 500. Being
        part of this growth meant focusing on creating and ensuring standards
        that would be used across the different teams, while many simultaneous
        developers shipped new features everyday.
        <br />
        Key responsibilities: - Creation and maintenance of components' system
        design - Development of onboarding forms with calendar integration -
        Owned deployment to production and staging environments, implementing
        per-branch staging deployments that greatly facilitated testing
        different features simultaneously - Designed and implemented role-based
        access control (RBAC) system supporting several types of user roles,
        using Redux middleware for permission checks
      </p>
    ),
  },
  {
    title: "Pamono",
    techStack: [
      "React",
      "Redux",
      "Jest",
      "Enzyme",
      "Jquery",
      "Magento",
      "Sanity",
      "PHP",
      "Docker",
      "Node.js",
      "API integrations",
    ],
    description: (
      <p>
        Pamono is famous for its high class, antique and modern furniture. Its
        design and art pieces are owned by luxury collectors and also frequently
        purchased to be used temporarily in stylish events or movie and TV
        productions.
        <br />
        Key responsibilities: - Development and maintenance of vendor portal,
        where vendors can manage advertised products, sales, special offers and
        shipping - Engineered and delivered seamless multi-language support to
        Magento store - Implemented and managed new payment integrations via
        Stripe API, increasing amount of payment options and attracting new
        sales - Mentored junior developer, focusing on paired programming
        sessions to build confidence, code review, best practices and
        documentation
      </p>
    ),
  },
];

export default function Projects() {
  return (
    <section className={styles.projects} id="projects">
      <h2 className={styles.heading}>Projects</h2>
    </section>
  );
}
