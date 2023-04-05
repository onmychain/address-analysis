// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

import { serve } from "server"
import { ethers } from "ethers"
import { Status } from "http_status"
import { respond } from "../_shared/respond.ts"

serve(async (req: Request) => {
  const { address } = await req.json()

  if (!address) {
    const data = { message: 'address is missing.' }
    return respond(data, Status.BadRequest)
  }

  if (!ethers.utils.isAddress(address)) {
    const data = { message: `The address ${address} is invalid.` }
    return respond(data, Status.BadRequest)
  }

  const data = { message: `The address ${address} is valid!` }
  return respond(data, Status.OK)

})

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/address' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"address":"0x8ba1f109551bd432803012645ac136ddd64dba72"}'
