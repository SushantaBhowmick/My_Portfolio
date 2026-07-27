import { AboutManager } from "@/components/admin/about-manager";
import { getAdminAbout } from "@/lib/admin/queries";

export default async function AdminAboutPage() {
  const { highlights, journey, funFacts } = await getAdminAbout();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold">About</h1>
        <p className="text-muted-foreground">
          Highlights, journey timeline, and fun facts. Long bio is edited under
          Profile.
        </p>
      </div>
      <AboutManager
        highlights={highlights}
        journey={journey}
        funFacts={funFacts}
      />
    </div>
  );
}
