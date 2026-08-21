declare module "@/lib/photos-manifest.json" {
  const photos: Array<{
    id: number;
    src: string;
    alt: string;
    date?: string;
  }>;
  export default photos;
}
