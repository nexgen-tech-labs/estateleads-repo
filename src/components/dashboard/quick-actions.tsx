import { Button } from "@/components/ui/button";
import { Plus, Upload, Mail } from "lucide-react";

export function QuickActions() {
  return (
    <div className="flex flex-wrap gap-2">
      <Button size="sm" className="h-9 text-sm gap-1.5">
        <Plus className="h-4 w-4" />
        Add Lead
      </Button>
      <Button variant="outline" size="sm" className="h-9 text-sm gap-1.5">
        <Upload className="h-4 w-4" />
        Import CSV
      </Button>
      <Button variant="outline" size="sm" className="h-9 text-sm gap-1.5">
        <Mail className="h-4 w-4" />
        Connect Inbox
      </Button>
    </div>
  );
}
