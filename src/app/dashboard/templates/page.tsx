import { TemplateSettingsForm } from "@/components/settings/template-settings-form"

export default function TemplatesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-lg font-semibold tracking-tight">Templates & AI Settings</h1>
        <p className="text-sm text-muted-foreground">
          Configure email tone, signature, follow-up timing, and AI instructions
        </p>
      </div>

      <TemplateSettingsForm />
    </div>
  )
}
