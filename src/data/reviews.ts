import { AttendedExperience, Review } from '../types/review';


export const attendedExperiences: AttendedExperience[] = [
  { id: 'att-01', experienceId: 'exp-08', attendedAt: '2026-10-24', guests: 2 },
  { id: 'att-02', experienceId: 'exp-01', attendedAt: '2026-10-18', guests: 2 },
  { id: 'att-03', experienceId: 'exp-03', attendedAt: '2026-09-12', guests: 1 },
  { id: 'att-04', experienceId: 'exp-04', attendedAt: '2026-08-30', guests: 4 },
  { id: 'att-05', experienceId: 'exp-02', attendedAt: '2026-07-19', guests: 2 },
  { id: 'att-06', experienceId: 'exp-06', attendedAt: '2026-06-21', guests: 2 },
  { id: 'att-07', experienceId: 'exp-05', attendedAt: '2026-05-10', guests: 1 },
];

export const seedReviews: Review[] = [
  {
    id: 'rev-01',
    experienceId: 'exp-03',
    rating: 5,
    comment:
      'Aprendi mais sobre café em uma hora do que em anos tomando. O João Pedro explica sem pressa e deixa a gente provar de tudo.',
    createdAt: '2026-09-13',
  },
  {
    id: 'rev-02',
    experienceId: 'exp-04',
    rating: 5,
    comment:
      'Fogão a lenha, mesa farta e a Dona Zélia contando história de cada receita. Fomos em quatro e ninguém queria ir embora.',
    createdAt: '2026-08-31',
  },
  {
    id: 'rev-03',
    experienceId: 'exp-02',
    rating: 4,
    comment:
      'Menu muito bem pensado e serviço impecável. Só achei o intervalo entre os tempos um pouco longo.',
    createdAt: '2026-07-20',
  },
  {
    id: 'rev-04',
    experienceId: 'exp-06',
    rating: 5,
    comment: 'Combinações que eu nunca teria imaginado na minha vida. Os queijos estavam saborosos, amei.',
    createdAt: '2026-06-22',
  },
  {
    id: 'rev-05',
    experienceId: 'exp-05',
    rating: 4,
    comment:
      'Saí com a massa feita por mim e uma receita que realmente funciona em casa. A turma poderia ser menor.',
    createdAt: '2026-05-11',
  },
];
