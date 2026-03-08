import { Agent } from "../src/agent/agent"
import { expect, test, describe } from "bun:test"

describe("🤖 Rustlets Agent System", () => {
  test("Default Agent: Standard (no role)", async () => {
    delete process.env.RUSTLET_ROLE
    const agentName = await Agent.defaultAgent()
    // Should be 'build' or from config, but let's assume 'build' for now
    expect(agentName).not.toBe("rustletsSystem")
  })

  test("Default Agent: System Role", async () => {
    process.env.RUSTLET_ROLE = "system"
    const agentName = await Agent.defaultAgent()
    expect(agentName).toBe("rustletsSystem")
    delete process.env.RUSTLET_ROLE
  })

  test("Agent Definition: rustletsSystem exists and is hidden", async () => {
    const agent = await Agent.get("rustletsSystem")
    expect(agent).toBeDefined()
    expect(agent?.name).toBe("rustletsSystem")
    expect(agent?.hidden).toBe(true)
    expect(agent?.native).toBe(true)
  })
})
