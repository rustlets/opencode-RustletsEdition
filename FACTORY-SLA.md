# Rustlet Factory - Service Level Agreements (SLA)

Ce document définit les standards opérationnels de l'usine autonome Rustlet.

## 1. Standards Technologiques

- **Langage** : Rust (Canal `stable` exclusivement).
- **Zéro Tolérance** : Toute compilation produisant un `warning` est considérée comme un échec critique (`#[deny(warnings)]` activé).
- **Runtime** : Bun (Version `latest` pour le moteur de tests).
- **CI/CD** : GitHub Actions avec cache de build persistant.

## 2. Cycle de Vie du Code

- **Fréquence** : Monitoring de l'upstream toutes les 60 minutes.
- **Promotion** : Une promotion vers `main-rustlet` n'est autorisée que si `cargo test` et `bun test` retournent un succès à 100%.
- **Subdivision** : Aucune mutation ne doit altérer les modules `legacy` sans isolation dans un module `rustlet`.

## 3. Système d'Alerte

- **Succès** : Notification automatique via push GitHub sur promotion stable.
- **Échec** : Ouverture immédiate d'une Issue GitHub avec tag `critical` et logs attachés.

---

_Généré par Livia/OpenCode - Factory Agent_
