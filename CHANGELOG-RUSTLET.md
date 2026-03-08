
## [RELEASE] - 2026-03-08 09:10
- Promotion stable de la branche dev-rustlet.
- Validation Guardian & Identity: OK.

## [RELEASE] - 2026-03-08 09:05
- Promotion stable de la branche dev-rustlet.
- Validation Guardian & Identity: OK.
# CHANGELOG-RUSTLET

## [v1.0.2] - 2026-03-08

### 🛡️ Sécurité & Gouvernance (Zéro Fissure)

- **Rustlet Guardian** : Implémentation du pare-feu de sécurité (Hard-Lock) interceptant les outils `write`, `edit` et `bash`.
- **Blocage Shell** : Interdiction universelle de modifier les fichiers sanctuarisés (Cargo.toml, guardian.ts) même via des ruses shell (redirections, tee).
- **Protocole de Souveraineté** : Mise en place des mots-clés primaires `[]` permettant un court-circuitage total de l'IA pour les commandes d'infrastructure.
- **Co-Souveraineté (Dual-Key)** : Délégation de commandes système à l'IA avec demande de **confirmation humaine obligatoire** via boîte de dialogue TUI.

### 🤖 Intelligence & Agents

- **Agent rustletsSystem** : Création d'un agent souverain natif, masqué et prioritaire pour la gestion de l'infrastructure.
- **Sanctuarisation des Prompts** : Les instructions de l'agent système sont désormais compilées dans le binaire (inaccessibles via le workspace).

### 🚀 Infrastructure & Déploiement

- **Multi-Server Validation** : Déploiement et optimisation réussis sur **SERVER3**.
- **Automated SSH** : Déploiement de clés de service pour synchronisation GitHub autonome entre les serveurs.
- **Smart-Runtime rslt** : Mise à jour du dispatcher pour supporter les commandes `ocdev`, `ocsys` et `devcycle`.
- **Hybrid Mirroring** : Synchronisation temps réel et backup GitOps simultanés sur GitHub et GitLab.

## [v1.0.1] - 2026-03-07

### 🏭 Automated Factory

- **Moteur de Transformation** : Activation du transformateur Rust (3 étages : Ingestion, Transformation, Validation).
- **GitHub Actions V2** : Build matrix multi-OS (Linux, Windows, Mac) pour production d'artefacts immuables.
- **Changelog Automatisé** : Génération en temps réel des notes de version via le moteur de transformation.
- **SLA (Service Level Agreements)** : Standardisation sur Rust Stable et politique "Zéro Warning" (`#[deny(warnings)]`).

## [v1.0.0] - 2026-03-07

### 🏗️ Initial Setup

- **Fork Officiel** : Création du dépôt `rustlets/opencode-RustletsEdition`.
- **Licence Souveraine** : Adoption de la **Shared-Code License v2.0 (Lite)**.
- **Subdivision Statique** : Première injection du wrapper Rustlet dans le point d'entrée (`OPENCODE_EDITION`).
- **Standardisation GitHub** : Configuration des branches `main-rustlet` (stable) et `dev-rustlet` (travail).
