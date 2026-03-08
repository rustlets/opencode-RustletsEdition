import { Database } from "bun:sqlite"
import { Tool } from "./tool"
import z from "zod"
import DESCRIPTION from "./check_knowledge.txt"

export const CheckKnowledgeTool = Tool.define("check_knowledge", async () => {
  return {
    description: DESCRIPTION,
    parameters: z.object({
      query: z.string().describe("Keywords to search for (e.g., '0/0 bug', 'SERVER3')."),
    }),
    async execute(params) {
      console.log(`🧠 [KNOWLEDGE] Searching memory for: ${params.query}...`)

      const dbPath = "/opt/RUSTLETS/_dataColdDev/.config/knowledge.db"
      let output = ""

      try {
        const db = new Database(dbPath)
        const rows = db
          .prepare(
            `
          SELECT demand, attempted_solutions, confirmed_solution, context, created_at 
          FROM lessons 
          WHERE demand LIKE ?1 
             OR attempted_solutions LIKE ?1 
             OR confirmed_solution LIKE ?1
          ORDER BY created_at DESC
          LIMIT 5
        `,
          )
          .all(`%${params.query}%`) as any[]

        if (rows.length === 0) {
          output = "No specific lessons found in memory for this query. Proceed with standard analysis."
        } else {
          const results = rows
            .map(
              (r) => `
---
Lesson learned on ${r.created_at} (${r.context}):
Demand: ${r.demand}
Attempted (FAILED): ${r.attempted_solutions}
Confirmed (SUCCESS): ${r.confirmed_solution || "None yet"}
---`,
            )
            .join("\n")
          output = `FOUND ${rows.length} LESSONS IN MEMORY:\n${results}`
        }
      } catch (e: any) {
        output = `⚠️ Memory access failed: ${e.message}`
      }

      return {
        title: `Memory Search: ${params.query}`,
        output: output,
        metadata: {
          query: params.query,
        },
      }
    },
  }
})
