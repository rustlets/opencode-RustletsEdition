import { spawn } from "child_process"

export class Learner {
  /**
   * Triggers the discuss-learner Rust binary in the background.
   */
  static trigger() {
    const learnerPath = "/opt/RUSTLETS/_dataColdDev/bunScript/discussLearner/target/release/discuss-learner"

    // We run it as a detached process to not block the main application
    const child = spawn(learnerPath, [], {
      detached: true,
      stdio: "ignore",
    })

    child.unref()
    // console.log("🧠 [LEARNER] Learning cycle triggered in background.");
  }
}
