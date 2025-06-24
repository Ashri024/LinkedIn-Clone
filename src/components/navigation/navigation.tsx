// Navigation items config (icons from react-icons)
import { FaHome, FaUserFriends, FaBriefcase, FaEnvelope, FaBell } from "react-icons/fa";

export const navigationItems = [
  {
    label: "Home",
    icon: <FaHome className="w-5 h-5" />,
    href: "/feed",
  },
  {
    label: "My Network",
    icon: <FaUserFriends className="w-5 h-5" />,
    href: "/network",
  },
  {
    label: "Jobs",
    icon: <FaBriefcase className="w-5 h-5" />,
    href: "/jobs",
  },
  {
    label: "Messaging",
    icon: < FaEnvelope className="w-5 h-5" />,
    href: "/messages",
  },
  {
    label: "Notifications",
    icon: <FaBell className="w-5 h-5" />,
    href: "/notifications",
  },
];
