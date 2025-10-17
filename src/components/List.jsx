import React from 'react';
import { Plus } from 'lucide-react';

/**
 * List
 * props:
 *  - name: string (label to show)
 *  - value?: string (optional value to display)
 *  - onAdd?: fn (called when plus button clicked)
 */
const List = ({ name = 'Item', value = '', onAdd = () => {} }) => {
  return (
    <div className="w-full bg-white rounded-md shadow-sm px-4 py-3 flex items-center justify-between gap-4">
      <div className="flex-1">
        <div className="text-gray-700 font-medium text-lg">{name}</div>
        {value && <div className="text-sm text-gray-400 mt-1">{value}</div>}
      </div>

      <button onClick={onAdd} aria-label={`Add ${name}`} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
        <Plus className="w-5 h-5 text-gray-500" />
      </button>
    </div>
  );
};

export default List;