import { MessagesManager } from "@/components/admin/messages-manager";
import { getAdminMessages } from "@/lib/admin/queries";

export default async function AdminMessagesPage() {
  const messages = await getAdminMessages();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">
          Contact form submissions from your portfolio
        </p>
      </div>
      <MessagesManager messages={messages} />
    </div>
  );
}
