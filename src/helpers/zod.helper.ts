import type { ZodError } from "zod";

function ZodHelper () {
  function formatSafeParseErrorMessage(
    // biome-ignore lint/suspicious/noExplicitAny: @TODO: add better types
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