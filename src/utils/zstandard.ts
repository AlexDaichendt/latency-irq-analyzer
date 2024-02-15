import { ZstdInit } from "@oneidentity/zstd-js/decompress";

export async function decompress(file: File) {
  const buffer = await file.arrayBuffer();

  const { ZstdSimple } = await ZstdInit();

  // Load the compressed data
  const someCompressedData: Uint8Array = new Uint8Array(buffer);

  // Decompress the compressed simple data
  const decompressedSimpleData: Uint8Array =
    ZstdSimple.decompress(someCompressedData);

  // convert to string
  const content = new TextDecoder().decode(decompressedSimpleData);

  return content;
}
