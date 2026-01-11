// Data pro alerty
export const alerts = {
  beta: {
    type: 'warning',
    title: 'BETA',
    message:
      'Chyby případně tipy můžete reportnout na discordu nebo messengeru.',
    showVersion: true,
    showIcon: true,
  },

  offline: {
    type: 'info',
    title: 'OFFLINE',
    message: 'Aplikace běží v offline režimu.',
    showIcon: true,
  },

  saved: {
    type: 'success',
    message: 'Data byla úspěšně uložena.',
    showIcon: false,
  },

  error: {
    type: 'error',
    title: 'CHYBA',
    message: 'Něco se pokazilo. Zkuste to prosím znovu.',
  },
};
