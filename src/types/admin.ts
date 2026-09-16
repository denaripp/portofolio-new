export interface AdminSession {
  id: string;
  username: string;
  email: string;
  name: string;
}

export interface AdminStats {
  projectsCount: number;
  skillsCount: number;
  certificatesCount: number;
  socialLinksCount: number;
}
