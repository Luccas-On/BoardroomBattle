# 🏢 Boardroom Battle: Corporate TCG

**Boardroom Battle** é um jogo de cartas estratégico (TCG) desenvolvido em **React Native**, onde o mundo das startups e grandes corporações é o campo de batalha. Como gestor, seu objetivo é dominar o Market Share enquanto gerencia recursos escassos (Café) e mantém o moral da sua equipe.

---

## 🚀 Mecânicas Principais (v1.0)

### ☕ Economia de Café
Diferente de sistemas de mana fixos, aqui a economia é dinâmica e escalável:
* **Capital Inicial:** Você começa com 3 Cafés.
* **Produção Escalável:** A cada 3 rodadas completas, a produção aumenta em **+1**.
* **Gestão Cumulativa:** Cafés não gastos acumulam para o próximo turno, permitindo jogadas de alto investimento.

### ⚔️ Combate e Eficiência (KPI vs Moral)
O sistema de combate foca em **eficiência operacional**:
* **Vantagem do Vencedor:** Se o seu atacante derrotar o alvo (KPI >= Moral do alvo), ele **não perde Moral**. 
* **Desgaste:** Só há perda de Moral se o atacante falhar em remover o alvo do campo.

### 📉 Burnout e Fadiga
* **Deck de 40 Cartas:** Estratégias de longo prazo são necessárias.
* **Falência por Falta de Talentos:** Se o seu deck chegar a zero, você perde o jogo no momento em que precisar comprar a próxima carta.

---

## 🛠️ Tecnologias Utilizadas
* **React Native / Expo** (Mobile Development)
* **Zustand** (State Management)
* **React Native Reanimated** (Animações de Combate)
* **TypeScript** (Segurança e Tipagem)

---

## 📂 Como Rodar o Projeto
1. Clone o repositório:
   ```bash
   git clone [https://github.com/Luccas-On/BoardroomBattle.git](https://github.com/Luccas-On/BoardroomBattle.git)