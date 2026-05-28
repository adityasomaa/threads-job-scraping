import "server-only";
import fs from "node:fs";
import path from "node:path";
import type { Job, JobsFile } from "./types";

const JOBS_PATH = path.join(process.cwd(), "..", "data", "jobs.json");

export function loadJobs(): JobsFile {
  try {
    const raw = fs.readFileSync(JOBS_PATH, "utf8");
    return JSON.parse(raw) as JobsFile;
  } catch {
    return { updatedAt: new Date(0).toISOString(), jobs: [] };
  }
}

export function getJob(id: string): Job | null {
  return loadJobs().jobs.find((j) => j.id === id) ?? null;
}
