import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://kevinlondon.com/",
  author: "Kevin London",
  profile: "https://kevinlondon.com/",
  desc: "A collection of thoughts and ideas from Kevin London",
  title: "Kevin London",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerIndex: 10,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
};

export const LOCALE = {
  lang: "en", // html lang code. Set this empty and default will be "en"
  langTag: ["en-EN"], // BCP 47 Language Tags. Set this empty [] to use the environment default
} as const;

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/kevinlondon",
    linkTitle: ` ${SITE.author} on Github`,
    active: true,
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/kevinlondon/",
    linkTitle: `${SITE.author} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:kevinlondon@gmail.com",
    linkTitle: `Send an email to ${SITE.author}`,
    active: true,
  },
  {
    name: "Bluesky",
    href: "https://bsky.app/profile/kevinlondon.com",
    linkTitle: `${SITE.author} on Bluesky`,
    active: true,
  },
];
