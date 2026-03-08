import fs from "fs"

export interface DispatchResult {
  intercepted: boolean
  output?: string
  error?: string
  shouldExit?: boolean
  needsApproval?: boolean
  payload?: any
}

export class SystemDispatcher {
  private static rulesPath = "/opt/RUSTLETS/_dataColdDev/mcpserver/rules.md"

  /**
   * Validates if the System Dispatcher is ready and critical paths are accessible.
   */
  static validate(): boolean {
    if (!fs.existsSync(this.rulesPath)) {
      throw new Error(`❌ [SYSTEM_FATAL] Critical rules file missing at ${this.rulesPath}`)
    }
    try {
      fs.accessSync(this.rulesPath, fs.constants.R_OK)
    } catch (e) {
      throw new Error(`❌ [SYSTEM_FATAL] Critical rules file is not readable`)
    }
    return true
  }

  /**
   * Intercepts and executes primary keywords.
   */
  static dispatch(input: string, isExplicitHuman: boolean = false): DispatchResult {
    const cleanInput = input.trim()
    if (!cleanInput.startsWith("[")) return { intercepted: false }

    const match = cleanInput.match(/^\[(.*?)\](.*)$/)
    if (!match) return { intercepted: false }

    const keyword = match[1].toLowerCase()
    const payload = match[2].trim()

    // Identity detection (AGENT vs HUMAN)
    const isAgent = !isExplicitHuman && (process.env.AGENT === "1" || process.env.OPENCODE_AGENT === "true")
    const isSystemRole = process.env.RUSTLET_ROLE === "system"

    switch (keyword) {
      case "status":
        return {
          intercepted: true,
          output: "🌐 [RUSTLET_SYSTEM] Status: OPERATIONAL\n🛡️ [GUARDIAN] Hard-Lock: ACTIVE",
          shouldExit: process.env.NODE_ENV !== "test" && !process.stdin.isTTY,
        }

      case "add rule":
        if (isAgent) {
          if (isSystemRole) {
            return {
              intercepted: true,
              needsApproval: true,
              output: `🛡️ [APPROVAL_REQUIRED] System Agent requested a new rule: "${payload}"`,
              payload: { keyword, payload },
            }
          }
          return {
            intercepted: true,
            error: `❌ [PRIVILEGE_VIOLATION] Only Humans or System Agents can use [${keyword}].`,
          }
        }
        return this.addRule(payload)

      case "edit rules":
        if (isAgent) {
          return {
            intercepted: true,
            error: `❌ [PRIVILEGE_VIOLATION] The agent is not authorized to use the primary keyword [${keyword}].`,
          }
        }
        return {
          intercepted: true,
          output: `📝 [SOUVEREIGN] Opening rules for manual edition at: ${this.rulesPath}`,
          shouldExit: false,
        }

      default:
        return {
          intercepted: true,
          error: `⚠️ [SYSTEM] Unknown primary keyword: [${keyword}]`,
        }
    }
  }

  static addRule(content: string): DispatchResult {
    if (!content) {
      return { intercepted: true, error: "❌ Error: Rule content is empty." }
    }
    try {
      fs.appendFileSync(this.rulesPath, `\n- ${content}`)
      return {
        intercepted: true,
        output: "✅ [SOUVEREIGN] Rule added successfully to rules.md",
        shouldExit: false,
      }
    } catch (e: any) {
      return { intercepted: true, error: `❌ Failed to write rule: ${e.message}` }
    }
  }
}
