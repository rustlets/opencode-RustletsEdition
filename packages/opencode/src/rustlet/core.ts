import { Identity } from "./identity"
import { Guardian } from "./guardian"
import { SystemDispatcher } from "./system"

export function initRustlet() {
  console.log(`\n🧬 [${Identity.name}] Initializing...`)

  // 1. Runtime Security Validation (Sanity Check)
  try {
    Guardian.validate("write", { filePath: "init-check.tmp" })
    console.log("🛡️ [GUARDIAN] Security Framework: ACTIVE")
  } catch (e) {
    console.error("🚨 [CRITICAL] GUARDIAN FRAMEWORK COMPROMISED OR INACTIVE")
    process.exit(1)
  }

  // 2. Primary Command System Validation
  try {
    SystemDispatcher.validate()
    console.log("⚡ [SOUVEREIGN] Primary Command System: READY")
  } catch (e: any) {
    console.error(`🚨 [CRITICAL] SOUVEREIGN SYSTEM ERROR: ${e.message}`)
    process.exit(1)
  }

  console.log(`🛡️ [LICENCE] Governed by ${Identity.license}`)

  // Injection of environment variables for the current session
  process.env.OPENCODE_EDITION = "RUSTLET"
  process.env.RUSTLET_ACTIVE = "true"
  process.env.RUSTLET_VERSION = Identity.version

  return {
    ready: true,
    metadata: Identity,
  }
}
