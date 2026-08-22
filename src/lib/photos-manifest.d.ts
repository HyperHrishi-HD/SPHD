declare module "@/lib/photos-manifest.json" {
  const photos: Array<{
    id: number;
    src: string;
    alt: string;
  }>;
  export default photos;
}
