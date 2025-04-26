  {
    titles: 'Exam',
    subRoutes: routes.examList,
  },
  {
    titles: 'Notes et Bulletins',
    hasSubRoute: true,
    icon: 'fa-solid fa-clipboard',
    showSubRoute: false,
    subRoutes: [
      {
        titles: 'Saisie des Notes',
        subRoutes: routes.gradeEntry,
      },
      {
        titles: 'Calcul des Moyennes',
        subRoutes: routes.gradeCalculation,
      },
      {
        titles: 'Bulletins Scolaires',
        subRoutes: routes.reportCard,
      },
    ],
  }, 