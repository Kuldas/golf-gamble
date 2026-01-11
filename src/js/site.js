import '../css/site.css';
import '../js/alert.js';
import Alpine from 'alpinejs';
import { supabase, fetchPlayers, fetchDebts } from './database';

window.Alpine = Alpine;
document.addEventListener('alpine:init', () => {
  Alpine.store('data', {
    version: import.meta.env.VITE_APP_VERSION || 'neznámá',
    players: {}, // objekt hráčů
    debts: [], // pole dluhů
    loading: true,

    // Načtení dat pro aplikaci
    async loadData() {
      this.loading = true;

      // Falešný delay pro efekt načítání (zastaralé = odstranit před deploymentem)
      // await new Promise((resolve) => setTimeout(resolve, 2000));

      try {
        // Načtení hráčů
        const playersData = await fetchPlayers();
        const debtsData = await fetchDebts();

        this.players = {};

        playersData.forEach((p) => {
          this.players[p.id] = p;
        });

        this.debts = debtsData;
      } catch (err) {
        console.error('Chyba při načítání dat:', err);
      } finally {
        this.loading = false;
      }
    },

    // Dluhy jednotlivých hráčů
    getDebtsFor(playerId) {
      const netDebts = {};
      const result = [];

      this.debts.forEach(({ from, to, amount }) => {
        if (from === playerId) {
          netDebts[to] = (netDebts[to] || 0) + amount;
        } else if (to === playerId) {
          netDebts[from] = (netDebts[from] || 0) - amount;
        }
      });

      for (const [otherId, amount] of Object.entries(netDebts)) {
        if (amount > 0) {
          result.push({
            toId: otherId,
            toName: this.players[otherId]?.name || 'Neznámý',
            amount,
          });
        }
      }

      return result;
    },

    // Historie dluhů včetně seřazení od nejnovějšího
    getDebtHistory(limit) {
      return limit === undefined ? this.debts : this.debts.slice(0, limit);
    },

    // Formátování data z timestampz do CZ formátu
    formatCZ(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('cs-CZ', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
      });
    },

    // Přidání dluhu
    async addDebt(winnerId, loserId, amount) {
      try {
        const { data, error } = await supabase
          .from('debts')
          .insert({
            from: loserId,
            to: winnerId,
            amount: amount,
          })
          .select()
          .single();

        if (error) throw error;

        this.debts.push(data);
      } catch (err) {
        console.error('Chyba při přidávání dluhu:', err);
      }
    },
  });
});

Alpine.start();

// Debug logy
console.log('VITE_APP_VERSION', import.meta.env.VITE_APP_VERSION);
console.log('Store version', Alpine.store('data').version);
