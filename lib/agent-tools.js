export const tools = {
  calculator: {
    name: "calculator",
    description: "Calculate basic mathematical expressions.",
    async execute(input) {
      const expression = String(input || "").trim();

      if (!/^[0-9+\-*/().%\s]+$/.test(expression)) {
        throw new Error("Invalid mathematical expression.");
      }

      const result = Function(`"use strict"; return (${expression})`)();

      if (!Number.isFinite(result)) {
        throw new Error("Invalid calculation result.");
      }

      return String(result);
    },
  },

  task: {
    name: "task",
    description: "Create an internal task.",
    async execute(input) {
      return {
        created: true,
        task: String(input || "").trim(),
        status: "created",
        createdAt: new Date().toISOString(),
      };
    },
  },

  time: {
    name: "time",
    description: "Return the server time.",
    async execute() {
      return new Date().toISOString();
    },
  },
};

export async function executeTool(toolName, input) {
  const tool = tools[toolName];

  if (!tool) {
    throw new Error(`Unknown tool: ${toolName}`);
  }

  return await tool.execute(input);
}
