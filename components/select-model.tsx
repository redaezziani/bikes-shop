'use client';
import React, { useState } from 'react';

interface ModelOption {
  id: string;
  name: string;
  description: string;
  price: number;
}

const models: ModelOption[] = [
  {
    id: 'model1',
    name: 'Model One',
    description: 'Lightweight frame with smooth.',
    price: 900,
  },
  {
    id: 'model2',
    name: 'Model Two',
    description: 'Powerful motor and extended.',
    price: 1200,
  },
  {
    id: 'model3',
    name: 'Model Three',
    description: 'All-terrain electric bike with durable.',
    price: 1500,
  },
  {
    id: 'model4',
    name: 'Model Four',
    description: 'Urban commuter with premium',
    price: 1100,
  },
  {
    id: 'model5',
    name: 'Model Five',
    description: 'High-speed model with upgraded',
    price: 1800,
  },
];

const ModelSelector = () => {
  const [selected, setSelected] = useState<string>('model1');

  return (
    <section className="px-4 grid w-full grid-cols-1 md:grid-cols-3 gap-4">
      {models.map((item) => {
        const isActive = selected === item.id;

        return (
          <label
            key={item.id}
            className={`
              relative w-full cursor-pointer rounded-md border py-3.5 px-2.5 
              flex justify-between items-center gap-2 transition
              ${
                isActive
                  ? 'border-neutral-800 bg-neutral-100 ring-1 ring-neutral-800'
                  : 'border-neutral-300 hover:border-neutral-500'
              }
            `}
          >
            <input
              type="radio"
              name="model"
              value={item.id}
              checked={isActive}
              onChange={() => setSelected(item.id)}
              className="absolute inset-0 z-0 opacity-0 cursor-pointer"
            />

            <div className="flex flex-col gap-1 text-start">
              <h5
                className={` ${
                  isActive ? 'text-neutral-900' : 'text-neutral-700'
                } font-medium text-sm`}
              >
                {item.name}
              </h5>
              <p className="text-neutral-600  text-xs">{item.description}</p>
            </div>

            <div className="text-end">
              <strong
                className={` ${
                  isActive ? 'text-neutral-700' : 'text-neutral-500'
                }  font-semibold text-sm`}
              >
                ${item.price}
              </strong>
              <span className={`text-neutral-500 text-xs`}> /mo</span>
            </div>
          </label>
        );
      })}
    </section>
  );
};

export default ModelSelector;
