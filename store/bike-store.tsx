// store/bike-store.ts
import { create } from 'zustand';

// Types (Updated)
interface Color {
  name: string;
  hex: string;
}

export interface Accessory {
  id: string;
  title: string;
  description: string;
  price: number;
  image: string;
}

interface BikeSpecs {
  speed: string;
  range: string;
  battery: string;
}

interface BikeModel {
  id: string;
  name: string;
  title: string;
  description: string;
  price: number;
  image: string;
  specs: BikeSpecs;
  colors: Color[];
  availableAccessories: Accessory[];
}

interface BikeStore {
  models: BikeModel[];
  selectedModelId: string;
  selectedColor: string;
  selectedAccessories: string[];
  setModel: (modelId: string) => void;
  setColor: (colorName: string) => void;
  toggleAccessory: (accessoryId: string) => void;
  resetConfiguration: () => void;
}

const allAccessoriesData: Accessory[] = [
  {
    id: 'acc1',
    title: 'Front Basket',
    description: 'Durable metal basket perfect for daily carrying.',
    price: 40,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=500',
  },
  {
    id: 'acc2',
    title: 'Rear Rack',
    description: 'Strong alloy rack ideal for cargo bags.',
    price: 60,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
  },
  {
    id: 'acc3',
    title: 'Phone Mount',
    description: 'Secure mount for navigation on the go.',
    price: 25,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_3.png?v=1692045693&width=720',
  },
  {
    id: 'acc4',
    title: 'LED Light Set',
    description: 'Bright front and rear lights for night riding.',
    price: 35,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=500',
  },
  {
    id: 'acc5',
    title: 'Premium Saddle',
    description: 'Extra comfortable gel seat for long rides.',
    price: 80,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
  },
  {
    id: 'acc6',
    title: 'Water Bottle Holder',
    description: 'Aluminum holder that fits standard bottles.',
    price: 15,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_3.png?v=1692045693&width=720',
  },
  {
    id: 'acc7',
    title: 'Fenders Set',
    description: 'Protects from mud and water splashes.',
    price: 45,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=500',
  },
  {
    id: 'acc8',
    title: 'Lock & Chain',
    description: 'Heavy-duty security lock with 1.2m chain.',
    price: 55,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
  },
];

const findAccessory = (id: string) =>
  allAccessoriesData.find((a) => a.id === id);

const models: BikeModel[] = [
  {
    id: 'model1',
    name: 'Model One',
    title: 'Model One - Urban Cruiser',
    description:
      'Lightweight frame with smooth handling, perfect for city commutes.',
    price: 900,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=720',
    specs: {
      speed: '35 km/h',
      range: '50–60 km',
      battery: '36V 10Ah',
    },
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'white', hex: '#ffffff' },
      { name: 'silver', hex: '#c0c0c0' },
    ],
    availableAccessories: [
      findAccessory('acc1')!,
      findAccessory('acc3')!,
      findAccessory('acc4')!,
      findAccessory('acc6')!,
      findAccessory('acc8')!,
    ],
  },
  {
    id: 'model2',
    name: 'Model Two',
    title: 'Model Two - Power Rider',
    description:
      'Powerful motor and extended battery life for longer journeys.',
    price: 1200,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
    specs: {
      speed: '40 km/h',
      range: '70–90 km',
      battery: '48V 12Ah',
    },
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'red', hex: '#e63946' },
      { name: 'blue', hex: '#1d3557' },
    ],
    availableAccessories: [
      findAccessory('acc1')!,
      findAccessory('acc2')!,
      findAccessory('acc3')!,
      findAccessory('acc4')!,
      findAccessory('acc5')!,
      findAccessory('acc6')!,
      findAccessory('acc7')!,
      findAccessory('acc8')!,
    ],
  },
  {
    id: 'model3',
    name: 'Model Three',
    title: 'Model Three - Trail Blazer',
    description:
      'All-terrain electric bike with durable suspension and rugged tires.',
    price: 1500,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_3.png?v=1692045693&width=720',
    specs: {
      speed: '45 km/h',
      range: '60–80 km',
      battery: '48V 15Ah',
    },
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'green', hex: '#2d6a4f' },
      { name: 'orange', hex: '#f77f00' },
    ],
    availableAccessories: [
      findAccessory('acc2')!,
      findAccessory('acc4')!,
      findAccessory('acc5')!,
      findAccessory('acc6')!,
      findAccessory('acc7')!,
      findAccessory('acc8')!,
    ],
  },
  {
    id: 'model4',
    name: 'Model Four',
    title: 'Model Four - Executive',
    description: 'Urban commuter with premium features and elegant design.',
    price: 1100,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_5.png?v=1692045692&width=720',
    specs: {
      speed: '38 km/h',
      range: '65–75 km',
      battery: '48V 11Ah',
    },
    colors: [
      { name: 'white', hex: '#ffffff' },
      { name: 'champagne', hex: '#e8dcc4' },
      { name: 'navy', hex: '#1a1a2e' },
    ],
    availableAccessories: [
      findAccessory('acc1')!,
      findAccessory('acc3')!,
      findAccessory('acc5')!,
      findAccessory('acc6')!,
      findAccessory('acc8')!,
    ],
  },
  {
    id: 'model5',
    name: 'Model Five',
    title: 'Model Five - Speed Demon',
    description:
      'High-speed model with upgraded components for performance enthusiasts.',
    price: 1800,
    image:
      'https://murfelectricbikes.com/cdn/shop/files/081223_FRONTBASKET_2.png?v=1692045693&width=720',
    specs: {
      speed: '50 km/h',
      range: '80–100 km',
      battery: '52V 17Ah',
    },
    colors: [
      { name: 'black', hex: '#000000' },
      { name: 'red', hex: '#e63946' },
      { name: 'white', hex: '#ffffff' },
      { name: 'yellow', hex: '#ffd60a' },
    ],
    availableAccessories: [
      findAccessory('acc2')!,
      findAccessory('acc3')!,
      findAccessory('acc4')!,
      findAccessory('acc5')!,
      findAccessory('acc6')!,
      findAccessory('acc7')!,
      findAccessory('acc8')!,
    ],
  },
];

