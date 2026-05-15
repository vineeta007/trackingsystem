import { NextResponse } from "next/server";
import { teamService } from "@/services/team-service";

export async function GET() {
  try {
    const teamMembers = await teamService.getTeamMembers();
    return NextResponse.json(teamMembers);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch team members", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as { name?: string; color?: string };
    const name = payload.name?.trim();
    if (!name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const teamMember = await teamService.createTeamMember({ name, color: payload.color?.trim() || "#5865f2" });
    return NextResponse.json(teamMember, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create team member", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}