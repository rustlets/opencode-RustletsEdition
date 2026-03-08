import { Database } from "bun:sqlite"
import { Tool } from "./tool"
import z from "zod"
import DESCRIPTION from "./check_knowledge.txt"
import fs from "fs"
import path from "path"

export const CheckKnowledgeTool = Tool.define("check_knowledge", async () => {
  return {
    description: DESCRIPTION,
    parameters: z.object({
      query: z.string().describe("Keywords to search for (e.g., '0/0 bug', 'SERVER3')."),
    }),
    async execute(params) {
      console.log(`🧠 [KNOWLEDGE] Searching memory for: ${params.query}...`)

      const dbPath = "/opt/RUSTLETS/_dataColdDev/.config/knowledge.db"
      const lessonsDir = path.join(process.cwd(), "packages/opencode/knowledge/lessons")
      let results: string[] = []

      // 1. Recherche dans SQLite (Vitesse local)
      try {
        if (fs.existsSync(dbPath)) {
          const db = new Database(dbPath)
          const rows = db
            .prepare(
              `
            SELECT session_id, demand, attempted_solutions, confirmed_solution, context, created_at 
            FROM lessons 
            WHERE demand LIKE ?1 
               OR attempted_solutions LIKE ?1 
               OR confirmed_solution LIKE ?1
            LIMIT 5
          `,
            )
            .all(`%${params.query}%`) as any[]

          rows.forEach((r) => {
            results.push(`[DB] ${r.demand} -> ${r.confirmed_solution || "FAILED"} (${r.context}) ID:${r.session_id}`)
          })
        }
      } catch (e) {
        console.warn("⚠️ Local DB search failed.")
      }

      // 2. Recherche dans les JSON Atomiques (Certitude Multi-Serveur)
      try {
        if (fs.existsSync(lessonsDir)) {
          const files = fs.readdirSync(lessonsDir).filter((f) => f.endsWith(".json"))
          for (const file of files) {
            const content = JSON.parse(fs.readFileSync(path.join(lessonsDir, file), "utf8"))
            const match = JSON.stringify(content).toLowerCase().includes(params.query.toLowerCase())
            // On n'ajoute que si ce n'est pas déjà trouvé dans le SQLite local
            if (match && !results.some((r) => r.includes(content.session_id))) {
              results.push(
                `[FILE] ${content.demand} -> ${content.confirmed_solution || "FAILED"} (${content.context}) ID:${content.session_id}`,
              )
            }
            if (results.length >= 10) break
          }
        }
      } catch (e) {
        console.warn("⚠️ Atomic JSON search failed.")
      }

      const output =
        results.length > 0
          ? `FOUND ${results.length} LESSONS:\n${results.join("\n")}`
          : "No specific lessons found. Proceed with standard analysis."

      return {
        title: `Memory Search: ${params.query}`,
        output,
        metadata: { query: params.query },
      }
    },
  }
})
