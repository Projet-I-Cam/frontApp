import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  standalone: false,
  templateUrl: './home-page.component.html',
  styleUrl: './home-page.component.scss'
})
export class HomePageComponent {
  usages = [
    {
      'icon': 'fa fa-building',
      'title': 'Notre Entreprise & Services',
      'description': 'Présentation de i-CAMSchool, notre mission et les services proposés aux utilisateurs.',
    },
    {
      'icon': 'fa fa-bullseye',
      'title': 'Éducation au MINEBASE',
      'description': 'Focus sur les missions du Ministère de l’Éducation de Base et l’organisation de l’année scolaire.',
    },
    {
      'icon': 'fa fa-book',
      'title': 'Les Manuels Scolaires',
      'description': 'Informations sur les manuels disponibles pour chaque section et un espace pour les librairies.',
    },
    {
      'icon': 'fa fa-map-marker',
      'title': 'Établissements Scolaires',
      'description': 'Accès aux établissements proches de l’utilisateur et liste des écoles non reconnues officiellement.',
    },
    {
      'icon': 'fa fa-map-marker',
      'title': 'Nos Partenaires',
      'description': 'Découvrez les institutions et organisations partenaires qui soutiennent notre mission éducative.',
    },
    {
      'icon': 'fa fa-bullhorn',
      'title': 'Espace Publicitaire',
      'description': 'Une section dédiée à la publicité pour les entreprises éducatives et les grandes librairies.',
    },
  ]

  features = [
    {
      icon: 'fas fa-file-signature',
      title: 'Inscriptions',
      description: 'Gérez efficacement les demandes d’admission et les inscriptions des étudiants.'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Classes',
      description: 'Créez, organisez et supervisez vos différentes classes avec facilité.'
    },
    {
      icon: 'fas fa-clock',
      title: 'Emploi du temps',
      description: 'Planifiez les cours et visualisez les horaires en temps réel.'
    },
    {
      icon: 'fas fa-user-check',
      title: 'Absences',
      description: 'Suivez les présences et gérez les absences des élèves avec précision.'
    },
    {
      icon: 'fas fa-map-marker-alt',
      title: 'Géo-localisation des structures',
      description: 'Identifiez et localisez facilement vos établissements sur la carte.'
    },
    {
      icon: 'fas fa-chart-line',
      title: 'Rapports',
      description: 'Générez des rapports personnalisés sur la performance académique et administrative.'
    },
    {
      icon: 'fas fa-chart-bar',
      title: 'Statistiques',
      description: 'Analysez les données clés pour prendre des décisions éclairées.'
    },
    {
      icon: 'fas fa-desktop',
      title: 'Consultation de notes en ligne',
      description: 'Permettez aux élèves et parents de consulter les résultats en ligne à tout moment.'
    },
    {
      icon: 'fas fa-book',
      title: 'Carnet de notes',
      description: 'Consignez et suivez les évaluations des élèves dans un carnet numérique sécurisé.'
    },
    {
      icon: 'fas fa-hourglass-half',
      title: 'Gestion des sessions',
      description: 'Organisez les différentes périodes académiques de manière fluide.'
    },
    {
      icon: 'fas fa-pencil-alt',
      title: 'Exercices',
      description: 'Attribuez et suivez les devoirs et exercices des élèves efficacement.'
    }
  ];

  testimonials = [
    {
      name: 'Marie Dubois',
      position: 'Directrice d\'école primaire',
      text: 'Cette application a révolutionné notre gestion scolaire. Le suivi des élèves, les communications avec les parents et la gestion administrative sont maintenant centralisés et simplifiés.',
      avatar: 'https://randomuser.me/api/portraits/women/44.jpg'
    },
    {
      name: 'Jean Martin',
      position: 'Enseignant CE2',
      text: 'La plateforme est intuitive et complète. Je peux facilement gérer mes cahiers de texte, évaluer les élèves et communiquer avec les parents, le tout depuis un seul outil.',
      avatar: 'https://randomuser.me/api/portraits/men/32.jpg'
    },
    {
      name: 'Sophie Lambert',
      position: 'Présidente d\'association de parents',
      text: 'En tant que parent, j\'apprécie particulièrement la transparence et les fonctionnalités de suivi. Je peux voir les progrès de mon enfant et communiquer facilement avec les enseignants.',
      avatar: 'https://randomuser.me/api/portraits/women/68.jpg'
    },
    {
      name: 'Thomas Roux',
      position: 'Responsable périscolaire',
      text: 'La gestion des activités périscolaires est devenue beaucoup plus simple. Nous pouvons coordonner nos plannings avec ceux des enseignants et avoir une vision globale des emplois du temps.',
      avatar: 'https://randomuser.me/api/portraits/men/75.jpg'
    }
  ]


}
