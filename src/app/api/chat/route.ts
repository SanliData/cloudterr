import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { classifyIntent, telemetryLog } from "@/lib/classifier";
import { handleGlossary, handleLead, getProjectGuidancePrompt } from "@/lib/modeHandlers";
import { checkRateLimit } from "@/lib/rateLimit";

const openai = process.env.OPENAI_API_KEY
  ? new OpenAI({ apiKey: process.env.OPENAI_API_KEY })
  : null;

function getClientIp(req: NextRequest): string {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return req.headers.get("x-real-ip") ?? "unknown";
}

export async function POST(req: NextRequest) {
  try {
    const ip = getClientIp(req);
    if (!checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "Too many requests", reply: "Please try again later.", mode: "fallback" },
        { status: 429 }
      );
    }
    const body = await req.json();
    const userMessage = typeof body.message === "string" ? body.message.trim() : "";

    if (!userMessage) {
      return NextResponse.json(
        { error: "Message is required", reply: "", mode: "fallback" },
        { status: 400 }
      );
    }

    const { mode, glossaryMatch } = classifyIntent(userMessage);

    telemetryLog("chat_request", { mode, term: glossaryMatch?.term });

    if (mode === "glossary" && glossaryMatch) {
      const reply = handleGlossary(
        glossaryMatch.term,
        glossaryMatch.definition,
        glossaryMatch.category
      );
      return NextResponse.json({
        reply,
        mode: "glossary",
        badge: "Technical Definition",
      });
    }

    if (mode === "lead") {
      const reply = handleLead();
      return NextResponse.json({
        reply,
        mode: "lead",
        badge: "RFQ Intake",
        showRfqForm: true,
      });
    }

    if (mode === "project" && openai) {
      const systemContent = getProjectGuidancePrompt(userMessage);
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemContent },
          { role: "user", content: userMessage },
        ],
        max_tokens: 300,
        temperature: 0.3,
      });

      const reply =
        completion.choices[0]?.message?.content?.trim() ||
        "Would you like to submit project details for review?";

      return NextResponse.json({
        reply,
        mode: "project",
        badge: "Project Guidance",
      });
    }

    if (mode === "project" && !openai) {
      const reply =
        "For detailed project guidance, please contact our operations team. Would you like to submit project details for review?";
      return NextResponse.json({
        reply,
        mode: "project",
        badge: "Project Guidance",
      });
    }

    return NextResponse.json({
      reply:
        "I can assist with fiber infrastructure terminology or project guidance. Could you clarify your request?",
      mode: "fallback",
      badge: null,
    });
  } catch (err) {
    console.error("[FiberChat API]", err);
    return NextResponse.json(
      {
        error: "Internal error",
        reply:
          "Please consult a licensed engineer or contact our operations team.",
        mode: "fallback",
      },
      { status: 500 }
    );
  }
}
