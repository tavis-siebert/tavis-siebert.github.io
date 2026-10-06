// Details shown when someone opens a photo and hovers over it (or taps it, on
// a phone), keyed by file name in src/photos/. Every field is optional; leave
// one out (or empty) and it simply isn't shown.

export interface PhotoDetails {
  description?: string;
  location?: string;
  camera?: string;
}

export const photoDetails: Record<string, PhotoDetails> = {
  'baby-jaws.jpeg': {
    description: '',
    location: 'Moorea, French Polynesia',
    camera: 'iPhone 14',
  },
  'convent-cross.jpeg': {
    description: '',
    location: '',
    camera: 'Canon EOS R50',
  },
  'duomo-golden-hour.jpeg': {
    description: '',
    location: 'Milan, Italy',
    camera: 'iPhone 15 Pro',
  },
  'fuji-at-dawn.jpeg': {
    description: '',
    location: 'Hakone, Japan', // from the photo's GPS; double-check
    camera: 'iPhone 15 Pro',
  },
  'goat-of-quandery.jpeg': {
    description: '',
    location: '',
    camera: 'Canon EOS R50',
  },
  'postcard-moorea.jpeg': {
    description: '',
    location: 'Moorea, French Polynesia',
    camera: 'iPhone 14',
  },
  'stop-and-sit.jpeg': {
    description: '',
    location: '',
    camera: 'Canon EOS R50',
  },
  'wadi-sand.jpeg': {
    description: '',
    location: '',
    camera: 'Canon EOS R50',
  },
  'when-in-copenhagen.jpeg': {
    description: '',
    location: 'Copenhagen, Denmark',
    camera: 'Canon EOS R50',
  },
  'wied-il-ghasri.jpeg': {
    description: '',
    location: 'Gozo, Malta',
    camera: 'Canon EOS R50',
  },
};
