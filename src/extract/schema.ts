import { z } from 'zod'

export const voter_schema = z
  .array(
    z
      .object({
        id: z.number().describe('the serial number at the start'),
        voter_id: z
          .string()
          .describe(
            "the voter_id of the voter, it's above the voter's picture",
          ),
        name: z.string().describe('name of the voter'),
        fathers_name: z.string().describe('name of the father of the voter'),
        house_number: z
          .union([z.string(), z.null()])
          .describe(
            'the house number of the voter, if it is "-" or "00" or " "  then use null',
          ),
        gender: z
          .enum(['Male', 'Female', 'Other'])
          .describe('the gender of the voter'),
        age: z.number().describe('the age of the voter'),
      })
      .describe('all the details of a voter'),
  )
  .describe(
    'a list of all voters, each page have details of multiple voters including their id, voter_id, name, fathers_name, age, house_number, and gender',
  )
