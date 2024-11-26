export interface AuthIF {
  user: string | null;
  saveUser: (user: string) => void;
  logout: () => void;
}
