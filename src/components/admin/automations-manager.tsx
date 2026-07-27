"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type { Automation } from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";

export function AutomationsManager({
  automations,
}: {
  automations: Automation[];
}) {
  const router = useRouter();
  const [list, setList] = useState(automations);

  const save = async (item: Automation) => {
    const supabase = createClient();
    const { error } = await supabase
      .from("automations")
      .update({
        enabled: item.enabled,
        config: item.config,
        updated_at: new Date().toISOString(),
      })
      .eq("id", item.id);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("Automation saved");
    router.refresh();
  };

  const testWebhook = async (item: Automation) => {
    const url = item.config?.webhook_url;
    if (!url) {
      toast.error("Add a webhook URL first");
      return;
    }
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "portfolio-admin-test",
          message: "Test notification from portfolio automations",
          at: new Date().toISOString(),
        }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      toast.success("Test webhook sent");
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Webhook failed");
    }
  };

  return (
    <div className="space-y-4">
      {list.map((item) => (
        <Card key={item.id}>
          <CardContent className="space-y-4 p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-muted-foreground">
                  {item.description}
                </p>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={item.enabled}
                  onChange={(e) =>
                    setList((prev) =>
                      prev.map((a) =>
                        a.id === item.id
                          ? { ...a, enabled: e.target.checked }
                          : a
                      )
                    )
                  }
                />
                Enabled
              </label>
            </div>
            <div className="grid gap-3 md:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Webhook URL</label>
                <Input
                  placeholder="Discord / Slack / custom webhook"
                  value={item.config?.webhook_url ?? ""}
                  onChange={(e) =>
                    setList((prev) =>
                      prev.map((a) =>
                        a.id === item.id
                          ? {
                              ...a,
                              config: {
                                ...a.config,
                                webhook_url: e.target.value,
                              },
                            }
                          : a
                      )
                    )
                  }
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Notify email</label>
                <Input
                  placeholder="you@email.com"
                  value={item.config?.email ?? ""}
                  onChange={(e) =>
                    setList((prev) =>
                      prev.map((a) =>
                        a.id === item.id
                          ? {
                              ...a,
                              config: { ...a.config, email: e.target.value },
                            }
                          : a
                      )
                    )
                  }
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => save(item)}>Save</Button>
              <Button variant="outline" onClick={() => testWebhook(item)}>
                Test webhook
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
