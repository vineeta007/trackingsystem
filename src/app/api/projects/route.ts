import { NextResponse } from "next/server";
import { projectService } from "@/services/project-service";

export async function GET() {
  try {
    const projects = await projectService.getProjects();
    return NextResponse.json(projects);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch projects", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as Record<string, unknown>;
    if (!payload.name) return NextResponse.json({ error: "Name is required" }, { status: 400 });
    const project = await projectService.createProject(payload);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create project", details: error instanceof Error ? error.message : "Unknown error" },
      { status: 400 }
    );
  }
}
