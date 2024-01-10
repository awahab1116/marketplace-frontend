export interface User {
  id: number;
  updatedAt: string;
  createdAt: string;
  firstName: string;
  lastName: string | null;
  email: string;
  profileImage: string | null;
}
