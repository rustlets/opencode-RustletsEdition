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
  let errorOutput = ""
  let isProgressing = false

  child.stdout.on("data", (data) => {
    const str = data.toString()
    output += str
    if (str.includes("Ask anything") || str.includes("Session") || str.includes("Continue")) {
      isProgressing = true
    }
  })

  child.stderr.on("data", (data) => {
    errorOutput += data.toString()
  })

  // On attend 15 secondes
  await new Promise((resolve) => setTimeout(resolve, 15000))

  child.kill()

  console.log("📊 [RESULTATS] Analyse de la sortie...")
  console.log(`📝 SORTIE BRUTE :\n${output}`)
  console.log(`⚠️ ERREURS CAPTURÉES :\n${errorOutput}`)

  if (output.includes("OpenCode") && !isProgressing) {
    console.error("🚨 [CRITICAL_FAILURE] BUG 0/0 DÉTECTÉ !")
    process.exit(1)
  } else if (!output.includes("OpenCode")) {
    console.error("❌ [FAILURE] L'application n'a pas atteint le logo.")
    process.exit(1)
  } else {
    console.log("✅ [SUCCESS] Boucle interactive active.")
    process.exit(0)
  }
}

checkHang()
