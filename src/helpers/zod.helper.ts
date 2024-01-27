import { ZodError } from "zod";

function ZodHelper () {
  function formatSafeParseErrorMessage(
    errors: ZodError<any>
  ) {
    const { message } = errors.errors[0];
    return message;
  }

  return {
    formatSafeParseErrorMessage,
  }
}

export const zodHelper = ZodHelper();