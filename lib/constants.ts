export interface Event {
  title: string;
  image: string;
  slug: string;
  location: string;
  date: string;
  time: string;
}

export const events: Event[] = [
  {
    title: "React Conference 2026",
    image: "/images/event1.png",
    slug: "react-conference-2026",
    location: "Las Vegas, Nevada",
    date: "April 15-17, 2026",
    time: "9:00 AM - 6:00 PM",
  },
  {
    title: "Next.js Summit",
    image: "/images/event2.png",
    slug: "nextjs-summit-2026",
    location: "San Francisco, California",
    date: "May 10-12, 2026",
    time: "8:30 AM - 5:00 PM",
  },
  {
    title: "JavaScript Global Summit",
    image: "/images/event3.png",
    slug: "js-global-summit-2026",
    location: "Berlin, Germany",
    date: "June 8-10, 2026",
    time: "10:00 AM - 7:00 PM",
  },
  {
    title: "Web Dev Hackathon 2026",
    image: "/images/event4.png",
    slug: "web-dev-hackathon-2026",
    location: "Austin, Texas",
    date: "July 20-22, 2026",
    time: "12:00 PM - 11:59 PM",
  },
  {
    title: "Tech Meetup Series - Frontend",
    image: "/images/event5.png",
    slug: "tech-meetup-frontend",
    location: "New York, New York",
    date: "August 5, 2026",
    time: "6:00 PM - 8:30 PM",
  },
  {
    title: "Full Stack Developer Conference",
    image: "/images/event6.png",
    slug: "full-stack-dev-conference",
    location: "Seattle, Washington",
    date: "September 12-14, 2026",
    time: "9:00 AM - 5:00 PM",
  },
];
