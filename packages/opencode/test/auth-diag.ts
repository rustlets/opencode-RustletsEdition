async function diagnose() {
  console.log("🔍 [DIAGNOSTIC] Utilisation du moteur Bun natif...")
  const configPath = "/opt/RUSTLETS/_dataColdDev/.config/opencode/opencode.jsonc"

  try {
    const file = Bun.file(configPath)
    const config = await file.json()

    const provider = config.provider["ollama-cloud"]
    const apiKey = provider.options.apiKey
    const baseURL = provider.options.baseURL

    console.log(`📡 Cible : ${baseURL}`)

    const response = await fetch(`${baseURL}/models`, {
      headers: { Authorization: `Bearer ${apiKey}` },
    })

    if (response.ok) {
      console.log("✅ AUTHENTIFICATION RÉUSSIE !")
    } else {
      console.error(`❌ ÉCHEC API (Code ${response.status})`)
      const body = await response.text()
      console.error(`📝 Message : ${body}`)
    }
  } catch (e: any) {
    console.error(`❌ ERREUR : ${e.message}`)
  }
}

diagnose()
