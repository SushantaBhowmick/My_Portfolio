"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { ContactSubmission } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

export function MessagesManager({
  messages,
}: {
  messages: ContactSubmission[];
}) {
  const router = useRouter();
  const [list, setList] = useState(messages);

  const setStatus = async (
    id: string,
    status: ContactSubmission["status"]
  ) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .update({ status })
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setList((prev) => prev.map((m) => (m.id === id ? { ...m, status } : m)));
    toast.success(`Marked as ${status}`);
    router.refresh();
  };

  const remove = async (id: string) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("contact_submissions")
      .delete()
      .eq("id", id);
    if (error) {
      toast.error(error.message);
      return;
    }
    setList((prev) => prev.filter((m) => m.id !== id));
    toast.success("Message deleted");
    router.refresh();
  };

  return (
    <div className="space-y-4">
      {list.length === 0 && (
        <p className="text-muted-foreground">No messages yet.</p>
      )}
      {list.map((message) => (
        <Card key={message.id}>
          <CardContent className="space-y-3 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <div className="flex items-center gap-2">
                  <p className="font-semibold">{message.subject}</p>
                  <Badge
                    variant={
                      message.status === "new" ? "default" : "secondary"
                    }
                  >
                    {message.status}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  {message.name} · {message.email} ·{" "}
                  {new Date(message.created_at).toLocaleString()}
                </p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStatus(message.id, "read")}
                >
                  Read
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setStatus(message.id, "replied")}
                >
                  Replied
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => remove(message.id)}
                >
                  Delete
                </Button>
              </div>
            </div>
            <p className="whitespace-pre-wrap text-sm">{message.message}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
