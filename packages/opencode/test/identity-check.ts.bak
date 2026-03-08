import { Agent } from "../src/agent/agent"
import { Instance } from "../src/project/instance"

async function validateIdentity() {
  console.log("🔍 [IDENTITY-CHECK] Vérification de l'élection de l'agent...")

  // On simule l'environnement système
  process.env.RUSTLET_ROLE = "system"

  try {
    await Instance.provide({
      directory: "/opt/RUSTLETS/_github/opencode-dev",
      fn: async () => {
        const defaultAgent = await Agent.defaultAgent()
        console.log(`🤖 Agent élu : ${defaultAgent}`)

        if (defaultAgent === "rustletsSystem") {
          console.log("✅ SUCCÈS : L'agent souverain rustletsSystem est bien le gardien par défaut.")
        } else {
          console.error(`❌ ÉCHEC : L'agent '${defaultAgent}' a pris le dessus.`)
          process.exit(1)
        }

        const allAgents = await Agent.list()
        const isPresent = allAgents.some((a) => a.name === "rustletsSystem")
        console.log(`📋 Agent présent dans la liste : ${isPresent ? "OUI" : "NON"}`)

        if (!isPresent) {
          console.error("❌ ÉCHEC : L'agent n'est pas dans la liste.")
          process.exit(1)
        }
      },
    })
  } catch (e: any) {
    console.error(`❌ ERREUR SYSTÈME : ${e.message}`)
    process.exit(1)
  }
}

validateIdentity()
