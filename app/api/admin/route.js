export async function GET() {
  return Response.json({
    ok: true,
    dashboard: {
      status: "online",
      project: "WASSAL AI",
      environment: process.env.NODE_ENV || "development",
      generatedAt: new Date().toISOString(),
    },

    usage: {
      requests: 0,
      successfulRequests: 0,
      failedRequests: 0,
      inputTokens: 0,
      outputTokens: 0,
      totalTokens: 0,
      estimatedCost: 0,
    },

    performance: {
      averageLatencyMs: 0,
      p95LatencyMs: 0,
      errorRate: 0,
    },

    budget: {
      monthlyLimit: 0,
      used: 0,
      remaining: 0,
      percentage: 0,
    },

    providers: [
      {
        name: "OpenAI",
        model: "gpt-4o-mini",
        status: process.env.OPENAI_API_KEY ? "configured" : "not_configured",
      },
    ],

    agent: {
      systemPrompt: "WASSAL AI bilingual professional assistant",
      tools: [
        "calculator",
        "task",
        "time",
        "open_url",
      ],
    },

    note: "Dashboard API is ready. Persistent analytics will be connected to a database in the next production step.",
  });
}
