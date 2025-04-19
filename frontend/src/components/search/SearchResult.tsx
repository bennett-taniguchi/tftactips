import React, { useState, useEffect } from 'react';
import { useGlobalContext } from '@/components/context/context';
import ChampionBox from '@/components/champion/ChampionBox';
import TraitBox from '@/components/trait/TraitBox';
import ItemBox from '@/components/item/ItemBox';
import { AugmentBox } from '@/components/augment/AugmentBox';
import ChampionHierarchy from '@/components/champion/ChampionHierarchy';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface SearchResultProps {
  selectedItem?: {
    type: string;
    value: string;
  };
}

const SearchResult: React.FC<SearchResultProps> = ({ selectedItem }) => {
  const { champions, traits, items, augments, traitChampionsMap } = useGlobalContext();
  const [itemData, setItemData] = useState<any>(null);

  useEffect(() => {
    if (!selectedItem) return;

    // Find the corresponding item data based on the selected type and value
    const findItem = () => {
      switch (selectedItem.type) {
        case 'champions':
          return champions.find((champ: any) => champ['CHAMPION#'] === selectedItem.value);
        case 'traits':
          return traits.find((trait: any) => trait['TRAIT#'] === selectedItem.value);
        case 'items':
          return items.find((item: any) => item['ITEM#'] === selectedItem.value);
        case 'augments':
          return augments.find((augment: any) => augment['name'] === selectedItem.value);
        default:
          return null;
      }
    };

    setItemData(findItem());
  }, [selectedItem, champions, traits, items, augments]);

  if (!selectedItem || !itemData) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-white text-gray-800 ">
        <Search className="w-12 h-12 text-cyan-500 mb-4 opacity-50" />
        <h3 className="text-lg font-medium text-cyan-700">No Selection</h3>
        <p className="text-sm text-gray-500 text-center mt-2">
          Search and select an item to view detailed information
        </p>
      </div>
    );
  }

  // Render the appropriate component based on the selected type
  const renderComponent = () => {
    if(!itemData) return (
        <div className="w-full h-full flex items-center justify-center p-6">
        <p className="text-gray-500">Selection type not supported</p>
      </div>
    )
    switch (selectedItem.type) {
      case 'champions':
        return (
          <div className="h-full w-full p-4  pb-12">
            < ChampionBox item={itemData} />
          </div>
        );
      case 'traits':
        console.log('item',itemData)
        try {
            if(typeof itemData.data === 'object') {
                return (
                    <div className="h-full w-full p-4">
                      <TraitBox item={itemData}>
                        {traitChampionsMap && (itemData.data).name (
                          <div className="w-full mt-[20px]">
                            <ChampionHierarchy
                              champions={traitChampionsMap[ (itemData.data).name]}
                            />
                          </div>
                        )}
                      </TraitBox>
                    </div>
                  );
            } else if(typeof itemData.data === 'string') {
                return (
                    <div className="h-full w-full p-4">
                      <TraitBox item={itemData}>
                        {traitChampionsMap &&  (itemData.data)? (
                          <div className="w-full mt-[20px]  ">
                            <ChampionHierarchy
                              champions={traitChampionsMap[JSON.parse(itemData.data).name]}
                            />
                          </div>
                        )
                        : <div></div>
                        }
                      </TraitBox>
                    </div>
                  );
            } return (<div></div>)

          
        } catch(e) {
            console.log(e)
            return (
                <div className="w-full h-full flex items-center justify-center p-6">
                  <p className="text-gray-500">Selection type not supported</p>
                </div>
              );
        }
       
      case 'items':
        return (
          <div className="h-full w-full p-4 pb-18 my-auto">
            <ItemBox item={itemData} />
          </div>
        );
      case 'augments':
        return (
          <div className="h-full w-full p-4 pb-12 my-auto">
            <AugmentBox item={itemData} />
          </div>
        );
      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-6">
            <p className="text-gray-500">Selection type not supported</p>
          </div>
        );
    }
  };

  return (
    <div className="w-full h-full    bg-transparent overflow-hidden">
      <div className=" bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 border-b border-cyan-500/30 ">
      <div className='p-2 bg-white '>
        <h3 className="text-md font-medium text-cyan-500  text-center">
          {selectedItem.type.charAt(0).toUpperCase() + selectedItem.type.slice(1)} Details
        </h3>
        </div>
      </div>
      {renderComponent()}
    </div>
  );
};

export default SearchResult;