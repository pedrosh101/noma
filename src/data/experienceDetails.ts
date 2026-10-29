import { ExperienceExtras } from '../types/experience';

/**
 * Conteúdo exclusivo da página de cada experiência, indexado pelo id.
 * Numa API real, tudo isso viria em GET /experiences/:id.
 */
export const experienceDetails: Record<string, ExperienceExtras> = {
  'exp-01': {
    description:
      'Uma noite íntima na adega, com cinco rótulos de vinhos naturais mineiros e do sul do país servidos à luz de velas. A Marina conta a história de cada produtor e conduz a degustação sem pressa, do mais leve ao mais encorpado.',
    included: [
      '5 vinhos naturais em taça cheia',
      'Tábua de queijos e embutidos da região',
      'Água e pães à vontade',
      'Conversa com a sommelière',
    ],
    maxGuests: 10,
    schedule: 'Sex e sáb · 19h30',
    meetingPoint: 'Rua do Rosário, 142 · Centro Histórico',
    guestReviews: [
      { id: 'g-01a', author: 'Camila R.', avatarUrl: 'https://i.pravatar.cc/80?img=1', rating: 5, comment: 'Ambiente lindíssimo e vinhos que eu nunca teria escolhido sozinha. Voltaria amanhã.', date: '2026-10-04' },
      { id: 'g-01b', author: 'Rodrigo T.', avatarUrl: 'https://i.pravatar.cc/80?img=11', rating: 5, comment: 'A Marina explica de um jeito leve, sem pose. A tábua de queijos é excelente.', date: '2026-09-20' },
    ],
  },
  'exp-02': {
    description:
      'Seis tempos autorais com ingredientes do Vale do Jequitinhonha, servidos numa mesa única de doze lugares. O chef Rafael finaliza cada prato à vista e conta de onde veio cada ingrediente.',
    included: [
      'Menu de seis tempos',
      'Drink de boas-vindas',
      'Água e café',
      'Cardápio assinado para levar',
    ],
    maxGuests: 12,
    schedule: 'Sáb · 20h',
    meetingPoint: 'Rua Direita, 89 · Centro',
    guestReviews: [
      { id: 'g-02a', author: 'Luiza P.', avatarUrl: 'https://i.pravatar.cc/80?img=9', rating: 5, comment: 'Cada prato era uma história. Melhor jantar do ano, sem exagero.', date: '2026-10-11' },
      { id: 'g-02b', author: 'Henrique A.', avatarUrl: 'https://i.pravatar.cc/80?img=14', rating: 5, comment: 'A mesa única faz toda a diferença: jantamos com desconhecidos e saímos amigos.', date: '2026-09-27' },
    ],
  },
  'exp-03': {
    description:
      'Acompanhe a torra de um café especial do começo ao fim e aprenda a perceber o que muda no sabor a cada minuto. No final, você prova três perfis de torra preparados na hora e leva um pacote de grãos para casa.',
    included: [
      'Acompanhamento de uma torra completa',
      'Degustação de 3 perfis de torra',
      '250 g de café para levar',
      'Pão de queijo e doce de leite',
    ],
    maxGuests: 8,
    schedule: 'Qua a sáb · 10h e 15h',
    meetingPoint: 'Av. da Saudade, 310 · Diamantina',
    guestReviews: [
      { id: 'g-03a', author: 'Bianca M.', avatarUrl: 'https://i.pravatar.cc/80?img=20', rating: 5, comment: 'Cheiro de café fresco por todo lado e o João explica tudo com paciência.', date: '2026-10-08' },
      { id: 'g-03b', author: 'Thiago L.', avatarUrl: 'https://i.pravatar.cc/80?img=52', rating: 4, comment: 'Vale cada centavo. O pacote de grãos que levei acabou em dois dias.', date: '2026-09-15' },
    ],
  },
  'exp-04': {
    description:
      'Almoço servido em panelas de ferro no fogão a lenha, com receitas que a Dona Zélia herdou da avó: frango com quiabo, tutu, couve na hora e doces de tacho. Depois, um passeio curto pela horta da fazenda.',
    included: [
      'Almoço mineiro à vontade',
      'Suco de fruta da fazenda',
      'Doce de tacho com queijo',
      'Passeio guiado pela horta',
    ],
    maxGuests: 14,
    schedule: 'Sáb e dom · 12h',
    meetingPoint: 'Estrada Real, km 7 · Milho Verde',
    guestReviews: [
      { id: 'g-04a', author: 'Patrícia S.', avatarUrl: 'https://i.pravatar.cc/80?img=23', rating: 5, comment: 'Comida de vó, mesa farta e gente acolhedora. Chorei de emoção com o doce de leite.', date: '2026-10-13' },
      { id: 'g-04b', author: 'André C.', avatarUrl: 'https://i.pravatar.cc/80?img=57', rating: 5, comment: 'Fomos em família e as crianças amaram a horta.', date: '2026-09-29' },
    ],
  },
  'exp-05': {
    description:
      'Do zero: abrir a massa, cortar, rechear e cozinhar. Em três horas, você sai sabendo fazer três formatos de massa e dois molhos que funcionam em qualquer cozinha.',
    included: [
      'Ingredientes e avental',
      '3 formatos de massa e 2 molhos',
      'Almoço com o que você preparou',
      'Receituário digital',
    ],
    maxGuests: 8,
    schedule: 'Dom · 10h',
    meetingPoint: 'Rua Quitanda, 57 · Centro',
    guestReviews: [
      { id: 'g-05a', author: 'Fernanda O.', avatarUrl: 'https://i.pravatar.cc/80?img=31', rating: 5, comment: 'Saí com a receita e com confiança para repetir em casa.', date: '2026-10-05' },
      { id: 'g-05b', author: 'Gustavo V.', avatarUrl: 'https://i.pravatar.cc/80?img=59', rating: 4, comment: 'Turma animada e a Bianca é ótima. Só queria mais tempo!', date: '2026-09-08' },
    ],
  },
  'exp-06': {
    description:
      'Seis queijos artesanais da Serra e do Serro harmonizados com espumantes brasileiros. Você aprende a combinar textura, acidez e maturação sem decorar regra nenhuma.',
    included: [
      '6 queijos artesanais',
      '3 espumantes nacionais',
      'Geleias e castanhas da região',
      'Guia de harmonização',
    ],
    maxGuests: 12,
    schedule: 'Qui e sex · 18h30',
    meetingPoint: 'Praça Antônio Eulálio, 21 · Centro',
    guestReviews: [
      { id: 'g-06a', author: 'Larissa F.', avatarUrl: 'https://i.pravatar.cc/80?img=44', rating: 5, comment: 'Queijos incríveis. O espumante com o curado foi uma descoberta.', date: '2026-10-02' },
      { id: 'g-06b', author: 'Marcos D.', avatarUrl: 'https://i.pravatar.cc/80?img=68', rating: 4, comment: 'Ótimo para ir em casal ou com amigos.', date: '2026-09-18' },
    ],
  },
  'exp-07': {
    description:
      'Entrada, prato principal e sobremesa assinados pelo chef Juan, com ingredientes de pequenos produtores locais. A cozinha é aberta e você pode conversar com o chef durante o serviço.',
    included: [
      'Menu de três tempos',
      'Bebida de boas-vindas',
      'Água e café',
      'Receita da sobremesa para levar',
    ],
    maxGuests: 16,
    schedule: 'Sex a dom · 12h30',
    meetingPoint: 'Largo Dom João, 33 · Centro',
    guestReviews: [
      { id: 'g-07a', author: 'Isabela N.', avatarUrl: 'https://i.pravatar.cc/80?img=25', rating: 5, comment: 'Cozinha aberta é um show à parte. Pratos lindos e saborosos.', date: '2026-10-16' },
      { id: 'g-07b', author: 'Caio B.', avatarUrl: 'https://i.pravatar.cc/80?img=33', rating: 5, comment: 'Preço justo pelo que entrega. A sobremesa é de outro mundo.', date: '2026-10-01' },
    ],
  },
  'exp-08': {
    description:
      'Aprenda o método dos profissionais para avaliar café: cheirar, sorver e comparar cinco microlotes da fazenda. A Camila guia a sessão e mostra como identificar notas de frutas, chocolate e flores.',
    included: [
      '5 microlotes para provar',
      'Roda de aromas e ficha de avaliação',
      'Café coado e pão caseiro',
      'Visita ao terreiro de secagem',
    ],
    maxGuests: 10,
    schedule: 'Sáb · 9h',
    meetingPoint: 'Estrada de Biribiri, km 3',
    guestReviews: [
      { id: 'g-08a', author: 'Renata G.', avatarUrl: 'https://i.pravatar.cc/80?img=45', rating: 5, comment: 'Mudou como eu tomo café. A visita ao terreiro foi um bônus lindo.', date: '2026-10-10' },
      { id: 'g-08b', author: 'Pedro H.', avatarUrl: 'https://i.pravatar.cc/80?img=60', rating: 5, comment: 'A Camila tem uma didática ótima. Recomendo para quem é iniciante.', date: '2026-09-26' },
    ],
  },
  'exp-09': {
    description:
      'Visite a queijaria, acompanhe a ordenha e a prensa e entenda por que o queijo do Serro é patrimônio cultural. A visita termina com almoço da roça e degustação de queijos curados.',
    included: [
      'Visita à queijaria e à sala de cura',
      'Degustação de 4 queijos',
      'Almoço da roça',
      'Queijo para levar (500 g)',
    ],
    maxGuests: 12,
    schedule: 'Sáb e dom · 9h30',
    meetingPoint: 'Estrada do Queijo, km 12 · Serro',
    guestReviews: [
      { id: 'g-09a', author: 'Vanessa C.', avatarUrl: 'https://i.pravatar.cc/80?img=47', rating: 5, comment: 'O Seu Geraldo é uma enciclopédia. Voltei com queijo na mala e história na cabeça.', date: '2026-10-12' },
      { id: 'g-09b', author: 'Eduardo M.', avatarUrl: 'https://i.pravatar.cc/80?img=65', rating: 5, comment: 'Experiência autêntica, nada de turístico.', date: '2026-09-21' },
    ],
  },
  'exp-10': {
    description:
      'Crie seu fermento do zero, entenda hidratação e dobras e asse o seu próprio pão de fermentação natural. Você leva a massa-mãe pronta para continuar em casa.',
    included: [
      'Massa-mãe para levar',
      '1 pão assado por você',
      'Ingredientes e utensílios',
      'Café da manhã com os pães da casa',
    ],
    maxGuests: 8,
    schedule: 'Dom · 8h30',
    meetingPoint: 'Rua do Contrato, 70 · Centro',
    guestReviews: [
      { id: 'g-10a', author: 'Aline P.', avatarUrl: 'https://i.pravatar.cc/80?img=36', rating: 5, comment: 'Já estou no segundo pão em casa. A Helena explica com muito carinho.', date: '2026-10-09' },
      { id: 'g-10b', author: 'Daniel R.', avatarUrl: 'https://i.pravatar.cc/80?img=70', rating: 4, comment: 'Muito conteúdo em três horas e meia. Valeu cada minuto.', date: '2026-09-14' },
    ],
  },
  'exp-11': {
    description:
      'Cinco rótulos de vinícolas mineiras de altitude, harmonizados com petiscos regionais. O Otávio mostra como o clima da serra aparece na taça.',
    included: [
      '5 vinhos de altitude mineiros',
      'Petiscos harmonizados',
      'Material de degustação',
      'Desconto de 10% em garrafas',
    ],
    maxGuests: 12,
    schedule: 'Qui a sáb · 19h',
    meetingPoint: 'Rua Macau de Baixo, 18 · Centro',
    guestReviews: [
      { id: 'g-11a', author: 'Júlia K.', avatarUrl: 'https://i.pravatar.cc/80?img=41', rating: 5, comment: 'Não sabia que Minas fazia vinho tão bom. Surpresa total.', date: '2026-10-14' },
      { id: 'g-11b', author: 'Fábio S.', avatarUrl: 'https://i.pravatar.cc/80?img=53', rating: 4, comment: 'Boa seleção e petiscos caprichados.', date: '2026-09-30' },
    ],
  },
  'exp-12': {
    description:
      'Jantar ao redor do fogão a lenha com feijão tropeiro, carne de panela e causos contados por quem nasceu na região. Termina com café coado na hora e prosa na varanda.',
    included: [
      'Jantar à vontade',
      'Bebidas não alcoólicas',
      'Café coado e doces da fazenda',
      'Roda de causos e viola',
    ],
    maxGuests: 16,
    schedule: 'Sex e sáb · 19h',
    meetingPoint: 'Estrada Real, km 7 · Milho Verde',
    guestReviews: [
      { id: 'g-12a', author: 'Cristina L.', avatarUrl: 'https://i.pravatar.cc/80?img=38', rating: 5, comment: 'Parecia jantar na casa de um parente que a gente quer muito bem.', date: '2026-10-17' },
      { id: 'g-12b', author: 'Rafael G.', avatarUrl: 'https://i.pravatar.cc/80?img=62', rating: 5, comment: 'A viola e os causos fizeram a noite.', date: '2026-10-03' },
    ],
  },
};
