import { Client } from "@notionhq/client";

const notion = new Client({ auth: process.env.NOTION_TOKEN });
const databaseId = process.env.NOTION_DB_ID || "";

export async function saveToNotion(text: string): Promise<{ status: string; notionPageId: string }> {
  if (!databaseId) {
    throw new Error("NOTION_DB_ID not set");
  }

  const response = await notion.pages.create({
    parent: { database_id: databaseId },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: `Note ${new Date().toISOString()}`,
            },
          },
        ],
      },
    },
    children: [
      {
        object: "block",
        type: "paragraph",
        paragraph: {
          rich_text: [
            {
              type: "text",
              text: { content: text },
            },
          ],
        },
      },
    ],
  });

  return { status: "saved_notion", notionPageId: response.id };
}
