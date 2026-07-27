import { AutomationsManager } from "@/components/admin/automations-manager";
import { getAdminAutomations } from "@/lib/admin/queries";

export default async function AdminAutomationsPage() {
  const automations = await getAdminAutomations();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Automations</h1>
        <p className="text-muted-foreground">
          Notify yourself when someone contacts you. Paste a Discord/Slack
          webhook URL and enable the automation. Contact form submissions also
          trigger the notify API.
        </p>
      </div>
      <AutomationsManager automations={automations} />
    </div>
  );
}
