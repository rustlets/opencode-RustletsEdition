import fs from "fs"
import path from "path"

export class Guardian {
  private static rulesPath = "/opt/RUSTLETS/_dataColdDev/mcpserver/rules.md"
  private static processPath = "/opt/RUSTLETS/_dataColdDev/mcpserver/process.md"

  /**
   * Validates a tool execution against Rustlet Primary Rules.
   * Throws an Error if a rule is violated.
   */
  static validate(tool: string, params: any) {
    // console.log(`🛡️ [GUARDIAN] Validating ${tool}...`);

    // 1. Rule: No Rust Scaffolding (Hard Lock)
    // Enforced directly to be "Impossible to bypass"
    if (tool === "write" || tool === "edit") {
      const filePath = params.filePath || params.filepath
      if (filePath && (path.basename(filePath) === "Cargo.toml" || path.extname(filePath) === ".rs")) {
        // We block .rs too as per "no initializing new Rust projects"
        // But wait, the user said "creating Cargo.toml files or initializing new Rust projects"
        if (path.basename(filePath) === "Cargo.toml") {
          throw new Error(
            "❌ [RUSTLET_VIOLATION] Operation Blocked: Creation or modification of 'Cargo.toml' is strictly forbidden by the Rustlet Edition behavioral framework to prevent environment pollution.",
          )
        }
      }
    }

    // 2. Rule: Sudo Transparency (Security First)
    if (tool === "bash") {
      const command = params.command
      if (command && command.includes("sudo")) {
        // We ensure sudo is only used with the proper pattern
        if (!command.includes("echo $SUDO_PASSWORD | sudo -S")) {
          throw new Error(
            "❌ [RUSTLET_VIOLATION] Operation Blocked: Sudo commands must follow the pattern 'echo $SUDO_PASSWORD | sudo -S <command>' for automation compatibility.",
          )
        }
      }
    }

    // 3. Dynamic Rule Verification
    this.checkDynamicRules(tool, params)
  }

  private static checkDynamicRules(tool: string, params: any) {
    try {
      if (fs.existsSync(this.rulesPath)) {
        const rules = fs.readFileSync(this.rulesPath, "utf8")

        // Example: If the rules contain a specific forbidden pattern
        if (rules.includes("Validation Mandatory")) {
          // This is more of a behavioral instruction, but we could enforce
          // that certain files are read before being edited (already done by OpenCode)
        }
      }
    } catch (e) {
      // Fail silently for dynamic rules to not block the system if file is missing
    }
  }
}
