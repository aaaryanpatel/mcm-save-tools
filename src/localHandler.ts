import { promises as fs } from "fs";
import path from "path";

export async function saveToLocal(text: string): Promise<{ status: string; path: string }> {
  const dir = path.join(__dirname, "..", "saved");
  const filePath = path.join(dir, `note_${Date.now()}.txt`);

  await fs.mkdir(dir, { recursive: true });
  await fs.writeFile(filePath, text);

  return { status: "saved_local", path: filePath };
}
