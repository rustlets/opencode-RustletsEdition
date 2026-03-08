<p align="center">
  <a href="https://github.com/rustlets/opencode-RustletsEdition">
    <picture>
      <source srcset="packages/console/app/src/asset/logo-ornate-dark.svg" media="(prefers-color-scheme: dark)">
      <source srcset="packages/console/app/src/asset/logo-ornate-light.svg" media="(prefers-color-scheme: light)">
      <img src="packages/console/app/src/asset/logo-ornate-light.svg" alt="OpenCode Rustlet Edition">
    </picture>
  </a>
</p>
<p align="center"><b>OpenCode - Rustlet Edition</b></p>
<p align="center">Version optimisée pour l'écosystème Rustlet/Orix. Distribution autonome haute performance.</p>
<p align="center">
  <a href="https://github.com/rustlets/opencode-RustletsEdition"><img alt="Version" src="https://img.shields.io/badge/version-1.0.2-blue?style=flat-square" /></a>
  <a href="./LICENSE.md"><img alt="License" src="https://img.shields.io/badge/license-Shared--Code%20v2.0-orange?style=flat-square" /></a>
</p>

---

### À propos de la Rustlet Edition

Cette version d'OpenCode est une **Sovereign Liquid Infrastructure** maintenue pour garantir une intégration parfaite avec l'écosystème **Rustlet/Orix**. Elle transforme l'agent original en un outil industriel immuable et hautement sécurisé.

#### Points Forts :

- **Zéro Fissure** : Architecture basée sur des artefacts immuables compilés sur GitHub (Matrix Build).
- **Rustlet Guardian** : Pare-feu logiciel interdisant toute pollution de l'environnement (ex: scaffolding Rust non autorisé).
- **Commandes Souveraines** : Support des mots-clés `[]` pour un contrôle direct de l'infrastructure sans interprétation par l'IA.
- **Délégation Sécurisée** : Protocole Dual-Key (confirmation humaine) pour les actions système demandées par l'agent.

---

### Utilisation (CLI rslt)

L'infrastructure est pilotée par le dispatcher intelligent `rslt` :

```bash
rslt ocdev    # Lance une session de développement sur la branche active
rslt ocsys    # Ouvre le canal souverain (Agent rustletsSystem + Mots-clés [] actifs)
rslt devcycle # Déclenche l'usine (Validation -> Promotion Dev vers Prod -> Publication GitHub)
rslt opencode # Exécute la version de production stable
```

---

### Agents Rustlet

En plus des agents standards, cette édition inclut :

- **rustletsSystem** (Masqué/Natif) :
  - Gardien de l'infrastructure.
  - Seul agent autorisé à proposer des modifications de règles primaires.
  - Utilise les commandes `[add rule]`, `[status]`, `[edit rules]`.
  - Nécessite une **validation humaine** pour toute action structurelle.

---

### L'Usine Autonome (Automated Factory)

Chaque modification est traitée par notre pipeline GitHub Actions qui assure :

1. **Ingestion** : Veille technologique sur l'upstream OpenCode original.
2. **Transformation** : Injection statique de la logique Orix et SegX (AST Rewriting).
3. **Validation (Corrector)** : Tests de sécurité Guardian et diagnostic d'identité avant publication.

---

### Licence (Shared-Code v2.0 Lite)

Ce projet est distribué sous la **Shared-Code License v2.0 (Lite)**.

- **Concept de Substrat** : Intégration autorisée du code sous licence permissive (MIT, Apache 2.0, BSD).
- **Sovereign Overlay** : L'orchestration et les améliorations Rustlet restent sous propriété partagée.
- **Copyleft Exclusion** : Interdiction stricte des composants GPL/AGPL pour protéger la logique souveraine.

Consultez le fichier [LICENSE.md](./LICENSE.md) pour le texte intégral.

---

**Join our community** [Discord](https://discord.gg/opencode) | [X.com](https://x.com/opencode)
