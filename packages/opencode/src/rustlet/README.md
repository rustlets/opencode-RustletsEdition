# 🧬 Rustlet Core Infrastructure

Ce répertoire contient le cœur de l'intelligence souveraine de la **Rustlet Edition**. Il s'agit de la couche de contrôle superposée au moteur OpenCode original, garantissant l'intégrité du système et la gestion des privilèges.

## 🏗️ Architecture du Module

| Fichier       | Rôle                                                                                     | Statut      |
| :------------ | :--------------------------------------------------------------------------------------- | :---------- |
| `core.ts`     | Point d'entrée de l'initialisation. Gère l'identité et les variables d'env.              | Sanctuarisé |
| `guardian.ts` | **Pare-feu de sécurité (Hard-Lock)**. Intercepte les outils pour bloquer les violations. | Sanctuarisé |
| `system.ts`   | **System Dispatcher**. Gère les mots-clés souverains `[]` (Override IA).                 | Sanctuarisé |
| `identity.ts` | Métadonnées officielles (Version, Licence, Branding).                                    | Fixe        |
| `prompt/`     | Instructions natives de l'Agent Système (Inaccessible via workspace).                    | Privé       |

## 🛡️ Le Cadre de Protection (Guardian)

Le `Guardian` intercepte les appels aux outils `write`, `edit` et `bash`. Il applique une politique de **Zéro Fissure** sur les fichiers protégés :

- `Cargo.toml` (Interdiction de scaffolding Rust)
- `guardian.ts` (Auto-protection)
- `system.ts` (Protection du dispatcher)

### Règles Shell :

L'usage du Shell est libre (curl, rm, wget autorisés) **SAUF** si la commande tente d'altérer l'un des fichiers protégés listés ci-dessus.

## ⚡ Commandes Souveraines `[]`

Le système intercepte les messages commençant par des crochets avant qu'ils n'atteignent l'IA.

- `[status]` : Diagnostic de santé de l'infrastructure.
- `[add rule] <texte>` : Ajout d'une règle primaire dans `rules.md`.
- `[edit rules]` : Accès à l'édition des processus.

**Délégation** : Un agent possédant `RUSTLET_ROLE=system` peut proposer un `[add rule]`, mais le TUI déclenchera obligatoirement une **confirmation humaine (Dual-Key)** avant exécution.

## 🚀 Reprise du Développement

### Lancement des tests de sécurité

```bash
cd packages/opencode
bun test test/guardian.test.ts
```

### Lancement des modes

- **Dév Standard** : `rslt ocdev`
- **Souverain (Agent Système)** : `rslt ocsys`

### Points de vigilance

1. **Compilation Immuable** : Toute modification ici doit être validée par l'usine (GitHub Actions) pour être intégrée dans les binaires officiels.
2. **Zéro Warning** : La règle `#[deny(warnings)]` est active sur toute la stack Rust associée.
3. **Subdivision Statique** : Ne jamais patcher au runtime ; utiliser les ancrages statiques injectés via le transformateur Rust.

---

_Rustlets Edition - Sovereign Infrastructure Framework v1.0.1_
