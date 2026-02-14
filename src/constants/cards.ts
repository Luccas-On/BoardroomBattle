export interface BusinessCardData {
  id: string;
  name: string;
  dept: 'TI' | 'RH' | 'Vendas' | 'Financeiro' | 'C-Level' | 'Evento';
  cost: number;
  kpi: number;
  moral: number;
  ability: string;
  image?: string; // Para quando você adicionar as ilustrações cartoon
}

export const CARD_DATABASE: BusinessCardData[] = [
  // --- SET DE TI (Dano e Bug) ---
  { id: 'ti1', name: 'Estagiário de QA', dept: 'TI', cost: 1, kpi: 1, moral: 2, ability: 'Reportar Bug: Reduz o KPI de uma carta inimiga em -1.' },
  { id: 'ti2', name: 'Dev Front-End', dept: 'TI', cost: 2, kpi: 3, moral: 2, ability: 'Hot Reload: Recupera +1 de Moral ao atacar e sobreviver.' },
  { id: 'ti3', name: 'Arquiteto de Sistemas', dept: 'TI', cost: 3, kpi: 2, moral: 5, ability: 'Infra Estruturada: Aliados de TI ganham +1 de Moral.' },
  { id: 'ti4', name: 'Data Scientist', dept: 'TI', cost: 3, kpi: 4, moral: 2, ability: 'Análise Preditiva: Revela a próxima carta do oponente.' },
  { id: 'ti5', name: 'Hacker Ético', dept: 'TI', cost: 4, kpi: 5, moral: 3, ability: 'Bypass: Pode atacar diretamente o Market Share inimigo.' },
  { id: 'ti6', name: 'DevOps Sênior', dept: 'TI', cost: 4, kpi: 4, moral: 6, ability: 'Pipeline Contínuo: Se destruir um inimigo, compre uma carta.' },
  { id: 'ti7', name: 'Script Automatizado', dept: 'TI', cost: 2, kpi: 2, moral: 1, ability: 'Loop Infinito: Retorna à mão após o Burnout.' },
  { id: 'ti8', name: 'CTO', dept: 'TI', cost: 6, kpi: 7, moral: 7, ability: 'Refatoração: Redefine todos os status em campo ao original.' },

  // --- SET DE RH (Suporte e Controle) ---
  { id: 'rh1', name: 'Recrutador Tech', dept: 'RH', cost: 2, kpi: 1, moral: 3, ability: 'Headhunting: Busca uma carta de TI no deck.' },
  { id: 'rh2', name: 'Analista de DP', dept: 'RH', cost: 1, kpi: 0, moral: 4, ability: 'Folha de Pagamento: Gera +1 de Café no próximo turno.' },
  { id: 'rh3', name: 'Coach de Resiliência', dept: 'RH', cost: 3, kpi: 2, moral: 4, ability: 'Mindset: Dá +3 de Moral a um aliado.' },
  { id: 'rh4', name: 'Business Partner', dept: 'RH', cost: 3, kpi: 3, moral: 3, ability: 'Alinhamento: Copia a habilidade de um aliado em campo.' },
  { id: 'rh5', name: 'Especialista em D&I', dept: 'RH', cost: 4, kpi: 2, moral: 6, ability: 'Cultura: Protege aliados contra redução de KPI.' },
  { id: 'rh6', name: 'Mediador', dept: 'RH', cost: 4, kpi: 1, moral: 7, ability: 'Paz no Escritório: Impede o ataque do maior KPI inimigo.' },
  { id: 'rh7', name: 'Diretora de Pessoas', dept: 'RH', cost: 5, kpi: 4, moral: 8, ability: 'Plano de Carreira: Dobra o KPI de um Estagiário.' },
  { id: 'rh8', name: 'Psicólogo Corporativo', dept: 'RH', cost: 2, kpi: 1, moral: 5, ability: 'Escuta Ativa: Cura 2 de Moral por turno.' },

  // --- SET DE VENDAS (Agressividade) ---
  { id: 'vd1', name: 'SDR', dept: 'Vendas', cost: 1, kpi: 2, moral: 1, ability: 'Cold Call: Pode atacar no mesmo turno em que entra.' },
  { id: 'vd2', name: 'Hunter de Contas', dept: 'Vendas', cost: 2, kpi: 2, moral: 2, ability: 'Meta: Ganha +1 de KPI ao destruir um inimigo.' },
  { id: 'vd3', name: 'Closer', dept: 'Vendas', cost: 3, kpi: 4, moral: 3, ability: 'Contrato: Dano dobrado contra Financeiro ou RH.' },
  { id: 'vd4', name: 'Key Account', dept: 'Vendas', cost: 4, kpi: 3, moral: 6, ability: 'Fidelização: Protege seu Market Share contra ataques.' },
  { id: 'vd5', name: 'Gerente Comercial', dept: 'Vendas', cost: 5, kpi: 5, moral: 5, ability: 'Comissão: Aliados ganham KPI por inimigo destruído.' },
  { id: 'vd6', name: 'VP de Sales', dept: 'Vendas', cost: 7, kpi: 9, moral: 6, ability: 'M&A: Absorve status de um aliado ao entrar.' },
  { id: 'vd7', name: 'Inside Sales', dept: 'Vendas', cost: 2, kpi: 2, moral: 3, ability: 'Follow-up: Se falhar um ataque, pode atacar de novo.' },
  { id: 'vd8', name: 'Growth Hacker', dept: 'Vendas', cost: 3, kpi: 2, moral: 2, ability: 'Escalabilidade: Multiplica seu KPI pelo número de aliados.' },

  // --- SET DE FINANCEIRO (Recursos) ---
  { id: 'fi1', name: 'Analista de AP', dept: 'Financeiro', cost: 1, kpi: 1, moral: 2, ability: 'Fluxo: Devolve o custo do primeiro café gasto.' },
  { id: 'fi2', name: 'Controller', dept: 'Financeiro', cost: 2, kpi: 2, moral: 3, ability: 'Auditoria: Próxima carta inimiga custa +1.' },
  { id: 'fi3', name: 'Fiscal', dept: 'Financeiro', cost: 3, kpi: 2, moral: 4, ability: 'Isenção: Reduz custo de uma carta na mão em -1.' },
  { id: 'fi4', name: 'Tesoureiro', dept: 'Financeiro', cost: 3, kpi: 1, moral: 5, ability: 'Reserva: Ganha +4 de Moral se sua vida for baixa.' },
  { id: 'fi5', name: 'Traders', dept: 'Financeiro', cost: 4, kpi: 4, moral: 3, ability: 'Day Trade: Descarta 1 para ganhar +2 de café.' },
  { id: 'fi6', name: 'CFO', dept: 'Financeiro', cost: 6, kpi: 5, moral: 8, ability: 'IPO: Dobra o café disponível neste turno.' },

  // --- EVENTOS E C-LEVEL (Game Changers) ---
  { id: 'ev1', name: 'Coffee Break', dept: 'Evento', cost: 1, kpi: 0, moral: 0, ability: 'Compre 2 cartas.' },
  { id: 'ev2', name: 'Pizza na Sexta', dept: 'Evento', cost: 3, kpi: 0, moral: 0, ability: 'Cura +3 de Moral global.' },
  { id: 'ev3', name: 'Caiu a Produção', dept: 'Evento', cost: 2, kpi: 0, moral: 0, ability: 'TI inimiga não ataca por 1 turno.' },
  { id: 'ev4', name: 'Home Office', dept: 'Evento', cost: 3, kpi: 0, moral: 0, ability: 'Imunidade total por 1 turno.' },
  { id: 'cl1', name: 'O Dono da Empresa', dept: 'C-Level', cost: 8, kpi: 10, moral: 10, ability: 'Demissão: Destrói todas as cartas de custo < 3.' },
  { id: 'cl2', name: 'O Conselho', dept: 'C-Level', cost: 5, kpi: 0, moral: 10, ability: 'Compliance: Nenhuma habilidade de evento funciona.' },
  { id: 'ev5', name: 'Update de Windows', dept: 'Evento', cost: 2, kpi: 0, moral: 0, ability: 'Atordoa 1 alvo de TI.' },
  { id: 'ev6', name: 'Pivotar', dept: 'Evento', cost: 0, kpi: 0, moral: 0, ability: 'Troca sua mão inteira.' },
  { id: 'ev7', name: 'Reunião Urgente', dept: 'Evento', cost: 2, kpi: 0, moral: 0, ability: 'Busca um Gerente no deck.' },
  { id: 'ev8', name: 'Reply All', dept: 'Evento', cost: 2, kpi: 0, moral: 0, ability: 'Causa 2 de dano em todos.' },
];