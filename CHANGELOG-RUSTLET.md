# CHANGELOG-RUSTLET

## [2026-03-07] - Activation de l'Automated Factory

- **Licence Souveraine** : Adoption de la **Shared-Code License v2.0 (Lite)**. Protection de la logique structurelle (.rson, SegX) et définition des niveaux d'accès (Lite, Commercial, Industrial).
- **Stack de Licence (v2.0 Revision)** : Ajout de la section 1.3 définissant le concept de _Substrate Code_ (MIT/Apache/BSD) et de _Sovereign Overlay_. Exclusion explicite des licences _Strong Copyleft_ (GPL/AGPL) pour prévenir toute contamination juridique.
- **Protocole Factory** : Déploiement du moteur de transformation Rust dans `bunScript/github-pipeline`.
- **Pipeline 3 Étages** : Ingestion (Monitoring), Transformation (Injection Orix), Validation (Corrector).
- **GitHub Actions** : Déploiement de `rustlet-pipeline.yml` pour une synchronisation et une promotion automatique vers `main-rustlet`.
- **Indépendance Core** : Séparation stricte entre le code legacy et les optimisations Rustlet.

## [2026-03-07] - Initial Setup

- Configuration des remotes : `origin` (GitHub `rustlets/opencode`), `upstream` (OpenCode GitHub), `rustlets-gitlab` (GitLab).
- Création de la branche de suivi `upstream-track`.
- Établissement de la branche stable `main-rustlet` comme branche par défaut.
- Établissement de la branche de développement `dev-rustlet` pour les commits quotidiens.
- Architecture à deux niveaux : `dev-rustlet` (intégration/travail) -> `main-rustlet` (stable/release).

### Infrastructure

- Authentification SSH configurée pour l'organisation GitHub `rustlets`.
- `README.md` standardisé pour la distribution Rustlet Edition.
