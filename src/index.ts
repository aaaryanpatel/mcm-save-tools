import express, { Request, Response } from "express";
import dotenv from "dotenv";
import routes from "./routes";

dotenv.config();

const app = express();
app.use(express.json());

app.post("/mcp", async (req: Request, res: Response) => {
  const { method, params } = req.body;
  const route = (routes as any)[method];
  if (!route) {
    return res.status(400).json({ error: "Unknown method" });
  }

  if (route.inputSchema) {
    for (const prop of route.inputSchema.required) {
      if (!(prop in params)) {
        return res.status(400).json({ error: `Missing param: ${prop}` });
      }
    }
  }

  const result = await route.handler(params);
  return res.json({ result });
});

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ MCP Save Tools Server is running!");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
