import { Icons } from "@/components/icons";
import { NavItem, SidebarNavItem } from "@/types";

export type User = {
  id: number;
  name: string;
  company: string;
  role: string;
  verified: boolean;
  status: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    company: "Dell",
    role: "Frontend Developer",
    verified: false,
    status: "Active",
  },
  {
    id: 2,
    name: "John Doe",
    company: "TechCorp",
    role: "Backend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 3,
    name: "Alice Johnson",
    company: "WebTech",
    role: "UI Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 4,
    name: "David Smith",
    company: "Innovate Inc.",
    role: "Fullstack Developer",
    verified: false,
    status: "Inactive",
  },
  {
    id: 5,
    name: "Emma Wilson",
    company: "TechGuru",
    role: "Product Manager",
    verified: true,
    status: "Active",
  },
  {
    id: 6,
    name: "James Brown",
    company: "CodeGenius",
    role: "QA Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 7,
    name: "Laura White",
    company: "SoftWorks",
    role: "UX Designer",
    verified: true,
    status: "Active",
  },
  {
    id: 8,
    name: "Michael Lee",
    company: "DevCraft",
    role: "DevOps Engineer",
    verified: false,
    status: "Active",
  },
  {
    id: 9,
    name: "Olivia Green",
    company: "WebSolutions",
    role: "Frontend Developer",
    verified: true,
    status: "Active",
  },
  {
    id: 10,
    name: "Robert Taylor",
    company: "DataTech",
    role: "Data Analyst",
    verified: false,
    status: "Active",
  },
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Schedule",
    href: "/schedule",
    icon: "dashboard",
    label: "Schedule",
  },
  {
    title: "Student",
    href: "/student",
    icon: "user",
    label: "student",
  },
  {
    title: "Courses",
    href: "/courses",
    icon: "user",
    label: "student",
  },
];
export type Course = {
  id: string;
  userId: string;
  title: string;
  description?: string | null;
  imageUrl?: string | null;
  price?: number | null;
  isPublished: boolean;
  categoryId?: string | null;
  category?: Category | null;
  chapters: Chapter[];
  attachments: Attachment[];
  purchases: Purchase[];
  createdAt: Date;
  updatedAt: Date;
};

export type Category = {
  id: string;
  name: string;
  courses: Course[];
};

export type Attachment = {
  id: string;
  name: string;
  url: string;
  courseId: string;
  course: Course;
  createdAt: Date;
  updatedAt: Date;
};

export type Chapter = {
  id: string;
  title: string;
  description?: string | null;
  videoUrl?: string | null;
  position: number;
  isPublished: boolean;
  isFree: boolean;
  muxData?: MuxData | null;
  courseId: string;
  course: Course;
  userProgress: UserProgress[];
  createdAt: Date;
  updatedAt: Date;
};

export type MuxData = {
  id: string;
  assetId: string;
  playbackId?: string | null;
  chapterId: string;
  chapter: Chapter;
};

export type UserProgress = {
  id: string;
  userId: string;
  chapterId: string;
  chapter: Chapter;
  isCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
};

export type Purchase = {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  createdAt: Date;
  updatedAt: Date;
};

export type StripeCustomer = {
  id: string;
  userId: string;
  stripeCustomerId: string;
  createdAt: Date;
  updatedAt: Date;
};
export const mockData = {
  Course: {
    id: "1",
    userId: "user1",
    title: "Math Course",
    description: "This is a math course",
    imageUrl: "https://example.com/image.jpg",
    price: 100.0,
    isPublished: true,
    categoryId: "category1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  Category: {
    id: "category1",
    name: "Math",
  },
  Attachment: {
    id: "attachment1",
    name: "Attachment 1",
    url: "https://example.com/attachment.pdf",
    courseId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  Chapter: {
    id: "chapter1",
    title: "Chapter 1",
    description: "This is chapter 1",
    videoUrl: "https://example.com/video.mp4",
    position: 1,
    isPublished: true,
    isFree: false,
    courseId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  MuxData: {
    id: "muxdata1",
    assetId: "asset1",
    playbackId: "playback1",
    chapterId: "chapter1",
  },
  UserProgress: {
    id: "userprogress1",
    userId: "user1",
    chapterId: "chapter1",
    isCompleted: false,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  Purchase: {
    id: "purchase1",
    userId: "user1",
    courseId: "1",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
};
import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckCircledIcon,
  CircleIcon,
  CrossCircledIcon,
  QuestionMarkCircledIcon,
  StopwatchIcon,
} from "@radix-ui/react-icons";

export const labels = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Documentation",
  },
];

export const statuses = [
  {
    value: "backlog",
    label: "Backlog",
    icon: QuestionMarkCircledIcon,
  },
  {
    value: "todo",
    label: "Todo",
    icon: CircleIcon,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: StopwatchIcon,
  },
  {
    value: "done",
    label: "Done",
    icon: CheckCircledIcon,
  },
  {
    value: "canceled",
    label: "Canceled",
    icon: CrossCircledIcon,
  },
];

export const priorities = [
  {
    label: "Low",
    value: "low",
    icon: ArrowDownIcon,
  },
  {
    label: "Medium",
    value: "medium",
    icon: ArrowRightIcon,
  },
  {
    label: "High",
    value: "high",
    icon: ArrowUpIcon,
  },
];
import { z } from "zod";

export const taskSchema = z.object({
  id: z.string(),
  code: z.number(),
  // title: z.string(),
  status: z.string(),
  label: z.string(),
  // priority: z.string(),
});

export type Task = z.infer<typeof taskSchema>;

export const progressSchema = z.object({
  id: z.string(),
  code: z.number(),
  fullName: z.string(),
  courses: z.array(z.string()),
});
export type ProgressSchema = z.infer<typeof progressSchema>;