export const useBikeStore = create<BikeStore>((set, get) => ({
  models,
  selectedModelId: 'model1',
  selectedColor: 'black',
  selectedAccessories: [],

  setModel: (modelId: string) => {
    const { models } = get();
    const newModel = models.find((m) => m.id === modelId);

    if (newModel) {
      set({
        selectedModelId: modelId,
        selectedColor: newModel.colors[0]?.name || '',
        selectedAccessories: [],
      });
    }
  },

  setColor: (colorName: string) => {
    set({ selectedColor: colorName });
  },

  toggleAccessory: (accessoryId: string) => {
    set((state) => {
      const isSelected = state.selectedAccessories.includes(accessoryId);
      return {
        selectedAccessories: isSelected
          ? state.selectedAccessories.filter((id) => id !== accessoryId)
          : [...state.selectedAccessories, accessoryId],
      };
    });
  },

  resetConfiguration: () => {
    const { models } = get();
    const defaultModel = models[0];

    set({
      selectedModelId: defaultModel.id,
      selectedColor: defaultModel.colors[0]?.name || '',
      selectedAccessories: [],
    });
  },
}));

export const getCurrentModel = (state: BikeStore) =>
  state.models.find((m) => m.id === state.selectedModelId);

export const getAvailableColors = (state: BikeStore) => {
  const model = getCurrentModel(state);
  return model?.colors || [];
};

export const getAvailableAccessories = (state: BikeStore) => {
  const model = getCurrentModel(state);
  return model?.availableAccessories || [];
};

export const getTotalPrice = (state: BikeStore) => {
  const model = getCurrentModel(state);
  const modelPrice = model?.price || 0;

  const allAccessoriesMap = new Map(
    (model?.availableAccessories || []).map((acc) => [acc.id, acc]),
  );

  const accessoriesPrice = state.selectedAccessories.reduce((sum, accId) => {
    const accessory = allAccessoriesMap.get(accId);
    return sum + (accessory?.price || 0);
  }, 0);

  return modelPrice + accessoriesPrice;
};

// --- FIX: Custom selectors moved here from component ---

export const getSelectedAccessoriesDetails = (
  state: BikeStore,
): Accessory[] => {
  const model = getCurrentModel(state);
  if (!model) return [];

  const allAvailableAccs = new Map(
    model.availableAccessories.map((acc) => [acc.id, acc]),
  );

  return state.selectedAccessories
    .map((accId: string) => allAvailableAccs.get(accId))
    .filter(
      (acc: Accessory | undefined): acc is Accessory => acc !== undefined,
    );
};

export const getSelectedColorHex = (state: BikeStore): string | null => {
  const model = getCurrentModel(state);
  if (!model) return null;
  const color = model.colors.find((c) => c.name === state.selectedColor);
  return color ? color.hex : null;
};
