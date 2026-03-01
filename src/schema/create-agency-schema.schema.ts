import z from "zod";

const CreateAgencySchema = z.object({
  agencyName: z
    .string({ error: "Agency name is required." })
    .min(2, { message: "Agency name must be at least 2 characters long." })
    .max(100, { message: "Agency name must be at most 100 characters long." }),
  agencyEmail: z
    .string({ error: "Agency email is required." })
    .email({ message: "Please enter a valid email address." }),
  agencyWebsite: z
    .string({ error: "Website must be a string." })
    .url({ message: "Please enter a valid website URL (including https:// or http://)." })
    .optional(),
  agencyPhone: z
    .string({ error: "Agency phone must be a string." })
    .optional(),
  agencyAddress: z
    .string({ error: "Agency address is required." }),
  agencyCity: z
    .string({ error: "Agency city is required." }),
  agencyZipcode: z
    .string({ error: "Agency zipcode is required." }),
  agencyImage: z
    .string({ error: "Agency image URL is required." }),
  agencyDescription: z
    .string({ error: "Agency description must be a string." })
    .optional(),
})

export default CreateAgencySchema