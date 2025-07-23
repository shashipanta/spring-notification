export type SingleImageProp = {
  src: string;
  alt?: string;
};

/** Here useage of interface suggests that this type can be extended further or else 
 * `ts type GalleryProp ` itself is sufficient.
 */
export interface GalleryProp {
  featuredImage: SingleImageProp
  secondaryImages: SingleImageProp[];
}

/** Basic image properties shared accross all image types */
export interface BaseImage {
  src: string;
  alt?:string;    // this can be optional
}

/** Featured image can be extended in future with metadata */
export interface FeaturedImage extends BaseImage {
  // Example: caption, timestamp, or priority
  isPrimary?: boolean;
}

/** Secondary images might have extra info, like position or thumbnail flag */
export interface SecondaryImage extends BaseImage {
  // Example: tags, description, or order
  isThumbnail?: boolean;
}

/** Represents a gallery composed of a featured and multiple secondary images */
export interface Gallery {
  featuredImage: FeaturedImage;
  secondaryImages: SecondaryImage[];
}