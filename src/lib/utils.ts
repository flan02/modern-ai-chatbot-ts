import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}


// TODO: ReadableStream<string> to String conversion
export async function streamToString(stream: ReadableStream<string>): Promise<string> {
  const reader = stream.getReader();
  //const decoder = new TextDecoder(); // ? Only needed if I work with ... Uint8Array, ArrayBuffer
  let result = '';
  let done = false;
  while (!done) {
    const { value, done: chunkDone } = await reader.read();
    done = chunkDone;
    if (value) {
      //result += decoder.decode(value, {stream: true}); // ? Only if it's a Uint8Array
      result += value;
    }
  }
  // result += decoder.decode(); // ? Only if it's a Uint8Array, ArrayBuffer
  return result;
}


//TODO: Reconstruct URL
type Url = {
  url: string[]
}

export function reconstructUrl({ url }: Url) {
  const decodedComponents = url.map((component) => decodeURIComponent(component))
  return decodedComponents.join('//')
}