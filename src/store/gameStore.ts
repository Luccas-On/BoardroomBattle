import { create } from 'zustand';
import { BusinessCardData, CARD_DATABASE } from '../constants/cards';

interface GameCard extends BusinessCardData {
  currentMoral: number;
  exhausted: boolean;
}

type GamePhase = 'PLANNING' | 'ATTACK' | 'OPPONENT';

interface GameState {
  playerMarketShare: number;
  playerCafe: number;
  cafeProduction: number;
  roundCount: number;
  playerHand: GameCard[];
  playerField: GameCard[];
  playerDeck: BusinessCardData[];
  opponentMarketShare: number;
  opponentHand: GameCard[];
  opponentField: GameCard[];
  opponentDeck: BusinessCardData[];
  selectedCardId: string | null;
  gamePhase: GamePhase;
  totalCapital: number;
  lastReport: { profit: number; bonus: number; total: number } | null;

  startGame: () => void;
  drawCard: (isPlayer: boolean, count?: number) => void;
  playCard: (cardId: string) => void;
  selectCard: (cardId: string) => void;
  attackTarget: (targetId: string | null, isOpponentFace: boolean) => void;
  nextPhase: () => void;
  cpuTurn: () => void;
  completeQuarter: (victory: boolean) => void;
  applyEffect: (ability: string, isPlayer: boolean) => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  playerMarketShare: 30,
  playerCafe: 3,
  cafeProduction: 2,
  roundCount: 0,
  playerHand: [],
  playerField: [],
  playerDeck: [],
  opponentMarketShare: 30,
  opponentHand: [],
  opponentField: [],
  opponentDeck: [],
  selectedCardId: null,
  gamePhase: 'PLANNING',
  totalCapital: 1000,
  lastReport: null,

  startGame: () => {
    const createDeck = () => {
      let deck: BusinessCardData[] = [];
      while (deck.length < 40) {
        deck = [...deck, ...CARD_DATABASE];
      }
      return deck.slice(0, 40).sort(() => Math.random() - 0.5);
    };

    const pFullDeck = createDeck();
    const oFullDeck = createDeck();

    set({
      playerDeck: pFullDeck.slice(5),
      opponentDeck: oFullDeck.slice(5),
      playerHand: pFullDeck.slice(0, 5).map(c => ({ ...c, currentMoral: c.moral, exhausted: false })),
      opponentHand: oFullDeck.slice(0, 5).map(c => ({ ...c, currentMoral: c.moral, exhausted: false })),
      playerField: [],
      opponentField: [],
      playerMarketShare: 30,
      opponentMarketShare: 30,
      playerCafe: 3,
      cafeProduction: 2,
      roundCount: 0,
      gamePhase: 'PLANNING'
    });
  },

  drawCard: (isPlayer, count = 1) => {
    const state = get();
    const deckKey = isPlayer ? 'playerDeck' : 'opponentDeck';
    const handKey = isPlayer ? 'playerHand' : 'opponentHand';
    const shareKey = isPlayer ? 'playerMarketShare' : 'opponentMarketShare';
    
    let deck = [...state[deckKey]];
    let hand = [...state[handKey]];

    if (deck.length === 0) {
      // MECÂNICA DE DERROTA: Sem cartas para comprar = Market Share 0
      set({ [shareKey]: 0 } as any);
      return;
    }

    for (let i = 0; i < count; i++) {
      if (deck.length > 0 && hand.length < 10) {
        const [card, ...rest] = deck;
        hand.push({ ...card, currentMoral: card.moral, exhausted: false });
        deck = rest;
      }
    }
    set({ [handKey]: hand, [deckKey]: deck } as any);
  },

