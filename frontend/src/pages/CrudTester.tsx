import React, { useState, useEffect } from 'react';
import { CrudService, TableName, Item as ApiItem } from '../api/crudapiservice';

// Define TypeScript interfaces
interface Field {
  key: string;
  value: string;
}

interface Item extends ApiItem {
  id: number | string ;
  name: string ;
  [key: string]: any;
}

const CrudTester: React.FC = () => {
  // Available tables with type safety
  const tables: TableName[] = ['tft_augments', 'tft_builds', 'tft_champions', 'tft_items', 'tft_traits', 'tft_users'];
  
  // State for the form with proper types
  const [selectedTable, setSelectedTable] = useState<TableName | ''>('');
  const [name, setName] = useState<string>('');
  const [additionalFields, setAdditionalFields] = useState<Field[]>([{ key: '', value: '' }]);
  const [searchResults, setSearchResults] = useState<Item[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [editingItem, setEditingItem] = useState<Item | null>(null);
  
  // Reset form when table changes
  useEffect(() => {
    setName('');
    setAdditionalFields([{ key: '', value: '' }]);
    setSearchResults([]);
    setEditingItem(null);
  }, [selectedTable]);
  
  // Handle table selection
  const handleTableChange = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    setSelectedTable(e.target.value as TableName | '');
  };
  
  // Handle name input based on table selection (adding prefix)
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    let value = e.target.value;
    
    // If the name doesn't start with the appropriate prefix, add it
    if (selectedTable === 'tft_augments' && !value.startsWith('#AUGMENT')) {
      value = '#AUGMENT ';
    } else if (selectedTable === 'tft_champions' && !value.startsWith('#CHAMPION')) {
      value = '#CHAMPION ';
    } else if (selectedTable === 'tft_items' && !value.startsWith('#ITEM')) {
      value = '#ITEM ';
    } else if (selectedTable === 'tft_traits' && !value.startsWith('#TRAIT')) {
      value = '#TRAIT ';
    }
 
    setName(value);
  };
  
  // Handle additional field changes
  const handleFieldChange = (index: number, key: string, value: string): void => {
    const updatedFields = [...additionalFields];
    updatedFields[index] = { key, value };
    setAdditionalFields(updatedFields);
  };
  
  // Add a new field
  const addField = (): void => {
    setAdditionalFields([...additionalFields, { key: '', value: '' }]);
  };
  
  // Remove a field
  const removeField = (index: number): void => {
    const updatedFields = additionalFields.filter((_, i) => i !== index);
    setAdditionalFields(updatedFields);
  };
  
  // Create a new item
  const handleCreate = async (): Promise<void> => {
    if (!selectedTable) {
      setError('Please select a table');
      return;
    }
    
    if (!name) {
      setError('Name is required');
      return;
    }
    
    // Convert additional fields to object
    const fieldsObject: Record<string, string> = {};
    additionalFields.forEach(field => {
      if (field.key && field.value) {
        fieldsObject[field.key] = field.value;
      }
    });
    
    //CURR {"eight":"trox", "id":"1742941542629", "name":"#CHAMPIONaatrox"}
    //NEEDDED {"#CHAMPION":"aatrox", "METADATA":{"id":"1742941542629", "eight":"trox"}}
    // par
    let partitionArr = name.split(' ')
    let partitionKey =   {} as Record<string,string>;
    let fullName = ""
    for(let i =1; i < partitionArr.length;i++) {
     fullName+= partitionArr[i]
    }
    partitionKey[partitionArr[0]+""] = fullName

    const payload = { // match dynamodb schemas
      name,
      partitionKey,
      ...fieldsObject
    };
    console.log('payload',payload)
    setIsLoading(true);
    setError('');
    
    try {
      // Call the API service to create the item
      await CrudService.create(selectedTable, payload);
      
      // Refresh the list after creation
      const updatedResults = await CrudService.getAll(selectedTable);
      console.log('items',updatedResults)
      setSearchResults(updatedResults as Item[]);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while creating the item');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Search for items
  const handleSearch = async (): Promise<void> => {
    if (!selectedTable) {
      setError('Please select a table');
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call the API service to get all items from the selected table
      const items = await CrudService.getAll(selectedTable);
      console.log('items',items)
      setSearchResults(items as Item[]);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while fetching items');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Update an item
  const handleUpdate = async (item: Item): Promise<void> => {
    if (editingItem && editingItem.id === item.id) {
      // Save changes
      const updatedItem = { ...editingItem };
      
      setIsLoading(true);
      setError('');
      
      try {
        // Extract the key (assuming id is the primary key for simplicity)
        const key = { id: item.id };
        
        // Call the API service to update the item
        await CrudService.update(selectedTable as (TableName), key, updatedItem);
        
        // Refresh the list after update
        const refreshedItems = await CrudService.getAll(selectedTable as TableName);
        console.log('items',refreshedItems)
        setSearchResults(refreshedItems as Item[]);
        setEditingItem(null);
      } catch (err) {
        setError((err as Error).message || 'An error occurred while updating the item');
      } finally {
        setIsLoading(false);
      }
    } else {
      // Start editing
      setEditingItem(item);
    }
  };
  
  // Delete an item
  const handleDelete = async (item: Item): Promise<void> => {
    setIsLoading(true);
    setError('');
    
    try {
      // Extract the key (assuming id is the primary key)
      const key = { id: item.id };
      
      // Call the API service to delete the item
      await CrudService.delete(selectedTable as TableName, key);
      
      // Refresh the list after deletion
      const refreshedItems = await CrudService.getAll(selectedTable as TableName);
      console.log('items',refreshedItems)
      setSearchResults(refreshedItems as Item[]);
    } catch (err) {
      setError((err as Error).message || 'An error occurred while deleting the item');
    } finally {
      setIsLoading(false);
    }
  };
  
  // Handle editing field changes
  const handleEditFieldChange = (key: string, value: string): void => {
    if (editingItem) {
      setEditingItem({
        ...editingItem,
        [key]: value
      });
    }
  };
  
  // Helper function to capitalize first letter
  const capitalize = (str: string): string => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };
  
  // Helper for getting table name in singular form
  const getSingularTableName = (table: string): string => {
    return capitalize(table.slice(0, -1));
  };
  
  return (
    <div className="p-6 max-w-6xl mx-auto bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6">CRUD Testing Component</h1>
      
      {/* Error message */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}
      
      {/* Table selection */}
      <div className="mb-6">
        <label className="block text-gray-700 font-bold mb-2">
          Select Table
        </label>
        <select
          value={selectedTable}
          onChange={handleTableChange}
          className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a table...</option>
          {tables.map(table => (
            <option key={table} value={table}>
              {capitalize(table)}
            </option>
          ))}
        </select>
      </div>
      
      {selectedTable && (
        <>
          {/* Create form */}
          <div className="mb-8 p-4 border rounded-lg bg-gray-50">
            <h2 className="text-xl font-bold mb-4">Create New {getSingularTableName(selectedTable)}</h2>
            
            {/* Name field */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Name (Required)
              </label>
              <input
                type="text"
                value={name}
                onChange={handleNameChange}
                className="shadow border rounded w-full py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline"
                placeholder={`Enter name (e.g., ${
                  selectedTable === 'tft_augments' ? '#AUGMENT Something' : 
                  selectedTable === 'tft_champions' ? '#CHAMPION Someone' : 
                  selectedTable === 'tft_items' ? '#ITEM Something' : 
                  selectedTable === 'tft_traits' ? '#TRAIT Something' : 
                  'Name'
                })`}
              />
            </div>
            
            {/* Additional fields */}
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2">
                Additional Fields
              </label>
              
              {additionalFields.map((field, index) => (
                <div key={index} className="flex mb-2">
                  <input
                    type="text"
                    value={field.key}
                    onChange={(e) => handleFieldChange(index, e.target.value, field.value)}
                    className="shadow border rounded w-1/3 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mr-2"
                    placeholder="Field name"
                  />
                  <input
                    type="text"
                    value={field.value}
                    onChange={(e) => handleFieldChange(index, field.key, e.target.value)}
                    className="shadow border rounded w-1/2 py-2 px-3 text-gray-700 focus:outline-none focus:shadow-outline mr-2"
                    placeholder="Value"
                  />
                  <button
                    onClick={() => removeField(index)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    type="button"
                  >
                    Remove
                  </button>
                </div>
              ))}
              
              <button
                onClick={addField}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-2"
                type="button"
              >
                Add Field
              </button>
            </div>
            
            {/* Create button */}
            <button
              onClick={handleCreate}
              disabled={isLoading}
              className={`${
                isLoading ? 'bg-gray-500' : 'bg-green-500 hover:bg-green-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              type="button"
            >
              {isLoading ? 'Creating...' : 'Create'}
            </button>
          </div>
          
          {/* Search and results */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4">Search {capitalize(selectedTable)}</h2>
            
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className={`${
                isLoading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'
              } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4`}
              type="button"
            >
              {isLoading ? 'Searching...' : 'Search All'}
            </button>
            
            {/* Results table */}
            {searchResults.length > 0 && (
              <div className="overflow-x-auto">
                <table className="min-w-full bg-white border">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="py-2 px-4 border">Name</th>
                      <th className="py-2 px-4 border">Fields</th>
                      <th className="py-2 px-4 border">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchResults.map(item => (
                      <tr key={item.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4 border">
                          {editingItem && editingItem.id === item.id ? (
                            <input
                              type="text"
                              value={editingItem.name}
                              onChange={(e) => handleEditFieldChange('name', e.target.value)}
                              className="shadow border rounded w-full py-1 px-2 text-gray-700"
                            />
                          ) : (
                            item.name
                          )}
                        </td>
                        <td className="py-2 px-4 border">
                          {editingItem && editingItem.id === item.id ? (
                            <div>
                              {Object.entries(editingItem)
                                .filter(([key]) => !['id', 'name'].includes(key))
                                .map(([key, value]) => (
                                  <div key={key} className="flex mb-1">
                                    <input
                                      type="text"
                                      value={key}
                                      disabled
                                      className="shadow border rounded w-1/3 py-1 px-2 text-gray-500 bg-gray-100 mr-2"
                                    />
                                    <input
                                      type="text"
                                      value={value}
                                      onChange={(e) => handleEditFieldChange(key, e.target.value)}
                                      className="shadow border rounded w-2/3 py-1 px-2 text-gray-700"
                                    />
                                  </div>
                                ))}
                            </div>
                          ) : (
                            <div>
                              {Object.entries(item)
                                .filter(([key]) => !['id', 'name'].includes(key))
                                .map(([key, value]) => (
                                  <div key={key}>
                                    <strong>{key}:</strong> {value}
                                  </div>
                                ))}
                            </div>
                          )}
                        </td>
                        <td className="py-2 px-4 border">
                          <button
                            onClick={() => handleUpdate(item)}
                            className={`${
                              editingItem && editingItem.id === item.id
                                ? 'bg-green-500 hover:bg-green-700'
                                : 'bg-blue-500 hover:bg-blue-700'
                            } text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline mr-2`}
                            type="button"
                          >
                            {editingItem && editingItem.id === item.id ? 'Save' : 'Edit'}
                          </button>
                          <button
                            onClick={() => handleDelete(item)}
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded focus:outline-none focus:shadow-outline"
                            type="button"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {searchResults.length === 0 && !isLoading && (
              <div className="text-gray-600 italic">No results found. Search or create new items.</div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CrudTester;