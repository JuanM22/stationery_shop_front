import './App.css';
import NavMenu from './nav_menu/NavMenu';
import FilterComponent from './filter_compo/FilterComponent';
import ProductCatalog from './product_catalog/ProductCatalog';
import ProductForm from './product_form/ProductForm';

function App() {
  return (
    <div className="App">
      <FilterComponent/>
      <NavMenu />
      {/* <ProductForm/> */}
      <ProductCatalog/>
    </div>
  );
}

export default App;
