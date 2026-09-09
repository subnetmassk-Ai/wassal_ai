"use client";

import { useState } from "react";

export default function ControlCenter() {
  const [running, setRunning] = useState(false);
  const [logs, setLogs] = useState([
    "WASSAL AI Control Center initialized.",
    "Agent engine waiting for a task."
  ]);

  function runTest() {
    setRunning(true);

    setLogs((old) => [
      ...old,
      "→ New task received",
      "→ Agent analyzing request",
      "→ Selecting available tools",
      "→ Executing task..."
    ]);

    setTimeout(() => {
      setLogs((old) => [
        ...old,
        "✓ Task completed successfully"
      ]);

      setRunning(false);
    }, 1800);
  }

  return (
    <main className="control">

      <header>
        <div>
          <div className="eyebrow">WASSAL AI / CONTROL</div>
          <h1>AI Control Center</h1>
          <p>
            Monitor and control your intelligent workforce.
          </p>
        </div>

        <div className="online">
          <span />
          SYSTEM ONLINE
        </div>
      </header>

      <section className="grid">

        <div className="card large">
          <div className="card-title">
            <span>AGENT ENGINE</span>
            <b>{running ? "RUNNING" : "READY"}</b>
          </div>

          <div className="engine">
            <div className="core">
              ✦
            </div>

            <div className="engine-info">
              <h2>WASSAL Intelligence</h2>
              <p>
                Autonomous execution engine
              </p>

              <div className="stats">
                <div>
                  <strong>01</strong>
                  <small>Agents</small>
                </div>

                <div>
                  <strong>02</strong>
                  <small>Tools</small>
                </div>

                <div>
                  <strong>00</strong>
                  <small>Errors</small>
                </div>
              </div>
            </div>
          </div>

          <button
            className="run"
            onClick={runTest}
            disabled={running}
          >
            {running ? "EXECUTING..." : "RUN AGENT TEST"}
          </button>
        </div>


        <div className="card">
          <div className="card-title">
            <span>TOOLS</span>
            <b>ACTIVE</b>
          </div>

          <div className="tool">
            <span>🧮</span>
            <div>
              <strong>Calculator</strong>
              <small>Mathematical operations</small>
            </div>
            <i />
          </div>

          <div className="tool">
            <span>🕒</span>
            <div>
              <strong>Time</strong>
              <small>Timezone information</small>
            </div>
            <i />
          </div>

          <div className="tool disabled">
            <span>💬</span>
            <div>
              <strong>WhatsApp</strong>
              <small>Coming next</small>
            </div>
            <i />
          </div>

          <div className="tool disabled">
            <span>🎙</span>
            <div>
              <strong>Voice</strong>
              <small>Coming next</small>
            </div>
            <i />
          </div>
        </div>


        <div className="card logs-card">

          <div className="card-title">
            <span>LIVE EXECUTION LOG</span>
            <b>LIVE</b>
          </div>

          <div className="logs">
            {logs.map((log, index) => (
              <div key={index}>
                <time>
                  {String(index + 1).padStart(2, "0")}
                </time>
                <span>{log}</span>
              </div>
            ))}
          </div>

        </div>

      </section>


      <style jsx global>{`

        * {
          box-sizing: border-box;
        }

        body {
          margin: 0;
          background:
            radial-gradient(
              circle at 15% 0%,
              #172554,
              transparent 35%
            ),
            #020617;
          color: #f8fafc;
          font-family: Arial, sans-serif;
        }

        .control {
          min-height: 100vh;
          padding: 40px;
        }

        header {
          max-width: 1250px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 30px;
        }

        .eyebrow {
          color: #3b82f6;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 2px;
        }

        h1 {
          margin: 8px 0;
          font-size: 38px;
        }

        header p {
          margin: 0;
          color: #64748b;
        }

        .online {
          padding: 10px 15px;
          border: 1px solid #1e293b;
          border-radius: 10px;
          color: #22c55e;
          font-size: 10px;
          font-weight: bold;
        }

        .online span {
          display: inline-block;
          width: 7px;
          height: 7px;
          margin-right: 7px;
          border-radius: 50%;
          background: #22c55e;
          box-shadow: 0 0 12px #22c55e;
        }

        .grid {
          max-width: 1250px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 20px;
        }

        .card {
          background: rgba(15, 23, 42, .85);
          border: 1px solid #1e293b;
          border-radius: 20px;
          padding: 22px;
        }

        .large {
          min-height: 330px;
        }

        .card-title {
          display: flex;
          justify-content: space-between;
          color: #64748b;
          font-size: 10px;
          font-weight: bold;
          letter-spacing: 1.5px;
        }

        .card-title b {
          color: #22c55e;
          font-size: 9px;
        }

        .engine {
          display: flex;
          align-items: center;
          gap: 25px;
          margin: 45px 0;
        }

        .core {
          width: 100px;
          height: 100px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: #172554;
          border: 1px solid #2563eb;
          color: #60a5fa;
          font-size: 35px;
          box-shadow: 0 0 45px rgba(37, 99, 235, .35);
        }

        .engine-info h2 {
          margin: 0 0 6px;
        }

        .engine-info p {
          margin: 0;
          color: #64748b;
          font-size: 12px;
        }

        .stats {
          display: flex;
          gap: 25px;
          margin-top: 22px;
        }

        .stats strong {
          display: block;
          font-size: 20px;
        }

        .stats small {
          color: #64748b;
          font-size: 9px;
        }

        .run {
          width: 100%;
          border: 0;
          border-radius: 12px;
          padding: 14px;
          background: #2563eb;
          color: white;
          font-weight: bold;
          cursor: pointer;
        }

        .run:disabled {
          opacity: .5;
          cursor: wait;
        }

        .tool {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 17px 0;
          border-bottom: 1px solid #1e293b;
        }

        .tool > span {
          font-size: 20px;
        }

        .tool div {
          flex: 1;
        }

        .tool strong,
        .tool small {
          display: block;
        }

        .tool strong {
          font-size: 12px;
        }

        .tool small {
          color: #64748b;
          margin-top: 4px;
          font-size: 9px;
        }

        .tool i {
          width: 7px;
          height: 7px;
          background: #22c55e;
          border-radius: 50%;
          box-shadow: 0 0 10px #22c55e;
        }

        .tool.disabled {
          opacity: .45;
        }

        .tool.disabled i {
          background: #475569;
          box-shadow: none;
        }

        .logs-card {
          grid-column: 1 / -1;
        }

        .logs {
          margin-top: 20px;
          background: #020617;
          border-radius: 12px;
          padding: 15px;
          min-height: 170px;
          font-family: monospace;
        }

        .logs div {
          display: flex;
          gap: 15px;
          padding: 6px 0;
          font-size: 11px;
        }

        .logs time {
          color: #334155;
        }

        .logs span {
          color: #94a3b8;
        }

        @media (max-width: 800px) {

          .control {
            padding: 20px;
          }

          header {
            align-items: flex-start;
            gap: 15px;
          }

          h1 {
            font-size: 28px;
          }

          .grid {
            grid-template-columns: 1fr;
          }

          .logs-card {
            grid-column: auto;
          }

          .engine {
            margin: 30px 0;
          }

          .core {
            width: 75px;
            height: 75px;
          }

        }

      `}</style>

    </main>
  );
}
