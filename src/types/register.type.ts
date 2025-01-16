import { registerSchema } from "@/schemas/register.schema";
import { z } from "zod";

export type TRegisterForm = z.infer<typeof registerSchema>;
