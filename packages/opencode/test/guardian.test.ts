import { expect, test, describe } from "bun:test"
import { Guardian } from "../src/rustlet/guardian"
import { SystemDispatcher } from "../src/rustlet/system"
import { Agent } from "../src/agent/agent"
import { Instance } from "../src/project/instance"

describe("🛡️ Rustlet Guardian Security Framework (Generalized)", () => {
  test("File Lock: Block forbidden files", () => {
    const attempt = () => Guardian.validate("write", { filePath: "/path/to/Cargo.toml" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)

    const lockAttempt = () => Guardian.validate("write", { filePath: "package-lock.json" })
    expect(lockAttempt).toThrow(/RUSTLET_VIOLATION/)
  })

  test("Shell Lock: Block forbidden file modification via bash", () => {
    const attempt = () => Guardian.validate("bash", { command: "echo test > Cargo.toml" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)
  })

  test("Command Lock: Block restricted commands", () => {
    const attempt = () => Guardian.validate("bash", { command: "rm -rf /" })
    expect(attempt).toThrow(/Operation Blocked: Destructive root deletion/)
  })

  test("Sudo: Enforce transparency pattern", () => {
    const attempt = () => Guardian.validate("bash", { command: "sudo ls" })
    expect(attempt).toThrow(/Sudo commands must follow the pattern/)
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

  test("Privilege: Block Agent from [add rule]", () => {
    process.env.AGENT = "1"
    const result = SystemDispatcher.dispatch("[add rule] test")
    expect(result.intercepted).toBe(true)
    expect(result.error).toContain("PRIVILEGE_VIOLATION")
    delete process.env.AGENT
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
