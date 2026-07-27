import { createClient } from "@/lib/supabase/server";
import { AutomationsManager } from "@/components/admin/automations-manager";

export default async function AdminAutomationsPage() {
  const supabase = await createClient();
  const { data } = await supabase.from("automations").select("*").order("name");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Automations</h1>
        <p className="text-muted-foreground">
          Notify yourself when someone contacts you. Paste a Discord/Slack webhook URL
          and enable the automation. Contact form submissions also trigger the notify API.
        </p>
      </div>
      <AutomationsManager automations={(data as never) ?? []} />
    </div>
  );
}
