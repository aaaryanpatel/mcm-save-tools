import { saveToLocal } from "./localHandler";
import { saveToDesktop } from "./desktopHandler";
import { saveToNotion } from "./notionHandler";

const routes = {
  save_to_local: {
    handler: async ({ text }: { text: string }) => {
      return await saveToLocal(text);
    },
    inputSchema: {
      required: ["text"],
    },
  },
  save_to_desktop: {
    handler: async ({ text }: { text: string }) => {
      return await saveToDesktop(text);
    },
    inputSchema: {
      required: ["text"],
    },
  },
  save_to_notion: {
    handler: async ({ text }: { text: string }) => {
      return await saveToNotion(text);
    },
    inputSchema: {
      required: ["text"],
    },
  },
};

export default routes;
