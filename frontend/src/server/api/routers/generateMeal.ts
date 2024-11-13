import { z } from "zod";
import { MealInput } from "~/lib/data";


import OpenAI from "openai"
import { zodResponseFormat } from "openai/helpers/zod"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
})


import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

const MealsResponse = z.object({
  ideas: z.array(z.string())
})

export const mealRouter = createTRPCRouter({
  generateIdeas: publicProcedure
    .input(MealInput)
    .query(async ({ input }) => {
      const { style, size, extras } = input

      const prompt = `
Generate three ${size} meal ideas in ${style} style. ${extras ? `Include the following details: ${extras}` : ``}. Keep the ideas short.
`

      try {
        const res = await openai.chat.completions.create({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are a professional chef, helping people create simple meals." },
            { role: "user", content: prompt }
          ],
          response_format: zodResponseFormat(MealsResponse, "meals_response")
        })

        if (!res.choices[0]) {
          throw new Error("No choices avaliable in OpenAI response!")
        }

        return { mealIdeas: res.choices[0].message }
      }
      catch (error) {
        console.error("Error generating meal ideas:", error);
        throw new Error("Error generating meal ideas. Please try again.")
      }
    })


  // hello: publicProcedure
  //   .input(z.object({ text: z.string() }))
  //   .query(({ input }) => {
  //     return {
  //       greeting: `Hello ${input.text}`,
  //     };
  //   }),
  //
  // create: protectedProcedure
  //   .input(z.object({ name: z.string().min(1) }))
  //   .mutation(async ({ input }) => {
  //     post = { id: post.id + 1, name: input.name };
  //     return post;
  //   }),
  //
  // getLatest: protectedProcedure.query(() => {
  //   return post;
  // }),
  //
  // getSecretMessage: protectedProcedure.query(() => {
  //   return "you can now see this secret message!";
  // }),
});
