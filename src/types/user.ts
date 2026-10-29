export interface User {
  id: string;
  name: string;
  firstName: string;
  email: string;
  city: string; // mesmo formato do catálogo: "Diamantina, MG"
  memberSince: string; // ISO date
}
