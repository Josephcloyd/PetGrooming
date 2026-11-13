import type { BeforeAfterPair, GalleryPhoto } from "./types";

const unsplash = (id: string, width = 900): string =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=80`;

/**
 * Before/after comparison. Stock photos never come as true pairs of the same pet,
 * so this is an illustrative sample: the "after" is an Unsplash pug photo and the
 * "before" is the same photo with shaggy fur and mud painted on by
 * `scripts/make-pug-before.mjs`. Replace both `src` values with your own photos
 * of the same pet and remove `isSample` to show a real result.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: "sample-pug",
    petName: "a pug",
    isSample: true,
    before: {
      src: "/images/before-after/pug-before.jpg",
      alt: "Black pug with overgrown, shaggy fur and mud on its face and sweater",
    },
    after: {
      src: "/images/before-after/pug-after.jpg",
      alt: "The same pug, clean and neatly groomed, against a yellow backdrop",
    },
  },
];

export const galleryPhotos: GalleryPhoto[] = [
  {
    id: "g1",
    pet: "dog",
    caption: "Puppy's first bath",
    src: unsplash("photo-1537151608828-ea2b11777ee8"),
    alt: "Corgi puppy with big ears against an orange backdrop",
    width: 3,
    height: 4,
  },
  {
    id: "g2",
    pet: "dog",
    caption: "Bath & blow dry",
    src: unsplash("photo-1517849845537-4d257902454a"),
    alt: "Black pug in a knit sweater against a yellow backdrop",
    width: 4,
    height: 3,
  },
  {
    id: "g3",
    pet: "cat",
    caption: "Brush-out",
    src: unsplash("photo-1518791841217-8f162f1e1131"),
    alt: "Tabby cat relaxing on a sofa",
    width: 3,
    height: 4,
  },
  {
    id: "g4",
    pet: "dog",
    caption: "De-shedding",
    src: unsplash("photo-1558788353-f76d92427f16"),
    alt: "Golden retriever smiling at the camera",
    width: 1,
    height: 1,
  },
  {
    id: "g5",
    pet: "dog",
    caption: "Nail trim & ear clean",
    src: unsplash("photo-1543466835-00a7907e9de1"),
    alt: "Happy beagle with its tongue out",
    width: 4,
    height: 3,
  },
  {
    id: "g6",
    pet: "cat",
    caption: "Ear cleaning",
    src: unsplash("photo-1514888286974-6c03e2ca1dba"),
    alt: "Black and white cat peeking over a wooden ledge",
    width: 3,
    height: 4,
  },
  {
    id: "g7",
    pet: "dog",
    caption: "Spa package",
    src: unsplash("photo-1507146426996-ef05306b995a"),
    alt: "Fluffy golden puppy wearing a red collar",
    width: 4,
    height: 5,
  },
  {
    id: "g8",
    pet: "dog",
    caption: "Full haircut",
    src: unsplash("photo-1561037404-61cd46aa615b"),
    alt: "Jack Russell terrier portrait on a pink backdrop",
    width: 1,
    height: 1,
  },
  {
    id: "g9",
    pet: "dog",
    caption: "Flea & tick bath",
    src: unsplash("photo-1530281700549-e82e7bf110d6"),
    alt: "Brown dog running along the beach",
    width: 4,
    height: 3,
  },
];
