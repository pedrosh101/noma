import { User } from '../types/user';

/**
 * Usuário logado (mock). Quando existir autenticação, isto passa a vir de um
 * contexto de sessão — as telas já leem daqui, então a troca fica num lugar só.
 */
export const currentUser: User = {
  id: 'user-01',
  name: 'Maria Tereza',
  firstName: 'Maria',
  email: 'mariatereza@email.com',
  city: 'Diamantina, MG',
  memberSince: '2026-03-14',
};
