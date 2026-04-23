export const companyInfo = {
  name: "Kuality Produtos Químicos",
  slogan: "Quem entende, busca Kuality.",
  subheadline:
    "Qualidade aliada a eficiência em produtos químicos. Com know-how de mais de 35 anos no segmento.",
  phone: "(11) 98637-0023",
  email: "cleiber@kualityquimica.com.br",
  salesEmail: "vendas@kualityquimica.com.br",
  cnpj: "00.000.000/0001-00", // Adicionado para corrigir o erro de referência
  address: {
    street: "Rua Jornal O Saltense, 87",
    neighborhood: "Parque Júlio Ustrito",
    city: "Salto - SP",
    cep: "13323-746",
  },
};
// Objeto para os textos descritivos
export const qualityContent = {
  process:
    "Nossos produtos são submetidos a ensaios rigorosos de laboratório, incluindo o Teste de Cura e o Ensaio de Névoa Salina (500hs Salt Spray), seguindo estritamente a Norma ABNT NBR 17088 - 2023.",
  result:
    'Aprovação total no controle de qualidade: Sem geração de blister, sem migração ou infiltração no "CROSS CUT" (Aderência Aprovada).',
};

// Array (Lista) para os cards de testes técnicos
export const qualityTestsList = [
  {
    nome: "Salt Spray",
    desc: "Resistência de 500hs em névoa salina corrosiva.",
  },
  {
    nome: "Teste de Cura",
    desc: "Verificação de polimerização e dureza técnica.",
  },
  { nome: "Cross Cut", desc: "Ensaio de aderência em grade conforme norma." },
  {
    nome: "Análise de PH",
    desc: "Controle de estabilidade molecular constante.",
  },
];

export const aboutText = {
  main: "Técnicos e profissionais capacitados desenvolvem em nossos laboratórios produtos com matéria-prima selecionada. Nosso objetivo é melhorar a cada dia, construindo uma relação exclusiva desde o atendimento, logística e prazos.",
  infrastructure: [
    {
      title: "Laboratórios",
      description:
        "Dois laboratórios: Controle de Qualidade e Desenvolvimento de novas tecnologias.",
    },
    {
      title: "Estoque e Equipe",
      description:
        "Programa de treinamento constante visando o aperfeiçoamento.",
    },
  ],
  licenses: [
    { name: "Exército Brasileiro", icon: "🎖️" },
    { name: "Polícia Federal", icon: "🛡️" },
    { name: "Polícia Civil", icon: "⚖️" },
    { name: "IBAMA", icon: "🌿" },
    { name: "CETESB (CADRI)", icon: "📜" },
    { name: "ANVISA", icon: "💊" },
  ],
};

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  features: string[];
  advantages: string[];
  sustainability?: string;
}

