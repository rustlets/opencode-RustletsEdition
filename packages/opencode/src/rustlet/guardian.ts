import fs from "fs"
import path from "path"

export class Guardian {
  private static rulesPath = "/opt/RUSTLETS/_dataColdDev/mcpserver/rules.md"

  // Le strict minimum pour garantir l'identité Rustlet
  private static PROTECTED_FILES = ["Cargo.toml", "guardian.ts", "system.ts"]

  /**
   * Valide l'exécution d'un outil.
   */
  static validate(tool: string, params: any) {
    // 1. Protection contre la création/modification directe
    if (tool === "write" || tool === "edit") {
      const filePath = params.filePath || params.filepath
      if (filePath) {
        const fileName = path.basename(filePath)
        if (this.PROTECTED_FILES.includes(fileName)) {
          throw new Error(
            `❌ [RUSTLET_VIOLATION] Operation Blocked: '${fileName}' is protected by the primary framework.`,
          )
        }
      }
    }

    // 2. Protection intelligente du Shell (Bash)
    if (tool === "bash") {
      const command = params.command
      if (command) {
        // Blocage de patterns destructeurs generaux
        if (command.includes("rm -rf /") && !command.includes("/opt/RUSTLETS/test")) {
          throw new Error("❌ [RUSTLET_VIOLATION] Operation Blocked: Destructive root deletion is strictly forbidden.")
        }

        // On ne bloque QUE si une commande bash tente de modifier un fichier protégé
        for (const file of this.PROTECTED_FILES) {
          if (command.includes(file)) {
            const isSafe = /^(cat|ls|grep|find|file|stat|head|tail)\s/.test(command.trim())
            if (!isSafe) {
              throw new Error(
                `❌ [RUSTLET_VIOLATION] Operation Blocked: Modification of '${file}' via Shell is forbidden.`,
              )
            }
          }
        }

        // La règle Sudo
        if (command.includes("sudo ") && !command.includes("echo $SUDO_PASSWORD | sudo -S")) {
          throw new Error(
            "❌ [RUSTLET_VIOLATION] Sudo usage must follow the secure pattern: 'echo $SUDO_PASSWORD | sudo -S <command>'",
          )
        }
      }
    }

    this.checkDynamicRules(tool, params)
  }

  private static checkDynamicRules(_tool: string, _params: any) {
    try {
      if (fs.existsSync(this.rulesPath)) {
        // Futur
      }
    } catch (e) {
      /* Silence */
    }
  }
}
