"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import type {
  AboutHighlight,
  FunFact,
  JourneyItem,
} from "@/lib/supabase/types";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export function AboutManager({
  highlights,
  journey,
  funFacts,
}: {
  highlights: AboutHighlight[];
  journey: JourneyItem[];
  funFacts: FunFact[];
}) {
  const router = useRouter();
  const [highlightList, setHighlightList] = useState(highlights);
  const [journeyList, setJourneyList] = useState(journey);
  const [facts, setFacts] = useState(funFacts);

  const [hForm, setHForm] = useState({
    icon_key: "Code2",
    title: "",
    description: "",
  });
  const [jForm, setJForm] = useState({
    year: "",
    title: "",
    description: "",
  });
  const [fForm, setFForm] = useState({ label: "", icon_key: "Coffee" });

  const addHighlight = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("about_highlights")
      .insert({ ...hForm, sort_order: highlightList.length + 1 })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setHighlightList((p) => [...p, data]);
    setHForm({ icon_key: "Code2", title: "", description: "" });
    router.refresh();
  };

  const removeHighlight = async (id: string) => {
    const supabase = createClient();
    await supabase.from("about_highlights").delete().eq("id", id);
    setHighlightList((p) => p.filter((x) => x.id !== id));
    router.refresh();
  };

  const addJourney = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("journey_items")
      .insert({ ...jForm, sort_order: journeyList.length + 1 })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setJourneyList((p) => [...p, data]);
    setJForm({ year: "", title: "", description: "" });
    router.refresh();
  };

  const removeJourney = async (id: string) => {
    const supabase = createClient();
    await supabase.from("journey_items").delete().eq("id", id);
    setJourneyList((p) => p.filter((x) => x.id !== id));
    router.refresh();
  };

  const addFact = async () => {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("fun_facts")
      .insert({ ...fForm, sort_order: facts.length + 1 })
      .select()
      .single();
    if (error) return toast.error(error.message);
    setFacts((p) => [...p, data]);
    setFForm({ label: "", icon_key: "Coffee" });
    router.refresh();
  };

  const removeFact = async (id: string) => {
    const supabase = createClient();
    await supabase.from("fun_facts").delete().eq("id", id);
    setFacts((p) => p.filter((x) => x.id !== id));
    router.refresh();
  };

  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Highlights</h2>
        {highlightList.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-start justify-between gap-3 p-4">
              <div>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Button size="sm" variant="destructive" onClick={() => removeHighlight(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="grid gap-3 p-4 md:grid-cols-3">
            <Input placeholder="Icon key" value={hForm.icon_key} onChange={(e) => setHForm({ ...hForm, icon_key: e.target.value })} />
            <Input placeholder="Title" value={hForm.title} onChange={(e) => setHForm({ ...hForm, title: e.target.value })} />
            <Button onClick={addHighlight}><Plus className="mr-2 h-4 w-4" />Add</Button>
            <Textarea className="md:col-span-3" placeholder="Description" value={hForm.description} onChange={(e) => setHForm({ ...hForm, description: e.target.value })} />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Journey timeline</h2>
        {journeyList.map((item) => (
          <Card key={item.id}>
            <CardContent className="flex items-start justify-between gap-3 p-4">
              <div>
                <p className="text-sm text-primary font-medium">{item.year}</p>
                <p className="font-medium">{item.title}</p>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </div>
              <Button size="sm" variant="destructive" onClick={() => removeJourney(item.id)}>
                <Trash2 className="h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
        <Card>
          <CardContent className="grid gap-3 p-4 md:grid-cols-3">
            <Input placeholder="Year" value={jForm.year} onChange={(e) => setJForm({ ...jForm, year: e.target.value })} />
            <Input placeholder="Title" value={jForm.title} onChange={(e) => setJForm({ ...jForm, title: e.target.value })} />
            <Button onClick={addJourney}><Plus className="mr-2 h-4 w-4" />Add</Button>
            <Textarea className="md:col-span-3" placeholder="Description" value={jForm.description} onChange={(e) => setJForm({ ...jForm, description: e.target.value })} />
          </CardContent>
        </Card>
      </section>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">Fun facts</h2>
        <div className="flex flex-wrap gap-2">
          {facts.map((fact) => (
            <div key={fact.id} className="flex items-center gap-2 rounded-full border px-3 py-1 text-sm">
              {fact.label}
              <button type="button" onClick={() => removeFact(fact.id)}>×</button>
            </div>
          ))}
        </div>
        <div className="flex gap-2">
          <Input placeholder="Label" value={fForm.label} onChange={(e) => setFForm({ ...fForm, label: e.target.value })} />
          <Input placeholder="Icon key" value={fForm.icon_key} onChange={(e) => setFForm({ ...fForm, icon_key: e.target.value })} />
          <Button onClick={addFact}>Add</Button>
        </div>
      </section>
    </div>
  );
}
