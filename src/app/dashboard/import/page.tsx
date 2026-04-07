"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ImportForm } from "@/components/leads/import-form";
import { CsvUploadZone } from "@/components/leads/csv-upload-zone";

export default function ImportPage() {
  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Import Leads</h1>
        <p className="text-sm text-muted-foreground">
          Add leads manually or import from a CSV file
        </p>
      </div>

      <Tabs defaultValue="manual" className="w-full">
        <TabsList>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="csv">CSV Upload</TabsTrigger>
        </TabsList>
        <TabsContent value="manual" className="mt-4">
          <ImportForm />
        </TabsContent>
        <TabsContent value="csv" className="mt-4">
          <CsvUploadZone />
        </TabsContent>
      </Tabs>
    </div>
  );
}
