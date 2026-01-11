import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey);

/* ====
  Získání dat ze Supabase
==== */

// Načtení hráčů
export async function fetchPlayers() {
  const { data, error } = await supabase.from('players').select('*');
  //.order('name');

  if (error) throw error;
  return data;
}

// Načtení dluhů
export async function fetchDebts() {
  const { data, error } = await supabase
    .from('debts')
    .select('*')
    .order('created', { ascending: false });

  if (error) throw error;
  return data;
}
