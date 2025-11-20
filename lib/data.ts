export interface User {
  id: string;
  email: string;
  name: string;
  selectedCargo?: string;
  isPremium?: boolean;
}

export interface Cargo {
  id: string;
  name: string;
  description: string;
  materias: Materia[];
}

export interface Materia {
  id: string;
  name: string;
  description: string;
  cargoId: string;
  hasSimulado: boolean;
  isPremium?: boolean;
}

export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
  materiaId: string;
  difficulty: 'easy' | 'medium' | 'hard';
  isPremium?: boolean;
}

export interface Simulado {
  id: string;
  materiaId: string;
  name: string;
  difficulty: 'easy' | 'medium' | 'hard' | 'general';
  questions: Question[];
  isPremium?: boolean;
}

export interface Performance {
  userId: string;
  simuladoId: string;
  score: number;
  totalQuestions: number;
  date: Date;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
}

// Mock data with all positions and subjects
export const mockCargos: Cargo[] = [
  {
    id: 'professor-portugues',
    name: 'Professor PII – Língua Portuguesa',
    description: 'Professor de Língua Portuguesa para Ensino Fundamental II',
    materias: [
      { id: 'portugues-lingua', name: 'Língua Portuguesa', description: 'Estudo da língua portuguesa', cargoId: 'professor-portugues', hasSimulado: true },
      { id: 'portugues-interpretacao', name: 'Interpretação de Texto', description: 'Análise de textos', cargoId: 'professor-portugues', hasSimulado: true },
      { id: 'portugues-literatura', name: 'Literatura', description: 'Estudos literários', cargoId: 'professor-portugues', hasSimulado: true },
      { id: 'portugues-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-portugues', hasSimulado: true, isPremium: true },
      { id: 'portugues-pedagogia', name: 'Conhecimentos Pedagógicos', description: 'Pedagogia', cargoId: 'professor-portugues', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-matematica',
    name: 'Professor PII – Matemática',
    description: 'Professor de Matemática para Ensino Fundamental II',
    materias: [
      { id: 'matematica-basica', name: 'Matemática', description: 'Matemática básica', cargoId: 'professor-matematica', hasSimulado: true },
      { id: 'matematica-logico', name: 'Raciocínio Lógico', description: 'Lógica matemática', cargoId: 'professor-matematica', hasSimulado: true },
      { id: 'matematica-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-matematica', hasSimulado: true, isPremium: true },
      { id: 'matematica-pedagogia', name: 'Conhecimentos Pedagógicos', description: 'Pedagogia', cargoId: 'professor-matematica', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-ciencias',
    name: 'Professor PII – Ciências',
    description: 'Professor de Ciências para Ensino Fundamental II',
    materias: [
      { id: 'ciencias-biologia', name: 'Biologia Geral', description: 'Biologia básica', cargoId: 'professor-ciencias', hasSimulado: true },
      { id: 'ciencias-naturais', name: 'Ciências Naturais', description: 'Ciências naturais', cargoId: 'professor-ciencias', hasSimulado: true },
      { id: 'ciencias-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-ciencias', hasSimulado: true, isPremium: true },
      { id: 'ciencias-pedagogia', name: 'Conhecimentos Pedagógicos', description: 'Pedagogia', cargoId: 'professor-ciencias', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-historia',
    name: 'Professor PII – História',
    description: 'Professor de História para Ensino Fundamental II',
    materias: [
      { id: 'historia-geral', name: 'História Geral', description: 'História mundial', cargoId: 'professor-historia', hasSimulado: true },
      { id: 'historia-brasil', name: 'História do Brasil', description: 'História brasileira', cargoId: 'professor-historia', hasSimulado: true },
      { id: 'historia-minas', name: 'História de Minas Gerais', description: 'História mineira', cargoId: 'professor-historia', hasSimulado: true },
      { id: 'historia-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-historia', hasSimulado: true, isPremium: true },
      { id: 'historia-pedagogia', name: 'Pedagogia', description: 'Pedagogia', cargoId: 'professor-historia', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-geografia',
    name: 'Professor PII – Geografia',
    description: 'Professor de Geografia para Ensino Fundamental II',
    materias: [
      { id: 'geografia-geral', name: 'Geografia Geral', description: 'Geografia mundial', cargoId: 'professor-geografia', hasSimulado: true },
      { id: 'geografia-brasil', name: 'Geografia do Brasil', description: 'Geografia brasileira', cargoId: 'professor-geografia', hasSimulado: true },
      { id: 'geografia-minas', name: 'Geografia de Minas Gerais', description: 'Geografia mineira', cargoId: 'professor-geografia', hasSimulado: true },
      { id: 'geografia-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-geografia', hasSimulado: true, isPremium: true },
      { id: 'geografia-didatica', name: 'Didática', description: 'Didática', cargoId: 'professor-geografia', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-ingles',
    name: 'Professor PII – Inglês',
    description: 'Professor de Inglês para Ensino Fundamental II',
    materias: [
      { id: 'ingles-gramatica', name: 'Gramática', description: 'Gramática inglesa', cargoId: 'professor-ingles', hasSimulado: true },
      { id: 'ingles-compreensao', name: 'Compreensão de Texto em Inglês', description: 'Leitura em inglês', cargoId: 'professor-ingles', hasSimulado: true },
      { id: 'ingles-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-ingles', hasSimulado: true, isPremium: true },
      { id: 'ingles-pedagogia', name: 'Conhecimentos Pedagógicos', description: 'Pedagogia', cargoId: 'professor-ingles', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-educacao-fisica',
    name: 'Professor PII – Educação Física',
    description: 'Professor de Educação Física para Ensino Fundamental II',
    materias: [
      { id: 'edfisica-teorias', name: 'Teorias do Movimento', description: 'Teorias do movimento', cargoId: 'professor-educacao-fisica', hasSimulado: true },
      { id: 'edfisica-esportes', name: 'Esportes', description: 'Esportes', cargoId: 'professor-educacao-fisica', hasSimulado: true },
      { id: 'edfisica-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-educacao-fisica', hasSimulado: true, isPremium: true },
      { id: 'edfisica-pedagogia', name: 'Pedagogia', description: 'Pedagogia', cargoId: 'professor-educacao-fisica', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'professor-infantil',
    name: 'Professor PI-L / PEI – Educação Infantil',
    description: 'Professor para Educação Infantil',
    materias: [
      { id: 'infantil-desenvolvimento', name: 'Desenvolvimento Infantil', description: 'Desenvolvimento da criança', cargoId: 'professor-infantil', hasSimulado: true },
      { id: 'infantil-didatica', name: 'Didática', description: 'Didática', cargoId: 'professor-infantil', hasSimulado: true },
      { id: 'infantil-psicopedagogia', name: 'Psicopedagogia', description: 'Psicopedagogia', cargoId: 'professor-infantil', hasSimulado: true },
      { id: 'infantil-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'professor-infantil', hasSimulado: true, isPremium: true },
      { id: 'infantil-bncc', name: 'BNCC', description: 'Base Nacional Comum Curricular', cargoId: 'professor-infantil', hasSimulado: true, isPremium: true },
      { id: 'infantil-curriculo', name: 'Currículo Infantil', description: 'Currículo para educação infantil', cargoId: 'professor-infantil', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'pedagogo',
    name: 'Pedagogo',
    description: 'Especialista em Pedagogia',
    materias: [
      { id: 'pedagogo-pedagogia', name: 'Pedagogia', description: 'Pedagogia', cargoId: 'pedagogo', hasSimulado: true },
      { id: 'pedagogo-psicologia', name: 'Psicologia da Educação', description: 'Psicologia educacional', cargoId: 'pedagogo', hasSimulado: true },
      { id: 'pedagogo-avaliacao', name: 'Avaliação', description: 'Avaliação educacional', cargoId: 'pedagogo', hasSimulado: true },
      { id: 'pedagogo-didatica', name: 'Didática', description: 'Didática', cargoId: 'pedagogo', hasSimulado: true },
      { id: 'pedagogo-gestao', name: 'Gestão Escolar', description: 'Gestão escolar', cargoId: 'pedagogo', hasSimulado: true },
      { id: 'pedagogo-legislacao', name: 'Legislação Educacional', description: 'Leis educacionais', cargoId: 'pedagogo', hasSimulado: true, isPremium: true },
    ],
  },
  {
    id: 'tecnico-biblioteca',
    name: 'Técnico de Biblioteca',
    description: 'Técnico responsável pela biblioteca escolar',
    materias: [
      { id: 'biblioteca-biblioteconomia', name: 'Biblioteconomia', description: 'Biblioteconomia', cargoId: 'tecnico-biblioteca', hasSimulado: true },
      { id: 'biblioteca-organizacao', name: 'Organização e Classificação de Acervos', description: 'Organização de livros', cargoId: 'tecnico-biblioteca', hasSimulado: true },
      { id: 'biblioteca-atendimento', name: 'Atendimento ao Público', description: 'Atendimento', cargoId: 'tecnico-biblioteca', hasSimulado: true },
      { id: 'biblioteca-informatica', name: 'Informática Essencial', description: 'Informática básica', cargoId: 'tecnico-biblioteca', hasSimulado: true },
      { id: 'biblioteca-portugues', name: 'Língua Portuguesa', description: 'Português', cargoId: 'tecnico-biblioteca', hasSimulado: true },
    ],
  },
  {
    id: 'tecnico-secretaria',
    name: 'Técnico de Secretaria Escolar',
    description: 'Técnico administrativo da secretaria escolar',
    materias: [
      { id: 'secretaria-administracao', name: 'Administração Escolar', description: 'Administração escolar', cargoId: 'tecnico-secretaria', hasSimulado: true },
      { id: 'secretaria-atendimento', name: 'Atendimento ao Público', description: 'Atendimento', cargoId: 'tecnico-secretaria', hasSimulado: true },
      { id: 'secretaria-informatica', name: 'Informática', description: 'Informática', cargoId: 'tecnico-secretaria', hasSimulado: true },
      { id: 'secretaria-portugues', name: 'Língua Portuguesa', description: 'Português', cargoId: 'tecnico-secretaria', hasSimulado: true },
    ],
  },
  {
    id: 'auxiliar-administrativo',
    name: 'Auxiliar Administrativo da Educação',
    description: 'Auxiliar administrativo na educação',
    materias: [
      { id: 'auxiliar-administracao', name: 'Administração Básica', description: 'Administração básica', cargoId: 'auxiliar-administrativo', hasSimulado: true },
      { id: 'auxiliar-atendimento', name: 'Atendimento', description: 'Atendimento', cargoId: 'auxiliar-administrativo', hasSimulado: true },
      { id: 'auxiliar-informatica', name: 'Noções de Informática', description: 'Informática básica', cargoId: 'auxiliar-administrativo', hasSimulado: true },
      { id: 'auxiliar-portugues', name: 'Português', description: 'Português', cargoId: 'auxiliar-administrativo', hasSimulado: true },
      { id: 'auxiliar-matematica', name: 'Matemática', description: 'Matemática', cargoId: 'auxiliar-administrativo', hasSimulado: true },
    ],
  },
  {
    id: 'agente-apoio',
    name: 'Agente de Apoio Escolar',
    description: 'Agente de apoio aos estudantes',
    materias: [
      { id: 'agente-educacao-especial', name: 'Noções de Educação Especial', description: 'Educação especial', cargoId: 'agente-apoio', hasSimulado: true },
      { id: 'agente-primeiros-socorros', name: 'Primeiros Socorros', description: 'Primeiros socorros', cargoId: 'agente-apoio', hasSimulado: true },
      { id: 'agente-atendimento', name: 'Atendimento', description: 'Atendimento', cargoId: 'agente-apoio', hasSimulado: true },
      { id: 'agente-portugues', name: 'Português', description: 'Português', cargoId: 'agente-apoio', hasSimulado: true },
      { id: 'agente-legislacao', name: 'Legislação', description: 'Legislação', cargoId: 'agente-apoio', hasSimulado: true },
    ],
  },
];

export const mockSimulados: Simulado[] = [
  // Example for one subject, expand similarly
  {
    id: 'portugues-easy',
    materiaId: 'portugues-lingua',
    name: 'Simulado Fácil - Língua Portuguesa',
    difficulty: 'easy',
    questions: [
      {
        id: 'q1',
        text: 'Qual é a função da vírgula em uma oração?',
        options: ['Separar palavras', 'Indicar pausa', 'Substituir ponto', 'Marcar acento'],
        correctAnswer: 1,
        explanation: 'A vírgula é usada para indicar pausa em uma oração.',
        materiaId: 'portugues-lingua',
        difficulty: 'easy',
      },
      // Add more questions
    ],
  },
  // Add more simulations for other subjects and difficulties
];

export const mockUsers: User[] = [
  { id: '1', email: 'user@example.com', name: 'João Silva', isPremium: false },
];

export const mockAchievements: Achievement[] = [
  { id: '1', name: 'Primeira Questão', description: 'Responda sua primeira questão', icon: '🏆', unlocked: false },
  { id: '2', name: '50 Acertos', description: 'Acerte 50 questões', icon: '⭐', unlocked: false },
];

// Helper functions
export const getCargoById = (id: string): Cargo | undefined => {
  return mockCargos.find(cargo => cargo.id === id);
};

export const getMateriasByCargo = (cargoId: string): Materia[] => {
  const cargo = getCargoById(cargoId);
  return cargo ? cargo.materias : [];
};

export const getSimuladoByMateria = (materiaId: string): Simulado | undefined => {
  return mockSimulados.find(simulado => simulado.materiaId === materiaId);
};