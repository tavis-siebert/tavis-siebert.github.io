// Details shown when someone opens a photo and hovers over it (or taps it, on
// a phone), keyed by file name in src/photos/. All fields optional

export interface PhotoDetails {
  description?: string;
  location?: string;
  camera?: string;
}

export const photoDetails: Record<string, PhotoDetails> = {
  'baby-jaws.jpeg': {
    description: 'A blacktip reef shark cruises the shallows.',
    location: 'Moorea, French Polynesia',
    camera: 'iPhone 14',
  },
  'convent-cross.jpeg': {
    description: '',
    location: 'Carmo Convent, Lisbon, Portugal',
    camera: 'Canon EOS R50',
  },
  'duomo-golden-hour.jpeg': {
    description: 'Golden hour at the Duomo di Milano',
    location: 'Milan, Italy',
    camera: 'iPhone 15 Pro',
  },
  'fuji-at-dawn.jpeg': {
    description: 'Mt. Fuji at dawn',
    location: 'Hakone, Japan',
    camera: 'iPhone 15 Pro',
  },
  'goat-of-quandary.jpeg': {
    description: 'Mountain goats are plentiful in the Rockies',
    location: 'Quandary Peak, Colorado, USA',
    camera: 'Canon EOS R50',
  },
  'postcard-moorea.jpeg': {
    description: 'A postcard view',
    location: 'Moorea, French Polynesia',
    camera: 'iPhone 14',
  },
  'stop-and-sit.jpeg': {
    description: 'A moment of precious silence',
    location: 'Wadi Rum Desert, Jordan',
    camera: 'Canon EOS R50',
  },
  'wadi-sand.jpeg': {
    description: '',
    location: 'Wadi Rum Desert, Jordan',
    camera: 'Canon EOS R50',
  },
  'when-in-copenhagen.jpeg': {
    description: 'When in Copenhagen...',
    location: 'Copenhagen, Denmark',
    camera: 'Canon EOS R50',
  },
  'wied-il-ghasri.jpeg': {
    description: 'Wied il-Għasri',
    location: 'Gozo, Malta',
    camera: 'Canon EOS R50',
  },
};
