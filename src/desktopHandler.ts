import { promises as fs } from "fs";
import path from "path";
import os from "os";

export async function saveToDesktop(text: string): Promise<{ status: string; path: string }> {
  const desktopDir = path.join(os.homedir(), "Desktop");
  const filePath = path.join(desktopDir, `DesktopNote_${Date.now()}.txt`);

  await fs.writeFile(filePath, text);

  return { status: "saved_desktop", path: filePath };
}
