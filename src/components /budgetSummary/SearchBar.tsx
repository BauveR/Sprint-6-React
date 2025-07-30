interface SearchBarProps {
    onSearch: (term: string) => void;
  }
  
  export const SearchBar = ({ onSearch }: SearchBarProps) => (
    <div className="mt-6">
      <input
        type="text"
        name="search"
        placeholder="Buscar por nombre"
        onChange={(e) => onSearch(e.target.value)}
        className="w-full p-2 border rounded text-gray-600"
      />
    </div>
  );
  