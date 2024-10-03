import React from 'react';
import { Check } from 'lucide-react';

const Facilities = ({ facilities }) => (
    <div className="p-4 bg-white mt-2">
      <h3 className="text-lg font-semibold mb-2 text-black">Facilities</h3>
      <div className="grid grid-cols-2 gap-4">
        {facilities.map((facility, index) => (
          <div key={index} className="flex items-center bg-gray-100 p-2 rounded-lg">
            <Check className="w-5 h-5 text-green-500 mr-2" />
            <span className="text-sm text-black">{facility}</span>
          </div>
        ))}
      </div>
    </div>
  );

export default Facilities;