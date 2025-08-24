import { Link } from "react-router-dom";
import Container from "../layout/Container";
import Logo from "./Logo";

import { Facebook, Instagram, Github, Linkedin } from "lucide-react";

const networks = [
  {
    name: "Facebook",
    href: "https://www.facebook.com/?locale=it_IT",
    icon: <Facebook size={24} />,
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/",
    icon: <Instagram size={24} />,
  },
  {
    name: "GitHub",
    href: "https://github.com/GabrielePre11",
    icon: <Github size={24} />,
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/prestano-gabriele/",
    icon: <Linkedin size={24} />,
  },
];

const footerLinks = [
  {
    title: "Navigation",
    links: [
      { name: "Home", href: "/" },
      { name: "Books", href: "/books" },
      { name: "Wishlist", href: "/wishlist" },
    ],
  },
  {
    title: "Library",
    links: [
      { name: "New Arrivals", href: "/new-arrivals" },
      { name: "Most Popular", href: "/popular" },
      { name: "Browse by Genre", href: "/genres" },
      { name: "Recommended Reads", href: "/recommended" },
    ],
  },
  {
    title: "Support",
    links: [
      { name: "Contact Us", href: "/contact" },
      { name: "FAQ", href: "/faq" },
      { name: "Help Center", href: "/help" },
      { name: "Report a Problem", href: "/report" },
    ],
  },
  {
    title: "About",
    links: [
      { name: "Our Story", href: "/about" },
      { name: "Meet the Team", href: "/team" },
      { name: "Blog", href: "/blog" },
      { name: "Terms & Privacy", href: "/terms" },
    ],
  },
];

const currentYear = new Date();

export default function Footer() {
  return (
    <footer className="left-0 bottom-0 w-full bg-primary-dark text-border mt-10 pt-5 pb-16 sm:pb-0">
      <Container>
        {/*=========== Logo & Description ===========*/}
        <div className="flex flex-col md:flex-row gap-5 md:gap-8 lg:gap-14">
          <div className="flex flex-col gap-2">
            {/*=========== Logo ===========*/}
            <Logo className="text-4xl"></Logo>

            {/*=========== Description ===========*/}
            <p className="text-[1rem] lg:text-lg text-text-muted max-w-[300px] lg:max-w-[320px]">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Delectus
              obcaecati temporibus nesciunt eum, dolorem ad.
            </p>

            {/*=========== Networks ===========*/}
            <ul className="flex items-center flex-wrap gap-3 mt-2">
              {networks.map((network) => (
                <li key={network.name} aria-label={`${network.name}'s Icon`}>
                  <a
                    href={network.href}
                    target="_blank"
                    className="grid place-items-center p-2 rounded-full border border-primary bg-bg text-primary-dark transition-colors duration-200 hover:bg-bg/80"
                    aria-label={`${network.name} Icon`}
                    role="link"
                  >
                    {network.icon}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/*=========== Footer Links ===========*/}
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-11 mt-6 md:mt-0">
            {footerLinks.map((footerLink) => (
              <li key={footerLink.title} className="flex flex-col gap-2">
                <h3 className="text-2xl">{footerLink.title}</h3>
                <ul className="flex flex-col space-y-1">
                  {footerLink.links.map((link) => (
                    <li
                      key={link.name}
                      className="text-[1rem] lg:text-lg text-text-muted hover:underline"
                    >
                      <Link to={`${link.href}`}>{link.name}</Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>

        {/*=========== Footer Bottom ===========*/}
        <div className="flex items-center flex-wrap justify-center text-center md:justify-between gap-2 border-t-2 border-zinc-400 mt-5 py-5 text-[1rem] md:text-lg lg:text-xl text-bg">
          {/*=========== Copyright ===========*/}
          <p>{`© ${currentYear.getFullYear()} Readly. All rights reserved.`}</p>

          {/*=========== Author ===========*/}
          <p className="flex items-center gap-1">
            Built by
            <a
              href="https://www.linkedin.com/in/prestano-gabriele/"
              target="_blank"
              className="text-primary hover:underline"
            >
              Prestano Gabriele
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}
