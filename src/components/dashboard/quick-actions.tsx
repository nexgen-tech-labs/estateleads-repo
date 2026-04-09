import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Plus, Upload, Mail } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Link href="/dashboard/import">
        <Button size="sm" className="h-9 text-sm gap-1.5">
          <Plus className="h-4 w-4" />
          Add Lead
        </Button>
      </Link>
      <Link href="/dashboard/import">
        <Button variant="outline" size="sm" className="h-9 text-sm gap-1.5">
          <Upload className="h-4 w-4" />
          Import CSV
        </Button>
      </Link>
      <Link href="/dashboard/inbox">
        <Button variant="outline" size="sm" className="h-9 text-sm gap-1.5">
          <Mail className="h-4 w-4" />
          Connect Inbox
        </Button>
      </Link>
    </div>
  );
}
