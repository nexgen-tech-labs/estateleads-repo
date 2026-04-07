"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Upload, FileSpreadsheet, CheckCircle2 } from "lucide-react";
import { useAuth } from "@/context/auth-context";
import { addLead } from "@/lib/firestore/leads";
import type { Lead, LeadType, LeadSource } from "@/types/lead";

const VALID_LEAD_TYPES = new Set(["buyer", "seller", "renter", "landlord", "investor"]);
const VALID_SOURCES = new Set(["gmail", "csv", "manual", "website", "rightmove", "zoopla", "portal", "phone"]);

function parseCsv(text: string): Lead[] {
  const lines = text.trim().split(/\r?\n/);
  if (lines.length < 2) return [];

  const headers = lines[0].split(",").map((h) => h.trim().toLowerCase());
  const get = (row: string[], col: string) => row[headers.indexOf(col)]?.trim() ?? "";

  const now = new Date().toISOString();
  const leads: Lead[] = [];

  lines.slice(1).forEach((line, i) => {
    // Handle quoted fields
    const row: string[] = [];
    let current = "";
    let inQuotes = false;
    for (const ch of line) {
      if (ch === '"') { inQuotes = !inQuotes; }
      else if (ch === "," && !inQuotes) { row.push(current.trim()); current = ""; }
      else { current += ch; }
    }
    row.push(current.trim());

    const name = get(row, "name");
    const email = get(row, "email");
    const propertyAddress = get(row, "property_address");
    const message = get(row, "message");

    if (!name || !email || !propertyAddress || !message) return;

    const rawLeadType = get(row, "lead_type").toLowerCase();
    const rawSource = get(row, "source").toLowerCase();

    leads.push({
      id: `csv_${Date.now()}_${i}`,
      agencyId: "agency_001",
      source: (VALID_SOURCES.has(rawSource) ? rawSource : "csv") as LeadSource,
      propertyAddress,
      leadType: (VALID_LEAD_TYPES.has(rawLeadType) ? rawLeadType : "buyer") as LeadType,
      name,
      email,
      phone: get(row, "phone") || undefined,
      message,
      status: "new",
      temperature: "warm",
      createdAt: now,
      updatedAt: now,
    });
  });

  return leads;
}

export function CsvUploadZone() {
  const router = useRouter();
  const { profile } = useAuth();
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [imported, setImported] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [importedCount, setImportedCount] = useState(0);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && droppedFile.name.endsWith(".csv")) {
      setFile(droppedFile);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (selected && selected.name.endsWith(".csv")) {
      setFile(selected);
    }
  };

  const handleImport = () => {
    if (!file || !profile?.agencyId) return;
    setError(null);
    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      const leads = parseCsv(text);
      if (leads.length === 0) {
        setError("No valid rows found. Check your CSV has the required columns and at least one data row.");
        return;
      }
      await Promise.all(leads.map((lead) => {
        const { id: _id, ...data } = lead;
        return addLead(profile.agencyId, data);
      }));
      setImportedCount(leads.length);
      setImported(true);
      setTimeout(() => router.push("/dashboard/leads"), 1500);
    };
    reader.readAsText(file);
  };

  return (
    <Card className="border border-border shadow-none">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base font-semibold">
          <FileSpreadsheet className="h-4 w-4 text-muted-foreground" />
          Import from CSV
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {imported ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-50">
              <CheckCircle2 className="h-6 w-6 text-emerald-600" />
            </div>
            <p className="text-sm font-medium">
              {importedCount} lead{importedCount !== 1 ? "s" : ""} imported successfully
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Redirecting to your leads list…
            </p>
          </div>
        ) : (
          <>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center transition-colors ${
                dragActive
                  ? "border-primary bg-primary/5"
                  : "border-border bg-secondary/20"
              }`}
            >
              <Upload className="mb-3 h-8 w-8 text-muted-foreground/50" />
              <p className="text-sm font-medium">
                {file ? file.name : "Drag and drop a CSV file here"}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {file
                  ? `${(file.size / 1024).toFixed(1)} KB`
                  : "or click to browse"}
              </p>
              {!file && (
                <label className="mt-3 cursor-pointer">
                  <Button variant="outline" size="sm" className="text-xs pointer-events-none">
                    Choose File
                  </Button>
                  <input
                    type="file"
                    accept=".csv"
                    onChange={handleFileSelect}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </label>
              )}
            </div>

            {error && (
              <p className="text-xs text-destructive">{error}</p>
            )}

            <div className="rounded-lg bg-secondary/50 p-3">
              <p className="text-xs font-medium mb-1">Expected CSV columns:</p>
              <p className="text-xs text-muted-foreground">
                name, email, phone, property_address, lead_type, source, message
              </p>
            </div>

            {file && (
              <div className="flex gap-2">
                <Button size="sm" className="text-sm" onClick={handleImport}>
                  Import Leads
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-sm"
                  onClick={() => setFile(null)}
                >
                  Remove
                </Button>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