export const products: Product[] = [
  {
    id: "kualiprot-3002",
    name: "KUALIPROT 3002",
    category: "Fluidos para Corte e Usinagem",
    description:
      "Fluido sintético 100% base vegetal. Não evapora, não oxida peças e protege metais sensíveis (amarelos).",
    features: [
      "100% base vegetal",
      "Não evapora",
      "Não oxida peças",
      "Protege metais sensíveis (amarelos)",
    ],
    advantages: [
      "Excelente lubrificação",
      "Não rancifica",
      "Não dá cheiro",
      "Vida longa sem troca",
      "Protege aço/ferro fundido por até 180 dias",
    ],
  },
  {
    id: "kualiphos-604",
    name: "KUALIPHOS 604",
    category: "Tratamento 4 em 1",
    description:
      "Tecnologia Exclusiva. Ação desengraxante, decapante, apassivante e fosfatizante.",
    features: ["Desengraxante", "Decapante", "Apassivante", "Fosfatizante"],
    advantages: [
      "Tecnologia Exclusiva",
      "Não precisa de enxágue",
      "Grande economia de água",
    ],
  },
  {
    id: "kualiphos-7000",
    name: "KUALIPHOS 7000",
    category: "Tratamento 4 em 1",
    description: "Tecnologia Exclusiva com proporção 1L:100L.",
    features: [
      "Desengraxante",
      "Decapante",
      "Apassivante",
      "Fosfatizante",
      "Proporção 1L:100L",
    ],
    advantages: [
      "Tecnologia Exclusiva",
      "Alta concentração",
      "Não precisa de enxágue",
      "Grande economia de água",
    ],
  },
  {
    id: "k-200",
    name: "K 200",
    category: "Removedor de Tinta a Frio",
    description:
      "Ação em temperatura ambiente (sem aquecimento). Produto Alcalino.",
    features: [
      "Ação à temperatura ambiente",
      "Produto Alcalino",
      "Reutilização inteligente",
    ],
    advantages: [
      "Não precisa aquecer",
      "Reutilização do banho",
      "Não ataca a fosfatização",
    ],
  },
  {
    id: "kualifuel",
    name: "KUALIFUEL",
    category: "Aditivo para Combustíveis",
    description:
      "Estabilizador que reduz consumo, elimina fatores oxidantes e promove combustão completa.",
    features: [
      "Estabilizador",
      "Reduz consumo",
      "Elimina oxidantes",
      "Função anticongelante",
    ],
    advantages: [
      "Combustão completa",
      "Redução drástica de emissões",
      "Melhor performance do motor",
    ],
  },
  {
    id: "kualisolv-190-wtb",
    name: "KUALISOLV 190 WTB",
    category: "Solvente Ecológico",
    description:
      "Solvente ecológico de alto poder. Livre de BTEX (Benzeno, Tolueno e Xileno).",
    features: ["Livre de BTEX", "Alto poder de solubilização", "Não tóxico"],
    advantages: ["Odor agradável", "Ecológico", "Seguro para uso"],
  },
  {
    id: "kualiclean-640-p",
    name: "KUALICLEAN 640 P",
    category: "Limpeza Industrial",
    description:
      "Para decapagem, desoxidação de alumínio e desengraxe de vidros.",
    features: ["Decapagem", "Desoxidação de alumínio", "Desengraxe de vidros"],
    advantages: ["Multi-superfícies", "Alta eficiência", "Uso industrial"],
  },
  {
    id: "fosqueante-k-10000",
    name: "FOSQUEANTE K 10000",
    category: "Fosqueamento de Vidros",
    description:
      "Fosqueamento de vidros sem uso de produtos químicos perigosos.",
    features: ["Sem ácido fluorídrico", "Fosqueamento uniforme", "Seguro"],
    advantages: [
      "Sem químicos perigosos",
      "Resultado profissional",
      "Seguro para operador",
    ],
  },
  {
    id: "antiembaçante",
    name: "ANTIEMBAÇANTE",
    category: "Antiembaçante",
    description: "Para visores, lentes ópticas, máscaras de solda e vidraças.",
    features: [
      "Para visores",
      "Lentes ópticas",
      "Máscaras de solda",
      "Vidraças",
    ],
    advantages: ["Alta transparência", "Longa duração", "Fácil aplicação"],
  },
  // Adicione este objeto ao seu array de produtos no data/content.ts
  {
    id: "kualiphos-606",
    name: "KUALIPHOS 606",
    category: "Desengraxantes", // ou a categoria que preferir
    description:
      "Desengraxante ecológico de alta performance que combina eficiência industrial com sustentabilidade.",
    features: [
      "Desengraxante ecológico e biodegradável",
      "Fórmula com íon exclusivo Kuality",
      "Ação desoxidante e fosfatizante",
      "Agente passivante integrado",
    ],
    advantages: [
      "Remove carepa preta e resíduos de solda com facilidade",
      "Máxima proteção contra oxidação posterior",
      "Redução significativa no consumo de energia industrial",
      "Sustentabilidade: amigo do meio ambiente e da sua empresa",
    ],
  },
];

export const qualityTests = {
  // O componente Quality.tsx espera a propriedade "process"
  process:
    "Nossos produtos são submetidos a ensaios rigorosos de laboratório, incluindo o Teste de Cura e o Ensaio de Névoa Salina (500hs Salt Spray), seguindo estritamente a Norma ABNT NBR 17088 - 2023.",

  // O componente Quality.tsx espera a propriedade "result"
  result:
    'Aprovação total no controle de qualidade: Sem geração de blister, sem migração ou infiltração no "CROSS CUT" (Aderência Aprovada).',
};

export const socialProof = {
  brands: [
    "FIDELFERRO",
    "JOHN DEERE",
    "NAKATA AUTOMOTIVA",
    "MEGA LIGHT",
    "COLOMBO",
    "JUMIL",
    "IVECO",
    "WHEATON",
    "GM",
    "VOLVO",
    "KANJIKO",
  ],
};

export const ctaMessage =
  "Não feche negócio antes de falar com a Kuality, com certeza você terá uma nova solução para sua empresa";
