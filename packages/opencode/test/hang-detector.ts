import { spawn } from "child_process"

async function checkHang() {
  console.log("🕵️ [HANG-DETECTOR] Démarrage du test de gel TUI...")

  // On lance l'application en mode interactif simulé
  const child = spawn("bun", ["run", "--conditions=browser", "src/index.ts"], {
    env: {
      ...process.env,
      XDG_CONFIG_HOME: "/opt/RUSTLETS/_dataColdDev/.config",
      BUN_JSC_useJIT: "0",
    },
    stdio: ["pipe", "pipe", "pipe"],
  })

  let output = ""
  let isProgressing = false

  child.stdout.on("data", (data) => {
    const str = data.toString()
    output += str
    // Si on voit "Ask anything" ou "Session", c'est que la boucle interactive est active
    if (str.includes("Ask anything") || str.includes("Session") || str.includes("Continue")) {
      isProgressing = true
    }
  })

  // On attend 15 secondes pour laisser le temps au logo et à l'initialisation
  await new Promise((resolve) => setTimeout(resolve, 15000))

  child.kill()

  console.log("📊 [RESULTATS] Analyse de la sortie...")

  if (output.includes("OpenCode") && !isProgressing) {
    console.error("🚨 [CRITICAL_FAILURE] BUG 0/0 DÉTECTÉ !")
    console.error("L'application affiche le logo mais la boucle interactive est gelée.")
    process.exit(1)
  } else if (!output.includes("OpenCode")) {
    console.error("❌ [FAILURE] L'application n'a même pas affiché le logo.")
    process.exit(1)
  } else {
    console.log("✅ [SUCCESS] Aucune trace de gel. La boucle interactive est active.")
    process.exit(0)
  }
}

checkHang()
