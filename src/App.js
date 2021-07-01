import './App.css';
import NavMenu from './nav_menu/NavMenu';
import FilterComponent from './filter_compo/FilterComponent';
import ProductCatalog from './product_catalog/ProductCatalog';

function App() {
  return (
    <div className="App">
      <FilterComponent/>
      <NavMenu />
      <ProductCatalog/>
    </div>
  );
}

export default App;
