import { loginSchema } from "@/schemas/login.schema";
import { z } from "zod";

export type TLoginForm = z.infer<typeof loginSchema>;
