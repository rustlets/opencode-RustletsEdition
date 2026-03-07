import { Identity } from "./identity"

export function initRustlet() {
  console.log(`\n🧬 [${Identity.name}] Initializing...`)
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
