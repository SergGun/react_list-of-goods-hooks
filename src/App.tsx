import 'bulma/css/bulma.css';
import './App.scss';
import { useState } from 'react';

// type SotrType = 'alpha' | 'length' | null;

enum SotrType {
  Alpha = 'alpha',
  Lenght = 'length',
  None = 'none',
}

const goodsFromServer = [
  'Dumplings',
  'Carrot',
  'Eggs',
  'Ice cream',
  'Apple',
  'Bread',
  'Fish',
  'Honey',
  'Jam',
  'Garlic',
];

export const App = () => {
  const [sortType, setSortType] = useState<SotrType>(SotrType.None);
  const [isReversed, setIsReversed] = useState(false);

  const getProcessedProducts = () => {
    const result = [...goodsFromServer];

    if (sortType === SotrType.Alpha) {
      result.sort((a, b) => a.localeCompare(b));
    }

    if (sortType === SotrType.Lenght) {
      result.sort((a, b) => a.length - b.length);
    }

    if (isReversed) {
      result.reverse();
    }

    return result;
  };

  const products = getProcessedProducts();

  const sortedProducts = () => {
    setSortType(SotrType.Alpha);
  };

  const productByLength = () => {
    setSortType(SotrType.Lenght);
  };

  const reverseProducts = () => {
    setIsReversed(prev => !prev);
  };

  const resetProducts = () => {
    setSortType(SotrType.None);
    setIsReversed(false);
  };

  const isResetVisible = sortType !== SotrType.None || isReversed;

  const isActive = (type: SotrType) => sortType === type;

  return (
    <div className="section content">
      <div className="buttons">
        <button
          type="button"
          className={`button is-info ${isActive(SotrType.Alpha) ? '' : 'is-light'}`}
          onClick={sortedProducts}
        >
          Sort alphabetically
        </button>

        <button
          type="button"
          className={`button is-success ${isActive(SotrType.Lenght) ? '' : 'is-light'}`}
          onClick={productByLength}
        >
          Sort by length
        </button>

        <button
          type="button"
          className={`button is-warning ${isReversed ? '' : 'is-light'}`}
          onClick={reverseProducts}
        >
          Reverse
        </button>

        {isResetVisible && (
          <button
            type="button"
            className="button is-danger"
            onClick={resetProducts}
          >
            Reset
          </button>
        )}
      </div>

      <ul>
        {products.map(product => (
          <li key={product} data-cy="Good">
            {product}
          </li>
        ))}
      </ul>
    </div>
  );
};