  applyEffect: (ability, isPlayer) => {
    const text = ability.toLowerCase();
    if (text.includes("kpi")) {
      const field = isPlayer ? 'playerField' : 'opponentField';
      set(s => ({ [field]: s[field].map(c => ({ ...c, kpi: c.kpi + 1 })) } as any));
    }
    if (text.includes("troca sua mão")) {
      const count = isPlayer ? get().playerHand.length : get().opponentHand.length;
      set({ [isPlayer ? 'playerHand' : 'opponentHand']: [] } as any);
      get().drawCard(isPlayer, count);
    }
  },

  playCard: (cardId) => {
    const state = get();
    if (state.gamePhase !== 'PLANNING') return;
    const card = state.playerHand.find(c => c.id === cardId);
    if (!card || state.playerCafe < card.cost) return;

    if (card.moral > 0) {
      if (state.playerField.length < 5) {
        set(s => ({
          playerCafe: s.playerCafe - card.cost,
          playerField: [...s.playerField, { ...card, exhausted: true }],
          playerHand: s.playerHand.filter(c => c.id !== cardId),
        }));
      }
    } else {
      state.applyEffect(card.ability, true);
      set(s => ({ playerCafe: s.playerCafe - card.cost, playerHand: s.playerHand.filter(c => c.id !== cardId) }));
    }
  },

  selectCard: (cardId) => set((s) => {
    if (s.gamePhase !== 'ATTACK') return s;
    const card = s.playerField.find(c => c.id === cardId);
    if (!card || card.exhausted) return s;
    return { selectedCardId: s.selectedCardId === cardId ? null : cardId };
  }),

  attackTarget: (targetId, isOpponentFace) => set((s) => {
    if (!s.selectedCardId || s.gamePhase !== 'ATTACK') return s;
    const attackerIdx = s.playerField.findIndex(c => c.id === s.selectedCardId);
    const attacker = s.playerField[attackerIdx];

    if (isOpponentFace) {
      if (s.opponentField.length > 0 && !attacker.ability.toLowerCase().includes("fura-fila")) return s;
      return {
        opponentMarketShare: Math.max(0, s.opponentMarketShare - attacker.kpi),
        playerField: s.playerField.map(c => c.id === s.selectedCardId ? { ...c, exhausted: true } : c),
        selectedCardId: null
      };
    }

    const targetIdx = s.opponentField.findIndex(c => c.id === targetId);
    const target = s.opponentField[targetIdx];
    if (!target) return s;

    const newTargetMoral = target.currentMoral - attacker.kpi;
    let newAttackerMoral = attacker.currentMoral;
    if (newTargetMoral > 0) newAttackerMoral = attacker.currentMoral - target.kpi;

    return {
      opponentField: s.opponentField.map((c, i) => i === targetIdx ? { ...c, currentMoral: newTargetMoral } : c).filter(c => c.currentMoral > 0),
      playerField: s.playerField.map((c, i) => i === attackerIdx ? { ...c, currentMoral: newAttackerMoral, exhausted: true } : c).filter(c => c.currentMoral > 0),
      selectedCardId: null
    };
  }),

  nextPhase: () => {
    if (get().gamePhase === 'PLANNING') set({ gamePhase: 'ATTACK' });
    else get().cpuTurn();
  },

  cpuTurn: () => {
    set({ gamePhase: 'OPPONENT' });
    setTimeout(() => {
      const state = get();
      const newRound = state.roundCount + 1;
      let newProd = state.cafeProduction;
      if (newRound % 3 === 0) newProd += 1;

      set(s => ({
        roundCount: newRound,
        cafeProduction: newProd,
        playerCafe: s.playerCafe + newProd,
        playerField: s.playerField.map(c => ({ ...c, exhausted: false })),
        gamePhase: 'PLANNING'
      }));
      get().drawCard(true); // Tentativa de compra automática
      get().drawCard(false);
    }, 1200);
  },

  completeQuarter: (victory) => set(s => ({
    totalCapital: s.totalCapital + (s.playerMarketShare * 100),
    lastReport: { profit: s.playerMarketShare * 100, bonus: 0, total: s.playerMarketShare * 100 }
  }))
}));