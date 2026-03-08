import { spawn } from "child_process"

async function certifyTUI() {
  console.log("🦾 [CERTIFIER] Test de lancement interactif réel...")

  const child = spawn("bun", ["run", "--conditions=browser", "src/index.ts"], {
    env: {
      ...process.env,
      XDG_CONFIG_HOME: "/opt/RUSTLETS/_dataColdDev/.config",
      BUN_JSC_useJIT: "0",
    },
    stdio: ["pipe", "pipe", "pipe"],
  })

  let buffer = ""
  let success = false

  child.stdout.on("data", (data) => {
    buffer += data.toString()
    // "Ask anything" est le signal que le TUI est prêt et non gelé
    if (buffer.includes("Ask anything") || buffer.includes("Session")) {
      success = true
    }
  })

  // Timeout de 25 secondes (large pour SERVER3)
  const timeout = setTimeout(() => {
    child.kill()
    console.error("\n❌ [CERTIFICATION_FAILED] DÉLAI DÉPASSÉ.")
    console.error("L'interface n'a jamais atteint l'état interactif (Bug 0/0 persistant).")
    console.log("📝 DERNIÈRE SORTIE :\n", buffer.slice(-500))
    process.exit(1)
  }, 25000)

  // Surveillance de la progression
  while (!success) {
    await new Promise((r) => setTimeout(r, 500))
    if (child.killed) break
  }

  clearTimeout(timeout)
  child.kill()

  if (success) {
    console.log("✅ [CERTIFIED] L'interface interactive est fonctionnelle.")
    process.exit(0)
  }
}

certifyTUI()
