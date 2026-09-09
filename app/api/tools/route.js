import { executeTool } from "@/lib/agent-tools";

export async function POST(request) {
  try {
    const body = await request.json();

    const tool = body?.tool;
    const input = body?.input;

    if (!tool) {
      return Response.json(
        { success: false, error: "Tool is required." },
        { status: 400 }
      );
    }

    const result = await executeTool(tool, input);

    return Response.json({
      success: true,
      tool,
      result,
    });
  } catch (error) {
    return Response.json(
      {
        success: false,
        error: error.message || "Tool execution failed.",
      },
      { status: 400 }
    );
  }
}
