const WOFI_CMD = "wofi";
const WOFI_ARGS = ["-d", "-i", "-p", "Selecte task to start"];

export const getWofiOut = async (menu: string) => {
  const wofi = new Deno.Command(WOFI_CMD, {
    args: WOFI_ARGS,
    stdin: "piped",
    stdout: "piped",
  });

  const wofiPs = wofi.spawn();
  const wofiWriter = await wofiPs.stdin.getWriter();
  wofiWriter.write(
    new TextEncoder().encode(menu),
  );
  wofiWriter.releaseLock();
  await wofiPs.stdin.close();

  const { stdout: wofiOut } = await wofiPs.output();
    
  return new TextDecoder().decode(wofiOut);
};
