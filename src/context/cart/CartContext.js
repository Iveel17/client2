import { createContext } from 'react';

// Create the CartContext.
// The default value (empty object here) is used when a component tries to
// consume the context but is not wrapped by a Provider.
// It's good practice to provide a default structure for clarity during development.
export const CartContext = createContext({});