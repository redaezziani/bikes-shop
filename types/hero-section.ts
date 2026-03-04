export interface HeroSection {
  id: number;
  documentId: string;
  heading: string;
  description: string;
  video_url?: string;
  video_mime?: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
}

export interface HeroSectionResponse {
  data: HeroSection | null;
}
