/**
 * Firestore writes never fail while the connection is down: they wait forever, so a form
 * would sit on "Sending..." for good. This turns a long wait into a normal error the form can show.
 */
export function withTimeout<T>(promise: Promise<T>, ms = 20000): Promise<T> {
  let timer: ReturnType<typeof setTimeout>;
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error("Request timed out")), ms);
  });
  return Promise.race([promise, timeout]).finally(() => clearTimeout(timer));
}
