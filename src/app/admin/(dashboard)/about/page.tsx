import { createClient } from "@/lib/supabase/server";
import { AboutManager } from "@/components/admin/about-manager";

export default async function AdminAboutPage() {
  const supabase = await createClient();
  const [highlights, journey, funFacts] = await Promise.all([
    supabase.from("about_highlights").select("*").order("sort_order"),
    supabase.from("journey_items").select("*").order("sort_order"),
    supabase.from("fun_facts").select("*").order("sort_order"),
  ]);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-muted-foreground">
          Highlights, journey timeline, and fun facts. Long bio is edited under Profile.
        </p>
      </div>
      <AboutManager
        highlights={highlights.data ?? []}
        journey={journey.data ?? []}
        funFacts={funFacts.data ?? []}
      />
    </div>
  );
}
