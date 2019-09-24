# Recipes

Un site pour stocker et partager ses recettes de D.I.Y. (ou F.L.T.M. => Fais-le toi-même)
Le site est pour le moment un POC pour Node / Express + Mongo / Mongoose + Jade (Pug) + Heroku

**À rajouter :**

1. Ajouter une image pour chaque recette (via cloudinary, lib ajoutée)
2. Ajouter une possibilité de récupération du mot de passe via email (via sendgrid, lib ajoutée)
3. Autres partages que Twitter et FB ?

**Peut-être plus tard**

Tout est fait à la main aujourd'hui, pour le POC, sans framework.
L'objectif avoué étant de comprendre tous les rouages.
Ce serait probablement plus facile à partager avec un front plus "commun" que Vanilla. (React / Angular / WC) Quid de SSR vs CR.
Ce serait peut-être intéressant de découpler l'API, mais attention au CSRF / XSS.

**Demo**
Le site tourne actuellement sur https://diyrecipes.cloudno.de et https://diyrecipes.herokuapp.com/
