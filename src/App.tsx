import { AppProvider } from '@shopify/polaris';
import '@shopify/polaris/build/esm/styles.css';
import enTranslations from '@shopify/polaris/locales/en.json';
import "./css/global.css";
import VolumeDiscount from './templates/VolumeDiscount';

function App() {
  return (
    <div >
      <AppProvider i18n={enTranslations}>
        <VolumeDiscount />
      </AppProvider>,
    </div>
  );
}

export default App;
