import { expect, test, describe } from "bun:test"
import { Guardian } from "../src/rustlet/guardian"
import { SystemDispatcher } from "../src/rustlet/system"
import { Agent } from "../src/agent/agent"
import { Instance } from "../src/project/instance"

describe("🛡️ Rustlet Guardian Security Framework", () => {
  test("Hard-Lock: Block Cargo.toml creation", () => {
    const attempt = () => Guardian.validate("write", { filePath: "/path/to/Cargo.toml" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)
  })

  test("Hard-Lock: Block unsafe sudo commands", () => {
    const attempt = () => Guardian.validate("bash", { command: "sudo rm -rf /" })
    expect(attempt).toThrow(/RUSTLET_VIOLATION/)
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

    // We provide a mock instance directory to avoid NotFound error
    await Instance.provide({
      directory: process.cwd(),
      fn: async () => {
        const defaultAgent = await Agent.defaultAgent()
        expect(defaultAgent).toBe("rustletsSystem")
      },
    })

    delete process.env.RUSTLET_ROLE
  })

  test("Visibility: rustletsSystem must be present in the list", async () => {
    await Instance.provide({
      directory: process.cwd(),
      fn: async () => {
        const agents = await Agent.list()
        expect(agents.some((a) => a.name === "rustletsSystem")).toBe(true)
      },
    })
  })
})
