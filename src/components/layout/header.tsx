"use client";

import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useAuth } from "@/context/auth-context";
import { Menu, Bell, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface HeaderProps {
  onMenuClick?: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const router = useRouter();
  const { user } = useAuth();

  const displayName = user?.displayName ?? user?.email ?? "User";
  // displayName is stored as "Name · Agency" for email/password signups
  const [namePart, agencyPart] = displayName.includes(" · ")
    ? displayName.split(" · ")
    : [displayName, null];
  const initials = namePart
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
  const label = agencyPart ?? namePart;

  async function handleSignOut() {
    await signOut(auth);
    router.replace("/login");
  }

  return (
    <header className="sticky top-0 z-40 flex h-14 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden h-8 w-8"
        onClick={onMenuClick}
      >
        <Menu className="h-4 w-4" />
      </Button>

      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search leads..."
          className="h-8 pl-8 text-sm bg-secondary/50 border-0"
        />
      </div>

      <div className="ml-auto flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 relative">
          <Bell className="h-4 w-4" />
          <span className="absolute -top-0.5 -right-0.5 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-destructive text-[9px] font-medium text-white">
            3
          </span>
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger
            className="flex h-8 items-center gap-2 rounded-md px-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors"
          >
            <Avatar className="h-6 w-6">
              <AvatarFallback className="text-[10px] bg-primary text-primary-foreground">
                {initials}
              </AvatarFallback>
            </Avatar>
            <span className="hidden sm:inline-block">{label}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem
              className="flex flex-col items-start gap-0 cursor-default focus:bg-transparent"
            >
              <span className="text-xs font-medium">{namePart}</span>
              {user?.email && (
                <span className="text-xs text-muted-foreground">{user.email}</span>
              )}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => router.push("/dashboard/settings")}>
              Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleSignOut}>
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
