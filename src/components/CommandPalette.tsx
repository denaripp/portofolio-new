"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
} from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  Search,
  Home,
  FolderGit2,
  User,
  FileText,
  MessageSquare,
  Copy,
  Check,
  ExternalLink,
  Sparkles,
  Download,
  ArrowRight,
} from "lucide-react";
import { portfolioData, getWhatsAppUrl, getLocalizedProject } from "@/data/portfolio";
import { useLanguage } from "@/context/LanguageContext";

interface CommandPaletteContextType {
  isOpen: boolean;
  openPalette: () => void;
  closePalette: () => void;
  togglePalette: () => void;
}

const CommandPaletteContext = createContext<CommandPaletteContextType>({
  isOpen: false,
  openPalette: () => {},
  closePalette: () => {},
  togglePalette: () => {},
});

export function useCommandPalette() {
  return useContext(CommandPaletteContext);
}

interface CommandAction {
  id: string;
  label: string;
  subtitle?: string;
  group: "Pages" | "Case Studies" | "Direct Contact & Links";
  icon: React.ReactNode;
  shortcut?: string;
  keywords?: string[];
  onSelect: () => void;
}

export function CommandPaletteProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);
  const router = useRouter();
  const { lang } = useLanguage();

  const openPalette = useCallback(() => setIsOpen(true), []);
  const closePalette = useCallback(() => setIsOpen(false), []);
  const togglePalette = useCallback(() => setIsOpen((prev) => !prev), []);

  const actions: CommandAction[] = useMemo(
    () => [
      {
        id: "nav-home",
        label: "Go to Home",
        subtitle: "Overview, featured work, and experience",
        group: "Pages",
        icon: <Home className="size-4 text-[#39a875]" />,
        shortcut: "G H",
        keywords: ["home", "main", "beranda"],
        onSelect: () => {
          router.push("/");
          closePalette();
        },
      },
      {
        id: "nav-projects",
        label: "Go to Projects",
        subtitle: "Browse all fullstack & SaaS case studies",
        group: "Pages",
        icon: <FolderGit2 className="size-4 text-[#39a875]" />,
        shortcut: "G P",
        keywords: ["projects", "proyek", "portfolio", "karya"],
        onSelect: () => {
          router.push("/projects");
          closePalette();
        },
      },
      {
        id: "nav-about",
        label: "Go to About",
        subtitle: "Vibe Coder Fullstack philosophy & stack",
        group: "Pages",
        icon: <User className="size-4 text-[#39a875]" />,
        shortcut: "G A",
        keywords: ["about", "tentang", "bio", "profile"],
        onSelect: () => {
          router.push("/about");
          closePalette();
        },
      },
      {
        id: "nav-resume",
        label: "Go to Resume",
        subtitle: "Full work history, skills & PDF download",
        group: "Pages",
        icon: <FileText className="size-4 text-[#39a875]" />,
        shortcut: "G R",
        keywords: ["resume", "cv", "pengalaman", "experience"],
        onSelect: () => {
          router.push("/resume");
          closePalette();
        },
      },
      ...portfolioData.projects.map((rawProject) => {
        const project = getLocalizedProject(rawProject, lang);
        return {
          id: `project-${project.slug}`,
          label: project.title,
          subtitle: `${project.category} · ${project.year} — ${project.summary}`,
          group: "Case Studies" as const,
          icon: <Sparkles className="size-4 text-[#39a875]" />,
          keywords: [project.slug, project.title, project.category, ...project.techStack],
          onSelect: () => {
            router.push(`/projects/${project.slug}`);
            closePalette();
          },
        };
      }),
      {
        id: "contact-whatsapp",
        label: "Chat on WhatsApp",
        subtitle: "Start a direct conversation about your project",
        group: "Direct Contact & Links",
        icon: <MessageSquare className="size-4 text-[#39a875]" />,
        shortcut: "WA",
        keywords: ["whatsapp", "chat", "contact", "hubungi", "wa"],
        onSelect: () => {
          window.open(getWhatsAppUrl(), "_blank", "noopener,noreferrer");
          closePalette();
        },
      },
      {
        id: "copy-email",
        label: copiedEmail
          ? "Email Copied to Clipboard!"
          : `Copy Email (${portfolioData.profile.email})`,
        subtitle: "Copy address to clipboard",
        group: "Direct Contact & Links",
        icon: copiedEmail ? (
          <Check className="size-4 text-[#39a875]" />
        ) : (
          <Copy className="size-4 text-[#858786]" />
        ),
        shortcut: "⌘ C",
        keywords: ["email", "mail", "copy", "salin"],
        onSelect: () => {
          navigator.clipboard.writeText(portfolioData.profile.email);
          setCopiedEmail(true);
          setTimeout(() => {
            setCopiedEmail(false);
            closePalette();
          }, 900);
        },
      },
      {
        id: "download-cv",
        label: "Download Resume PDF",
        subtitle: "Save official CV document",
        group: "Direct Contact & Links",
        icon: <Download className="size-4 text-[#858786]" />,
        keywords: ["pdf", "download", "unduh", "cv"],
        onSelect: () => {
          window.open("/resume.pdf", "_blank");
          closePalette();
        },
      },
      {
        id: "link-github",
        label: "Open GitHub Profile",
        subtitle: portfolioData.profile.socials.github,
        group: "Direct Contact & Links",
        icon: <ExternalLink className="size-4 text-[#858786]" />,
        keywords: ["github", "code", "repo"],
        onSelect: () => {
          window.open(
            portfolioData.profile.socials.github,
            "_blank",
            "noopener,noreferrer"
          );
          closePalette();
        },
      },
      {
        id: "link-linkedin",
        label: "Open LinkedIn Profile",
        subtitle: portfolioData.profile.socials.linkedin,
        group: "Direct Contact & Links",
        icon: <ExternalLink className="size-4 text-[#858786]" />,
        keywords: ["linkedin", "social"],
        onSelect: () => {
          window.open(
            portfolioData.profile.socials.linkedin,
            "_blank",
            "noopener,noreferrer"
          );
          closePalette();
        },
      },
    ],
    [router, copiedEmail, closePalette, lang]
  );

  // Global keyboard shortcut to toggle palette (attached once!)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        togglePalette();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [togglePalette]);

  const groups = ["Pages", "Case Studies", "Direct Contact & Links"] as const;

  return (
    <CommandPaletteContext.Provider
      value={{ isOpen, openPalette, closePalette, togglePalette }}
    >
      {children}

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/80 px-4 pt-[12vh] backdrop-blur-sm"
          onClick={closePalette}
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          <div
            className="w-full max-w-[600px] overflow-hidden rounded-[12px] border border-[#262626] bg-[#0a0a0a] shadow-[0_24px_80px_rgba(0,0,0,0.9)]"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              loop
              onKeyDown={(e) => {
                if (e.key === "Escape") {
                  e.preventDefault();
                  closePalette();
                }
              }}
              className="flex w-full flex-col"
            >
              {/* Search Input Header */}
              <div className="flex items-center gap-3 border-b border-[#1a1a1a] px-4 py-3.5">
                <Search className="size-4 shrink-0 text-[#39a875]" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search pages, projects, contact..."
                  className="w-full bg-transparent text-[14px] text-white placeholder-[#858786] focus:outline-none"
                />
                <button
                  type="button"
                  onClick={closePalette}
                  className="rounded border border-[#262626] bg-black px-2 py-0.5 text-[11px] text-[#858786] hover:border-[#39a875] hover:text-white"
                >
                  ESC
                </button>
              </div>

              {/* Results List */}
              <Command.List className="max-h-[380px] overflow-y-auto p-2 outline-none">
                <Command.Empty className="py-10 text-center text-[14px] text-[#858786]">
                  No matching commands found.
                </Command.Empty>

                {groups.map((groupName) => {
                  const groupItems = actions.filter((item) => item.group === groupName);
                  if (groupItems.length === 0) return null;

                  return (
                    <Command.Group
                      key={groupName}
                      heading={groupName}
                      className="mb-2 last:mb-0 [&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[11px] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-[#858786] [&_[cmdk-group-heading]]:uppercase"
                    >
                      {groupItems.map((item) => (
                        <Command.Item
                          key={item.id}
                          value={`${item.label} ${item.subtitle || ""} ${item.keywords?.join(" ") || ""}`}
                          onSelect={item.onSelect}
                          className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-[8px] px-3 py-2.5 text-left text-[#d4d4d4] transition-colors aria-selected:bg-[#141414] aria-selected:text-white"
                        >
                          <div className="flex min-w-0 items-center gap-3">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-[6px] border border-[#1f1f1f] bg-black group-aria-selected:border-[#39a875]/50 group-aria-selected:bg-[#39a875]/10">
                              {item.icon}
                            </div>
                            <div className="min-w-0">
                              <div className="truncate text-[14px] font-medium text-white">
                                {item.label}
                              </div>
                              {item.subtitle && (
                                <div className="truncate text-[12px] text-[#858786]">
                                  {item.subtitle}
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="flex shrink-0 items-center gap-2">
                            {item.shortcut && (
                              <span className="rounded border border-[#262626] bg-black px-1.5 py-0.5 text-[11px] text-[#858786]">
                                {item.shortcut}
                              </span>
                            )}
                            <ArrowRight className="size-3.5 text-[#858786]/40 transition-transform group-aria-selected:translate-x-0.5 group-aria-selected:text-[#39a875]" />
                          </div>
                        </Command.Item>
                      ))}
                    </Command.Group>
                  );
                })}
              </Command.List>

              {/* Footer Bar */}
              <div className="flex items-center justify-between border-t border-[#1a1a1a] bg-black px-4 py-2.5 text-[11px] text-[#858786]">
                <div className="flex items-center gap-3">
                  <span>
                    <strong className="text-white">↑↓</strong> Navigate
                  </span>
                  <span>
                    <strong className="text-white">↵</strong> Select
                  </span>
                  <span>
                    <strong className="text-white">ESC</strong> Close
                  </span>
                </div>
                <span className="text-[#39a875]">
                  {portfolioData.profile.role}
                </span>
              </div>
            </Command>
          </div>
        </div>
      )}
    </CommandPaletteContext.Provider>
  );
}
