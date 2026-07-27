import { createClient } from "@/lib/supabase/server";
import { MessagesManager } from "@/components/admin/messages-manager";

export default async function AdminMessagesPage() {
  const supabase = await createClient();
  const { data } = await supabase
    .from("contact_submissions")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">Messages</h1>
        <p className="text-muted-foreground">
          Contact form submissions from your portfolio
        </p>
      </div>
      <MessagesManager messages={data ?? []} />
    </div>
  );
}
