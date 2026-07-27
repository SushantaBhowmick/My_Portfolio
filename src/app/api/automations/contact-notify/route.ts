import { createServiceClient } from "@/lib/supabase/service";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    const supabase = createServiceClient();
    const { data: automation } = await supabase
      .from("automations")
      .select("*")
      .eq("key", "contact_notify")
      .eq("enabled", true)
      .maybeSingle();

    if (!automation?.config?.webhook_url) {
      return NextResponse.json({ ok: true, skipped: true });
    }

    const { data: latest } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(1)
      .maybeSingle();

    await fetch(automation.config.webhook_url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: latest
          ? `New portfolio message from **${latest.name}** (${latest.email})\n**${latest.subject}**\n${latest.message}`
          : "New portfolio contact submission",
      }),
    });

    await supabase.from("automation_logs").insert({
      automation_id: automation.id,
      status: "success",
      payload: { submission_id: latest?.id },
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
