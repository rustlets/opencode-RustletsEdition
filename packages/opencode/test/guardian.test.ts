import { expect, test, describe } from "bun:test"
import { Guardian } from "../src/rustlet/guardian"
import { SystemDispatcher } from "../src/rustlet/system"
import { Agent } from "../src/agent/agent"
import { Instance } from "../src/project/instance"

describe("🛡️ Rustlet Guardian Security Framework (Sovereign but Free)", () => {
  test("File Lock: Block Cargo.toml", () => {
    const attempt = () => Guardian.validate("write", { filePath: "/path/to/Cargo.toml" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)
  })

  test("Shell Lock: Block forbidden file modification via bash", () => {
    // Only non-read-only commands on Cargo.toml are blocked
    const attempt = () => Guardian.validate("bash", { command: "echo test > Cargo.toml" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)

    const safe = () => Guardian.validate("bash", { command: "cat Cargo.toml" })
    expect(safe).not.toThrow()
  })

  test("Sudo: Enforce secure pattern", () => {
    const attempt = () => Guardian.validate("bash", { command: "sudo ls" })
    expect(attempt).toThrow(/Sudo usage must follow the secure pattern/)
  })
})

describe("⚡ Rustlet Sovereign System Dispatcher", () => {
  test("Validation: Check critical paths", () => {
    expect(SystemDispatcher.validate()).toBe(true)
  })

  test("Interception: [status] command", () => {
    const result = SystemDispatcher.dispatch("[status]")
    expect(result.intercepted).toBe(true)
    expect(result.output).toContain("OPERATIONAL")
  })
})

describe("🤖 Rustlets Agent & Identity System", () => {
  test("Priority: rustletsSystem must be default when RUSTLET_ROLE=system", async () => {
    process.env.RUSTLET_ROLE = "system"
    await Instance.provide({
      directory: process.cwd(),
      fn: async () => {
        const defaultAgent = await Agent.defaultAgent()
        expect(defaultAgent).toBe("rustletsSystem")
      },
    })
    delete process.env.RUSTLET_ROLE
  })
})
